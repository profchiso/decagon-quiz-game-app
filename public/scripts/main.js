$(document).ready(function(){
    var today= new Date;
    $("#date-display").text(today.getFullYear());

    //scrpit to pull out questions from the database to the actions page


    // End of scrpit to pull out questions from the database to the actions page




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

    //function to add question to database
    $('#add-question-btn').click(function(){
        var question=$('#question').val();
        var optionA=$('#A').val().toUpperCase();
        var optionB=$('#B').val().toUpperCase();
        var optionC=$('#C').val().toUpperCase();
        var optionD=$('#D').val().toUpperCase();
        var answer=$('#answer').val().toUpperCase();

        if(question="" && optionA!="" && optionB!="" && optionC!="" && optionD!="" && answer!="" ){
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
            alert("All filleds are Required")
        }
    });
    //end of function to add question




})