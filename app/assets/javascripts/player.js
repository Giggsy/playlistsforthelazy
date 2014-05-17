$(function () {
  YoutubePlayer.initPlayer();
  YoutubePlayer.resizePlayer();
  YoutubePlayer.playNext();
  YoutubePlayer.playPrev();
  YoutubePlayer.stopPlayer();
  YoutubePlayer.play();
});

var YoutubePlayer = (function() {
  var Player;

  function initPlayer() {
    Player = $("#player").tubeplayer({
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
    Player.tubeplayer("play", videoId);
  }

  function play() {
    $('body').on('click', '#play', function() {
      Player.tubeplayer('play')
    });
  }

  function stopPlayer() {
    $('body').on('click', '#stop', function() {
      Player.tubeplayer('stop')
    });
  }

  function playNext() {
    $('body').on('click', '#next', function() {
      $('.next').trigger('click') 
    });
  }

  function playPrev() {
    $('body').on('click', '#prev', function() {
      $('.previous').trigger('click') 
    });
  }

  function resizePlayer() {
    $(window).resize(function () {
      Player.tubeplayer('size', {
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
    resizePlayer: resizePlayer,
    playNext: playNext,
    playPrev: playPrev,
    stopPlayer: stopPlayer,
    play: play
  };

})();
