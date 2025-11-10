import db from "../client.js";

export async function createTrack ({name, duration_ms}) {
    try {
        const sql = `
        INSERT INTO tracks (name, duration_ms)
        VALUES ($1, $2)
        RETURNING *;    
        `;

        const values = [name, duration_ms];
        const {rows} = await db.query(sql,values);
        return rows [0];
    } catch (error) {
        console.error("Error Creating New Track", error);
        throw error;        
    }
}

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

// //Does the track exist?
// export async function doesTrackExist(id) {
//     try {
//         const sql = `
//         SELECT 1 FROM tracks WHERE id = $1;
//         `;

//         const values = [id];
//         const result = await db.query(sql, values);
//         return result.rowCount > 0;
//     } catch (error) {
//         console.error("Track does not exist",error);
//         throw error;
//     }
// }


