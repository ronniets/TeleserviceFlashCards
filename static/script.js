var index = 0;
var correct = 0;
var almost = 0;
var incorrect = 0;

document.addEventListener("DOMContentLoaded", function () {
    $(function () {
        hideElements();
        var questionList = getQuestionList();
        
        showQuestion(questionList);

        $('.result-button').click(function () {
            getResult(questionList);
        });

        $('.correct-button, .almost-correct-button, .incorrect-button').click(function () {
            getNextQuestion(questionList)
            var clickedButtonClass = $(this).attr('class')

            if (clickedButtonClass === 'correct-button') {
                correct++;
            } else if (clickedButtonClass === 'almost-correct-button') {
                almost++;
            } else if (clickedButtonClass === 'incorrect-button') {
                incorrect++;
            }
        });
    });
});

//Retrieves a list of questions in JSON format from Flask
function getQuestionList() {
    var element = document.getElementById('question-list');
    return JSON.parse(element.dataset.questionList);
}

//Sends a question with corresponding index
function showQuestion(questionList) {
    if (index < questionList.length) {
        updateQuestion(questionList[index]);
        $('.start-card-container').show();
        $('.back-card-container').hide();
    } else {
        updateQuestion(null);
    }
}

//Shows the answers to a question with corresponding index
function getResult(questionList) {
    if (index < questionList.length) {
        updateQuestion(questionList[index]);
        $('.start-card-container').hide();
        $('.back-card-container').show();
    } else {
        updateQuestion(null);
    }
}

//Increments the index and gets us to the next question
function getNextQuestion(questionList) {
    if (index < questionList.length - 1) {
        index++;
        showQuestion(questionList)
    } else if (index = questionList.length - 1) {
        updateQuestion(null);
    }
}

//Updates the HTML elements with the data from the questionList
function updateQuestion(question) {
    if (question !== null) {
        $('#question-text').text(question[0]);
        $('#answer-text').text(question[1]);
        $('#correct-answer-text').text(question[2]);
    } else if (question === null) {
        $('.start-card-container').show()
        $('.back-card-container').hide()
        $('#question-text').text("Du är färdig!");
        $('#answer-text').hide();
        $('.return-button').show();
        $('.result-button').click(function () {
            showResult();
        });
    }
}

//Shows the final result when the list is traversed
function showResult() {
    $('.result-card-container').show();
    $('.outside-card-container').hide();
    $('.start-card-container').hide();
    $('.back-card-container').hide();
    displayFinalResult()
}

//Hides initial elements from the page
function hideElements() {
    $('.back-card-container').hide();
    $('.return-button').hide();
    $('.result-card-container').hide();
}

//Displays the final result for each category of answers
function displayFinalResult() {
    $('#correct-text').text(correct);
    $('#almost-correct-text').text(almost);
    $('#incorrect-text').text(incorrect);
}