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

/* Create a method called renderAction that displays a <button> element with - as its content if the isRemoval property is true, and a + <button> element if the isRemoval property is false. Set the class name to Track-action. */