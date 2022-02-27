// DOM elements
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

//transitions
function startGame() {
  var introScreen = document.getElementById("intro-container");
  introScreen.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");

  // start timer
  timerId = setInterval(countDown, 1000);
  timerEl.textContent = time;

  getQuestions();
}
//pull questions for list
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
//check answer for penalty and informs
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
  setTimeout(function() 
  {
    bodyEl.removeAttribute('class');
  }, 1000);
  currentQuestionIndex++;
  //ends game if no more questions
  if (currentQuestionIndex === questions.length) 
  {
    endGame();
  } else 
  {
    getQuestions();
  }
}
//check clock and eligebility
function countDown() 
{
  time--;
  timerEl.textContent = time;
  if (time <= 0) 
  {
    endGame();
  }
}
//game ending features
function endGame() 
{
  clearInterval(timerId);
  var endScreen = document.getElementById("end-container");
  endScreen.removeAttribute("class");
  var scoreEl = document.getElementById("score");
  scoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}
//save highscore and attach to initials 
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
    window.localStorage.setItem("highscores", JSON.stringify(highscores));//local storage
    window.location.href = "highscore.html";//transition to highscore page
  }
}
//enter to save
function validEntry(event) 
{
  if (event.key === "Enter") 
  {
    saveHighscore();
  }
}
// save initials
submitBtn.onclick = saveHighscore;
// initiate game
startBtn.onclick = startGame;
initialsEl.onkeyup = validEntry;