$(function () {
  $(".nav li").on("click", function () {
    $(this).addClass("on").siblings().removeClass("on");
    $(this).css({ backgroundColor: "white" });
  });
});
