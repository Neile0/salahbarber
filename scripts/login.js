$(document).ready(function(){
    $("#admin-login-btn").click(function(){
        var username = $("#admin-login-username").val().trim();
        var password = $("#admin-login-pwd").val().trim();

        if( username != "" && password != "" ){
            $.ajax({
                url:'/admin/processlogin.php',
                type:'post',
                data:{username:username,password:password},
                success:function(response){
                    var msg = "";
                    if(response == 1){
                        console.log("SUCCESS!");
                        window.location = "index.php";
                    }else{
                        msg = "Incorrect username or password!";
                    }
                    $("#admin-login-msg").html(msg);
                }
            });
        }
    });
});