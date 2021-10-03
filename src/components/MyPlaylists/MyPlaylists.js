import React from 'react';
import MyPlaylist from '../MyPlayList/MyPlaylist'
import './MyPlaylists.css';

class MyPlaylists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="MyPlaylists">
        <h2>My Playlists</h2>

        {this.props.loading ? (<p>Loading...</p>) : (this.props.playlists.map(playlist => {
          return <MyPlaylist
            key={playlist.id}
            name={playlist.name}
            id={playlist.id}
          />
        }))
        }

      </div>
    );
  };
};

export default MyPlaylists;