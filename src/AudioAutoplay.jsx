import React, { useEffect, useRef } from 'react';

const AudioAutoplay = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audioUrl = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";

    const setupNotifications = async () => {
      if (!('serviceWorker' in navigator) || !('Notification' in window)) {
        console.error("Les notifications ne sont pas supportées.");
        return;
      }

      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.warn("Permission de notification refusée.");
          return;
        }

        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log("Service Worker enregistré.");

        // Show a local notification
        registration.showNotification('Audio Prêt', {
          body: 'L\'audio va démarrer. Cliquez pour confirmer si nécessaire.',
          icon: '/vite.svg',
          tag: 'audio-trigger'
        });

        // Still attempt to play immediately, as the user might have already granted permission
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => console.log("Notification : Playback démarré !"))
            .catch(e => console.warn("Notification : Playback auto bloqué, attend l'interaction.", e));
        }

      } catch (error) {
        console.error("Erreur lors de la configuration des notifications :", error);
      }
    };

    setupNotifications();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Bienvenue sur mon site (Solution 7 - Notifications)</h1>
      <p>Une notification a été demandée pour déclencher l'audio.</p>
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
        preload="auto"
        loop
      />
      <div id="status-display" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        Vérifiez si une demande de permission de notification apparaît.
      </div>
    </div>
  );
};

export default AudioAutoplay;
