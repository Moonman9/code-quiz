// DOM elements to connect actions with html document to be viewed
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var optionsEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-btn");
var startBtn = document.querySelector("#start-btn");
var initialsEl = document.querySelector("#initials");
var bodyEl = document.querySelector("#body");
var currentQuestionIndex = 0;
var time = 150;
var timerId;

//at startGame function hides intro screen and reveals question container
function startGame() {
  var introScreen = document.getElementById("intro-container");
  introScreen.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");

  // start timer for every second sets time to  timer DOM
  timerId = setInterval(countDown, 1000);
  timerEl.textContent = time;

  // starts questions function
  getQuestions();
}
//function to pull questions in order 
//sets question to dom element in order
// creates buttons with number value for all the possible answers
function getQuestions() 
{
  var currentQuestion = questions[currentQuestionIndex];
  var questionEl = document.getElementById("question");
  questionEl.textContent = currentQuestion.title;
  optionsEl.innerHTML = "";
  currentQuestion.options.forEach(function(choice, i) 
  {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = answerClick;
    optionsEl.appendChild(choiceNode);
  });
}
//check answer for penalty and informs by changing body color  
function answerClick()
{
  if (this.value !== questions[currentQuestionIndex].answer) 
  {
    time -= 15;
    if (time < 0) 
    {
      time = 0;
    }
    timerEl.textContent = time;
    bodyEl.setAttribute('class', 'incorrect')
  } else 
  {
    bodyEl.setAttribute('class', 'correct')
  }
  // makes body original color after a second
  setTimeout(function() 
  {
    bodyEl.removeAttribute('class');
  }, 1000);
  currentQuestionIndex++;
  //ends the game if there are no more questions
  if (currentQuestionIndex === questions.length) 
  {
    endGame();
  } else 
  {
    getQuestions();
  }
}
//countdoun clock by 1 and making sure there is still time left on the clock or end the game
function countDown() 
{
  time--;
  timerEl.textContent = time;
  if (time <= 0) 
  {
    endGame();
  }
}
//game ending by hidiung question contianer and conjuring the end container for initials.
// sets score to the remaing time left
function endGame()
{
  clearInterval(timerId);
  var endScreen = document.getElementById('end-container');
  endScreen.removeAttribute('class');
  var scoreEl = document.getElementById('score');
  scoreEl.textContent = time;
  questionsEl.setAttribute('class', 'hide');
}
//save highscore and attach to initials in local storage in highscores to be called
function saveHighscore() 
{
    var initials = initialsEl.value.trim();
    if (initials !== "") ``
    {
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
        var newScore = {
        score: time,
        initials: initials
    }; 
    highscores.push(newScore);
    //local storage
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    ;//transition to highscore page
    window.location.href = "highscore.html"
  }
}
//enter key event to save the highscore
function validEntry(event) 
{
  if (event.key === 'Enter') 
  {
    saveHighscore();
  }
}
// submit button click fires savehighscore function
submitBtn.onclick = saveHighscore;
// start button click event initiates the startgame function
startBtn.onclick = startGame;
// fires  valid entry function on the initials button release
initialsEl.onkeyup = validEntry;