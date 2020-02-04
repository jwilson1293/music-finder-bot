import React from 'react';
import logo from './logo.svg';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from './settings';
import $ from 'jquery';
import './App.css';

const App = () => {

  const [accessToken, setAccessToken] = React.useState();

  const getStuff = () => {
    $.ajax({
      url: "https://api.spotify.com/v1/users/jwil1993/playlists",
      headers: {Authorization: `Bearer ${accessToken}`},
      success: response => {
        console.log(response)
      }
    })

  };

  React.useEffect(() => {
    $.ajax({
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      headers: {"Authorization": `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`},
      data: {grant_type: "client_credentials"},
      success: response => {
        setAccessToken(response.access_token);
      },
      error: response => {
        console.log('ERROR', response)
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button type="button" onClick={getStuff}>Get Stuff</button>
        <p>
          This is my neat music bot thing.
        </p>
      </header>
    </div>
  );
}

export default App;
