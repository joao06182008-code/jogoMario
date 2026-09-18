// 1. Seleção dos elementos do HTML
const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const scoreDisplay = document.querySelector('.score span');
const restartButton = document.querySelector('.restart-button');
const audio = document.getElementById("mario-music");
audio.volume = 0.3; // 30%

// Instância dos efeitos sonoros
const jumpSound = new Audio('assets/sons/maro-jamp.mp3');
jumpSound.volume = 0.1; // 0.0 (mudo) a 1.0 (máximo)
const gameOverSound = new Audio('assets/sons/PERDEUOTARO.mp3');
gameOverSound.volume = 0.5; // 0.0 (mudo) a 1.0 (máximo)
let score = 0;

// 2. Função JUMP atualizada com filtro de teclas
const jump = (event) => {
    // Verifica se a tecla pressionada é Seta para Cima, W ou Barra de Espaço
    const isAllowedKey = 
        event.key === ' ' || 
        event.key === 'Space'; 

    // Se for qualquer outra tecla, ignora e cancela a função
    if (!isAllowedKey) return;

    mario.classList.add('jump');

    // Toca o som de pulo
    jumpSound.currentTime = 0;
    jumpSound.play();

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500); // [2]
}

// 3. Loop do jogo (verificação de colisão e atualização do score)
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudsPosition = clouds.offsetLeft;

    score++;
    scoreDisplay.textContent = score;

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) { audio.pause(); // ← para a música de fundo
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

        clearInterval(loop); // [3]
    }
}, 10); // [4]

const restartGame = () => {
    window.location.reload();
}

// 4. Escutador de teclado posicionado no final do código
document.addEventListener('keydown', jump); // [1]