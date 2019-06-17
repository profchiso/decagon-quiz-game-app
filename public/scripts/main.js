$(document).ready(function(){
    var today= new Date;
    var xhr = new XMLHttpRequest();
    $('#msg-div').hide();
    $("#date-display").text(today.getFullYear());
 
    $('#reg-form-btn').click(function(){
       addUser(); 
    });
    $('#add-question-btn').click(function(){
        addQuestion();   
    });
    $("#login-btn").click(function(){
        login();
    });
//function to add user to database
    function addUser(){
        var email=$('#email').val();
        var userName=$('#player-name').val();
        var password=$('#password').val();
        var emailRegExp = /\S+@\S+\.\S+/;
        if(userName=="" ){
            alert("Name  required") 
        }else if(email==""){
            alert('Email address required');
        }else if(password==""){
            alert('password required');

         }//else if(email!==emailRegExp){
        //     alert('Email address entered not valid ');
        // }
        else{

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
        }
    }
//end of function to add user 
//function to pull out questions from the database to the actions page
  
    
//function to add question to database
    function addQuestion(){
        var question=$('#question').val();
        var optionA=$('#A').val().toUpperCase();
        var optionB=$('#B').val().toUpperCase();
        var optionC=$('#C').val().toUpperCase();
        var optionD=$('#D').val().toUpperCase();
        var answer=$('#answer').val().toUpperCase();

        if(question != "" && optionA != "" && optionB != "" && optionC != "" && optionD !="" && answer !="" ){

            if(answer=='A' || answer=='B'  || answer=='C' || answer=='D'){
                $.ajax({
                    url: 'http://localhost:3000/questions',
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify( { "question": question, "optionA": optionA, "optionB":optionB , "optionC":optionC , "optionD":optionD, "answer":answer } ),
                    success: function(){
                        var sms=" Question is successfully added";
                         alert(sms );
                        window.location.assign("http://localhost:3000/pages/actions.html");
                             },
                   error: function(){
                         alert('Error Submitting your question');
                        }
                });
            }else{
                alert('Only letter A,B,C,D are allowed in the answer field');
            }
        }else{
            alert("All filleds are Required")
        }
    }
//end of function to add question
//function login
 function login(){
    var xhr = new XMLHttpRequest();
    var username=$('#login-email').val();
    var password=$('#login-password').val(); 
    if(username==""){
        alert('Email required');
    }else if(password==""){
        alert('password required');
    }else{
    xhr.open('GET', 'http://localhost:3000/users', true);
    xhr.onload = function() {
        if(this.status == 200){
            var users = JSON.parse(this.responseText);
            for (var i in users){
                if(users[i].email==username && users[i].password==password){
                    window.location.assign("http://localhost:3000/pages/quiz.html");
                
             }else{
                $('#msg-div').show();
                $("#login-msg").text("Incorrect username and password combination");
                $("#msg-div").show().fadeOut(4000);

            }
        }
        }
    }
    xhr.send();
}
}
//end of function login
})