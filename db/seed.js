import db from "./client.js";
import { createTrack } from "./queries/tracks.js";
import { createPlaylist } from "./queries/playlists.js";
import { addTrackToPlaylist } from "./queries/playlists.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // ---- Create 10 Playlists ----
  const playlist1 = await createPlaylist({ name: "90s R&B Hits", description: "Classic R&B tracks from the 1990s" });
  const playlist2 = await createPlaylist({ name: "00s Pop Party", description: "Pop bangers from the 2000s" });
  const playlist3 = await createPlaylist({ name: "Girl Power", description: "Empowering songs by female artists" });
  const playlist4 = await createPlaylist({ name: "Boy Band Favorites", description: "Best boy band songs" });
  const playlist5 = await createPlaylist({ name: "Chill Vibes", description: "Smooth and relaxing tracks" });
  const playlist6 = await createPlaylist({ name: "Workout Jams", description: "Upbeat tracks to energize workouts" });
  const playlist7 = await createPlaylist({ name: "Love Songs", description: "Romantic tracks for every mood" });
  const playlist8 = await createPlaylist({ name: "Throwback", description: "90s and 2000s throwback hits" });
  const playlist9 = await createPlaylist({ name: "Summer Hits", description: "Songs that defined the summer" });
  const playlist10 = await createPlaylist({ name: "Top 40 Classics", description: "Popular R&B and Pop tracks from two decades" });

  console.log("🎵 10 playlists created!");

  // ---- Create 20 Tracks ----
  const track1 = await createTrack({ name: "No Scrubs", duration_ms: 215000 });
  const track2 = await createTrack({ name: "Waterfalls", duration_ms: 300000 });
  const track3 = await createTrack({ name: "Say My Name", duration_ms: 245000 });
  const track4 = await createTrack({ name: "I Want It That Way", duration_ms: 210000 });
  const track5 = await createTrack({ name: "Genie in a Bottle", duration_ms: 220000 });
  const track6 = await createTrack({ name: "Bye Bye Bye", duration_ms: 210000 });
  const track7 = await createTrack({ name: "Fantasy", duration_ms: 260000 });
  const track8 = await createTrack({ name: "Torn", duration_ms: 230000 });
  const track9 = await createTrack({ name: "Independent Women", duration_ms: 205000 });
  const track10 = await createTrack({ name: "Irreplaceable", duration_ms: 230000 });
  const track11 = await createTrack({ name: "Crazy in Love", duration_ms: 235000 });
  const track12 = await createTrack({ name: "Umbrella", duration_ms: 230000 });
  const track13 = await createTrack({ name: "Since U Been Gone", duration_ms: 225000 });
  const track14 = await createTrack({ name: "Hot in Herre", duration_ms: 200000 });
  const track15 = await createTrack({ name: "Beautiful", duration_ms: 270000 });
  const track16 = await createTrack({ name: "Fallin'", duration_ms: 220000 });
  const track17 = await createTrack({ name: "Complicated", duration_ms: 215000 });
  const track18 = await createTrack({ name: "If I Ain't Got You", duration_ms: 230000 });
  const track19 = await createTrack({ name: "Say It Right", duration_ms: 220000 });
  const track20 = await createTrack({ name: "Bleeding Love", duration_ms: 230000 });

  console.log("🎶 20 tracks created!");

  // ---- Add Tracks to Playlists ----
  // Playlist 1: 90s R&B Hits
  await addTrackToPlaylist({ playlist_id: playlist1.id, track_id: track1.id });
  await addTrackToPlaylist({ playlist_id: playlist1.id, track_id: track2.id });
  await addTrackToPlaylist({ playlist_id: playlist1.id, track_id: track3.id });

  // Playlist 2: 00s Pop Party
  await addTrackToPlaylist({ playlist_id: playlist2.id, track_id: track4.id });
  await addTrackToPlaylist({ playlist_id: playlist2.id, track_id: track5.id });
  await addTrackToPlaylist({ playlist_id: playlist2.id, track_id: track6.id });

  // Playlist 3: Girl Power
  await addTrackToPlaylist({ playlist_id: playlist3.id, track_id: track1.id });
  await addTrackToPlaylist({ playlist_id: playlist3.id, track_id: track9.id });

  // Playlist 4: Boy Band Favorites
  await addTrackToPlaylist({ playlist_id: playlist4.id, track_id: track4.id });
  await addTrackToPlaylist({ playlist_id: playlist4.id, track_id: track6.id });

  // Playlist 5: Chill Vibes
  await addTrackToPlaylist({ playlist_id: playlist5.id, track_id: track7.id });
  await addTrackToPlaylist({ playlist_id: playlist5.id, track_id: track8.id });

  // Playlist 6: Workout Jams
  await addTrackToPlaylist({ playlist_id: playlist6.id, track_id: track11.id });
  await addTrackToPlaylist({ playlist_id: playlist6.id, track_id: track12.id });

  // Playlist 7: Love Songs
  await addTrackToPlaylist({ playlist_id: playlist7.id, track_id: track10.id });
  await addTrackToPlaylist({ playlist_id: playlist7.id, track_id: track16.id });

  // Playlist 8: Throwback
  await addTrackToPlaylist({ playlist_id: playlist8.id, track_id: track1.id });
  await addTrackToPlaylist({ playlist_id: playlist8.id, track_id: track4.id });

  // Playlist 9: Summer Hits
  await addTrackToPlaylist({ playlist_id: playlist9.id, track_id: track5.id });
  await addTrackToPlaylist({ playlist_id: playlist9.id, track_id: track14.id });

  // Playlist 10: Top 40 Classics
  await addTrackToPlaylist({ playlist_id: playlist10.id, track_id: track19.id });
  await addTrackToPlaylist({ playlist_id: playlist10.id, track_id: track20.id });

  console.log("✅ 22 playlist-track entries created!");
}