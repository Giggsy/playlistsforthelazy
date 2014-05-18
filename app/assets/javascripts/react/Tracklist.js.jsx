/**
 * @jsx React.DOM
 */
var TrackList = React.createClass({
  render: function() {
    var self = this;
    var rows = [];
    this.props.tracks.map(function (track, i) {
      rows.push(<TrackRow key={i} 
                          track={track}
                          setCurrentAndNext={self.props.setCurrentAndNext}
                          updateFavorites={self.props.updateFavorites}
                          currentTrack={self.props.currentTrack}
                          prevTrack={self.props.prevTrack}
                          favorite_tracks={self.props.favorite_tracks}
                          nextTrack={self.props.nextTrack}/>
               );
    });
    return (
      <div className="navigation">
        <ul>
          {rows}
        </ul>
      </div>
    );
  }
});

