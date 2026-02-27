self.onmessage = async (event) => {
  const audioUrl = event.data;
  try {
    const response = await fetch(audioUrl);
    const arrayBuffer = await response.arrayBuffer();
    self.postMessage(arrayBuffer);
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
