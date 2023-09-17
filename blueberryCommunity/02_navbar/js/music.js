$(function () {
  //music player
  function playMusic() {
    // get audio tag, not jquery object
    var audio = $("#audio")[0];
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  // playing time
  var playTimer = null;
  playTimer = setInterval(function () {
    if (audio.paused) {
      clearInterval(playTimer);
    }
    // get current playing time
    var playTimer_c = audio.currentTime;
    var mTime = parseInt(playTimer_c / 60);
    var sTime = parseInt(playTimer_c % 60);

    // get total duration
    var duration = audio.duration;
    var mduration = parseInt(duration / 60);
    var sduration = parseInt(duration % 60);

    function checkTime(m, s) {
      if (m < 10) {
        m = "0" + m;
      } else {
        m += "";
      }

      if (s < 10) {
        s = "0" + s;
      } else {
        s += "";
      }
      return m + ":" + s;
    }

    var pagePassTime = checkTime(mTime, sTime);
    var pageTotalTime = checkTime(mduration, sduration);

    $("#time").html(pagePassTime);
    $("#duration").html(pageTotalTime);

    // progress bar
    var progressbarPercent = playTimer_c / duration;
    if (duration - playTimer_c > 0) {
      $(".running-bar").width(progressbarPercent * 100 + "%");
    } else {
      $(".running-bar").width(0 + "%");
    }
  }, 1000);

  $("#playBtn").on("click", function () {
    playMusic();
  });

  // get data - article content
  $.ajax({
    type: "get",
    url: "http://localhost/blueberryserver/page_yuezhang.php",
    success: function (data) {
      data = JSON.parse(data);
      $(".title-h3").html(data.article.article_title);
      // $(".title-img").html(data.article.image_path);
      $(".blog-details-content").html(decodeURI(data.article.article_content));
    },
  });

  // get data - related reading
  $.ajax({
    type: "get",
    url: "http://localhost/blueberryserver/index_relatedRead.php",
    success: function (data) {
      data = JSON.parse(data);

      $(data.readList).map(function (index, item) {
        $(".related-reading-contente").append(`
          <div class="related-show">
            <a href="#">
                <img class="related-pic" src="${item.img}" alt="">
                <p class="related-text">${item.title}</p>      
            </a>
          </div>`);
      });
    },
  });
});
