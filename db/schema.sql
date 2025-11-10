DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS tracks;
DROP TABLE IF EXISTS playlists_tracks;

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
)

CREATE TABLE tracks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL, 
    duration_ms INTEGER NOT NULL
);

CREATE TABLE playlists_tracks (
    id SERIAL PRIMARY KEY, 
    playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCASE,
    track_id INTEGER REFERENCES tracks(id) ON DELETE CASCADE,
    UNIque (playlist_id, track_id)
)