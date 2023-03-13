/*

38. Блохи

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

На клеточном поле, размером NxM (2 ≤ N, M ≤ 250) сидит Q (0 ≤ Q ≤ 10000) блох в различных клетках. 
"Прием пищи" блохами возможен только в кормушке - одна из клеток поля, заранее известная. Блохи 
перемещаются по полю странным образом, а именно, прыжками, совпадающими с ходом обыкновенного шахматного 
коня. Длина пути каждой блохи до кормушки определяется как количество прыжков. Определить минимальное 
значение суммы длин путей блох до кормушки или, если собраться блохам у кормушки невозможно, то сообщить 
об этом. Сбор невозможен, если хотя бы одна из блох не может попасть к кормушке.

Формат ввода
В первой строке входного файла находится 5 чисел, разделенных пробелом: N, M, S, T, Q. N, M - размеры доски 
(отсчет начинается с 1); S, T - координаты клетки - кормушки (номер строки и столбца соответственно), 
Q - количество блох на доске. И далее Q строк по два числа - координаты каждой блохи.

Формат вывода
Содержит одно число - минимальное значение суммы длин путей или -1, если сбор невозможен.

Пример 1

Ввод
2 2 1 1 1
2 2

Вывод
-1

Пример 2

Ввод
4 4 1 1 16
1 1
1 2
1 3
1 4
2 1
2 2
2 3
2 4
3 1
3 2
3 3
3 4
4 1
4 2
4 3
4 4

Вывод
42

*/

const fs = require('fs');

class Queue {
  data = [];
  start = 0;
  end = 0;
  max = Infinity;

  constructor(max = Infinity) {
    this.max = max;
  }
  push(item) {
    this.data[this.end % this.max] = item;
    ++this.end;
  }
  pop() {
    const item = this.front;
    ++this.start;
    return item;
  }
  get front() {
    return this.data[this.start % this.max];
  }
  get size() {
    return this.end - this.start;
  }
  clear() {
    this.data = [];
    this.start = 0;
    this.end = 0;
  }
}

class Graph {
  bfs(x, y) {
    const queue = new Queue(32000);
    let distance = 0;

    queue.push([x, y]);
    this.data[x][y] = distance;

    while (queue.size > 0) {
      [x, y] = queue.pop();
      distance = this.data[x][y];

      const moves = [
        [x + 1, y + 2],
        [x + 1, y - 2],
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x - 1, y + 2],
        [x - 1, y - 2],
        [x - 2, y + 1],
        [x - 2, y - 1],
      ];

      for (const [x, y] of moves) {
        if (this.data[x] && this.data[x][y] === -1) {
          queue.push([x, y]);
          this.data[x][y] = distance + 1;
        }
      }
    }
  }
}

const graph = new Graph();

const lines = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const settings = lines[0].trim().split(' ');

const width = parseInt(settings[0]);
const height = parseInt(settings[1]);

graph.data = Array(width).fill().map(() => Array(height).fill(-1));

const feederX = parseInt(settings[2]) - 1;
const feederY = parseInt(settings[3]) - 1;

graph.bfs(feederX, feederY);

let coords;
let x = 0;
let y = 0;

let sum = 0;

for (let i = 1; i < lines.length; ++i) {
  coords = lines[i].trim().split(' ');
  x = parseInt(coords[0]) - 1;
  y = parseInt(coords[1]) - 1;

  if (graph.data[x][y] !== -1) {
    sum += graph.data[x][y];
  } else {
    sum = -1;
    break;
  }
}

const output = '' + sum;

fs.writeFileSync('output.txt', output);
