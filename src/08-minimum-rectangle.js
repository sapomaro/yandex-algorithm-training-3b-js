/*

8. Минимальный прямоугольник

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

На клетчатой плоскости закрашено K клеток. Требуется найти минимальный по площади прямоугольник, со сторонами, 
параллельными линиям сетки, покрывающий все закрашенные клетки.

Формат ввода

Во входном файле, на первой строке, находится число K (1 ≤ K ≤ 100). На следующих K строках находятся 
пары чисел Xi и Yi – координаты закрашенных клеток (|Xi|, |Yi| ≤ 109).

Формат вывода

Выведите в выходной файл координаты левого нижнего и правого верхнего углов прямоугольника.

Пример

Ввод	
3
1 1
1 10
5 5

Вывод
1 1 5 10

*/

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').toString();

const lines = input.trim().split('\n');

let minX = 0;
let minY = 0;
let maxX = 0;
let maxY = 0;

for (let i = lines.length - 1; i >= 1; --i) {
  const coords = lines[i].split(' ');
  const x = parseInt(coords[0]);
  const y = parseInt(coords[1]);

  if (minX === 0 || minX > x) {
    minX = x;
  }
  if (maxX === 0 || maxX < x) {
    maxX = x;
  }
  if (minY === 0 || minY > y) {
    minY = y;
  }
  if (maxY === 0 || maxY < y) {
    maxY = y;
  }
}

const output = minX +' '+ minY +' '+ maxX +' '+ maxY;

fs.writeFileSync('output.txt', output);
