const days = {
  "ПОНЕДЕЛЬНИК": "MONDAY",
  "ВТОРНИК": "TUESDAY",
  "СРЕДА": "WEDNESDAY",
  "ЧЕТВЕРГ": "THURSDAY",
  "ПЯТНИЦА": "FRIDAY",
  "СУББОТА": "SATURDAY",
  "ВОСКРЕСЕНЬЕ": "SUNDAY"
}

let str = `Старший братец ПОНЕДЕЛЬНИК –<br>
работяга, не бездельник.<br>
Он неделю открывает<br>
всех трудиться зазывает.<br><br>

ВТОРНИК следует за братом<br>
у него идей богато.<br><br>

А потом СРЕДА-сестрица,<br>
не пристало ей лениться.<br><br>

Брат ЧЕТВЕРГ и так, и сяк,<br>
он мечтательный чудак.<br><br>

ПЯТНИЦА-сестра сумела<br>
побыстрей закончить дело.<br><br>

Предпоследний брат СУББОТА<br>
не выходит на работу.<br><br>

В гости ходит ВОСКРЕСЕНЬЕ,<br>
очень любит угощенье
`;

function dayTranslation (string, replacement) {
  let newStr = string;
  for (let item in replacement) {
      newStr = newStr.replaceAll(item, replacement[item]);
  }

  return newStr;
}

document.getElementById("first").innerHTML = dayTranslation(str, days);
