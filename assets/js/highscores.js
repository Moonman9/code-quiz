// function to post highscores on highscore doc
function displayScores() {
    //locates highscore array on local storage to onbtain highscores from previous attempts
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
    // sorts scores from high value to low
    highscores.sort(function(a,b)
    {
        return b.score - a.score;
    });
    // creates a li tag in the organized list on the highscore.html
    // organizes by initial - score
    highscores.forEach(function(score) {
        var liTag = document.createElement('li');
        liTag.textContent = score.initials + " - " + score.score;
        var olEl = document.getElementById('highscore-list');
        olEl.appendChild(liTag);
    });
}
// clears highscores local storage and refreshes it
function deleteScores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}
// fires delteSxcore function on click of clear scores button
document.getElementById('clear-btn').onclick = deleteScores;
// fires displayscores 
displayScores();