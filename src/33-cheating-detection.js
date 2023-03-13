/*

33. Списывание

                      Все языки   Python 3.6
Ограничение времени	  2 секунды   5 секунд
Ограничение памяти	  256Mb       256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Во время контрольной работы профессор Флойд заметил, что некоторые студенты обмениваются записками. 
Сначала он хотел поставить им всем двойки, но в тот день профессор был добрым, а потому решил разделить 
студентов на две группы: списывающих и дающих списывать, и поставить двойки только первым.

У профессора записаны все пары студентов, обменявшихся записками. Требуется определить, сможет ли он 
разделить студентов на две группы так, чтобы любой обмен записками осуществлялся от студента одной 
группы студенту другой группы.

Формат ввода

В первой строке находятся два числа N и M — количество студентов и количество пар студентов, обменивающихся 
записками (1 ≤ N ≤ 10^2, 0 ≤ M ≤ N(N−1)/2).

Далее в M строках расположены описания пар студентов: два числа, соответствующие номерам студентов, 
обменивающихся записками (нумерация студентов идёт с 1). Каждая пара студентов перечислена не более одного раза.

Формат вывода

Необходимо вывести ответ на задачу профессора Флойда. Если возможно разделить студентов на две группы - 
выведите YES; иначе выведите NO.

Пример 1

Ввод
3 2
1 2
2 3

Вывод
YES

Пример 2

Ввод
3 3
1 2
2 3
1 3

Вывод
NO

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

  dfsAll(options = { iterator: 2, bipartite: true }, visited = {}) {
    for (const vertice in this.data) {
      if (this.data.hasOwnProperty(vertice) && typeof visited[vertice] === 'undefined') {
        if (!this.dfs(vertice, options, visited)) {
          return null;
        }
      }
    }

    return visited;
  }

  dfs(vertice, options, visited = {}) {
    let iterator = options.iterator;
    this.stack.push([vertice, null, iterator]);
    let from = 0;
    let neighbor = 0;

    while(this.stack.size > 0) {
      [vertice, from, iterator] = this.stack.pop();

      iterator = 3 - iterator;
      visited[vertice] = iterator;

      for (neighbor of this.data[vertice]) {
        if (from === neighbor) {
          continue;
        }
        if (typeof visited[neighbor] === 'undefined') {
          this.stack.push([neighbor, vertice, iterator]);
        } else if (visited[vertice] === visited[neighbor]) {
          return null;
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

let output = (all === null) ? 'NO' : 'YES';

fs.writeFileSync('output.txt', output);
