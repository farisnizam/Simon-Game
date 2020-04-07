var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// detect keyboard press
$(document).keydown(function () {
    console.log('run');
    if (!started) {
        nextSequence();
        started = true;
    }
});

// add event listener to button
$('.btn').click(function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
    
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        playSound('wrong');

        // add game over effect
        $('body').addClass("game-over");
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);

        // change title
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

// push random button to gamePattern
function nextSequence() {

    userClickedPattern = [];

    // increace level
    level++;
    $("#level-title").text("Level " + level);

    // pick random color and push to gamePattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // flash animation
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // play different audio based on color
    playSound(randomChosenColour);

}



function playSound(name) {

    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();

}

// add press animation
function animatePress(currentColour) {

    $('#' + currentColour).addClass("pressed");
    setTimeout(function () {
        $('#' + currentColour).removeClass("pressed");
    }, 100);

}

function startOver() {

    // reset all variable
    started = false;
    level = 0;
    gamePattern = [];

}
