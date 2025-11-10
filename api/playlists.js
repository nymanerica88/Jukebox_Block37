import express from "express";
import { 
    createPlaylist, 
    getAllPlaylists, 
    getPlaylistById, 
    getPlaylistTracks,
    addTrackToPlaylist 
} from "#db/queries/playlists";

const playlistRouter = express.Router();

//GET playlists
playlistRouter.get("/", async ( req, res, next) => {
    try {
        const playlists = await getAllPlaylists();
        res.send(playlists);
    } catch (error) {
        next(error);
    }
});

//POST /playlists
playlistRouter.post("/", async (req, res, next) => {
    try {
        const playlist = await createPlaylist(req.body);
        res.status(201).send(playlist);
    } catch (error) {
        next(error);
    }
});

//GET /playlists/:id
playlistRouter.get("/:id", async (req, res, next) => {
    try {
        const playlist = await getPlaylistById(req.params.id);
        if (!playlist) return res.status(404).json({error: "Playlist not found"});
        res.send(playlist);
    } catch (error) {
        next(error);
    }
});

//GET /playlists/:id/tracks
playlistRouter.get("/:id/tracks", async (req, res, next) => {
    try {
        const tracks = await getPlaylistTracks(req.params.id);
        res.send(tracks);
    } catch (error) {
        next(error);
    }
});

//POST (add) /playlists/:id/tracks
playlistRouter.post("/:id/tracks", async (req, res, next) => {
    try {
        const playlistTrack = await addTrackToPlaylist({
            playlist_id: req.params.id, 
            track_id: req.body.trackId
        });
        if (!playlistTrack) return res.status(400).json({error:"Track already in playlist"});
        res.status(201).send(playlistTrack);
    } catch (error) {
        next(error);
    }
});

export default playlistRouter;