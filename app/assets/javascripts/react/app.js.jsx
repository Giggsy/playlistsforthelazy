/**
 * @jsx React.DOM
 */
var App = React.createClass({

  getInitialState: function() {
    return {
      currentlyShowing: 'Archives',
      subreddit: '',
      tracks: [],
      favorite_tracks: [],
      playlists: [],
      currentTrack: {},
      nextTrack: {},
      prevTrack: {},
      logged_in_user: {}
    }
  },
  
  componentDidMount: function() {
    Backend.getPlaylists(this);
    Backend.getFavorites(this);
  },

  handleUserInput: function(subreddit) {
    this.setState({
      subreddit: subreddit
    });
  },

  updateTracks: function(subreddit) {
    var self = this;
    this.setState({ tracks: RedditApi.getTracksBySubreddit(subreddit) }, function() { 
      Backend.updateTracks(self)
    });
  },

  getArchivedPlaylistTracks: function(subreddit_id) {
    Backend.getArchivedPlaylistTracks(this, subreddit_id);
  },

  handleUserNav: function(e) {
    if (e.target.innerText === "Favorites") {
      this.check_if_user_signed_in();
    }
    this.setState({
      currentlyShowing: e.target.innerText
    })
  },

  setCurrentAndNext: function (track) {
    var tracks;
    this.state.currentlyShowing === "Favorites" ? 
      tracks = this.state.favorite_tracks : tracks = this.state.tracks;
    var index = tracks.indexOf(track);
    var nextTrack = tracks[index + 1];
    var prevTrack = tracks[index - 1];

    this.setState({
      currentTrack: track,
      nextTrack: nextTrack,
      prevTrack: prevTrack
    });
    debugger;
  },

  updateFavorites: function(track) {
    this.check_if_user_signed_in();
    Backend.updateFavorites(this, track);
  },

  check_if_user_signed_in: function() {
    if (this.state.signed_in) {
      return true;
    } else{
      window.location.href = "users/sign_in"
    }
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
          favorite_tracks={this.state.favorite_tracks}
          setCurrentAndNext={this.setCurrentAndNext}
          currentTrack={this.state.currentTrack}
          updateFavorites={this.updateFavorites}
          prevTrack={this.state.prevTrack}
          nextTrack={this.state.nextTrack}/>
        : null}
        {this.state.currentlyShowing === "Archives" ?
        <ArchivesList 
          playlists={this.state.playlists}
          getArchivedPlaylistTracks={this.getArchivedPlaylistTracks} />
        : null}
        {this.state.currentlyShowing === "Favorites" ?
        <TrackList tracks={this.state.favorite_tracks}
          favorite_tracks={this.state.favorite_tracks}
          setCurrentAndNext={this.setCurrentAndNext}
          currentTrack={this.state.currentTrack}
          updateFavorites={this.updateFavorites}
          prevTrack={this.state.prevTrack}
          nextTrack={this.state.nextTrack}/>
        : null}
      </div>
    );
  }
});

$(document).ready(function() {
  React.renderComponent( <App />, document.getElementById('list'));
});
