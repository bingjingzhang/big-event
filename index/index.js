// ----------------------------------------------------请求个人信息

// 默认状态：头像和文字图样是不显示的；
// 加载后，开始请求用户数据；
// 获取到用户数据后：
// - 名字：如果有用户昵称，则设置昵称（未来会有昵称设置！），不然显示用户名；
// - 头像：如果有头像，显示头像；不然显示名字的首字符；

$.ajax({
    url: "http://ajax.frontend.itheima.net/my/userinfo",
    // 设置请求头：
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
    success: function(res) {
      console.log(res);

      if (res.status == 0) {
        // 名称：有昵称就昵称、不然就是用户名；
        var name = res.data.nickname || res.data.username;
        $(".username").text(name);
  
        // 测试代码：
        // res.data.user_pic = undefined;
        // name = "aaa";
  
        // 头像：如果有头像数据
        if (res.data.user_pic) {
          // 
          $(".layui-nav-img").show().attr("src", res.data.user_pic);
          $(".avatar").hide();
        }
        // 测试：没有头像数据的时候
        else {
          // 截取name名字上第一个字符；
          var t = name.substr(0, 1);
          // 英文字符：小写变为大写：字符串.toUpperCase()
          t = t.toUpperCase();
  
          // show:会让元素变为行内元素；
          $(".avatar").show().css("display", "inline-block").text(t);
          $(".layui-nav-img").hide()
        }
  
      }
    }
  })
  $('#logout').click(function () {
    // 弹出层，询问是否要退出
    layer.confirm('你确定退出吗？你退出了还得登录，你想好了吗？', function (index) {

        // 如果点击了确定，删除token，页面跳转
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index); // 关闭当前弹出层
    });
});
  