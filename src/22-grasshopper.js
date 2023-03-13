/*

22. Кузнечик

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

У одного из студентов в комнате живёт кузнечик, который очень любит прыгать по клетчатой одномерной 
доске. Длина доски — N клеток. К его сожалению, он умеет прыгать только на 1, 2, …, k клеток вперёд.

Однажды студентам стало интересно, сколькими способами кузнечик может допрыгать из первой клетки до последней. 
Помогите им ответить на этот вопрос.

Формат ввода

В первой и единственной строке входного файла записано два целых числа — N и k (1 ≤ N ≤ 30, 1 ≤ k ≤ 10).

Формат вывода

Выведите одно число — количество способов, которыми кузнечик может допрыгать из первой клетки до последней.

Пример

Ввод
8 2

Вывод
21

*/

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').toString().trim().split(' ');

const deskLen = parseInt(input[0]);

const jumpLen = parseInt(input[1]);

const cache = [0, 1, 1, 2];

function linearRecurrenceSequence(num, predecessors = 2) {
  if (predecessors === 1) {
    return 1;
  } else if (typeof cache[num] === 'number') {
    return cache[num];
  } else {
    cache[num] = 0;
    for (let i = predecessors; i > 0; --i) {
      if (num < 1) {
        break;
      }
      cache[num] += linearRecurrenceSequence(num - i, predecessors);
    }
    return cache[num];
  }
}

let output = '' + linearRecurrenceSequence(deskLen, jumpLen);

fs.writeFileSync('output.txt', output);
