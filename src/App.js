import React from 'react';
import logo from './logo.svg';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from './settings';
import $ from 'jquery';
import './App.css';

const App = () => {
  React.useEffect(() => {
    $.ajax({
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      headers: {"Authorization": `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`},
      data: {grant_type: "client_credentials"},
      success: response => {
        console.log(response);
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
        <p>
          This is my neat music bot thing.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
