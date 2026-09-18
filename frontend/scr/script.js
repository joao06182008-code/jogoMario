const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const scoreDisplay = document.querySelector('.score span');
const restartButton = document.querySelector('.restart-button');
const audio = document.getElementById("mario-music");
audio.volume = 0.3; 


const jumpSound = new Audio('assets/sons/maro-jamp.mp3');
jumpSound.volume = 0.1; 
const gameOverSound = new Audio('assets/sons/PERDEUOTARO.mp3');
gameOverSound.volume = 0.5; 
let score = 0;

const jump = (event) => {
    const isAllowedKey = 
        event.key === ' ' || 
        event.key === 'Space'; 

    if (!isAllowedKey) return;

    mario.classList.add('jump');

    jumpSound.currentTime = 0;
    jumpSound.play();

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudsPosition = clouds.offsetLeft;

    score++;
    scoreDisplay.textContent = score;

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) { audio.pause();
        gameOverSound.play();
        restartButton.style.display = 'block';
        clearInterval(loop);

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'assets/images/mariomorre.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`;

        gameOverSound.play();
        restartButton.style.display = 'block';

        clearInterval(loop);
    }
}, 10);

const restartGame = () => {
    window.location.reload();
}

document.addEventListener('keydown', jump);