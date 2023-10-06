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
    if (index < questionList.length - 1) {
        updateQuestion(questionList[index]);
        $('.start-card-container').show();
        $('.back-card-container').hide();
    } else {
        updateQuestion(null);
    }
}

//Shows the answers to a question with corresponding index
function getResult(questionList) {
    if (index < questionList.length - 1) {
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
        $('.start-card-container').show();
        $('.back-card-container').hide();
        $('#question-text').text("Du är färdig!");
        $('#answer-text').hide();
        $('.return-button').show();
        $('.result-button').click(function () {
            showAllResults();
        });
    }
}

// Shows the all-card-container which displays all of the cards
function showAllResults() {
    $('.result-card-container').show();
    $('.start-card-container').hide();
    $('.back-card-container').hide();
    $('.all-card-container').show();
    displayAllResults();
}

// Loops through each question and displays them on the all-card-container
function displayAllResults() {
    var questionList = getQuestionList();
    var parentContainer = $('body');

    parentContainer.empty();

    displayAllFinalResult();

    for (let i = 0; i < questionList.length - 1; i++) {
        var outsideContainer = $('<div class="outside-card-container">');
        var insideContainer = $('<div class="inside-card-container">');

        outsideContainer.append('<h1 class="card-title">Teleservice Skåne</h1>');

        var allContainer = $('<div class="all-card-container">');
        allContainer.append('<h2>Fråga: <span class="all-card-text">' + questionList[i][0] + '</span></h2><br>');
        allContainer.append('<p><span class="all-question-text">' + questionList[i][1] + '</span></p><br>');
        allContainer.append('<h2>Rätt svar:</h2>');
        allContainer.append('<p><span class="all-answer-text">' + questionList[i][2] + '</span></p>');
        insideContainer.append(allContainer);

        outsideContainer.append(insideContainer);
        parentContainer.append(outsideContainer);
    }
}

//Displays the results of the three different answer types
function displayAllFinalResult() {
    var parentContainer = $('body');
    var outsideContainer = $('<div class="outside-card-container">');
    outsideContainer.append('<h1 class="card-title">Teleservice Skåne</h1>');

    var insideContainer = $('<div class="inside-card-container">');
    var resultContainer = $('<div class="result-card-container">');
    resultContainer.append('<div class="correct-container">');
    resultContainer.append('<h2>Korrekt:</h2>');
    resultContainer.append('<p><span id="correct-text"></span></p>');

    resultContainer.append('<div class="almost-correct-container">');
    resultContainer.append('<h2>Nästan Korrekt:</h2>');
    resultContainer.append('<p><span id="almost-correct-text"></span></p>');

    resultContainer.append('<div class="incorrect-container">');
    resultContainer.append('<h2>Inkorrekt:</h2>');
    resultContainer.append('<p><span id="incorrect-text"></span></p>');

    insideContainer.append(resultContainer);
    outsideContainer.append(insideContainer);

    var returnButton = $('<button class="return-button">Gå tillbaka till startsidan</button>')

    returnButton.click(function () {
        window.location.href = '/';
    });

    outsideContainer.append(returnButton);
    parentContainer.append(outsideContainer);

    displayFinalResult();
}

//Displays the final result for each category of answers
function displayFinalResult() {
    $('#correct-text').text(correct);
    $('#almost-correct-text').text(almost);
    $('#incorrect-text').text(incorrect);
}

//Hides initial elements from the page
function hideElements() {
    $('.back-card-container').hide();
    $('.return-button').hide();
    $('.result-card-container').hide();
    $('.all-card-container').hide();
}