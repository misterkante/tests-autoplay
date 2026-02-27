import React, { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const AudioAutoplay = () => {
  const soundRef = useRef(null);

  useEffect(() => {
    const audioUrl = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";
    
    console.log("Initialisation de Howler.js...");
    
    soundRef.current = new Howl({
      src: [audioUrl],
      html5: false, // Forcer Web Audio API via Howler
      loop: true,
      volume: 0.5,
      onload: () => {
        console.log("Howler : Audio chargé avec succès.");
      },
      onplay: () => {
        console.log("Howler : Lecture démarrée !");
      },
      onloaderror: (id, error) => {
        console.error("Howler : Erreur de chargement :", error);
      },
      onplayerror: (id, error) => {
        console.error("Howler : Erreur de lecture :", error);
        // Howler can automatically try to play on next user interaction if it fails
        soundRef.current.once('unlock', () => {
          console.log("Howler : Audio débloqué par interaction utilisateur, tentative de lecture...");
          soundRef.current.play();
        });
      }
    });

    console.log("Howler : Tentative de lecture immédiate...");
    soundRef.current.play();

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Bienvenue sur mon site (Solution 3 - Howler.js)</h1>
      <p>L'audio devrait démarrer via la bibliothèque Howler.js.</p>
      <div id="status-display" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        Vérifiez la console pour les logs Howler.js.
      </div>
    </div>
  );
};

export default AudioAutoplay;
