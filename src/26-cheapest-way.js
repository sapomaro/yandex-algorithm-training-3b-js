/*

26. Самый дешевый путь

Ограничение времени	1 секунда
Ограничение памяти	256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

В каждой клетке прямоугольной таблицы N × M записано некоторое число. Изначально игрок находится 
в левой верхней клетке. За один ход ему разрешается перемещаться в соседнюю клетку либо вправо, 
либо вниз (влево и вверх перемещаться запрещено). При проходе через клетку с игрока берут столько 
килограммов еды, какое число записано в этой клетке (еду берут также за первую и последнюю клетки его пути).

Требуется найти минимальный вес еды в килограммах, отдав которую игрок может попасть в правый нижний угол.

Формат ввода

Вводятся два числа N и M — размеры таблицы (1 ≤ N ≤ 20, 1 ≤ M ≤ 20). Затем идет N строк по M чисел в каждой — 
размеры штрафов в килограммах за прохождение через соответствующие клетки (числа от 0 до 100).

Формат вывода

Выведите минимальный вес еды в килограммах, отдав которую можно попасть в правый нижний угол.

Пример

Ввод
5 5
1 1 1 1 1
3 100 100 100 100
1 1 1 1 1
2 2 2 2 1
1 1 1 1 1

Вывод
11

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
  array[0] = Infinity;
  return array;
});
moves[0] = Array(width + 1).fill(Infinity);
moves[0][1] = 0;

for (let i = 1; i < lines.length; ++i) {
  zone[i] = ('0 ' + lines[i]).trim().split(' ').map((value) => parseInt(value));
}

for (let y = 1; y <= height; ++y) {
  for (let x = 1; x <= width; ++x) {
    moves[y][x] = zone[y][x] + Math.min(moves[y - 1][x], moves[y][x - 1]);
  }
}

const output = '' + moves[height][width];

fs.writeFileSync('output.txt', output);
