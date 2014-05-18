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
      if (data.signed_in) {
        self.setState({
          signed_in: true 
        });
      }
    });
  }

  function updateTracks(self) {
    $.ajax({
      url: '/playlists',
      type: 'POST',
      dataType: 'json',
      data: {data: self.state},
    }).done(function(data) {
      self.setState({
       playlists: data.playlists,
       tracks: data.tracks,
       currentlyShowing: "Tracks"
     });
    });
  }

  function updateFavorites(self, track) {
    $.ajax({
      url: 'favorites/' + track.id,
      type: 'PUT',
      dataType: 'json',
      data: {data: self.state},
    }).done(function(data) {
      self.setState({
       favorite_tracks: data.favorite_tracks,
     });
    });
  }

  function getArchivedPlaylistTracks(self, subreddit_id) {
    $.ajax({
     url: '/playlists/' + subreddit_id,
     type: 'GET',
     dataType: 'json',
   }).done(function(data) {
    self.setState({
      tracks: data.tracks,
      currentlyShowing: 'Tracks'
    })
  });
 }

 function getFavorites(self) {
  $.ajax({
    url: 'favorites',
    type: 'GET',
    dataType: 'json',
  }).done(function(data) {
    self.setState({
      favorite_tracks: data.favorite_tracks
    });
  });
}

return {
  getPlaylists:getPlaylists,
  updateTracks: updateTracks,
  updateFavorites: updateFavorites,
  getArchivedPlaylistTracks: getArchivedPlaylistTracks,
  getFavorites:getFavorites
};

}());