var win_w = $(window).width(); //获取宽度
var win_h = $(window).height(); //获取高度
console.log(win_w, win_h);
// 获取验证码，页面加载显示验证码信息
var changecode = 0;
$(".vercode").click(function() {
    changecode++;
    console.log(this.src);
    this.src = "http://192.168.0.106:8080/car-management/user/code.action?changecode=" + changecode;
    // this.src = "/car-management/user/code.action?changecode=" + changecode;
})

var pass = document.getElementsByClassName("pass_input")[0];
var users = {};
var successUser = {};
$(document).ready(function() {
    // 获取 localStoage 的userinfo信息
    var local_user = window.localStorage.getItem("userinfo");
    local_user = JSON.parse(local_user);
    console.log(local_user);
    if (local_user != null) {
        $(".pass_input").val(local_user.pass);
        $(".user_input").val(local_user.name);
    }
    // 密码是否可见
    var flag = false;

    function LoginAjax() {
        // 登录
        $.ajax({
            // url: "/car-management/user/login.action",
            url: "http://192.168.0.106:8080/car-management/user/login.action",
            type: "get",
            data: {
                username: $(".user_input").val(),
                password: $(".pass_input").val(),
                verifyCode: $(".vercode_input").val()
            },
            dataType: "jsonp", //数据类型为jsonp  
            jsonp: "jsonpCallback", //服务端用于接收callback调用的function名的参数  
            success: function(data) {
                // var date = JSON.stringify(data);
                console.log(data);
                if (data.ret == false) {
                    $(".logininfo_group").html(data.msg);
                    successUser.flag = false;
                } else {
                    $(".logininfo_group").html(data.msg);
                    successUser.flag = true;
                    window.localStorage.successUser = JSON.stringify(data);
                    window.location.href = "../index.html";
                }
            }
        })
    }
    // 点击登录按钮进行判断
    $(".login_btn").click(function() {
        LoginAjax();
    });
    //回车提交事件
    $("body").keydown(function() {
        if (event.keyCode == "13") { //keyCode=13是回车键
            console.log(this);
            LoginAjax();
        }
    });
    $("#rember").prop("checked") == false;
    // 选择下次自动登陆。存入localStorage;
    var motionLogin = document.getElementsByName("autologin")[0];
    console.log(motionLogin);
    console.log(motionLogin.checked);
    motionLogin.onclick = function() {
        if (motionLogin.checked) {
            console.log(true);
            users.name = $(".user_input").val();
            users.pass = $(".pass_input").val();
            // users.pass = $.md5($(".pass_input").val());
            console.log(users);
            // localStorage只支持string类型的存储。
            window.localStorage.userinfo = JSON.stringify(users);
        } else {
            console.log(false);
            window.localStorage.removeItem("userinfo");
        }
    }
})