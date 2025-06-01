const possibleMoves = ['rock', 'paper', 'scissors'];
const btns = document.querySelectorAll('.btn');
const resetBtn = document.querySelector('.resetBtn');

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

computerScore.textContent = persistScore.computer;
playerScore.textContent = persistScore.player;
drawScore.textContent = persistScore.draw;

// display history
persistScore.history.forEach(
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
{
  /* <div
  className={`${
    h === 'Player'
      ? 'bg-green-400'
      : h === 'Computer'
      ? 'bg-red-400'
      : 'bg-gray-400'
  }`}
></div>; */
}
// functions
const calculateWinner = (playerMove, computerMove) => {
  let winner;
  let newScores;
  let computerScoreToNumber = +computerScore.textContent;
  let playerScoreToNumber = +playerScore.textContent;
  let drawScoreToNumber = +drawScore.textContent;

  const persistHistory =
    JSON.parse(localStorage.getItem('persistScore'))?.history || [];
  if (
    (playerMove == 'rock' && computerMove == 'paper') ||
    (playerMove == 'paper' && computerMove == 'scissors') ||
    (playerMove == 'scissors' && computerMove == 'rock')
  ) {
    winner = 'Computer';
    computerScoreToNumber++;
    computerScore.textContent = computerScoreToNumber;
  } else if (
    (computerMove == 'rock' && playerMove == 'paper') ||
    (computerMove == 'paper' && playerMove == 'scissors') ||
    (computerMove == 'scissors' && playerMove == 'rock')
  ) {
    winner = 'Player';
    playerScoreToNumber++;
    playerScore.textContent = playerScoreToNumber;
  } else {
    winner = 'Draw';
    drawScoreToNumber++;
    drawScore.textContent = drawScoreToNumber;
  }

  //update local storage
  newScores = {
    player: playerScoreToNumber,
    computer: computerScoreToNumber,
    draw: drawScoreToNumber,
    history: [...persistHistory, winner],
  };

  localStorage.setItem('persistScore', JSON.stringify(newScores));
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
  historyElement.innerHTML += `
    <div title="round ${
      persistHistory.length + 1
    }: ${winner}" class="cursor-pointer ${
    winner === 'Player'
      ? 'bg-green-400'
      : winner === 'Computer'
      ? 'bg-red-400'
      : 'bg-gray-400'
  } h-12 w-12" ></div>`;
};

// add event listener to each btns
btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const playerMove = btn.id;
    const randomMove = Math.floor(Math.random() * possibleMoves.length);
    const computerMove = possibleMoves[randomMove];
    calculateWinner(playerMove, computerMove);
  });
});

// reset the game score
resetBtn.addEventListener('click', () => {
  [computerScore, playerScore, drawScore].forEach((score) => {
    score.textContent = 0;
  });
  displayWinnerElement.innerHTML = '';
  localStorage.clear();
});
