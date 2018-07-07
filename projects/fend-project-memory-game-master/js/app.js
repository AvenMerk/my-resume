/*
 * Create a list that holds all of your cards
 */
let cardTypes = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt',
    'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];
let cardPairsArray = [];
let counts = 0;
const count = document.getElementsByClassName('moves')[0];
let flag = true;
let moves = 0;
let second = 0, minute = 0, hour = 0;
const timer = document.querySelector(".timer");
let interval;
timer.innerHTML = minute+" min "+second+" sec";
let matchedCards = 0;
const cards = document.getElementsByClassName("card");

//for congratulation popup

let model = document.getElementById("popup1");
//close icon in popup window
let closeicon = document.querySelector(".close");
//button for play again
let againButton = document.getElementById('play-again');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}

// create new element
function createNewElement(elementName, elementClassName) {
    let element = document.createElement(elementName);
    element.className = elementClassName;
    return element;
}

//create new desk for cards
function createDesk() {
    let ul = createNewElement('ul', 'deck');
    document.getElementsByClassName('container')[0].appendChild(ul);
    ul.setAttribute('id', 'deck');
}

//create a game board with cards
function createNewDeck() {
    createDesk();
    shuffle(cardTypes);
    cardTypes.forEach(createCards);
    count.innerText = counts;
    flag = false;
}

createNewDeck();

// create new card representation item
function createCards(cardType) {
    let i = createNewElement('i', cardType);
    let li = createNewElement('li', 'card');
    li.appendChild(i);
    li.addEventListener('click', listener, false);
    document.getElementsByClassName('deck')[0].appendChild(li);
}

//add class for cards, checking pairs
function listener(e) {
    let card = e.target;
    moves++;
    //when moves = 1 -> start stopwatch
    if (moves === 1) {
        second++;
        stopWatch();
    }
    card.className = 'card open show disabled';
    //checking pairs of cards
    checkCardPairsArray(card);
}

//check if the array with pairs of card is empty or not
function checkCardPairsArray(card) {
    if (cardPairsArray.length === 0) {
        cardPairsArray.push(card);
    } else {
        checkPairs(card);
    }
    congruts();
}

//is cards matched or not
function checkPairs(card) {
    counts++;
    stars();
    disable();
    if (card.getElementsByTagName('i')[0].className === cardPairsArray[0].getElementsByTagName('i')[0].className) {
        card.className = 'card match disabled';
        cardPairsArray[0].className = 'card match disabled';
        cardPairsArray = [];
        matchedCards++;
        enable();
    } else {
        setTimeout(function () {
            card.className = 'card';
            cardPairsArray[0].className = 'card';
            cardPairsArray = [];
            enable();
        }, 750);
        count.innerText = counts;
    }
}

//disable any clicks for card
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        if (card.className === 'card') {
            card.className += ' disabled';
        }
    });
}

//turn on the clicking
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        if (card.className === 'card disabled') {
            card.className = 'card';
        }
    });
}

//function to clear the board
function deleteCards() {
    let element = document.getElementsByClassName('deck')[0];
    while (element.firstChild) {
        element.removeChild(element.firstChild);
        counts = 0;
        count.innerText = counts;
    }
    element.parentNode.removeChild(element);
}

//button for clear the board
let repeatButton = document.getElementsByClassName('fa fa-repeat')[0];

//idk why i can't use the refresh function inside the eventListener, browser gave an error, that refresh is not a function
repeatButton.addEventListener('click', function () {
    deleteCards();
    createNewDeck();
    createStars();
    clearTimeout(interval);
    moves = 0;
    second = 0;
    minute = 0;
    hour = 0;
    timer.innerHTML = minute+" min "+second+" sec";
});

//function for refresh the page
function refresh() {
    deleteCards();
    createNewDeck();
    createStars();
    moves = 0;
    second = 0;
    minute = 0;
    hour = 0;
    matchedCards = 0;
    timer.innerHTML = minute+" min "+second+" sec";
}

//change the number of stars while you playing
function stars() {
    if (counts > 17 && counts < 21) {
        let star = document.getElementsByClassName('fa fa-star')[2];
        star.classList.add('hide');
    } else if (counts > 20) {
        let star = document.getElementsByClassName('fa fa-star')[1];
        star.classList.add('hide');
    }
}

//set class name for stars for new board
function createStars() {
    for (let i = 0; i < 3; i++) {
        let star = document.getElementsByClassName('stars')[0].getElementsByTagName('i')[i];
        star.className = 'fa fa-star';
    }
}

function stopWatch() {
    interval = setTimeout(addSecond, 1000);
}

//function for stopwatch to separate minutes and seconds
function addSecond() {
    timer.innerHTML = minute+" min "+second+" sec";
    second++;
    if (second >= 60) {
        second = 0;
        minute++;
        if (minute >= 60) {
            minute = 0;
            hour++;
        }
    }
    stopWatch();
}

//congratulations when all cards match, show moves, time and rating
//btw idk why after congruts popup i should wait about 5 sec before starting new game
function congruts() {
    if (matchedCards === 8){
        clearTimeout(interval);
        let finalTime = timer.innerHTML;
        //show congratulations popup
        model.className = 'overlay show';
        //declare star rating variable
        let starRating = document.querySelector(".stars").innerHTML;
        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = counts;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        //close icon on popup
        closeModelExitIcon();
        closeModelAgainButton();
    }

}

function closeModelExitIcon(){
    closeicon.addEventListener("click", function(){
        model.className = "overlay";
        refresh();
    });
}

function closeModelAgainButton() {
    againButton.addEventListener("click", function(){
        model.className = "overlay";
        refresh();
    });
}