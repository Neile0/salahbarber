$(document).ready(function(){
    $("#staff-login-btn").click(function(){
        var username = $("#staff-login-username").val().trim();
        var password = $("#staff-login-pwd").val().trim();

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
                    $("#staff-login-msg").html(msg);
                }
            });
        }
    });
});