let lengthNum = getLengthNum(3, 6);
let goal = getNum();

function getLengthNum (minLenth, maxLenth) {
  return Math.floor(Math.random() * (maxLenth - minLenth + 1) + minLenth);
}

function getNum () {
  let number = [];

  while (number.length < lengthNum) {
    const newNum = Math.floor(Math.random() * 10);
    if (number.indexOf(newNum) < 0) {
      number.push(newNum);
    }
  }

  document.querySelector('.number').innerHTML = number.map(() => 'x').join(' ');

  return number;
}

function guess () {
  const playerNumber = document.querySelector('#player').value;
  let arr = [];

  if (playerNumber.length === 0 || isNaN(playerNumber)) {
    alert('Пожалуйста введите число!');
  } else if (playerNumber.length !== goal.length) {
    alert('Некорректная длина числа!');
  } else if (playerNumber.length !== Array.from(new Set(playerNumber)).length) {
    alert('Цифры в числе не должны повторяться!');
  } else {
    for (let i = 0; i < lengthNum; i++) {
      let newUserArrElement = parseInt(playerNumber.substr(i, 1));
      arr.push(newUserArrElement);
    }
  
    check(arr);
  }
}

function check (par) {
  let bulls = 0;
  let cows = 0;
  let turns = parseInt(document.querySelector('.turns').innerHTML);

  turns--;

  for (let i = 0; i < lengthNum; i++) {
    if (par[i] === goal[i]) {
      bulls++;
    } else if (goal.indexOf(par[i]) >= 0) {
      cows++;
    }
  }
  document.querySelector('.turns').innerHTML = turns;

  if (turns === 0 || bulls === lengthNum) {
    let status = 'проиграли!';
    if (bulls === lengthNum) {
      status = 'победили!';
    }

    endGame(status);
  } else {
    writeTurn(par + '<br />цифр на своих местах: ' + bulls + '<br />цифр не на своих местах: ' + cows);
  }
}

function writeTurn (text) {
  const table = document.querySelector('.turn-list');
  const newLine = document.createElement('p');

  newLine.innerHTML = text;
  table.appendChild(newLine);
  table.scrollTo(0,table.scrollHeight);
}

function endGame (status) {

  document.getElementById('guess-number').disabled = true;
  document.querySelector('.number').innerHTML = goal;
  writeTurn('Вы ' + status + '<br />Загаданное число: ' + goal.join(''));
}

function newGame () {
  document.getElementById('guess-number').disabled = false;
  document.querySelector('#player').value = '';
  document.querySelector('.turns').innerHTML = '10';
  document.querySelector('.turn-list').innerHTML = '';
  lengthNum = getLengthNum(3, 6);
  goal = getNum();
}
