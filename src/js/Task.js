import dictionary from './tasks.json'

class Task {
    constructor(number, text, answers){
        this.answer = null;
        this.number = null;
        this.text = text;
        this.answers = answers;
        this.dictionary = dictionary;
        this.userAnswer = null;
        console.log(this.dictionary);
        this.rightAnswersArray = null;
        
        document.getElementById('add_answer').addEventListener('click', this.checkAnswer(this.dictionary))
    }
    
    createTask(number){
        console.log('df');
        document.getElementById('question').innerHTML = this.dictionary.d[number].word;
        this.number = number;
    }

    checkAnswer(dict){
        console.log(this.dict, this.number);
        this.rightAnswersArray = dict.d[0].translation;
        let that = this;
        (event) => {
            this.userAnswer = document.getElementById('answer_input').innerHTML;
            for (let i = 0; i <= that.rightAnswersArray.lengt; i++){
                if (that.userAnswer == this.rightAnswersArray[i]){
                    console.log('Super', that.userAnswer);
                }
            }
        }
    }
    

}

export default Task;