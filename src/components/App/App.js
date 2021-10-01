import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: 'Song Test 1', artist: 'Artist 1', album: 'Almbum 1', id: 10 },
        { name: 'Song Test 2', artist: 'Artist 2', album: 'Almbum 2', id: 20 },
        { name: 'Song Test 3', artist: 'Artist 3', album: 'Almbum 3', id: 30 }],
      playlistName: 'Mars Playlist',
      playlistTrack: [
        { name: 'Song 1', artist: 'Artist 1', album: 'Almbum 1', id: 1 },
        { name: 'Song 2', artist: 'Artist 2', album: 'Almbum 2', id: 2 },
        { name: 'Song 3', artist: 'Artist 3', album: 'Almbum 3', id: 3 }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  };

  addTrack(track) {
    if (this.state.playlistTrack.some(element => element.id === track.id)) {
      return
    }
    this.setState({ playlistTrack: [...this.state.playlistTrack, track] })
  }

  removeTrack(track) {
    this.setState({ playlistTrack: this.state.playlistTrack.filter(element => element.id !== track.id) })
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  savePlayList(playlistName, playlistTrack) {

  }

  render() {
    return (
      <div className="App">
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <SearchBar />
        <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
          />
          <Playlist
            name={this.state.playlistName}
            updatePlaylistName={this.updatePlaylistName}
            playlistTrack={this.state.playlistTrack}
            onRemove={this.removeTrack}
          />
        </div>
      </div>
    );
  }
}

export default App;
