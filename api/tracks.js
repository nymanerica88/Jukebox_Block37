import express from "express";
import {getAllTracks, getTrackById} from "../db/queries/tracks.js"

const tracksRouter = express.Router();

//GET /tracks
tracksRouter.get("/", async (req, res, next) => {
    try {
        const tracks = await getAllTracks();
        res.send(tracks);
    } catch (error) {
        next(error);
    }
});

//GET /tracks/:id
tracks.Router.get("/:id", async (req, res, next) => {
    try {
        const track = await getTrackById(req.params.id);
        if (!track) return res.status(404).json({error:"Track not found"});
        res.send(track);
    } catch (error) {
        next(error);
    }
})

export default fileRouter;