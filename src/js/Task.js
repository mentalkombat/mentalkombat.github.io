import dictionary from './tasks.json'

class Task {
    constructor(resources, question) {
        this.number = null;
        this.resources = resources;
        this.dict = dictionary;
        this.userAnswer = null;
        this.rightAnswersArray = null;
        this.question = question;
        this.answer = document.getElementById('gamer_answer');
        this.sortable = document.querySelector("#sortable");
    }

    createTask(currentTaskGroup, number) {
        document.querySelector('#description').innerText = this.dict[currentTaskGroup]["description"];
        switch (currentTaskGroup) {
            case "listening":
                let audio = document.createElement("audio");
                audio.src = `dist/audio/task/${this.dict[currentTaskGroup]["tasks"][number].task}`;
                this.question.appendChild(audio);
                setTimeout(() => {
                    audio.play();
                }, 600);
                let playAudioBtn = document.createElement("button");
                playAudioBtn.className = "playAudio";
                this.question.appendChild(playAudioBtn);
                let playerImg = this.resources.get('speaker.png');
                document.querySelector("#question .playAudio").appendChild(playerImg);
                document.querySelector("#question .playAudio").addEventListener("click", () => {
                    document.querySelector("#question audio").play();
                });
                break;

            case "differences":
            case "cubs":
            case "colors":
            case "pictures":
                let img = this.resources.get(this.dict[currentTaskGroup]["tasks"][number].task);
                this.question.appendChild(img);
                break;

            case "draganddrop":
                const word = this.dict[currentTaskGroup]["tasks"][number];
                const letters = word.split('');
                const wordLength = letters.length;
                this.answer.style.display = 'none';
                this.sortable.style.display = 'block';
                let randomLetters = [];
                let addedLettersIndices = [];
                for (let i = 0; i < wordLength; i++){
                    let randomIndex = Math.floor(Math.random() * wordLength);
                    if(addedLettersIndices.indexOf(randomIndex) === -1){
                        let sortable = document.createElement("span");
                        sortable.innerHTML = letters[randomIndex];
                        this.sortable.appendChild(sortable);
                        randomLetters.push(letters[randomIndex]);
                        addedLettersIndices.push(randomIndex);
                    } else {
                        i--;
                    }
                };
                break;

            case "time":
                this.question.appendChild(this.resources.get(this.dict[currentTaskGroup]["tasks"][number].task));
                document.getElementById('task_time_inputs').style.display = 'block';
                document.getElementById("time_answer_hours").focus();
                document.getElementById('gamer_answer').style.display = 'none';
                break;

            default:
                this.question.innerHTML = this.dict[currentTaskGroup]["tasks"][number].task;
        }
        this.number = number;
    }

    checkAnswer(currentTaskGroup) {
        switch (currentTaskGroup) {
            case "draganddrop":
                const word = this.dict[currentTaskGroup]["tasks"][this.number];
                const wordLength = word.length;
                let isAnswerCorrect = true;

                for(let i = 1; i <= wordLength; i++ ){
                    if (word[i - 1] !== document.querySelector(`#sortable span:nth-child(${i})`).innerHTML) {
                        isAnswerCorrect = false
                    }
                };
                this.answer.value = '';
                this.clearSortable(wordLength);
                return isAnswerCorrect;

            case "time":
                this.rightAnswersArray = this.dict[currentTaskGroup]["tasks"][this.number].answer;
                let hours = document.getElementById('time_answer_hours').value;
                let minutes = document.getElementById('time_answer_minutes').value;
                for (let i = 0; i < this.rightAnswersArray.length; i++) {
                    if (+hours === +this.rightAnswersArray[i][0] && +minutes === +this.rightAnswersArray[i][1]) {
                        return true;
                    }
                }
                return false;

            default:
                this.rightAnswersArray = this.dict[currentTaskGroup]["tasks"][this.number].answer;
                this.userAnswer = this.answer.value.toLowerCase();
                if (this.rightAnswersArray.indexOf(this.userAnswer) > -1) {
                    this.answer.value = '';
                    return true;
                } else {
                    this.answer.value = '';
                    return false;
                }
        }
    }

    clearSortable(length){
        for(let i = 1; i <= length; i++ ){
            let span = document.querySelector(`#sortable span:nth-child(1)`);
            document.querySelector(`#sortable`).removeChild(span);
        };
    }
}

export default Task;