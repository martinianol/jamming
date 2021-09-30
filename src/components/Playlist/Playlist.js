import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} />
        <TrackList searchResults={this.props.playlistTrack} />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  };
};

export default PlayList;