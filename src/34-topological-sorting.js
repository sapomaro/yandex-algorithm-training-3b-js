/*

34. Топологическая сортировка

Ограничение времени	2 секунды
Ограничение памяти	256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Дан ориентированный граф. Необходимо построить топологическую сортировку.

Формат ввода

В первой строке входного файла два натуральных числа N и M (1 ≤ N, M ≤ 100000) — количество вершин 
и рёбер в графе соответственно. Далее в M строках перечислены рёбра графа. Каждое ребро задаётся парой 
чисел — номерами начальной и конечной вершин соответственно.

Формат вывода

Выведите любую топологическую сортировку графа в виде последовательности номеров вершин (перестановка 
чисел от 1 до N). Если топологическую сортировку графа построить невозможно, выведите -1.

Пример

Ввод
6 6
1 2
3 2
4 2
2 5
6 5
4 6

Вывод
4 6 3 1 2 5 

*/

const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const size = lines[0].split(' ');

const verticesCount = parseInt(size[0]);

class Stack {
  data = [];

  push(item) {
    this.data.push(item);
  }

  pop() {
    return this.data.pop();
  }

  get back() {
    return this.data[this.data.length - 1];
  }

  get size() {
    return this.data.length;
  }
};

class Graph {
  data = {};
  stack = new Stack();

  addEdge(vertice1, vertice2) {
    this.addEdgeDirected(vertice1, vertice2);
    this.addEdgeDirected(vertice2, vertice1);
  }

  addEdgeDirected(vertice1, vertice2) {
    if (!this.data[vertice1].has(vertice2)) { // ???????
      this.data[vertice1].set(this.data[vertice1].size, vertice2);
    }
  }

  addVertice(vertice) {
    if (typeof this.data[vertice] === 'undefined') {
      this.data[vertice] = new Map();
    }
  }

  dfsTopologicalAll(visited = {}, sequence = new Stack()) {
    for (const vertice in this.data) {
      if (this.data.hasOwnProperty(vertice) && typeof visited[vertice] === 'undefined') {
        if (!this.dfsTopological(vertice, visited, sequence)) {
          return [-1];
        }
      }
    }

    return sequence.data.reverse();
  }

  dfsTopological(root, visited = {}, sequence = new Stack()) {
    let current = root;
    let action = 'forward';
    let visitStatus = 0;
    let childIndex = 0;
    let parent = null;

    while (current !== null) {
      if (action === 'forward') {
        visitStatus = 1;
        childIndex = 0;

        visited[current] = [visitStatus, childIndex, parent];
      } else if (action === 'back' || action === 'side') {
        [visitStatus, childIndex, parent] = visited[current];

        visited[current][1] = ++childIndex;
      }

      if (this.data[current].has(childIndex)) {
        parent = current;
        current = this.data[current].get(childIndex);

        if (visited[current]) {
          if (visited[current][0] === 1) {
            return false;
          } else {
            visited[current][2] = parent;
            action = 'side';
          }
        } else {
          action = 'forward';
        }
      } else {
        if (visited[current][0] !== 2) {
          sequence.push(current);
        }

        visited[current][0] = 2; // visitStatus
        current = parent;
        action = 'back';
      }
    }

    return true;
  }
}

const graph = new Graph();

let [vertice1, vertice2] = ['', ''];

for (let i = 1; i < lines.length; ++i) {
  [vertice1, vertice2] = lines[i].split(' ');

  graph.addVertice(vertice1);
  graph.addVertice(vertice2);
  graph.addEdgeDirected(vertice1, vertice2);
}

for (let v = 1; v <= verticesCount; ++v) {
  graph.addVertice(v);
}

const output = '' + graph.dfsTopologicalAll().join(' ');

fs.writeFileSync('output.txt', output);
