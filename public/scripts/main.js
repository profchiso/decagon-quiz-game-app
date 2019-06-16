$(document).ready(function(){
    var today= new Date;
    $("#date-display").text(today.getFullYear());


//function to add user to database
    $('#reg-form-btn').click(function(){
        var email=$('#email').val();
        var userName=$('#player-name').val();
        var password=$('#password').val();

        if(email!="" && userName!="" && password!="" ){
            $.ajax({
                url: 'http://localhost:3000/users',
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify( { "player-name": userName, "email": email, "password":password } ),
                success: function(){
                    var sms="  your registration is successful";
                   alert(userName +sms );
                   window.location.assign("http://localhost:3000/../index.html");
                },
                error: function(){
                    alert('Error Submitting your data');
                }
            });
        }else{
            alert("All filleds are Required")
        }
    });
    //end of function to register user




})