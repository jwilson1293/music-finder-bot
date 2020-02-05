import React from 'react';
import music from './music_thing.png';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from './settings';
import $ from 'jquery';
import './App.css';
import { Button, Grid, TextField } from '@material-ui/core';

const App = () => {

  const [accessToken, setAccessToken] = React.useState();
  const [username, setUsername] = React.useState('jwil1993');
  const [error, setError] = React.useState();
  const [song, setSong] = React.useState();
  const [playlist, setPlaylist] = React.useState();

  const getRandomSong = () => {
    if (username) {
      setError();
      $.ajax({
        url: `https://api.spotify.com/v1/users/${username}/playlists`,
        headers: {Authorization: `Bearer ${accessToken}`},
        success: response => {
          const playlists = response.items;
          const randomPlaylist = playlists[Math.floor(Math.random() * response.total)];
          const randomIndex = Math.floor(Math.random() * randomPlaylist.tracks.total);
          setPlaylist(randomPlaylist);
          fetchSong(randomPlaylist, randomIndex);
        }
      });
    } else {
      setError('A username is required');
    }
  };

  const fetchSong = (rPlaylist, index) => {
    $.ajax({
      url: `${rPlaylist.tracks.href}?offset=${index}&limit=1`,
      headers: {Authorization: `Bearer ${accessToken}`},
      success: response => {
        setSong(response.items[0].track);
      }
    });
  };

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  React.useEffect(() => {
    $.ajax({
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      headers: {"Authorization": `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`},
      data: {grant_type: "client_credentials"},
      success: response => {
        setAccessToken(response.access_token);
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={3}>
          <Grid item xs={4}></Grid>
          <Grid item xs={12} sm={4}>
            {song
              ? <>
                <img src={song.album.images[1].url} alt="cover art" />
                <p><strong>{song.name}</strong></p>
                <p>{song.artists.map(artist => artist.name).join(', ')}</p>
                <p>{song.album.name}</p>
                {playlist && <p><small>From playlist: {playlist.name}</small></p>}
                <p><small><a href={song.external_urls.spotify}>Listen Here</a></small></p>
              </>
              : <>
                <img src={music} alt="music notes" />
                <p>This is my neat music bot thing.</p>
                <div style={{marginTop: "10px", marginBottom: "10px"}}>
                  <TextField required label="Username" value={username} onChange={handleUsernameChange} variant="outlined" />
                </div>
                {error && <p><small style={{color: '#cc0000'}}>{error}</small></p>}
              </>
            }
            <Button variant="contained" color="primary" onClick={getRandomSong}>Get Random Song</Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
