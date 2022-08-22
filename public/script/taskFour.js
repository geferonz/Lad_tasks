import * as Data from './data.js';
let evstafiy = Data.default.evstafiy;
let monster = Data.default.monster;

const difficultyForm = document.querySelector('.difficulty-selection');
const battleForm = document.querySelector('.battle-action');
const startBattle = document.querySelector('#start-battle');
const select = document.querySelector('select');
let playerMoves;
let enemyMoves;

difficultyForm.addEventListener("submit", function(event) {
  const dataForm = new FormData(difficultyForm);
  for (const entry of dataForm) {
    evstafiy.maxHealth = entry[1];
  }

  init();
  event.preventDefault();
}, false);

battleForm.addEventListener("submit", function(event) {
  const dataForm = new FormData(battleForm);
  for (const entry of dataForm) {
    playerMoves = evstafiy.moves[entry[1]];
  }

  round (playerMoves, enemyMoves);
  event.preventDefault();
}, false);

select.addEventListener("change", function() {
  playerMoves = evstafiy.moves[Number(select.value)];
  document.querySelector('.description').innerHTML = descriptionSkill (playerMoves);
}, false);

startBattle.addEventListener("click", function(event) {
  newBattle();
  event.preventDefault();
}, false);

function init () {
  playerMoves = evstafiy.moves[0];
  enemyMoves = monster.moves[monsterMoves ()];
  document.querySelector('.monster-name').innerHTML = monster.name;
  document.querySelector('.monster-health').innerHTML = monster.maxHealth;
  document.querySelector('.player-name').innerHTML = evstafiy.name;
  document.querySelector('.player-health').innerHTML = evstafiy.maxHealth;
  document.querySelector('.description').innerHTML = descriptionSkill (playerMoves);
  writeTurn (`монстр ${monster.name} кричит:<br />-Сейчас я использую ${enemyMoves.name}!`);
  document.querySelector('.difficulty-selection').classList.remove("active");
  document.querySelector('.battle-action').classList.add("active");
}

function round (_playerMoves, _enemyMoves) {
  if (playerMoves.timeCooldown) {
    writeTurn (`Эта способность перезаряжается, используйте другую!`);
  } else {
    if (playerMoves.cooldown) playerMoves.timeCooldown = playerMoves.cooldown;
    let monsterHealth = document.querySelector('.monster-health').innerHTML;
    let playerHealth = document.querySelector('.player-health').innerHTML;
    let monsterDamage = Math.floor(_enemyMoves.physicalDmg * (1 - _playerMoves.physicArmorPercents/100) + _enemyMoves.magicDmg * (1 - _playerMoves.magicArmorPercents/100));
    let playerDamage = Math.floor(_playerMoves.physicalDmg * (1 - _enemyMoves.physicArmorPercents/100) + _playerMoves.magicDmg * (1 - _enemyMoves.magicArmorPercents/100));

    document.querySelector('.monster-health').innerHTML = monsterHealth - playerDamage;
    document.querySelector('.player-health').innerHTML = playerHealth - monsterDamage;

    writeTurn (`маг ${evstafiy.name} применяет способность<br />${playerMoves.name}`);
    writeTurn (`${evstafiy.name} наносит ${playerDamage} урона<br />${monster.name} наносит ${monsterDamage} урона`);

    if (monsterHealth - playerDamage < 1) {
      endBattle ('Вы победили!');
    } else if (playerHealth - monsterDamage < 1) {
      endBattle ('Вы проиграли!');
    } else {
      turnCooldown(evstafiy.moves);
      turnCooldown(monster.moves);
      enemyMoves = monster.moves[monsterMoves ()];
      writeTurn (`монстр ${monster.name} кричит:<br />-Сейчас я использую ${enemyMoves.name}!`);
    }
  }
}

function endBattle (text) {
  document.getElementById('action').disabled = true;
  writeTurn (text);
}

function newBattle () {
  deleteCooldown(evstafiy.moves);
  deleteCooldown(monster.moves);
  document.getElementById('action').disabled = false;
  document.querySelector('.battle-list').innerHTML = '';
  document.querySelector('.difficulty-selection').classList.add("active");
  document.querySelector('.battle-action').classList.remove("active");
}

function turnCooldown (moves) {
  for (let item in moves) {
    if (moves[item].timeCooldown ) {
      moves[item].timeCooldown--;
    }
  }
}

function deleteCooldown (moves) {
  for (let item in moves) {
    if (moves[item].timeCooldown ) {
      moves[item].timeCooldown = 0;
    }
  }
}

function monsterMoves () {
  let moves = Math.floor(Math.random() * 3);
  while (monster.moves[moves].timeCooldown) {
    moves = Math.floor(Math.random() * 3);
  }

  monster.moves[moves].timeCooldown = monster.moves[moves].cooldown;
  return moves;
}

function descriptionSkill (skill) {
  return `
    Физический урон: ${skill.physicalDmg}<br />
    Магический урон: ${skill.magicDmg}<br />
    Физическая броня: ${skill.physicArmorPercents}<br />
    Магическая броня: ${skill.magicArmorPercents}<br />
    Ходов на восстановление: ${skill.cooldown}
  `;
}

function writeTurn (text) {
  const table = document.querySelector('.battle-list');
  const newLine = document.createElement('p');

  newLine.innerHTML = text;
  table.appendChild(newLine);
  table.scrollTo(0,table.scrollHeight);
}
