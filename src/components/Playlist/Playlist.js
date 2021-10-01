import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    return this.props.updatePlaylistName(event.target.value)
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <TrackList searchResults={this.props.playlistTrack} isRemoval={true} onRemove={this.props.onRemove} />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  };
};

export default PlayList;