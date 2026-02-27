import React, { useEffect, useRef } from 'react';

const AudioAutoplay = () => {
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);

  useEffect(() => {
    const audioUrl = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";
    
    const initAudio = async () => {
      try {
        console.log("Initialisation de l'AudioContext...");
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        console.log("AudioContext créé avec succès. État actuel :", audioContextRef.current.state);

        console.log("Récupération de l'audio depuis :", audioUrl);
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        console.log("Audio récupéré avec succès. Taille du buffer :", arrayBuffer.byteLength);

        console.log("Décodage des données audio...");
        audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
        console.log("Audio décodé avec succès. Durée :", audioBufferRef.current.duration, "secondes");

        // Attempt playback
        const playAudio = () => {
          if (!audioBufferRef.current || !audioContextRef.current) return;

          const source = audioContextRef.current.createBufferSource();
          source.buffer = audioBufferRef.current;
          source.connect(audioContextRef.current.destination);
          source.loop = true;
          
          console.log("Tentative de lecture audio...");
          source.start(0);
          console.log("Playback démarré !");
        };

        // Some browsers require the context to be resumed after a user gesture, 
        // but we'll try to start it immediately as per Solution 2.
        if (audioContextRef.current.state === 'suspended') {
          console.log("L'AudioContext est suspendu. Tentative de reprise...");
          try {
            await audioContextRef.current.resume();
            console.log("AudioContext repris. État :", audioContextRef.current.state);
          } catch (resumeError) {
            console.warn("Échec de la reprise auto de l'AudioContext (nécessite probablement une interaction utilisateur) :", resumeError);
          }
        }

        playAudio();

      } catch (error) {
        console.error("Erreur dans Solution 2 (Web Audio API) :", error);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Bienvenue sur mon site (Solution 2 - Web Audio)</h1>
      <p>L'audio devrait démarrer automatiquement via Web Audio API.</p>
      <div id="status-display" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        Vérifiez la console pour les logs de débogage.
      </div>
    </div>
  );
};

export default AudioAutoplay;
