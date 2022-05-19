$(function () {
    // 点击切换效果
    $("#link_reg").click(() => {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $("#link_login").click(() => {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    // 获取form
    const form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/ , '密码必须6到12位，且不能出现空格'],
        // 定义确认密码规则
        repwd:(val) =>{
            const pwd = $('.reg-box [name=password]').val();
            if(val !== pwd) return "两次密码不一致!";
        },
    })
   // 获取 layui 弹窗
const layer = layui.layer;
// 设置请求根路径
const baseUrl = "http://www.liulongbin.top:3007";
    // 监听注册提交表单，发送注册请求
    $("#form_reg").on("submit",function(e){
        // （e）阻止form 默认提交行为
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data:{
                username:$("#form_reg [name=username]").val(),
                password:$("#form_reg [name=password]").val(),
            },
            success:(res) =>{
                if(res.status !== 0) return layer.msg("注册失败！");
                layer.msg("注册成功!");
                $("#link_login").click();
            }

        })
    })
    // 监听登录提交表单，发送登录请求
    $("#form_login").on("submit",function(e){
        // （e）阻止form 默认提交行为
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data:
               $(this).serialize(),
            
            success:(res) =>{
                if(res.status !== 0) return layer.msg("登录失败！");
                console.log(res);
                layer.msg("登录成功!");
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem("token", res.token);
            // 跳转到主页
            location.href = "/index.html";
               
            }

        })
    })
})