import React, { useEffect, useRef } from 'react';

const AudioAutoplay = () => {
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (!window.Worker) {
      console.error("Les Web Workers ne sont pas supportés par votre navigateur.");
      return;
    }

    const audioUrl = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";
    const worker = new Worker('/audio-worker.js');

    worker.onmessage = async (event) => {
      if (event.data.error) {
        console.error("Erreur dans le Web Worker :", event.data.error);
        return;
      }

      console.log("Web Worker : Audio reçu. Décodage en cours...");
      
      try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        
        const buffer = await audioContextRef.current.decodeAudioData(event.data);
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        source.loop = true;

        console.log("Web Worker : Tentative de lecture...");
        
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        source.start(0);
        console.log("Web Worker : Playback démarré !");
      } catch (error) {
        console.error("Web Worker : Échec du décodage ou de la lecture :", error);
      }
    };

    console.log("Web Worker : Lancement du chargement audio...");
    worker.postMessage(audioUrl);

    return () => {
      worker.terminate();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Bienvenue sur mon site (Solution 5 - Web Worker)</h1>
      <p>L'audio est chargé en arrière-plan via un Web Worker.</p>
      <div id="status-display" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        Vérifiez la console pour les logs du Web Worker.
      </div>
    </div>
  );
};

export default AudioAutoplay;
