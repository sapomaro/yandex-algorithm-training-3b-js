/*

39. Путь спелеолога

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Пещера представлена кубом, разбитым на N частей по каждому измерению (то есть на N3 кубических клеток). 
Каждая клетка может быть или пустой, или полностью заполненной камнем. Исходя из положения спелеолога 
в пещере, требуется найти, какое минимальное количество перемещений по клеткам ему требуется, чтобы 
выбраться на поверхность. Переходить из клетки в клетку можно, только если они обе свободны и имеют 
общую грань.

Формат ввода

В первой строке содержится число N (1 ≤ N ≤ 30). Далее следует N блоков. Блок состоит из пустой 
строки и N строк по N символов: # - обозначает клетку, заполненную камнями, точка - свободную клетку. 
Начальное положение спелеолога обозначено заглавной буквой S. Первый блок представляет верхний уровень 
пещеры, достижение любой свободной его клетки означает выход на поверхность. Выход на поверхность всегда 
возможен.

Формат вывода

Вывести одно число - длину пути до поверхности.

Пример

Ввод
3

###
###
.##

.#.
.#S
.#.

###
...
###

Вывод
6

Примечания

Нужно спуститься на уровень вниз, сделать два движения на запад, подняться на уровень вверх, сделать 
движение на юг, подняться на уровень вверх.

*/

const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

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
  data = {};

  addVertice(vertice) {
    if (typeof this.data[vertice] === 'undefined') {
      this.data[vertice] = -1;
    }
  }

  listAllVertices(callback) {
    for (const vertice in this.data) {
      if (this.data.hasOwnProperty(vertice)) {
        callback(vertice, this.data[vertice]);
      }
    }
  }

  bfsDistanceToSurface(vertice) {
    const queue = new Queue(1000);
    let distance = 0;

    queue.push(vertice);
    this.data[vertice] = distance;

    while (queue.size > 0) {
      vertice = queue.pop();
      distance = this.data[vertice];

      const [x, y, z] = this.getCoordsFromVertice(vertice);

      if (z === 0) {
        return distance;
      }

      const connections = [
        graph.getVerticeFromCoords(x + 1, y, z),
        graph.getVerticeFromCoords(x - 1, y, z),
        graph.getVerticeFromCoords(x, y + 1, z),
        graph.getVerticeFromCoords(x, y - 1, z),
        graph.getVerticeFromCoords(x, y, z + 1),
        graph.getVerticeFromCoords(x, y, z - 1),
      ];

      for (const neighbor of connections) {
        if (neighbor in this.data && this.data[neighbor] === -1) {
          queue.push(neighbor);
          this.data[neighbor] = distance + 1;
        }
      }
    }

    return -1;
  }

  getCoordsFromVertice(str) {
    const [x, y, z] = str.split(',');
    return [parseInt(x), parseInt(y), parseInt(z)];
  }

  getVerticeFromCoords(...args) {
    return args.join(',');;
  }
}

const graph = new Graph();

let x = -1;
let y = -1;
let z = -1;

let start = '';
let vertice = '';

for (let i = 1; i < lines.length; ++i) {
  chunk = lines[i].trim();

  if (chunk === '') {
    ++z;
    y = -1;
    continue;
  } else {
    ++y;
  }

  for (x = 0; x < chunk.length; ++x) {
    vertice = graph.getVerticeFromCoords(x, y, z);

    if (chunk[x] === '#') {
      continue;
    }
    if (chunk[x] === 'S') {
      start = vertice;
    }

    graph.addVertice(vertice);
  }
}

const output = '' + graph.bfsDistanceToSurface(start);

fs.writeFileSync('output.txt', output);

//const used = process.memoryUsage().heapUsed / 1024 / 1024;
//console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
