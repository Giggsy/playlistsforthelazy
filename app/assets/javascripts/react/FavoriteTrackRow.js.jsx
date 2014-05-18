/**
 * @jsx React.DOM
 */
var FavoriteTrackRow = React.createClass({
  handleClick: function () {
    YoutubePlayer.playVideo(this.props.track.video_id);
    this.props.setCurrentAndNext(this.props.track);
  },

  handleFavorite: function() {
    this.props.updateFavorites(this.props.track);
  },

  render: function() {
    var currentlyPlayingString,
        trackString
    var favoriteString = 'glyphicon glyphicon-heart right';
    var track = this.props.track;

    if (track === this.props.currentTrack) {
      currentlyPlayingString = 'selected';
    } else if  (track === this.props.nextTrack) {
      trackString = 'next';
    } else if (track === this.props.prevTrack) {
      trackString = 'previous';
    } else if (this.props.favorite_tracks.indexOf(track) > 0) {
      favoriteString += 'favorite';
    }

    return (
      <span>
        <li className={currentlyPlayingString}>
          <span onClick={this.handleClick} className={trackString}>{track.title}</span>
          <span onClick={this.handleFavorite} className={favoriteString}></span>
        </li>
      </span>
    );
  }
})
