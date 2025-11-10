import db from "../client.js"

//Create Playlist -- not needed for the assignment, but created the query for practice
export async function createPlaylist ({name, description}) {
    try {
        const sql = `
        INSERT INTO playlists (name, description)
        VALUES ($1, $2)
        RETURNING *;    
        `;

        const values = [name, description];
        const {rows} = await db.query(sql,values);
        return rows [0];
    } catch (error) {
        console.error("Error Creating New Playlist", error);
        throw error;        
    }
}

//GET All Playlists
export async function getAllPlaylists () {
    try {
        const sql = `
        SELECT *
        FROM playlists
        ORDER BY id;       
        `;

        const {rows} =await db.query(sql);
        return rows;
    } catch (error) {
        console.error("Error retieving all playlists",error);
        throw error;
    }
}

//GET Playlist By ID
export async function getPlaylistById(id) {
    try {
        const sql = `
        SELECT *
        FROM playlists
        WHERE id = $1; 
        `;

        const values = [id];
        const {rows} = await db.query(sql, values);
        return rows[0];
    } catch (error) {
        console.error(`Error getting playlist by id`, error);
        throw error;
    }
}

//GET Playlist tracks using playlist_id
//JOIN = inner join = match rows from tracks and playlist_tracks where tracks.id = playlists_tracks.track_id
//WHERE = filters the results to only tracks that are in a specific playlist
export async function getPlaylistTracks(playlist_id) {
    try {
        const sql = `
        SELECT *
        FROM tracks
        JOIN playlists_tracks ON tracks.id = playlists_tracks.track.id
        WHERE playlists_tracks.playlist_id = $1
        ORDER BY tracks.id;        
        `;

        const values = [playlist_id];
        const {rows} = await db.query(sql, values);
        return rows;
    } catch (error) {
        console.error(`Error getting tracks for playlist`, error);
        throw error;
    }
}

//POST (add) Track to Playlist
//ON CONFLICT DO NOTHING means if it tries to duplicate a track within a playlist, just skip over it instead
export async function addTrackToPlaylist({playlist_id, track_id}) {
    try {
        const sql = `
        INSERT INTO playlists_tracks (playlist_id, track_id)
        VALUES ($1, $2)
        ON CONFLICT (playlist_id, track_id) DO NOTHING
        RETURNING *     
        `

        const values = [playlist_id, track_id];
        const {rows} = await db.query(sql, values);
        console.log(`Track has been added to the playlist`, rows[0]);
        return rows[0];
    } catch (error) {
        console.error(`This track already exists in this playlist`, error);
        throw error;
    }
}

// export async function doesPlaylistExist(id) {
//     try {
//         const sql = `
//         SELECT 1 FROM playlists WHERE id = $1;
//         `;

//         const values = [id];
//         const result = await db.query(sql, values);
//         return result.rowCount > 0;
//     } catch (error) {
//         console.error("Playlist does not exist",error);
//         throw error;
//     }
// }