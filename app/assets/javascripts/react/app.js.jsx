/**
 * @jsx React.DOM
 */
var App = React.createClass({
  getInitialState: function() {
    console.log('loaded')
    return {
      subreddit: '',
      tracks: []
    };
  },

  handleUserInput: function(subreddit) {
    this.setState({
      subreddit: subreddit
    });
  },

  updateTracks: function(subreddit) {
    this.setState({
      tracks: RedditApi.getTracksBySubreddit(subreddit)
    });
  },

  setCurrentAndNext: function (track) {
    var tracks = this.state.tracks;
    var index = tracks.indexOf(track);
    var nextTrack = tracks[index + 1];

    tracks.forEach(function(track) {
      track.current = false;
      track.next =false;
    });

    track.current = true;
    nextTrack.next = true;

    this.setState({
      tracks: tracks
    });
    debugger;
  },

  render: function() {
    return (
      <div>
        <SearchBar subreddit={this.state.subreddit}
          onUserInput={this.handleUserInput}
          updateTracks={this.updateTracks} />
        <TrackList tracks={this.state.tracks}
          setCurrentAndNext={this.setCurrentAndNext} />
      </div>
    );
  }
});

$(document).ready(function() {
  React.renderComponent( <App />, document.getElementById('list'));
});
