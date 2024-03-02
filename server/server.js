const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
const torrentId = "./wetorrent.torrent"; // Replace this with your torrent or magnet link

app.use(cors());

app.get('/stream', (req, res) => {
    console.log("entered stream");
    import('webtorrent').then(({ default: WebTorrent }) => {

    const client = new WebTorrent();

    client.add(torrentId, { path: "/path/to/save/files" }, torrent => {
        console.log(torrent.files[0].name);
        const file = torrent.files.find(file => file.name.endsWith('.mp4')); // Ensure this matches your file type
        if (!file) {
            res.sendStatus(404);
            client.destroy(); // Clean up client resources
            return;
        }

        const range = req.headers.range;
        if (!range) {
            res.status(400).send('Requires Range header');
            client.destroy(); // Clean up client resources
            return;
        }

        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : file.length - 1;

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${file.length}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': end - start + 1,
            'Content-Type': 'video/mp4',
        });

        const stream = file.createReadStream({ start, end });

        stream.on('error', (streamErr) => {
            console.error('Stream error:', streamErr);
            res.end();
        });

        res.on('close', () => {
            console.log('Response closed, destroying stream...');
            stream.destroy();
            client.destroy(); // It's important to clean up resources
        });

        stream.pipe(res);
    }).on('error', (err) => {
        console.error('Torrent error:', err);
        res.sendStatus(500);
        client.destroy(); // Clean up client resources
    });
});
});

app.listen(port, () => {
    console.log(`Streaming server running at http://localhost:${port}!1!!`);
});
