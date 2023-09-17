$(function () {
  var btns = $(".login-reg-select a");
  var box = $(".account-box");
  btns.map(function (index, element) {
    (function () {
      $(element).on("click", function () {
        $(this).addClass("go").siblings().removeClass("go");
        $(box[index]).addClass("go").siblings().removeClass("go");
      });
    })(index);
  });

  // login
  $("#login-btn").click(function () {
    //get username and pwd
    var username = $("#login_account").val();
    var password = $("#login_pwd").val();
    if (username && password) {
      $.ajax({
        type: "POST",
        url: "http://localhost/blueberryserver/login.php",
        data: {
          username: username,
          password: password,
        },

        success: function (data) {
          data = JSON.parse(data);
          // store the data in local
          localStorage.setItem("username", data[0].username);
          if (data) {
            //back to main page
            window.location.href = "index.html";
          }
        },
      });
    } else {
      alert("please enter your username and password");
    }
  });

  // sign up
  $("#reg-btn").click(function () {
    var username = $("#reg_account").val();
    var password = $("#reg_pwd").val();
    $.ajax({
      type: "POST",
      url: "http://localhost/blueberryserver/register.php",
      data: {
        username: username,
        password: password,
      },
      success: function (data) {
        data = JSON.parse(data);
        alert(data.msg);
      },
    });
  });
});
