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
    }

    checkAnswer() {
        this.rightAnswersArray = this.dict.d[this.number].translation;
        this.userAnswer = document.getElementById('gamer_answer').value.toLowerCase();
        for (let i = 0; i <= this.rightAnswersArray.length - 1; i++) {
            if (this.userAnswer == this.rightAnswersArray[i]) {
                document.getElementById('gamer_answer').value = '';
                console.log('correct');
                return true;
            } else {
                console.log('incorrect');
                return false;
            }
        }
    }
}

export default Task;