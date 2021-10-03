import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import MyPlaylists from '../MyPlaylists/MyPlaylists';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTrack: [],
      saving: false,
      myPlaylists: [{ name: 'Mars Playlist', id: 0 }, { name: 'Mars Playlist II', id: 1 }],
      loading: true,
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  };

  addTrack(track) {
    if (this.state.playlistTrack.some(element => element.id === track.id)) {
      return
    }
    this.setState({ playlistTrack: [...this.state.playlistTrack, track] })
  };

  removeTrack(track) {
    this.setState({ playlistTrack: this.state.playlistTrack.filter(element => element.id !== track.id) })
  };

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  };

  savePlayList() {
    this.setState({ saving: true })
    let trackURIs = this.state.playlistTrack.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
      .then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTrack: [],
          saving: false,
        })
      }
      );
  };

  search(term) {
    Spotify.search(term).then(results => {
      let filteredResults = results.filter(result => !this.state.playlistTrack.some(track => track['id'] === result.id))
      this.setState({ searchResults: filteredResults });
    })
  }

  componentDidMount() {
    Spotify.getMyPlaylists().then(results => {
      this.setState({ myPlaylists: results, loading: false })
    })
    Spotify.getAccessToken()
  }

  componentDidUpdate() {
    Spotify.getMyPlaylists().then(results => {
      this.setState({ myPlaylists: results, loading: false })
    })
  }


  render() {
    return (
      <div className="App">
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <SearchBar onSearch={this.search} />
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
            onSave={this.savePlayList}
            saving={this.state.saving}
          />
        </div>
        <MyPlaylists
          loading={this.state.loading}
          playlists={this.state.myPlaylists}
        />
      </div>
    );
  }
}

export default App;
