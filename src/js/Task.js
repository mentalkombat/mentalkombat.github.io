import dictionary from './tasks.json'

class Task {
    constructor(number) {
        this.answer = null;
        this.number = number;
        this.dict = dictionary;
        this.userAnswer = null;
        this.rightAnswersArray = null;
    }

    createTask(number) {
        document.getElementById('question').innerHTML = this.dict.d[number].word;
        this.number = number;
        console.log('task created');
    }

    checkAnswer() {
        console.log(this.dict, this.number);
        this.rightAnswersArray = this.dict.d[this.number].translation;
        this.userAnswer = document.getElementById('gamer_answer').value.toLowerCase();
        console.log(this.rightAnswersArray, this.userAnswer);
        for (let i = 0; i <= this.rightAnswersArray.length - 1; i++) {
            if (this.userAnswer == this.rightAnswersArray[i]) {
                console.log('Super', this.userAnswer);
                document.getElementById('gamer_answer').value = '';
                return true;
            } else {
                alert("it's wrong");
            }
        }
    }
}

export default Task;