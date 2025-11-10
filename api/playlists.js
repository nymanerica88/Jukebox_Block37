import express from "express";
import { 
    createPlaylist, 
    getAllPlaylists, 
    getPlaylistById, 
    getPlaylistTracks,
    addTrackToPlaylist
} from "#db/queries/playlists";
import { getTrackById } from "#db/queries/tracks";

const playlistRouter = express.Router();

//GET playlists
playlistRouter.get("/", async ( req, res, next) => {
    try {
        const playlists = await getAllPlaylists();
        res.status(200).json(playlists);
    } catch (error) {
        console.error
        next(error);
    }
});

//POST /playlists
playlistRouter.post("/", async (req, res, next) => {
    try {
        if(!req.body || !req.body.name) return res.status(400).json({error:"Playlist name is required"});

        const playlist = await createPlaylist(req.body);
        res.status(201).send(playlist);
    } catch (error) {
        next(error);
    }
});

//GET /playlists/:id
playlistRouter.get("/:id", async (req, res, next) => {
    try {
        const playlistId = Number(req.params.id);
        if (isNaN(playlistId)) return res.status(400).json({error:"Playlist ID must be a number"});

        const playlist = await getPlaylistById(playlistId);
        if (!playlist) return res.status(404).json({error:"Playlist not found"});

        res.status(200).json(playlist);
    } catch (error) {
        next(error);
    }
});

//GET /playlists/:id/tracks
playlistRouter.get("/:id/tracks", async (req, res, next) => {
    try {
        const playlistId = Number(req.params.id);
        if (isNaN(playlistId)) return res.status(400).json({ error: "Playlist ID must be a number" });

        const playlist = await getPlaylistById(playlistId);
        if (!playlist) return res.status(404).json({ error: "Playlist not found" });

        const tracks = await getPlaylistTracks(playlistId);
        res.status(200).json(tracks);
    } catch (error) {
        next(error);
    }
});

//POST (add) /playlists/:id/tracks
playlistRouter.post("/:id/tracks", async (req, res, next) => {
    try {
        const playlistId = Number(req.params.id);
        if (isNaN(playlistId)) return res.status(400).json({error:"Playlist ID must be a number"});
               
        if (!req.body || req.body.trackId === undefined) return res.status(400).json({error: "TrackId is required"});
        
        const trackId = Number(req.body.trackId);
        if (isNaN(trackId)) return res.status(400).json({error:"TrackId must be a number"});

        const playlist = await getPlaylistById(playlistId);
        if(!playlist) return res.status(404).json({error:"Playlist not found"});

        const track = await getTrackById(trackId);
        if (!track) return res.status(400).json({error:"Track does not exist"});

        const playlistTrack = await addTrackToPlaylist({
            playlist_id: req.params.id, 
            track_id: req.body.trackId
        });

        if (!playlistTrack) return res.status(400).json({error:"Track already in playlist"});

        res.status(201).json(playlistTrack);
    } catch (error) {
        next(error);
    }
});

export default playlistRouter;