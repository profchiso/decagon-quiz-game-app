$(document).ready(function(){
    var today= new Date;
    var xhr = new XMLHttpRequest();
    $("#date-display").text(today.getFullYear());
    pullQuestions();

    //scrpit to pull out questions from the database to the actions page
   function pullQuestions(){
    xhr.open('GET', 'http://localhost:3000/questions', true);
    xhr.onload = function() {
        if(this.status == 200){
            var questions = JSON.parse(this.responseText);
    
            var output = '';
            for (var i in questions){
                output += 
                `<tr>
                <td>`+questions[i].id+`</td>
                <td>`+questions[i].question+`</td>
                <td>`+questions[i].optionA+`</td>
                <td>`+questions[i].optionB+`</td>
                <td>`+questions[i].optionC+`</td>
                <td>`+questions[i].optionD+`</td>
                <td>`+questions[i].answer+`</td>
                <form>
                <td><button type="button" class="btn btn-primary btn-xs" id="update-question-btn" name="update-question-btn">Update</button>
                <button type="button" class="btn btn-danger btn-xs" id="delete-question-btn" name="delete-question-btn">Delete</button>
                </td>
                </form>
                
            </tr>
            `
            }
            document.getElementById('populate').innerHTML = output;
        }
    }
    xhr.send();
} 
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