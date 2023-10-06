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
            getNextQuestion(questionList, this);
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
function getNextQuestion(questionList, button) {
    if (index < questionList.length - 1) {
        var clickedButtonClass = $(button).attr('class');

        if (clickedButtonClass === 'correct-button') {
            correct++;
            correctList.push(questionList[index]);
        } else if (clickedButtonClass === 'almost-correct-button') {
            almost++;
            almostList.push(questionList[index]);
        } else if (clickedButtonClass === 'incorrect-button') {
            incorrect++;
            incorrectList.push(questionList[index]);
        }

        index++;
        showQuestion(questionList);
    } else if (index == questionList.length - 1) {
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

    if (correctList.length > 0) {
        var card = createCard(correctList[0], correctList, 0);
        correctContainer.append(card);
    }

    return correctContainer;
}

//Creates the almost-correct container for the results page
function almostCorrectContainer() {
    var almostCorrectContainer = $('<div class="almost-correct-container">');
    almostCorrectContainer.append('<h2>Nästan Korrekt: <span id="almost-correct-text"></span></h2>');
    
    if (almostList.length > 0) {
        var card = createCard(almostList[0], almostList, 0);
        almostCorrectContainer.append(card);
    }

    return almostCorrectContainer;
}


//Creates the incorrect container for the results page
function incorrectContainer() {
    var incorrectContainer = $('<div class="incorrect-container">');
    incorrectContainer.append('<h2>Inkorrekt: <span id="incorrect-text"></span></h2>');

    if (incorrectList.length > 0) {
        var card = createCard(incorrectList[0], incorrectList, 0);
        incorrectContainer.append(card);
    }

    return incorrectContainer;
}

//Creates a card for the final result and adds animations to the card
function createCard(questionData, list, index) {
    var check;
    var cardContainer = $('<div class="outside-card-container">');
    cardContainer.append('<h1 class="card-title">Teleservice Skåne</h1>');
    var insideContainer = $('<div class="inside-card-container">');

    var startCard = $('<div class="start-card-container">');
    startCard.append('<h2>Fråga: <span id="question-text">' + questionData[0] + '</span></h2><br>');
    startCard.append('<p><span id="answer-text">' + questionData[1] + '</span></p><br>');

    var backCard = $('<div class="back-card-container">');
    backCard.append('<h2>Rätt svar:</h2>');
    backCard.append('<p><span id="correct-answer-text">' + questionData[2] + '</span></p><br>');

    insideContainer.append(startCard);

    insideContainer.on({
        click: function () {
            insideContainer.children().remove();
        
            insideContainer.addClass('inside');
        
            insideContainer.one('transitionend', function () {
                if (check) {
                    insideContainer.append(startCard);
                } else {
                    insideContainer.append(backCard);
                }
        
                insideContainer.removeClass('inside');
                check = !check;
            });
        },        
        contextmenu: function (event) {
            event.preventDefault();
            index = (index + 1) % list.length;
            var nextQuestion = list[index];
    
            cardContainer.addClass('shuffled');
    
            setTimeout(function () {
                startCard.find('#question-text').text(nextQuestion[0]);
                startCard.find('#answer-text').text(nextQuestion[1]);
                backCard.find('#correct-answer-text').text(nextQuestion[2]);
    
                cardContainer.removeClass('shuffled');
            }, 1000);
        }
    });
    
    cardContainer.append(insideContainer);

    return cardContainer;
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