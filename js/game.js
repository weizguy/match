// Create the global variables
var game = true;
var gameOver = false;
var first = null;
var second = null;
var clickable = true;
var possibleMatches = 9;
var imgChoice = [];
var attempts = 0;
var accuracy = 0.00;
var gamesPlayed = 0;
var matchCount = 0;
var videoOn = false;
var music = document.getElementById("music");

// call game initializer function on document load
$(document).ready(readyPlayerOne);

// Game initializer
function readyPlayerOne(){
    shuffleCards(cards);
    displayStats();
    $('#reset').on('click', reset);
    $('#stopMusic').click(function() {
        if(videoOn === false) {
            if (music.paused == false) {
                music.pause();
            } else {
                music.play();
            }
        }
    });
    $('.flipContainer').on('click', cardClicked);
    $('.matched').on("click", cardClicked);
    $('.choose').on("click", closeCharScreen);
    first = null;
    second = null;
}

//function to play again / reset
function reset(){
    accuracy = 0.00;
    matchCount = 0;
    attempts = 0;
    gamesPlayed += 1;
    $('#chosenOne').text('');
    $('#charScreen').show();
    displayStats();
    stopMusic();
    stopVid();
    $('#hideVid').hide();
    $('.flipContainer.clicked .card').css("transform", "rotateY(0deg)");
    $('.flipContainer.matched .card').css("transform", "rotateY(0deg)");
    $('.matched').on("click", cardClicked);
    $('.flipContainer').removeClass('matched');
    $('.flipContainer').removeClass('clicked');
    shuffleCards(cards);
}

// function for card click event START
// ***********************************************************************************
function cardClicked() {    
    if($(this).hasClass('clicked')){        
        return;
    }
    $(this).addClass('clicked');
    $('.flipContainer:hover .card').css("transform", "rotateY(180deg)");
    var flip = document.getElementById("flip");
        flip.play();
        if(first == null){
            first = $(this);
        }else {
            second = $(this);
            var firstImage = first[0].children[0].children[1].style.backgroundImage;
            var secondImage = second[0].children[0].children[1].style.backgroundImage;
            if (secondImage == firstImage) {   
                second.removeClass("clicked");
                first.removeClass("clicked"); 
                attempts += 1;
                matchCount += 1;
                setTimeout(matched, 100);
            } else { 
                clickable = false;   
                attempts += 1;    
                setTimeout(not_matched, 1000);
            }
        }
}
// ***********************************************************************************
// function for card click event END

// function for card matched cards START
// ***********************************************************************************
var ranSound;
function matched() {
    accuracy = (matchCount / attempts * 100);
    displayStats();
    ranSound = Math.floor(Math.random() * 7);
    var outstanding = document.getElementById("outstanding");
    var impressive = document.getElementById("impressive");
    var excellent = document.getElementById("excellent");
    var yummy = document.getElementById("yummy");
    var wonderful = document.getElementById("wonderful");
    var toasty = document.getElementById("toasty");
    var superb = document.getElementById("superb");
    if(matchCount < possibleMatches) {
        if (ranSound === 0) {
            outstanding.play();
        } else if (ranSound === 1) {
            impressive.play();
        } else if (ranSound === 2) {
            excellent.play();
        } else if (ranSound === 3) {
            yummy.play();
        } else if (ranSound === 4) {
            wonderful.play();
        } else if (ranSound === 5) {
            toasty.play();
        } else if (ranSound === 6) {
            superb.play();
        }
    }

    first.addClass("matched");
    second.addClass("matched");

    var fatality = document.getElementById("fatality");
    if (matchCount === possibleMatches) {
        fatality.play();
        displayStats();
        playVid();
    }
    setTimeout(stopFlip, 100);
}
// ***********************************************************************************
// function for card matched cards END

// function for card not matched cards START
// ***********************************************************************************
var ranLaugh;
function not_matched() {
    $('#attempts').text(attempts);
    if (($(this).hasClass('matched')) == false) {
        $('.flipContainer.clicked .card').css("transform", "rotateY(0deg)");
        ranLaugh = Math.floor(Math.random() * 1000);
        var laugh1 = document.getElementById("laugh1");
        var laugh2 = document.getElementById("laugh2");
        if(ranLaugh < 100){
            laugh1.play();
        }else if(ranLaugh > 800){
            laugh2.play();
        }
        first.removeClass('clicked');
        second.removeClass('clicked');
        first = null;
        second = null;
    }if (clickable == false) {
        clickable = true;
    }    
}
// ***********************************************************************************
// function for card not matched cards END

