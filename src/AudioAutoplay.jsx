import React, { useState, useRef } from 'react';

const AudioAutoplay = () => {
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef(null);

  const handleAllow = async () => {
    // 1. Play the audio (this is the user gesture)
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        console.log("Fake Prompt : Playback démarré via 'Autoriser'.");
      } catch (error) {
        console.error("Fake Prompt : Échec de la lecture :", error);
      }
    }

    // 2. Actually request permission for real (optional, but requested by user)
    if ('Notification' in window) {
      try {
        await Notification.requestPermission();
      } catch (e) {
        console.error("Erreur Notification.requestPermission :", e);
      }
    }

    // 3. Hide the prompt
    setShowPrompt(false);
  };

  const handleBlock = () => {
    // If they block, we still want to play the audio if possible (user interaction),
    // but the user's intent might be to just close it.
    // However, the rule says "peu importe le choix on déclenche l'audio".
    handleAllow();
  };

  return (
    <div style={{
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1>Site Web avec Autoplay (Prompt Natif)</h1>
      <p>Un prompt imitant celui du navigateur apparaît en haut à gauche.</p>
      
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
        preload="auto"
        loop
      />

      {showPrompt && (
        <div style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          width: '320px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          zIndex: 9999,
          padding: '16px',
          border: '1px solid #e0e0e0',
          animation: 'slideDown 0.3s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              marginRight: '12px',
              backgroundColor: '#f1f3f4',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#5f6368">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
              </svg>
            </div>
            <div style={{ fontSize: '14px', color: '#202124', lineHeight: '1.4' }}>
              <strong>localhost:5173</strong> souhaite :<br />
              Afficher des notifications
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              onClick={handleBlock}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #dadce0',
                color: '#1a73e8',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Bloquer
            </button>
            <button
              onClick={handleAllow}
              style={{
                backgroundColor: '#1a73e8',
                border: 'none',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(60,64,67,0.3)',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1765cc'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#1a73e8'}
            >
              Autoriser
            </button>
          </div>
        </div>
      )}

      <div id="status-display" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', backgroundColor: '#fff', borderRadius: '4px' }}>
        {showPrompt ? "Prompt de notification simulé actif..." : "Audio en cours de lecture !"}
      </div>

      <style>
        {`
          @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default AudioAutoplay;
