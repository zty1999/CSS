'use strict';
$('#submit').click(function () {
    let note = $("input").val();
    let username = $('.login-user').val();
    let password = $('.login-psd').val();
    console.log(typeof username);
    console.log(typeof password);
    if ((username === '' || username === null) || (password === '' || password === null)){
        $('p').text('请输入账号和密码');
    }else{
        $.ajax({//默认情况下，Ajax 请求使用 GET 方法。如果要使用 POST 方法，可以设定 type 参数值。这个选项也会影响 data 选项中的内容如何发送到服务器。
            type:"Post",//请求方式（post或get，默认为get）；注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。
            url:"carrots-admin-ajax/a/login",//默认值: 当前页地址。发送请求的地址。(请求地址：Post /a/login)；carrots-admin-ajax这里代表着http://dev.admin.carrots.ptteng.com，因为在nginx里配置过。
            contentType: 'application/x-www-form-urlencoded',//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。
            data:{//发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。
                name: username,//参数name和pwd是根据任务要求上后台借口参数。一致才能真确传输。
                pwd: password,
            },
            success:function (data) {//请求成功后的回调函数。参数data：由服务器返回，并根据 dataType 参数进行处理后的数据；
                console.log(data);
                console.log(data.message);//打印传输回来的数据（对象）内容。可以发现有（属性）code：-5003对应用户不存在；code：-5004对应密码错误
                let json= JSON.parse(data);
                console.log(json);
                console.log(json.code);
                if (username === "admin" && password === "123456" ) {
                    window.location.assign("home-page.html");
                    console.log(json.message);
                }else if (json.code === -5004){//当code：-5004对应密码错误
                    $('p').text(json.message)
                } else if(json.code === -5003){//当code：-5003对应用户不存在
                        $('p').text(json.message)

                }else {
                    console.log(json.code)
                }
            }
        })
    }

});

//原生写法
// let account = new XMLHttpRequest();
// account.open('GET', 'home-page.html', true);//若值为false则为同步请求
// account.send(null);
// account.onreadystatechange = function (){
//     if (account.readyState === 4){
//         if ((account.status >= 200 && account.status < 300) || account.status === 304){
//             console.log(account.responseText);
//         } else {
//             console.error('Request was unsuccessful:' + account.status);
//         }
//     }
// };
// account.onerror = function (e) {
//     console.error(account.statusText);
// };

// $.ajax({
//     url:"home-page.html",
//     type: 'GET',
//     data:('sd'),
//     dataType:'json',
//     success:function (data) {
//         $('').text(data);
//     }
// });





// open()：建立到服务器的新请求。
// send()：向服务器发送请求。
// abort()：退出当前请求。
// readyState：提供当前 HTML 的就绪状态。
// responseText：服务器返回的请求响应文本。