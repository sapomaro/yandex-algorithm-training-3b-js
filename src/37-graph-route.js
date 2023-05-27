/*

37. Путь в графе

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

В неориентированном графе требуется найти минимальный путь между двумя вершинами.

Формат ввода

Первым на вход поступает число N – количество вершин в графе (1 ≤ N ≤ 100). Затем записана матрица 
смежности (0 обозначает отсутствие ребра, 1 – наличие ребра). Далее задаются номера двух вершин – 
начальной и конечной.

Формат вывода

Выведите сначала L – длину кратчайшего пути (количество ребер, которые нужно пройти), а потом сам путь. 
Если путь имеет длину 0, то его выводить не нужно, достаточно вывести длину.

Необходимо вывести путь (номера всех вершин в правильном порядке). Если пути нет, нужно вывести -1.

Пример

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
5 2 4

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
  paths = [];
  shortest = Infinity;

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

  getPrevs(vertice, prevs) {
    const path = [];

    while (vertice) {
      path.push(vertice);
      vertice = prevs[vertice];
    }

    return path;
  }

  bfsStep(queue, distances, distances2, prevs, prevs2) {
    let vertice = '';
    let from = '';
    let neighbor = '';
    let distance = 0;

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
        prevs[neighbor] = vertice;
        queue.push([neighbor, vertice, distance + 1]);

        if (typeof distances2[neighbor] !== 'undefined' || distances2[neighbor] === 0) {
          distance = distances[neighbor] + distances2[neighbor];

          if (distance < this.shortest) {
            this.shortest = distance;
            this.paths[distance] = this.getPrevs(prevs[neighbor], prevs)
              .reverse()
              .concat([neighbor], this.getPrevs(prevs2[neighbor], prevs2));
          }
        }
      }
    }

    return null;
  }

  bfsShortest(vertice1, vertice2) {
    if (vertice1 === vertice2) {
      return [vertice1];
    }

    const queue1 = new Queue(10000);
    queue1.push([vertice1, null, 0]);
    const distances1 = {};
    distances1[vertice1] = 0;
    const prevs1 = {};

    const queue2 = new Queue(10000);
    queue2.push([vertice2, null, 0]);
    const distances2 = {};
    distances2[vertice2] = 0;
    const prevs2 = {};

    while (queue1.size > 0 || queue2.size > 0 ) {
      this.bfsStep(queue1, distances1, distances2, prevs1, prevs2);
      this.bfsStep(queue2, distances2, distances1, prevs2, prevs1);
    }

    const paths = Object.entries(this.paths)
      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
      .pop();

    if (paths && paths[1]) {
      if (paths[1][0] !== vertice1) {
        return paths[1].reverse();
      }
      return paths[1];
    }

    return null;
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

let output = '';
const result = graph.bfsShortest(a, b);

if (!result) {
  output = '-1';
} else if (result.length === 1) {
  output = '0';
} else {
  output = (result.length - 1) + '\n' + result.join(' ');
}

fs.writeFileSync('output.txt', output);
