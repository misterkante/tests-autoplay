import React, { useState, useEffect } from 'react';

const AudioAutoplay = () => {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    const audioUrl = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";
    
    // Construct a simple HTML page for the iframe
    // We use a blob URL to avoid potential CSP or Data URL length issues
    const iframeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Audio Autoplay Iframe</title>
        </head>
        <body>
          <audio id="audio" src="${audioUrl}" autoplay loop></audio>
          <script>
            const audio = document.getElementById('audio');
            audio.play().then(() => {
              console.log('Iframe: Playback started successfully');
            }).catch(e => {
              console.error('Iframe: Playback failed', e);
            });
          </script>
        </body>
      </html>
    `;

    const blob = new Blob([iframeHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);

    console.log("Solution 4: Iframe créé avec allow='autoplay'");

    return () => {
      URL.revokeObjectURL(url);
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Bienvenue sur mon site (Solution 4 - Iframe)</h1>
      <p>L'audio devrait démarrer via un iframe caché.</p>
      
      {/* Hidden Iframe */}
      {iframeSrc && (
        <iframe
          src={iframeSrc}
          allow="autoplay"
          style={{ display: 'none' }}
          title="audio-iframe"
        />
      )}

      <div id="status-display" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        Vérifiez la console pour les logs de l'iframe (si accessibles) ou le son.
      </div>
    </div>
  );
};

export default AudioAutoplay;
