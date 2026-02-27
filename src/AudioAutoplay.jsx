import React, { useState, useRef } from 'react';

const AudioAutoplay = () => {
  const [showNotification, setShowNotification] = useState(true);
  const audioRef = useRef(null);

  const handleStartAudio = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        console.log("Custom UI : Playback démarré !");
        setShowNotification(false);
      } catch (error) {
        console.error("Custom UI : Échec de la lecture :", error);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Bienvenue sur mon site (Solution 8 - Notification Custom)</h1>
      <p>L'audio sera déclenché par une interaction avec la notification personnalisée ci-dessous.</p>
      
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
        preload="auto"
        loop
      />

      {showNotification && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#333',
          color: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          zIndex: 1000,
          maxWidth: '300px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0 }}>Voulez-vous activer l'ambiance sonore ?</p>
          <button
            onClick={handleStartAudio}
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Activer le son
          </button>
        </div>
      )}

      <div id="status-display" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        {showNotification ? "En attente d'interaction..." : "Audio actif !"}
      </div>
    </div>
  );
};

export default AudioAutoplay;
