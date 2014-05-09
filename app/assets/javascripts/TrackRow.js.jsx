/**
 * @jsx React.DOM
 */
var TrackRow = React.createClass({
  handleClick: function () {
    YoutubePlayer.playVideo(this.props.track.videoId);
    this.props.setCurrentAndNext(this.props.track);
  },
  render: function() {
    debugger;
    var classString;
    if (this.props.track.current) {
      classString = 'selected'
    }
    if (this.props.track.next) {
      classString += ' next'
    }
    return (
      <li onClick={this.handleClick} 
        className={classString}>{this.props.track.title}</li>
    );
  }
})

