const randomWords = require('random-words');
const tinyTimer = require('tiny-timer');
const timer = new tinyTimer();
var correctWords = 0;
var incorrectWords = 0;
var correctWordsLength = 0;
var incorrectWordsLength = 0;
var currentWordIndex = 0;
var gameStarted = false;
var testTime = 60000;
var elapsedTime = 0;
var userWord;
var testWord;
//On page load functions
initiateWords();

function initiateWords(){ 
    for(let i = 0; i<3; i++){
        newRow(i);
    }
}

function newRow(ind){
    for(let j = 0; j<9; j++){
        $(".row").eq(ind).append('<div class="word"><p>' + randomWords() + '</p></div>');
    }
}

$(".wordBox").on("keydown", function(event){
    if(!gameStarted){
        startTimer(testTime);
    }
    $(".word").eq(currentWordIndex).addClass("currentWord");
    if(event.key === " "){
        checkWord();
        $(".wordBox").val("");
    }
    if($(".wordBox").val().includes(" ")){
        $(".wordBox").val("");
    }
});
//During game functions

function updateCurrentWord(correct){
    $(".word").eq(currentWordIndex).removeClass("currentWord");
    if(correct){
        correctWords++;
        correctWordsLength+=testWord.length + 1;
        $(".correctWords").eq(0).text("Correct: " + correctWords);
        $(".word").eq(currentWordIndex).addClass("correctWord");
    } else {
        incorrectWords++;
        incorrectWordsLength+=testWord.length + 1;
        $(".incorrectWords").eq(0).text("Incorrect: " + incorrectWords);
        $(".word").eq(currentWordIndex).addClass("wrongWord");
    }
}
 
function updateIndex(corr){
    updateCurrentWord(corr);
    if(currentWordIndex === 17){
        currentWordIndex = 9;
        $(".row").eq(0).remove();
        $(".wordBox").eq(0).before('<div class="row"></div>');
        newRow(2);
    } else {
        currentWordIndex++;
    }
    
    $(".word").eq(currentWordIndex).addClass("currentWord");
}

function checkWord(){
    userWord = $(".wordBox").val();
    testWord = $(".currentWord").first().text();
    updateIndex(userWord === testWord);
}

//End of game functions

function startTimer(milliSec){
    gameStarted = true;
    timer.start(milliSec);
    timer.on('tick', function(ms){
        var timeInSec = Math.floor(ms/1000);
        elapsedTime = testTime - ms;
        $(".timer").eq(0).text(timeInSec);

    });
    timer.on('done', function(){
        $(".wordBox").attr("disabled", "disabled").val("");
        $(".timer").eq(0).text("Times up!");
        gameDone(testTime);
    });
}

$("#endButton").on("click", function(){
    if(gameStarted){
        gameDone(elapsedTime);
    }
    
});

function gameDone(time){
    let dataArr=[correctWords, incorrectWords, correctWordsLength, incorrectWordsLength, time];
    for(let i = 0; i < dataArr.length; i++){
        $(".postData").eq(i).attr("value", dataArr[i]);
    }
    $(".gameData").submit();
}





