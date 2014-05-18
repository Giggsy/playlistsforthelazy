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
      currentTrack: {},
      nextTrack: {},
      prevTrack: {},
      playlists: [],
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
    debugger;
    var self = this;
    this.setState({ tracks: RedditApi.getTracksBySubreddit(subreddit) }, function() { 
      Backend.updateTracks(self)
    });
  },

  getArchivedPlaylistTracks: function(subreddit_id) {
    Backend.getArchivedPlaylistTracks(this, subreddit_id);
  },

  handleUserNav: function(e) {
    this.setState({
      currentlyShowing: e.target.innerText
    })
  },

  setCurrentAndNext: function (track) {
    var tracks = this.state.tracks;
    var index = tracks.indexOf(track);
    var nextTrack = tracks[index + 1];
    var prevTrack = tracks[index - 1];

    this.setState({
      currentTrack: track,
      nextTrack: nextTrack,
      prevTrack: prevTrack
    });
  },

  updateFavorites: function(track) {
    debugger;
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
        <FavoritesList
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
