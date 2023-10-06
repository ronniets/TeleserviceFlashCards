var index = 0;
var correct = 0;
var almost = 0;
var incorrect = 0;
var correctList = [];
var almostList = [];
var incorrectList = [];

document.addEventListener("DOMContentLoaded", function () {
    $(function () {
        hideElements();
        var questionList = getQuestionList();
        
        showQuestion(questionList);

        $('.result-button').click(function () {
            getResult(questionList);
        });

        $('.correct-button, .almost-correct-button, .incorrect-button').click(function () {
            getNextQuestion(questionList);
            var clickedButtonClass = $(this).attr('class')

            if (clickedButtonClass === 'correct-button') {
                correct++;
                correctList.push(questionList[index]);
                console.log(index + " " + correctList + " ");
            } else if (clickedButtonClass === 'almost-correct-button') {
                almost++;
                almostList.push(questionList[index]);
                console.log(index + " " + almostList + " ");
            } else if (clickedButtonClass === 'incorrect-button') {
                incorrect++;
                incorrectList.push(questionList[index]);
                console.log(index + " " + incorrectList + " ");
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
        $('#question-text').text("Fråga: " + question[0]);
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
    displayAllFinalResult();
}

//Displays the results of the three different answer types
function displayAllFinalResult() {
    var parentContainer = $('body');

    parentContainer.empty();

    resultContainer = resultContainer();
    parentContainer.append(resultContainer);

    getCategoryValues();
}

//Creates the result container at the end of the session
function resultContainer() {
    var resultContainer = $('<div class="result-card-container">');
    rButton = returnButton();
    resultContainer.append('<h1 id="result-h1">Resultat:</h1>');
    
    var resultContainers = $('<div class="result-containers">');
    resultContainers.append(correctContainer());
    resultContainers.append(almostCorrectContainer());
    resultContainers.append(incorrectContainer());

    resultContainer.append(resultContainers);
    resultContainer.append(rButton);
    return resultContainer;
}


//Creates the correct container for the results page
function correctContainer() {
    var correctContainer = $('<div class="correct-container">');
    correctContainer.append('<h2>Korrekt: <span id="correct-text"></span></h2>');
    
    for (let i = 0; i < correctList.length; i++) {
        var card = createCard(correctList[i]);
        correctContainer.append(card);
    }

    return correctContainer;
}


//Creates the almost-correct container for the results page
function almostCorrectContainer() {
    var almostCorrectContainer = $('<div class="almost-correct-container">');
    almostCorrectContainer.append('<h2>Nästan Korrekt: <span id="almost-correct-text"></span></h2>');
    
    for (let i = 0; i < almostList.length; i++) {
        var card = createCard(almostList[i]);
        almostCorrectContainer.append(card);
    }

    return almostCorrectContainer;
}


//Creates the incorrect container for the results page
function incorrectContainer() {
    var incorrectContainer = $('<div class="incorrect-container">');
    incorrectContainer.append('<h2>Inkorrekt: <span id="incorrect-text"></span></h2>');
    
    for (let i = 0; i < incorrectList.length; i++) {
        var card = createCard(incorrectList[i]);
        incorrectContainer.append(card);
    }

    return incorrectContainer;
}

//Creates the card with the correct question data
function createCard(questionData) {
    var outsideContainer = $('<div class="outside-card-container">');
    outsideContainer.append('<h1 class="card-title">Teleservice Skåne</h1>');
    var insideContainer = $('<div class="inside-card-container">');
    var cardContainer = $('<div class="all-card-container">');
    cardContainer.append('<h2>Fråga: <span class="all-card-text">' + questionData[0] + '</span></h2><br>');
    cardContainer.append('<p><span class="all-question-text">' + questionData[1] + '</span></p><br>');
    cardContainer.append('<h2>Rätt svar:</h2>');
    cardContainer.append('<p><span class="all-answer-text">' + questionData[2] + '</span></p>');
    insideContainer.append(cardContainer);
    outsideContainer.append(insideContainer);
    return outsideContainer;
}

//Displays the final result for each category of answers
function getCategoryValues() {
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

//Creates a return button and adds the correct link for it
function returnButton() {
    var returnButton = $('<button class="result-return-button">Gå tillbaka till startsidan</button>')


    returnButton.click(function () {
        window.location.href = '/';
    });

    return returnButton;
}