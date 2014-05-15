/**
 * @jsx React.DOM
 */
var App = React.createClass({
  componentDidMount: function() {
    var self = this;
    $.ajax({
      url: 'playlists',
      type: 'GET',
      asyn: false,
      dataType: 'json',
      success: function(data) {
        self.setState({
          playlists: data.playlists
        });
      }
    })

  },

  getInitialState: function() {
    return {
      currentlyShowing: 'Archives',
      subreddit: '',
      tracks: [],
      currentTrack: {},
      nextTrack: {},
      playlists: []
    }
  },

  handleUserInput: function(subreddit) {
    this.setState({
      subreddit: subreddit
    });
  },

  updateTracks: function(subreddit) {
    var self = this;
    this.setState({ tracks: RedditApi.getTracksBySubreddit(subreddit) }, function() { 
      $.ajax({
        url: '/playlists',
        type: 'POST',
        dataType: 'json',
        data: {data: this.state},
        success: function (data) {
          self.setState({
            playlists: data.playlists,
            currentlyShowing: "Tracks"
          });
        }
      });
    });
  },

  getArchivedPlaylistTracks: function(subreddit_id) {
    var self = this;
    $.ajax({
     url: '/playlists/' + subreddit_id,
     type: 'GET',
     dataType: 'json',
     success: function(data) {
      self.setState({
        tracks: data.tracks,
        currentlyShowing: 'Tracks'
      });
     }
   });
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
        <ArchivesList 
          playlists={this.state.playlists}
          getArchivedPlaylistTracks={this.getArchivedPlaylistTracks} />
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
