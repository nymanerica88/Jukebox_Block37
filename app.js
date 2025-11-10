import express from "express";
import trackRouter from "./api/tracks.js"
import playlistRouter from "./api/playlists.js"

const app = express();

app.use(express.json());

app.use("/tracks", trackRouter);
app.use("/playlists", playlistRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error:"Something went wrong within the application"});
});

export default app;