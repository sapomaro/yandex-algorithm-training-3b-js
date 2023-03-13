/*

32. Компоненты связности

                      Все языки  Python 3.6
Ограничение времени	  2 секунды	 5 секунд
Ограничение памяти	  256Mb	     256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Дан неориентированный невзвешенный граф, состоящий из N вершин и M ребер. Необходимо посчитать количество 
его компонент связности и вывести их.

Формат ввода

Во входном файле записано два числа N и M (0 < N ≤ 100000, 0 ≤ M ≤ 100000). В следующих M строках записаны 
по два числа i и j (1 ≤ i, j ≤ N), которые означают, что вершины i и j соединены ребром.

Формат вывода

В первой строчке выходного файла выведите количество компонент связности. Далее выведите сами компоненты 
связности в следующем формате: в первой строке количество вершин в компоненте, во второй - сами вершины 
в произвольном порядке.

Пример 1

Ввод
6 4
3 1
1 2
5 4
2 3

Вывод
3
3
1 2 3 
2
4 5 
1
6 

Пример 2

Ввод
6 4
4 2
1 4
6 4
3 6

Вывод
2
5
1 2 3 4 6 
1
5 

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
    if (vertice1 !== vertice2) {
      this.data[vertice1].add(vertice2);
      this.data[vertice2].add(vertice1);
    }
  }

  addVertice(vertice) {
    if (typeof this.data[vertice] === 'undefined') {
      this.data[vertice] = new Set();
    }
  }

  dfsAll(visited = {}) {
    let iterator = 0;

    for (const vertice in this.data) {
      if (this.data.hasOwnProperty(vertice) && typeof visited[vertice] === 'undefined') {
        this.dfs(vertice, visited, ++iterator);
      }
    }

    return visited;
  }

  dfs(vertice, visited = {}, iterator = 1) {
    this.stack.push(vertice);

    while(this.stack.size > 0) {
      vertice = this.stack.pop();
      visited[vertice] = iterator;

      for (const neighbor of this.data[vertice]) {
        if (typeof visited[neighbor] === 'undefined') {
          this.stack.push(neighbor);
        }
      }
    }

    return visited;
  }
}

const graph = new Graph();

let [vertice1, vertice2] = ['', ''];

for (let i = 1; i < lines.length; ++i) {
  [vertice1, vertice2] = lines[i].split(' ');

  graph.addVertice(vertice1);
  graph.addVertice(vertice2);
  graph.addEdge(vertice1, vertice2);
}

for (let v = 1; v <= verticesCount; ++v) {
  graph.addVertice(v);
}

const all = graph.dfsAll();
let index = 0;
const groups = [];

for (const vertice in all) {
  if (all.hasOwnProperty(vertice)) {
    index = all[vertice] - 1;
    if (!groups[index]) {
      groups[index] = [];
    }
    groups[index].push(vertice);
  }
}

let output = groups.length + '\n';

for (const group of groups) {
  output += group.length + '\n' + group.join(' ') + '\n';
}

fs.writeFileSync('output.txt', output);
