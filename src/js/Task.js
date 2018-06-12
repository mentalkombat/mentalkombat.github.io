import dictionary from './tasks.json'

class Task {
    constructor(number, text, answers){
        this.answer = null;
        this.number = null;
        this.text = text;
        this.answers = answers;
        this.dict = dictionary;
        this.userAnswer = null;
        this.rightAnswersArray = null;
        document.getElementById('add_answer').addEventListener('click', function(){
            this.checkAnswer(this.dict);
        }.bind(this)
    )
    }
    
    createTask(number){
        document.getElementById('question').innerHTML = this.dict.d[number].word;
        this.number = number;
        console.log('task created');
    }

    checkAnswer(dict){
        console.log(dict, this.number);
        this.rightAnswersArray = dict.d[0].translation;
        this.userAnswer = document.getElementById('gamer_answer').value;
        for (let i = 0; i <= this.rightAnswersArray.length - 1; i++){
            if (this.userAnswer == this.rightAnswersArray[i]){
                console.log('Super', this.userAnswer);
            }
        }
    }
}

export default Task;