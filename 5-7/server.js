const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const videoPath = path.join(__dirname, 'video.mp4');
const outputDir = path.join(__dirname, 'stream');
const playlistPath = path.join(outputDir, 'playlist.m3u8');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

exec(`ffmpeg -i ${videoPath} -c:v h264 -c:a aac -b:v 2000k -b:a 128k -hls_time 10 -hls_list_size 0 -hls_segment_filename ${outputDir}/segment%d.ts ${playlistPath}`, (err) => {
    if (err) {
        console.error('Error converting video:', err);
        return;
    }
    console.log('Video converted successfully');
});

app.use('/stream', express.static(outputDir));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});