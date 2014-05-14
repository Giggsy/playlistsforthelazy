/**
 * @jsx React.DOM
 */
var App = React.createClass({
  getInitialState: function() {
    return {
      currentlyShowing: 'Archives',
      subreddit: '',
      tracks: [],
      currentTrack: {},
      nextTrack: {}
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

  handleUserNav: function(e) {
    debugger;
    this.setState({
      currentlyShowing: e.target.innerText
    })
  },

  setCurrentAndNext: function (track) {
    var tracks = this.state.tracks;
    var index = tracks.indexOf(track);
    var nextTrack = tracks[index + 1];

    this.setState({
      currentTrack: track,
      nextTrack: nextTrack
    });
  },
  
  render: function() {
    return (
      <div>
        <SearchBar subreddit={this.state.subreddit}
          onUserInput={this.handleUserInput}
          updateTracks={this.updateTracks} />
        <NavigationMenu navSelector={this.handleUserNav}
          currentlyShowing={this.state.currentlyShowing}/>
        {this.state.currentlyShowing === "Tracks" ? 
        <TrackList tracks={this.state.tracks}
          setCurrentAndNext={this.setCurrentAndNext}
          currentTrack={this.state.currentTrack}
          nextTrack={this.state.nextTrack}/>
        : null}
        {this.state.currentlyShowing === "Archives" ?
        <ArchivesList />
        : null}
        {this.state.currentlyShowing === "Favorites" ?
        <FavoritesList />
        : null}
      </div>
    );
  }
});

$(document).ready(function() {
  React.renderComponent( <App />, document.getElementById('list'));
});
