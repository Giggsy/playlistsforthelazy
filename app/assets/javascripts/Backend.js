var Backend = (function() {
  'use strict';

  function getPlaylists(self) {
    $.ajax({
      url: 'playlists',
      type: 'GET',
      dataType: 'json',
    }).done(function(data) {
      self.setState({
        playlists: data.playlists 
      });
    });
  }

  function updateTracks(self) {
    debugger;
    $.ajax({
      url: '/playlists',
      type: 'POST',
      dataType: 'json',
      data: {data: self.state},
    }).done(function(data) {
      self.setState({
       playlists: data.playlists,
       currentlyShowing: "Tracks"
     });
    });
  }

  function getArchivedPlaylistTracks(self, subreddit_id) {
    $.ajax({
       url: '/playlists/' + subreddit_id,
       type: 'GET',
       dataType: 'json',
     }).done(function(data) {
      console.log(data)
      self.setState({
        tracks: data.tracks,
        currentlyShowing: 'Tracks'
     });
    });
   }

  function getFavorites(self) {
    $.ajax({
      url: 'favorites',
      type: 'GET',
      dataType: 'json',
    }).done(function(data) {
      console.log(data.favorite_tracks)
      self.setState({
        favorite_tracks: data.favorite_tracks
      });
    });
  }

  return {
    getPlaylists:getPlaylists,
    updateTracks: updateTracks,
    getArchivedPlaylistTracks: getArchivedPlaylistTracks,
    getFavorites:getFavorites
  };

}());