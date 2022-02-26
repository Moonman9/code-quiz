var startbtn = document.querySelector('#start-btn');
var introScreen = document.querySelector('#intro-container');
var questions = document.querySelector('#questions');
var timerEl = document.querySelector('#time');
var endScreen = document.querySelector('#end-container');
var finalScore = document.querySelector('#score');
var options = document.querySelector('#answers');
var body = document.querySelector('#body');
var timerId;
var time = 120;

function startGame() {
    //change from intro container to questions container
    introScreen.setAttribute('class', 'hide');
    questions.removeAttribute('class','hide');

    // start timer
    timerId = setInterval(countdown, 1000);
    timerEl.textContent = time;

    // get questions
    getQuestions();
}
// pull questions from array
function getQuestions() {
    var currentQuestion = questions[currentQuestionIndex];
    var questionTitle = document.querySelector('#question');
    questionTitle.textContent = currentQuestion.title;
    options.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceList = document.createElement('button');
        choiceList.setAttribute('class', 'choice');
        choiceList.setAttribute('value', choice);
        choiceList.textContent = i + 1 + ". " + choice;
        choiceList.onclick = questionClick;
        options.appendChild(choiceList);
    });
}
// checks answer and subtracts time preventing it from going below zero
function questionClick () {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        body.setAttribute('class', 'incorrect');
    } else {
        body.setAttribute('class', 'correct');
    }
    setTimeout(function() {
        body.removeAttribute('class');
    }, 1000);
    currentQuestionIndex++;
    // ende game if no more questions or gets a new question
    if (currentQuestionIndex === questions.length) {
        gameEnd();
    } else {
        getQuestions();
    }
}

// check to see if time is eligible and counts down on timer 
function countdown() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endGame();
    }
}
// function to end the game if completed or time reached 0
function endGame() {
    clearInterval(timerId);
    questions.setAttribute('class', 'hide')
    endScreen.removeAttribute('class');
    finalScore.textContent = time;
}

startbtn.onclick = startGame;