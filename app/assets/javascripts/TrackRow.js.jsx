/**
 * @jsx React.DOM
 */
var TrackRow = React.createClass({
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
    var favorite_ids = this.props.favorite_tracks.map(function(fav) {
      return fav.video_id;
    })
    if (track.video_id === this.props.currentTrack.video_id) {
      currentlyPlayingString = 'selected';
    } else if  (track.video_id === this.props.nextTrack.video_id) {
      trackString = 'next';
    } else if (track.video_id === this.props.prevTrack.video_id) {
      trackString = 'previous';
    }
    if (favorite_ids.indexOf(track.video_id) >= 0) {
      favoriteString += ' favorite';
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

