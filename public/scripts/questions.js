let counter = 0;
let total = 0;
let correct = [];
let wrong = [];

$(document).ready(function(){
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:3000/questions', true);
    xhr.onload = function() {
        if(this.status == 200){
            
            var questions = JSON.parse(this.responseText);
            var output = '';
           
            for (var i in questions){
                total++;
                output += 
                `<div>
                <p><b style="color:blue">${questions[i].id}</b>&nbsp;&nbsp;${questions[i].question}</p>

                <p id="question${questions[i].id}A"><input type="radio" value="A" name="${questions[i].id}"  onclick='ProcessQuestion("${questions[i].answer}","A","question${questions[i].id}A");'> &nbsp; ${questions[i].optionA}</p>
                <p id="question${questions[i].id}B"><input type="radio" value="B" name="${questions[i].id}"  onclick='ProcessQuestion("${questions[i].answer}","B","question${questions[i].id}B");'> &nbsp; ${questions[i].optionB}</p>
                <p id="question${questions[i].id}C"><input type="radio" value="C" name="${questions[i].id}"  onclick='ProcessQuestion("${questions[i].answer}","C","question${questions[i].id}C");'> &nbsp; ${questions[i].optionC}</p>
                <p id="question${questions[i].id}D"><input type="radio" value="D" name="${questions[i].id}"  onclick='ProcessQuestion("${questions[i].answer}","D", "question${questions[i].id}D");'> &nbsp; ${questions[i].optionD}</p>
            </div>
            `
        }
    
            document.getElementById('quiz-questions').innerHTML = output;
        }
        

    }
    xhr.send();


    $('#submit-answers-btn').on('click', function(){
        let msg = `You scored ${counter} out of ${total} questions`;
        $('#display-answer').html('Score : ' + msg);

        correct.forEach(element => {
            console.log(element);
        });
    });

    $("#submit-answers-bt").click(function(){
        xhr.open('GET', 'http://localhost:3000/questions', true);
        xhr.onload = function() {
            if(this.status == 200){
                var questions = JSON.parse(this.responseText);
        
                var output = '';
                
               // var opt;
               
                for (var i in questions){
                   // var opt=$(`<input type="radio" value="A" name="`+questions[i].id+` checked">`);
                   //var t= questions[i].id;
                   var opt=$('input:radio[name=`+questions[i].id+`]:checked');
                   var answerCount=0;
                   console.log(opt);
                    
                    if(questions[i].answer==opt.val()){
                        answerCount=answerCount+1;
                    }
                    output =answerCount; 
                
            
                }
        
                document.getElementById('display-answer').innerHTML = output;
            }
        }
        xhr.send();

    });

});

function ProcessQuestion(answer, selected, field){
    if(answer === selected){
        counter++;
        correct.push(field);
    }else{
        wrong.push(field);
    }
        
}