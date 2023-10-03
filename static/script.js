var index = 0;
var correct = 0;
var almost = 0;
var incorrect = 0;
var questionList;

$(document).ready(function () {
    initialize();

    $('.result-button').click(function () {
        showNextQuestion();
    });

    $('.correct-button, .almost-correct-button, .incorrect-button').click(function () {
        updateStats($(this).attr('class'));
        showNextQuestion();
    });
});

function initialize() {
    hideElements();
    questionList = getQuestionList();
    displayQuestion(questionList[index]);
}

function hideElements() {
    $('.back-card-container').hide();
    $('.return-button').hide();
    $('.result-card-container').hide();
    $('.start-card-container').hide();
}

function getQuestionList() {
    var element = document.getElementById('question-list');
    return JSON.parse(element.dataset.questionList);
}

function displayQuestion(question) {
    if (index < questionList.length) {
        updateQuestion(question);
        $('.start-card-container').show();
    } else {
        updateQuestion(null);
    }
}

function showNextQuestion() {
    if (index < questionList.length - 1) {
        index++;
        initialize();
    } else if (index === questionList.length - 1) {
        updateQuestion(null);
    }
}

function updateStats(clickedButtonClass) {
    if (clickedButtonClass === 'correct-button') {
        correct++;
    } else if (clickedButtonClass === 'almost-correct-button') {
        almost++;
    } else if (clickedButtonClass === 'incorrect-button') {
        incorrect++;
    }
}

function updateQuestion(question) {
    if (question !== null) {
        $('#question-text').text(question[0]);
        $('#answer-text').text(question[1]);
        $('#correct-answer-text').text(question[2]);
        $('.back-card-container').hide();
    } else {
        $('.start-card-container').show();
        $('.back-card-container').hide();
        $('#question-text').text("Du är färdig!");
        $('#answer-text').hide();
        $('.return-button').show();
        $('.result-button').off().click(function () {
            showResult();
        });
    }
}

function showResult() {
    $('.result-card-container').show();
    $('.start-card-container').hide();
    $('.back-card-container').hide();
}
