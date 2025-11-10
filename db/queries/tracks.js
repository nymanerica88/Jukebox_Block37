import db from "../client.js";

//GET All Tracks
export async function getAllTracks() {
    try {
        const sql = `
        SELECT *
        FROM tracks
        ORDER BY id;
        `;

        const {rows} = await db.query(sql);
        return rows;
    } catch (error) {
        console.error("Error getting all tracks", error);
        throw error;
    }
}

//GET Single Track by ID
export async function getTrackById(id) {
    try {
        const sql = `
        SELECT *
        FROM tracks
        WHERE id =$1;   
        `;

        const values = [id];
        const {rows} = await db.query(sql,values);
        return rows;
    } catch (error) {
        console.error(`Error getting all tracks`, error);
        throw error;
    }
}


