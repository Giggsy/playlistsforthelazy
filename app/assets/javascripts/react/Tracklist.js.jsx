/**
 * @jsx React.DOM
 */
var TrackList = React.createClass({
  render: function() {
    var setCurrentAndNext = this.props.setCurrentAndNext
    var rows = [];
    this.props.tracks.map(function (track) {
      rows.push(<TrackRow track={track}
                setCurrentAndNext={setCurrentAndNext}/>);
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

