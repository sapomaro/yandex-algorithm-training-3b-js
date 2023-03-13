/*

36. Длина кратчайшего пути

                     Все языки   Python 3.6
Ограничение времени  1 секунда   5 секунд
Ограничение памяти   64Mb        256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

В неориентированном графе требуется найти длину минимального пути между двумя вершинами.

Формат ввода
Первым на вход поступает число N – количество вершин в графе (1 ≤ N ≤ 100). Затем записана матрица 
смежности (0 обозначает отсутствие ребра, 1 – наличие ребра). Далее задаются номера двух вершин – 
начальной и конечной.

Формат вывода
Выведите L – длину кратчайшего пути (количество ребер, которые нужно пройти).

Если пути нет, нужно вывести -1.

Пример 1

Ввод
10
0 1 0 0 0 0 0 0 0 0
1 0 0 1 1 0 1 0 0 0
0 0 0 0 1 0 0 0 1 0
0 1 0 0 0 0 1 0 0 0
0 1 1 0 0 0 0 0 0 1
0 0 0 0 0 0 1 0 0 1
0 1 0 1 0 1 0 0 0 0
0 0 0 0 0 0 0 0 1 0
0 0 1 0 0 0 0 1 0 0
0 0 0 0 1 1 0 0 0 0
5 4

Вывод
2

Пример 2

Ввод
5
0 1 0 0 1
1 0 1 0 0
0 1 0 0 0
0 0 0 0 0
1 0 0 0 0
3 5

Вывод
3

*/

const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const verticesCount = parseInt(lines[0]);

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

  addEdge(vertice1, vertice2) {
    if (vertice1 !== vertice2) {
      this.addEdgeDirected(vertice1, vertice2);
      this.addEdgeDirected(vertice2, vertice1);
    }
  }

  addEdgeDirected(vertice1, vertice2) {
    this.data[vertice1].add(vertice2);
  }

  addVertice(vertice) {
    if (typeof this.data[vertice] === 'undefined') {
      this.data[vertice] = new Set();
    }
  }

  bfsAll(visited = {}) {
    for (const vertice in this.data) {
      if (this.data.hasOwnProperty(vertice) && typeof visited[vertice] === 'undefined') {
        this.bfs(vertice, visited);
      }
    }

    return visited;
  }

  bfsShortest(vertice1, vertice2) {
    if (vertice1 === vertice2) {
      return 0;
    }

    const variants = [];

    const queue1 = new Queue(101);
    queue1.push([vertice1, null, 0]);
    const distances1 = {};
    distances1[vertice1] = 0;

    const queue2 = new Queue(101);
    queue2.push([vertice2, null, 0]);
    const distances2 = {};
    distances2[vertice2] = 0;

    let vertice = '';
    let from = '';
    let neighbor = '';
    let distance = 0;

    const step = (queue, distances, distances2) => {
      if (queue.size === 0) {
        return null;
      }

      [vertice, from, distance] = queue.pop();

      for (neighbor of this.data[vertice]) {
        if (from === neighbor) {
          continue;
        }
        if (typeof distances[neighbor] === 'undefined') {
          distances[neighbor] = distance + 1;
          queue.push([neighbor, vertice, distance + 1]);

          if (typeof distances2[neighbor] !== 'undefined' || distances2[neighbor] === 0) {
            variants.push(distances[neighbor] + distances2[neighbor]);
          }
        }
      }

      return null;
    };

    while (queue1.size > 0 || queue2.size > 0 ) {
      step(queue1, distances1, distances2);
      step(queue2, distances2, distances1);
    }

    return (variants.length > 0) ? Math.min(...variants) : -1;
  }
}

const graph = new Graph();

let i2 = '';
let chunk;
let a = '';
let b = '';

for (let i = 1; i < lines.length; ++i) {
  chunk = lines[i].trim().split(' ');

  if (i === lines.length - 1) {
    a = chunk[0];
    b = chunk[1];
    break;
  }

  for (let j = 0; j < chunk.length; ++j) {
    if (chunk[j] === '1') {
      i2 = j + 1;
      graph.addVertice(i.toString());
      graph.addVertice(i2.toString());
      graph.addEdgeDirected(i.toString(), i2.toString());
    }
  }
}

for (let v = 1; v <= verticesCount; ++v) {
  graph.addVertice(v.toString());
}

const output = '' + graph.bfsShortest(a, b);

fs.writeFileSync('output.txt', output);
