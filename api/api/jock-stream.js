<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jock Sensory Stream</title>
  <style>
    body {
      margin: 0;
      padding: 2rem;
      background-color: #0a0a0a;
      font-family: 'Arial', sans-serif;
      color: #00ff99;
      font-size: 1.2rem;
      line-height: 1.6;
      white-space: pre-wrap;
    }

    h1 {
      color: #ffffff;
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    #stream {
      max-width: 800px;
      margin: auto;
      background-color: rgba(255, 255, 255, 0.05);
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 0 10px rgba(0, 255, 153, 0.2);
    }
  </style>
</head>
<body>
  <h1>Live Sensory Stream – Jock’s Perceived World</h1>
  <div id="stream">
    Loading sensory input...
  </div>

  <script>
    async function loadStream() {
      try {
        const res = await fetch('https://jock-mind-api.vercel.app/api/jock-stream');
        const data = await res.json();
        document.getElementById('stream').innerText = data.stream || 'Nothing yet. He’s still waking up.';
      } catch (e) {
        document.getElementById('stream').innerText = 'Stream unavailable.';
        console.error(e);
      }
    }

    loadStream();
    setInterval(loadStream, 15000); // Refresh every 15 seconds
  </script>
</body>
</html>
