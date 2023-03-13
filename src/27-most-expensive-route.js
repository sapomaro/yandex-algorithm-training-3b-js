/*

27. Вывести маршрут максимальной стоимости

Ограничение времени	1 секунда
Ограничение памяти	256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

В левом верхнем углу прямоугольной таблицы размером N × M находится черепашка. В каждой клетке таблицы 
записано некоторое число. Черепашка может перемещаться вправо или вниз, при этом маршрут черепашки 
заканчивается в правом нижнем углу таблицы.

Подсчитаем сумму чисел, записанных в клетках, через которую проползла черепашка (включая начальную 
и конечную клетку). Найдите наибольшее возможное значение этой суммы и маршрут, на котором достигается 
эта сумма.

Формат ввода

В первой строке входных данных записаны два натуральных числа N и M, не превосходящих 100 — размеры таблицы. 
Далее идет N строк, каждая из которых содержит M чисел, разделенных пробелами — описание таблицы. 
Все числа в клетках таблицы целые и могут принимать значения от 0 до 100.

Формат вывода

Первая строка выходных данных содержит максимальную возможную сумму, вторая — маршрут, на котором 
достигается эта сумма. Маршрут выводится в виде последовательности, которая должна содержать N-1 букву D, 
означающую передвижение вниз и M-1 букву R, означающую передвижение направо. Если таких последовательностей 
несколько, необходимо вывести ровно одну (любую) из них.

Пример

Ввод
5 5
9 9 9 9 9
3 0 0 0 0
9 9 9 9 9
6 6 6 6 8
9 9 9 9 9

Вывод
74
D D R R R R D D

*/

const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const size = lines[0].trim().split(' ');
const height = parseInt(size[0]);
const width = parseInt(size[1]);

const zone = Array(height + 1);
zone[0] = Array(width + 1).fill(0);

const moves = Array(height + 1).fill().map(() => {
  const array = Array(width + 1).fill(0);
  array[0] = -1;
  return array;
});
moves[0] = Array(width + 1).fill(-1);
moves[0][1] = 0;

for (let i = 1; i < lines.length; ++i) {
  zone[i] = ('0 ' + lines[i]).trim().split(' ').map((value) => parseInt(value));
}

for (let y = 1; y <= height; ++y) {
  for (let x = 1; x <= width; ++x) {
    moves[y][x] = zone[y][x] + Math.max(moves[y - 1][x], moves[y][x - 1]);
  }
}

const max = moves[height][width];

let sequence = '';

let x = width;
let y = height;

while (x >= 1 && y >= 1) {
  const top = moves[y - 1][x];
  const left = moves[y][x - 1];
  if (top > left) {
    --y;
    if (y < 1) {
      break;
    }
    sequence = 'D ' + sequence;
  } else {
    --x;
    sequence = 'R ' + sequence;
  }
}

const output = max + '\n' + sequence.trim();

fs.writeFileSync('output.txt', output);
