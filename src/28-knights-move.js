/*

28. Ход конём

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Дана прямоугольная доска N × M (N строк и M столбцов). В левом верхнем углу находится шахматный конь, 
которого необходимо переместить в правый нижний угол доски. В данной задаче конь может перемещаться 
на две клетки вниз и одну клетку вправо или на одну клетку вниз и две клетки вправо.

Необходимо определить, сколько существует различных маршрутов, ведущих из левого верхнего в правый нижний угол.

Формат ввода

Входной файл содержит два натуральных числа N и M (1 ≤ N, M ≤ 50).

Формат вывода

В выходной файл выведите единственное число — количество способов добраться конём до правого нижнего угла доски.

Пример 1

Ввод
3 2

Вывод
1

Пример 2

Ввод
31 34

Вывод
293930

*/

const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const size = lines[0].trim().split(' ');
const height = parseInt(size[0]) + 2;
const width = parseInt(size[1]) + 2;

const moves = Array(height).fill().map(() => Array(width).fill(0));

moves[2][2] = 1;

for (let y = 2; y < height; ++y) {
  for (let x = 2; x < width; ++x) {
    if (moves[y - 2][x - 1]) {
      moves[y][x] += moves[y - 2][x - 1];
    }
    if (moves[y - 1][x - 2]) {
      moves[y][x] += moves[y - 1][x - 2];
    }
  }
}

const max = moves[height - 1][width - 1];

const output = '' + max;

fs.writeFileSync('output.txt', output);
