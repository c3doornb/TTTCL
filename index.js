const readline = require('readline');

let playerTurn = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `X's turn. Enter 1-9> `
});

let board;
const newBoard = () => {
  board = [];
  for (let i = 0; i < 3; i += 1) {
    board.push(new Array(3).fill(' '));
  }
}
newBoard();

const printBoard = () => {
  for (let r = 0; r < 3; r += 1) {
    console.log(`  ${board[r].join(' | ')}  `);
    r < 2 && console.log('  ---------');
  }
}

const getPlayer = (playerTurn) => {
  return playerTurn % 2 === 0 ? 'X' : 'O';
}

const nextTurn = () => {
  console.log('\n');
  printBoard();
  console.log('\n');

  rl.setPrompt(`${getPlayer(playerTurn)}'s turn. Enter 1-9> `);
  rl.prompt();
}


const getBoardCoords = (input) => {
  input = Number(input);
  let coords = [];
  if (input < 4) {
    coords[0] = 2;
  } else {
    coords[0] = input < 7 ? 1 : 0;
  }

  if (input % 3 === 0) {
    coords[1] = 2;
  } else {
    coords[1] = input % 3 === 1 ? 0 : 1;
  }

  return coords;
}

const inputIsAcceptable = (input) => {
  if (typeof Number(input) !== 'number' || Number(input) < 1 || Number(input) > 9) {
    return false;
  }

  let coords = getBoardCoords(input);
  return board[coords[0]][coords[1]] === ' ';
}

const makeMove = (input) => {
  let coords = getBoardCoords(input);
  board[coords[0]][coords[1]] = getPlayer(playerTurn);
}

const hasWon = (letter) => {
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      if (board[r][c] === letter) {
        if (c === 2) {
          return true;
        }
      } else {
        break;
      }
    }
  }

  for (let c = 0; c < 3; c += 1) {
    for (let r = 0; r < 3; r += 1) {
      if (board[r][c] === letter) {
        if (r === 2) {
          return true;
        }
      } else {
        break;
      }
    }
  }

  if (board[2][0] === board[1][1] && board[2][0] === board[0][2] && board[2][0] === letter) {
    return true;
  }
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === letter) {
    return true;
  }
  return false;
}

const playerWin = (player) => {
  console.log('\n');
  printBoard();
  console.log('\n');
  console.log(`${player} wins!`);
}

const draw = () => {
  console.log('\n');
  console.log('DRAW');
}

const newGame = () => {
  playerTurn = 0;
  newBoard();
  nextTurn();
}

rl.on('line', line => {
  if (inputIsAcceptable(line)) {
    makeMove(line);
    if (hasWon(getPlayer(playerTurn))) {
      playerWin(getPlayer(playerTurn));
      newGame();
    } else {
      playerTurn++;
      if (playerTurn === 9) {
        draw();
        newGame();
      } else {
        nextTurn();
      }
    }
  } else {
    rl.clearLine();
    rl.prompt();
  }
});

nextTurn();
