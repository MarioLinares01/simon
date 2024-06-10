let title = document.querySelector('.title');
let buttons = document.querySelectorAll('.btn');
let buttonColors = ['green', 'red', 'yellow', 'blue'];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

// Entry point to Simon
document.addEventListener('keydown', () => {
    if (!started) {
        nextSequence();
        handleUserClicks();
        started = true;
    }
});


// Handle user button clicks
function handleUserClicks() {
   buttons.forEach(btn => btn.addEventListener('click', (e) => {
       animateClick(e.target.id);
       playSound(e.target.id);
       userPattern.push(e.target.id);
       validateClick(userPattern.length - 1);
   }));
}

// Valdiate whether the user made a correct click
function validateClick(currentlevel) {
    if (gamePattern[currentlevel] === userPattern[currentlevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        document.body.classList.add('game-over');
        title.innerText = 'Game Over! Press Any Key To Restart'
        setTimeout(function() {
            document.body.classList.remove('game-over');
        }, 200);
        startOver();
    }
}

// Start a new game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Handle a new level
function nextSequence() {
    let randomColor = buttonColors[Math.floor(Math.random() * 4)];
    userPattern = [];
    level++;
    title.innerText = 'Level ' + level;

    gamePattern.push(randomColor);
    fadeInButton(randomColor);
    playSound(randomColor);
}

// Function to fade in a button
function fadeInButton(btn) {
    document.querySelector('#' + btn).style.opacity = 0;
    setTimeout(function() {
        document.querySelector('#' + btn).style.opacity = 1;
    }, 100);
}

// Function to play sound
function playSound(color) {
    let audio = new Audio('assets/sounds/' + color + '.mp3');
    audio.play();
}

function animateClick(color) {
    document.querySelector('#' + color).classList.add('pressed');
    setTimeout(function() {
        document.querySelector('#' + color).classList.remove('pressed');
    }, 100);
}