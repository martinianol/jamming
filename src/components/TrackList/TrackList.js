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
        <Track isRemoval={true} />
        <Track isRemoval={true} />
        <Track isRemoval={false} />
      </div>
    );
  };
};

export default TrackList;
