//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json() );   
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var correctWords = Number(req.body.correct);
    var incorrectWords = Number(req.body.incorrect);
    var correctWordsLength = Number(req.body.correctLength);
    var incorrectWordsLength = Number(req.body.incorrectLength);
    var testTimeInSec = Number(req.body.time)/1000;
    var testTimeInMin = testTimeInSec/60;
    var grossWpm = Math.round(((correctWordsLength + incorrectWordsLength)/5)/testTimeInMin);
    var netWpm = Math.round(((correctWordsLength)/5)/testTimeInMin);
    var accuracy = Math.round(correctWordsLength/(correctWordsLength+incorrectWordsLength)*100);
    res.render('result.ejs', {nWpm: netWpm,
                              gWpm: grossWpm,
                              corrWords: correctWords,
                              incorrWords: incorrectWords,
                              time: Math.floor(testTimeInSec),
                              accurate: accuracy});
});

// app.get("/", (req, res) => {
//     res.render('index.ejs', {kindOfWord: "Hello"});
// });

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
});