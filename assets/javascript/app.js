$(document).ready(function () {

    //variable declaration
    var corrCount = 0;
    var incorrCount = 0;
    var unansCount = 0;
    questionCount = 0;
    var questionList = [];
    var questionDisplay = $("<div>");
    questionDisplay.addClass("qHeader qChoice");
    var question = $("#question");
    var choice1 = $("#choice-1");
    var choice2 = $("#choice-2");
    var choice3 = $("#choice-3");
    var choice4 = $("#choice-4");
    var time = 30;
    var timerSelect = $("#timer");
    var intervalId;
    var startVisible = true;
    var attach;
    var timeout;

    questionList.push(objConstructor("What is 1+1?", ["one", "two", "three", "four"], "two"));
    questionList.push(objConstructor("What is the third letter of the alphabet?", ["A", "B", "C", "D"], "C"));
    questionList.push(objConstructor("What color is the sky", ["blue", "potato", "green", "yes"], "blue"));
    questionList.push(objConstructor("What is my name?", ["Frank", "Beans", "Hugo", "Tyler"], "Tyler"));

    //function definitions
    function objConstructor(question, choices, correctChoice) {
        return {
            question: question,
            choices: choices,
            correctChoice: correctChoice
        }
    }

    function startGame() {
        console.log("it worked!");
        if (startVisible) {
            $("#startButton").css("display", "none");
            startVisible = false;
        }
        $(".hidden").css("display", "block");
        resetClock();
        question.text(questionList[questionCount].question);
        choice1.text(questionList[questionCount].choices[0]);
        choice2.text(questionList[questionCount].choices[1]);
        choice3.text(questionList[questionCount].choices[2]);
        choice4.text(questionList[questionCount].choices[3]);
    }

    function resetGame() {
        corrCount = 0;
        incorrCount = 0;
        unansCount = 0;
        questionCount = 0;
        $("#gameSpace").empty();
        $("#gameSpace").append(attach);
        startGame();
    }

    function correctAnswer() {
        corrCount++;
        intermission("correct");
        changeQuestion();
    }

    function wrongAnswer() {
        incorrCount++;
        intermission("incorrect")
        changeQuestion();
    }

    function noAnswer() {
        unansCount++;
        intermission("unanswered")
    }

    function changeQuestion() {
        questionCount++;
        if (questionCount === (questionList.length)) {
            clearInterval(intervalId);
            attach = $("#questionSpace").detach();
            $("#gameSpace").html(`All done here's how you did!<p>Correct Answers: ${corrCount}</p><p>Incorrect Answers: ${incorrCount}</p><p>Unanswered: ${unansCount}</p>`);
            var resetButton = $("<p>").text("Start Over?").addClass("startOver");
            resetButton.click(function () {
                resetGame();
            });
            $("#gameSpace").append(resetButton);

        }
        else {
            resetClock();
            question.text(questionList[questionCount].question);
            choice1.text(questionList[questionCount].choices[0]);
            choice2.text(questionList[questionCount].choices[1]);
            choice3.text(questionList[questionCount].choices[2]);
            choice4.text(questionList[questionCount].choices[3]);
        }
    }

    function resetClock() {
        time = 30;
        timerSelect.text(time);
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);

        function decrement() {
            time--;
            timerSelect.text(time);
            if (time === 0) {
                clearInterval(intervalId);
                noAnswer();
            }
        }
    }

    function intermission(response){
        if(response === "correct")
        {
            clearInterval(intervalId);
            changeQuestion();
        }
        else if(response === "incorrect"){
            clearInterval(intervalId);
            changeQuestion();
        }
        else if(response === "unanswered"){
            clearInterval(intervalId);
            changeQuestion();
        }

    }


    // on click functionality

    $("#startButton").click(function () {
        startGame();
    });

    choice1.click(function () {
        if (questionList[questionCount].choices[0] === questionList[questionCount].correctChoice) {
            console.log("correct answer")
            correctAnswer();
        }
        else {
            console.log("incorrect answer")
            wrongAnswer();
        }
    });

    choice2.click(function () {
        if (questionList[questionCount].choices[1] === questionList[questionCount].correctChoice) {
            console.log("correct answer")
            correctAnswer();
        }
        else {
            console.log("incorrect answer")
            wrongAnswer();
        }
    });

    choice3.click(function () {
        if (questionList[questionCount].choices[2] === questionList[questionCount].correctChoice) {
            console.log("correct answer")
            correctAnswer();
        }
        else {
            console.log("incorrect answer")
            wrongAnswer();
        }
    });

    choice4.click(function () {
        if (questionList[questionCount].choices[3] === questionList[questionCount].correctChoice) {
            console.log("correct answer")
            correctAnswer();
        }
        else {
            console.log("incorrect answer")
            wrongAnswer();
        }
    });


});
