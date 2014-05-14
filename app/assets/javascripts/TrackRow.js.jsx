/**
 * @jsx React.DOM
 */
var TrackRow = React.createClass({
  handleClick: function () {
    YoutubePlayer.playVideo(this.props.track.videoId);
    this.props.setCurrentAndNext(this.props.track);
  },
  render: function() {
    var classString;
    if (this.props.track === this.props.currentTrack) {
      classString = 'selected';
    }
    if (this.props.track === this.props.nextTrack) {
      classString = 'next';
    }
    return (
      <span>
        <li onClick={this.handleClick}
            className={classString}>{this.props.track.title}</li>
      </span>
    );
  }
})

