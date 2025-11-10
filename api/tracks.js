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
tracksRouter.get("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({error:"ID must be a number"});

        const track = await getTrackById(Number(req.params.id));
        if (!track) return res.status(404).json({error:"Track not found"});
        
        return res.json(track);
    } catch (error) {
        next(error);
        return res.status(500).send({error:"Server error"});
    }
})

export default tracksRouter;