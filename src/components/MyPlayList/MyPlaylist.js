import React from 'react';
import './MyPlaylist.css';
import Spotify from '../../util/Spotify';


class MyPlaylist extends React.Component {
  constructor(props) {
    super(props);
    /*  this.removePlaylist = this.removePlaylist.bind(this); */
  }

  /*  removePlaylist(playlistId) {
     Spotify.removePlaylist(playlistId)
   } */

  render() {
    return (
      <div className="MyPlaylist">
        <p>{this.props.name}</p>
        <button className="Track-action" >-</button>
      </div>
    );
  };
};

export default MyPlaylist;