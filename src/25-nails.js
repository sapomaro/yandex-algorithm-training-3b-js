/*

25. Гвоздики

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

В дощечке в один ряд вбиты гвоздики. Любые два гвоздика можно соединить ниточкой. Требуется соединить 
некоторые пары гвоздиков ниточками так, чтобы к каждому гвоздику была привязана хотя бы одна ниточка, 
а суммарная длина всех ниточек была минимальна.

Формат ввода

В первой строке входных данных записано число N — количество гвоздиков (2 ≤ N ≤ 100). В следующей строке 
заданы N чисел — координаты всех гвоздиков (неотрицательные целые числа, не превосходящие 10000).

Формат вывода

Выведите единственное число — минимальную суммарную длину всех ниточек.

Пример

Ввод
6
3 13 12 4 14 6

Вывод
5

*/

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const coords = input[1].split(' ')
  .map((value) => parseInt(value))
  .sort((a, b) => a - b);

const data = [0, 0];
let diff = 0;
let index = 0;

for (let i = 1; i < coords.length; ++i) {
  index = i + 1;
  diff = coords[index - 1] - coords[index - 2];

  if (!data[index - 1]) {
    data[index - 1] = diff;
  }

  data[index] = Math.min(data[index - 2], data[index - 1]) + diff;
}

const output = '' + data.pop();

fs.writeFileSync('output.txt', output);
