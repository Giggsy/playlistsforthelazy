/**
 * @jsx React.DOM
 */
var TrackRow = React.createClass({
  handleClick: function () {
    YoutubePlayer.playVideo(this.props.track.video_id);
    this.props.setCurrentAndNext(this.props.track);
  },
  render: function() {
    var classString;
    if (this.props.track === this.props.currentTrack) {
      classString = 'selected';
    } else if  (this.props.track === this.props.nextTrack) {
      classString = 'next';
    } else if (this.props.track === this.props.prevTrack) {
      classString = 'previous';
    }
    return (
      <span>
        <li onClick={this.handleClick}
            className={classString}>{this.props.track.title}
        </li>
      </span>
    );
  }
})

