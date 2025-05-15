// server.js
const PORT = process.env.PORT || 3000;
const express = require('express');
const request = require('request');

const app = express();
const PORT = 3000;

// Map channel names to IP-based URLs
const channelMap = {
  "NBAPhilippines": "http://143.44.136.110:6910/001/2/ch00000090990000001064/manifest.mpd?virtualDomain=001.live_hls.zte.com",
  "HBO": "http://143.44.136.110:6910/001/2/ch00000090990000001065/manifest.mpd?virtualDomain=001.live_hls.zte.com"
};

app.get('/stream/:channel', (req, res) => {
  const channel = req.params.channel;
  const originUrl = channelMap[channel];

  if (!originUrl) {
    return res.status(404).send('Channel not found.');
  }

  request(originUrl)
    .on('error', err => res.status(500).send('Stream error'))
    .pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

