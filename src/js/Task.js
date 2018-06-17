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
    }

    createTask(currentTaskGroup, number) {
        switch (currentTaskGroup) {
            case "listening" :
                let audio = document.createElement("audio");

                audio.src = `audio/task/${this.dict[currentTaskGroup][number].task}`;
                this.question.appendChild(audio);
                setTimeout(() => {
                    audio.play();
                }, 600);
                let playAudioBtn = document.createElement("button");
                playAudioBtn.className = "playAudio";
                this.question.appendChild(playAudioBtn);
                let playerImg = this.resources.get('speaker.png');
                document.querySelector("#question .playAudio").appendChild(playerImg);
                

                break;

            case "pictures" :
                let img = this.resources.get(this.dict[currentTaskGroup][number].task);
                this.question.appendChild(img);
                break;

            default:
                this.question.innerHTML = this.dict[currentTaskGroup][number].task;
        }
        this.number = number;
    }

    checkAnswer(currentTaskGroup) {
        this.rightAnswersArray = this.dict[currentTaskGroup][this.number].answer;
        this.userAnswer = this.answer.value.toLowerCase();
        if (this.rightAnswersArray.indexOf(this.userAnswer) > -1) {
            this.answer.value = '';
            return true;
        } else {
            this.answer.value = '';
            alert("it's wrong");
        };
        
    }
}

export default Task;