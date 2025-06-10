const possibleMoves = ['rock', 'paper', 'scissors'];
const btns = document.querySelectorAll('.btn');
const resetBtn = document.querySelector('.resetBtn');
const autoPlayBtn = document.querySelector('.autoPlayBtn');

// Score Board
const computerScore = document.querySelector('.computerScore');
const playerScore = document.querySelector('.playerScore');
const drawScore = document.querySelector('.drawScore');

// elements
const displayWinnerElement = document.querySelector('.winnerSection');
const historyElement = document.querySelector('.history');

const persistScore = JSON.parse(localStorage.getItem('persistScore')) || {
  player: 0,
  computer: 0,
  draw: 0,
  history: [],
};
const persistHistory = persistScore.history || [];

computerScore.textContent = persistScore.computer;
playerScore.textContent = persistScore.player;
drawScore.textContent = persistScore.draw;

// display history
displayHistory(persistHistory);

// functions
const calculateWinner = (playerMove, computerMove) => {
  let computerScoreToNumber = +computerScore.textContent;
  let playerScoreToNumber = +playerScore.textContent;
  let drawScoreToNumber = +drawScore.textContent;

  const persistHistory =
    JSON.parse(localStorage.getItem('persistScore'))?.history || [];

  // getting the winner
  const winner = decidingTheWinner(playerMove, computerMove);

  // update the scores base on the winner
  if (winner === 'Computer') {
    computerScoreToNumber++;
    computerScore.textContent = computerScoreToNumber;
  } else if (winner === 'Player') {
    playerScoreToNumber++;
    playerScore.textContent = playerScoreToNumber;
  } else {
    drawScoreToNumber++;
    drawScore.textContent = drawScoreToNumber;
  }

  const updatedHistory = [...persistHistory, winner];

  // update the store score on local storage
  updateStoreScore(
    playerScoreToNumber,
    computerScoreToNumber,
    drawScoreToNumber,
    updatedHistory
  );

  displayWinnerElement.innerHTML = `
     <div class="">
        <h2 class="text-lg ">Result:</h2>
         <div class='flex p-4 space-x-2'>
            <div class='flex flex-col justify-center items-center'>
                <img src='/img/${playerMove}-emoji.png' class='rotate-90' />
                <h2>You</h2>
            </div>
            <div class='flex items-end'>
                <p>vs</p>
            </div>
            <div class='flex flex-col justify-center items-center'>
                <img src='/img/${computerMove}-emoji.png' class='-rotate-90' />
                <h2>Computer</h2>
            </div>
        </div>
        <div class="text-center ">
            <p class="font-bold">
                ${winner === 'Draw' ? 'Draw' : winner + ' wins'}
            </p>
        </div>
     </div>
    `;

  displayHistory(updatedHistory);
};

const updateStoreScore = (
  playerScoreToNumber,
  computerScoreToNumber,
  drawScoreToNumber,
  updatedHistory
) => {
  //update local storage
  const newScores = {
    player: playerScoreToNumber,
    computer: computerScoreToNumber,
    draw: drawScoreToNumber,
    history: updatedHistory,
  };
  localStorage.setItem('persistScore', JSON.stringify(newScores));
};

const decidingTheWinner = (playerMove, computerMove) => {
  let winner;
  if (
    (playerMove == 'rock' && computerMove == 'paper') ||
    (playerMove == 'paper' && computerMove == 'scissors') ||
    (playerMove == 'scissors' && computerMove == 'rock')
  ) {
    winner = 'Computer';
  } else if (
    (computerMove == 'rock' && playerMove == 'paper') ||
    (computerMove == 'paper' && playerMove == 'scissors') ||
    (computerMove == 'scissors' && playerMove == 'rock')
  ) {
    winner = 'Player';
  } else {
    winner = 'Draw';
  }
  return winner;
};

function displayHistory(history) {
  historyElement.innerHTML = '';
  history.forEach(
    (h, i) =>
      (historyElement.innerHTML += `
          <div title="round ${i + 1}: ${h}" class="cursor-pointer ${
        h === 'Player'
          ? 'bg-green-400'
          : h === 'Computer'
          ? 'bg-red-400'
          : 'bg-gray-400'
      } h-12 w-12" ></div>`)
  );
}

const generateRandomMove = () => {
  const randomMove = Math.floor(Math.random() * possibleMoves.length);
  return possibleMoves[randomMove];
};

const play = (pMove = '') => {
  const playerMove = pMove || generateRandomMove(); //if empty generateRandomMove
  const computerMove = generateRandomMove();
  calculateWinner(playerMove, computerMove);
};

const autoPlay = () => {
  setInterval(play, 1000);
};

// add event listener to each btns
btns.forEach((btn) => {
  btn.addEventListener('click', () => play(btn.id));
});

// reset the game score
resetBtn.addEventListener('click', () => {
  [computerScore, playerScore, drawScore].forEach((score) => {
    score.textContent = 0;
  });
  displayWinnerElement.innerHTML = '';
  historyElement.innerHTML = '';
  localStorage.clear();
});

autoPlayBtn.addEventListener('click', autoPlay);
