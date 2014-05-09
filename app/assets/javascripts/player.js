$(function () {
  YoutubePlayer.initPlayer();
  YoutubePlayer.resizePlayer();
});

var YoutubePlayer = (function() {

  function initPlayer() {
    $("#player").tubeplayer({
      allowFullScreen: "true",
      width: getWidth(),
      //initialVideo: model.tracks[0].videoId,
      preferredQuality: "large",
      theme: "light",
      color: "white",
      onPlayerEnded: function() {
        $(".next").trigger("click");
      }
    });
  }

  function playVideo(videoId) {
    $("#player").tubeplayer("play", videoId);
  }

  function resizePlayer() {
    $(window).resize(function () {
      $("#player").tubeplayer('size', {
        width: getWidth(),
        height: getWidth()*0.56
      });
    });
  }

  function getWidth () {
    return $("#player-container").width();
  }

  return {
    initPlayer: initPlayer,
    playVideo: playVideo,
    resizePlayer: resizePlayer
  };

})();
