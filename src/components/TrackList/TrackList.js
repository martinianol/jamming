import React from "react";
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TrackList">
        {this.props.searchResults.map(track => {
          return <Track
            key={track.id}
            track={track}
            isRemoval={true} />
        }
        )}
      </div>
    );
  };
};

export default TrackList;
