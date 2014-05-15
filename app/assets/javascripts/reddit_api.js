RedditApi = (function() {
  'use strict';

  function getTracksBySubreddit(subreddit) {
    var tracks;
    $.ajax({ url: 'http://www.reddit.com/r/' + subreddit + '.json?limit=100',
     async: false,
     dataType: 'json',
     success: function(posts) {
        tracks = extractYoutubeLinks(posts);
      }
    });
    return tracks;
  }

  function extractYoutubeLinks(posts) {
    var links = posts.data.children;
    var tracks = [] ;
    for (var i = links.length - 1; i >= 0; i--) {
      var info = links[i].data;
      if (info.domain === 'youtube.com' && info.media) {
        var track = {
          title: info.media.oembed.title,
          thumbnail: info.media.oembed.thumbnail_url,
          video_id: getVideoId(info.media.oembed.url)
        };
        tracks.push(track);
      }
    }
    return tracks;
  }

  function getVideoId(videoUrl) {
    return videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i)[1];
  }

  return {
    getTracksBySubreddit: getTracksBySubreddit
  };
}());
