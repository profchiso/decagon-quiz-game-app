$(document).ready(function(){

    pullQuestions();
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

});