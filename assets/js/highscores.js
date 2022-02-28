function displayScores(){
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
    highscores.sort(function(a,b)
    {
        return b.score - a.score;
    });
    highscores.highscores.forEach(score => {
        var liTag = document.createElement('li');
        liTag.textContent = score.initials + " - " + score.score;
        var olEl = document.getElementById('highscore-list');
        olEl.appendChild(liTag);
    });
}
function