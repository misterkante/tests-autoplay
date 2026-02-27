import React, { useEffect, useRef } from 'react';

const AudioAutoplay = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const attemptPlay = async () => {
      if (audioRef.current) {
        try {
          // Modern browsers often block autoplay even with headers if there's no interaction.
          // This component tries to play as soon as it mounts.
          await audioRef.current.play();
          console.log("Autoplay réussi !");
        } catch (error) {
          console.error("Erreur lors de l'autoplay :", error);
        }
      }
    };

    attemptPlay();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" 
        preload="auto"
        loop
      />
      <h1>Bienvenue sur mon site</h1>
      <p>L'audio devrait démarrer automatiquement (si les politiques du navigateur le permettent).</p>
    </div>
  );
};

export default AudioAutoplay;