// function to display the stats
function displayStats() {
    $("#accuracy").text(accuracy.toFixed(2) + '%');
    $('#attempts').text(attempts);
    $('#played').text(gamesPlayed);
}

// function to stop the cards from flipping when matched
function stopFlip() {
    $('.matched').off("click");
    first = null;
    second = null;
}

// function to assign the card faces START
// ***********************************************************************************
function shuffleCards(array) {
    imgChoice = array;
    var counter = 18, temp, index;
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    $('.reveal').each(function (val) {
        $(this).css('background-image', 'url(' + imgChoice[val].img + ')');
    });
    $('.reveal').each(function (index) {
        $(this).attr('alt', index);
    });
}
// ***********************************************************************************
// function to assign the card faces END

// create the array of card faces START
// ***********************************************************************************
var cards = [
    {   name: "Jax", img: "images/jax.jpg", id: 1  },
    {   name: "Johnny Cage", img: "images/johnnycage.jpg", id: 2 },
    {   name: "Kano", img: "images/kano.jpg", id: 3 },
    {   name: "Kung Lao", img: "images/kunglao.jpg", id: 4 },
    {   name: "Liu Kang", img: "images/liukang.jpg", id: 5 },
    {   name: "Raiden", img: "images/raiden.jpg", id: 6 },
    {   name: "Scorpion", img: "images/scorpion.jpg", id: 7 },
    {   name: "Sonya Blade", img: "images/sonyablade.jpg", id: 8 },
    {   name: "SubZero", img: "images/subzero.jpg", id: 9 },

    {   name: "Jax", img: "images/jax.jpg", id: 10  },
    {   name: "JohnnyCage", img: "images/johnnycage.jpg", id: 11 },
    {   name: "Kano", img: "images/kano.jpg", id: 12 },
    {   name: "KungLao", img: "images/kunglao.jpg", id: 13 },
    {   name: "LiuKang", img: "images/liukang.jpg", id: 14 },
    {   name: "Raiden", img: "images/raiden.jpg", id: 15 },
    {   name: "Scorpion", img: "images/scorpion.jpg", id: 16 },
    {   name: "SonyaBlade", img: "images/sonyablade.jpg", id: 17 },
    {   name: "SubZero", img: "images/subzero.jpg", id: 18 }
];
// ***********************************************************************************
// create the array of card faces END

// **********************************************************************************
//  functions for character select screen START
$(document).ready(function () {
    $('#hideVid').hide();
    if (screen.width < 500) {
        $('.choose').css('height', '18vh');
    }else
        $('.choose').css('height', '25vh');
});

function openCharScreen() {
    $("#charScreen").height('100%');
    $(".choice").fadeIn(3000);
}

var chosen;
function closeCharScreen() {
    chosen = $(this);
    var chosenOne = chosen[0].title;
    var scorpion = document.getElementById("scorpion");
    var johnnycage = document.getElementById("johnnycage");
    var subzero = document.getElementById("subzero");
    var kunglao = document.getElementById("kunglao");
    if(chosenOne === "Scorpion"){
        scorpion.play();
    }else if(chosenOne === "Kung Lao"){
        kunglao.play();
    }else if(chosenOne === "SubZero"){
        subzero.play();
    }else if(chosenOne === "Johnny Cage"){
        johnnycage.play();
    }else {
        challenger.play();
    }
    $("#chosenOne").text(chosenOne);
    setTimeout(playMusic, 100);
    $("#charScreen").hide();
}


function playMusic() {
    music.play();
    music.volume = .1;
}

function stopMusic() {
    music.pause();
    music.currentTime = 0;
}
// **********************************************************************************
//  functions for character select screen END

// function to show video after win
var vid = document.getElementById("vid");
function playVid() {
    stopMusic();
    videoOn = true;
    $('#hideVid').show();
    vid.play();
    $('#vid').show();
}

function stopVid() {
    videoOn = false;
    vid.pause();
    vid.currentTime = 0;
}