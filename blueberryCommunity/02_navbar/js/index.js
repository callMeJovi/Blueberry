$(function () {
  var mySwiper = new Swiper(".swiper", {
    // direction:'vertical',
    loop: true,

    pagination: {
      el: ".swiper-pagination",
    },

    // navigation:{
    //     nextE1:'.swiper-button-next',
    //     prevE1:'.swiper-button-prev',
    // },

    // scrollbar:{
    //     el:'.swiper-scrollbar',
    // }
  });

  //server request
  $.ajax({
    type: "get",
    url: "http://localhost/blueberryserver/",
    success: function (data) {
      data = JSON.parse(data);
      $(".s1 h3").html(data.banner[0].title);
      $(".s2 h3").html(data.banner[1].title);
      $(".s3 h3").html(data.banner[2].title);
      $(".s1 p").html(data.banner[0].content);
      $(".s2 p").html(data.banner[1].content);
      $(".s3 p").html(data.banner[2].content);
    },
    error: function (error) {
      console.log(error);
    },
  });

  // GET the contain of chapter
  $.ajax({
    type: "get",
    url: "http://localhost/blueberryserver/index_yuezhang.php",
    success: function (data) {
      data = JSON.parse(data);
      for (var i = 0; i < data.chapter.length; i++) {
        $(".d-list").append(`
          <li class="d-item">
              <div class="item-img">
                  <a href="#">
                      <img src=${data.chapter[i].user_img} alt="">
                  </a>
              </div>
              <div class="item-text">
                  <a href="#" class="text-title">${data.chapter[i].title}</a>
                  <a href="#" class="text-author">${data.chapter[i].username}</a>
                  <p class="text-content">
                      ${data.chapter[i].desc}
                  </p>
                  <div class="comment">
                      <i class="thumbs-num">${data.chapter[i].thumbup}</i>
                      <i class="thumb-icon"></i>
                      <i class="comment-num"></i>
                      <i class="comment-icon">${data.chapter[i].comment}</i>
                  </div>
              </div>
            </li>
        `);
      }
    },
  });

  // GET the contain of travel
  $.ajax({
    type: "get",
    url: "http://localhost/blueberryserver/index_travel.php",
    success: function (data) {
      data = JSON.parse(data);
      for (var i = 0; i < data.travelogue.length; i++) {
        $(".note-list").append(`
            <li class="note">
                <a href="">
                    <img src=${data.travelogue[i].img} alt="">
                    <p class="note-title">${data.travelogue[i].title}</p>
                    <p class="note-author">${data.travelogue[i].author}</p>
                    <div class="note-description">
                        <p class="note-desc-content">${data.travelogue[i].desc}</p>
                    </div>
                </a>           
            </li>
        `);
      }
    },
  });

  // determine if user logs in
  var username = localStorage.getItem("username");
  if (username) {
    $(".login-register").html(
      `<a href="#" class="login">${username}</a><a href="#" id="logout" class="login">Logout</a>`
    );
    $("#logout").click(function () {
      localStorage.removeItem("username");
      window.location.href = "index.html";
    });
  }
});
