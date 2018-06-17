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
            case "listening":
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
                document.querySelector("#question .playAudio").addEventListener("click", () => {
                    document.querySelector("#question audio").play();
                }
                );
                break;

            case "pictures":
                let img = this.resources.get(this.dict[currentTaskGroup][number].task);
                this.question.appendChild(img);
                break;

            case "dragAndDrop":
                const word = this.dict[currentTaskGroup][number];
                const letters = word.split('');
                const wordLength = letters.length;
                let randomLetters = [];
                let addedLettersIndices = [];
                for (let i = 0; i < wordLength; i++){
                    let randomIndex = Math.floor(Math.random() * wordLength);
                    if(addedLettersIndices.indexOf(randomIndex) === -1){
                        let sortable = document.createElement("span");
                        sortable.innerHTML = letters[randomIndex];
                        document.querySelector("#sortable").appendChild(sortable);
                        randomLetters.push(letters[randomIndex]);
                        addedLettersIndices.push(randomIndex);
                    } else {
                        i--;
                    }
                };

                break;

            default:
                this.question.innerHTML = this.dict[currentTaskGroup][number].task;
        }
        this.number = number;
    }

    checkAnswer(currentTaskGroup) {
        if (currentTaskGroup !== "dragAndDrop") {
            this.rightAnswersArray = this.dict[currentTaskGroup][this.number].answer;
            this.userAnswer = this.answer.value.toLowerCase();
            if (this.rightAnswersArray.indexOf(this.userAnswer) > -1) {
                this.answer.value = '';
                console.log('correct');
                return true;
            } else {
                this.answer.value = '';
                console.log('incorrect');
                return false;
            };
        } else {
            document.querySelector("#sortable")
            const word = this.dict[currentTaskGroup][this.number];
            const wordLength = word.length;
            let isAnswerCorrect = true;

            for(let i = 1; i <= wordLength; i++ ){
                console.log(word[i - 1], document.querySelector(`#sortable span:nth-child(${i})`).innerHTML);
                if (word[i - 1] !== document.querySelector(`#sortable span:nth-child(${i})`).innerHTML) {
                    isAnswerCorrect = false
                }
            };
            this.answer.value = '';
            this.clearSortable(wordLength);
            return isAnswerCorrect;
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