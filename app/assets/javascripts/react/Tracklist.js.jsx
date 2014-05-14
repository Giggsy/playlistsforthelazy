/**
 * @jsx React.DOM
 */
var TrackList = React.createClass({
  render: function() {
    var self = this;
    var setCurrentAndNext = this.props.setCurrentAndNext
    var rows = [];
    this.props.tracks.map(function (track, i) {
      rows.push(<TrackRow key={i} 
                          track={track}
                          setCurrentAndNext={setCurrentAndNext}
                          currentTrack={self.props.currentTrack}
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
})

