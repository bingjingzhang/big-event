// 首先对右下角的切换注册点击事件，点击就切换，把登陆的隐藏，注册的显示，反之

$("#goto-register").on("click",function () {
  $("#login").hide();
  $("#register").show();
});
$("#goto-login").on("click",function () {
  $("#login").show();
  $("#register").hide();
});


// 注册------------------------------
 $("#register .layui-form").on("submit",function (e) {
   e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
url:"http://ajax.frontend.itheima.net/api/reguser",
type:"post",
data:data,
success:function (res) {
// console.log(res);
// 看接口文档，当status==0，message显示注册成功
  layer.msg(res.message);
  if (res.status==0) {
    $("#login").show();
  $("#register").hide();
  }
  // 需要清一下表里内容
  $(".layui-form")[0].reset()
}
  })
 })



 // 需求：注册验证---------------------------------------------------
//    1. 用户名、密码、重复密码不能为空
//    2. 密码、重复密码长度 6~12 位，且不能出现空格、非空格类字符；  \S
//    3. 密码和重复密码必须一致
var form = layui.form;
form.verify({
  changdu:[/^\S{6,12}$/,"长度必须为 6~12 位不能出现空格"],
  // 这里的思路是创建一个类名class =pwd，val 是要被验证的值，如果val和pwd不等那就要弹窗说不一致,same要加到重复密码后面去
same:function(val){
var pwd = $(".pwd").val();
if (pwd!==val) {
 return "两次输入的密码不一致"
}
}
})
// 登录界面----------------------------------------------
$("#login .layui-form").on("submit",function (e) {
  e.preventDefault();
   // 收集账号、密码,然后提交和服务器里面的进行对比
var data = $(this).serialize();
$.ajax({
  type:"post",
  url:"http://ajax.frontend.itheima.net/api/login",
data:data,
success:function(res){
  layer.msg(res.message);
  if (status==0) {
     // 把token保存到本地存储
     localStorage.setItem("token",res.token);
    //  密码啥的都对会形成跳转到index的页面
    location.href = "/index.html"
  }
}
})
})
