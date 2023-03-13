/*

35. Поиск цикла

                      Все языки   Python 3.6
Ограничение времени   2 секунды   5 секунд
Ограничение памяти    256Mb       256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Дан неориентированный граф. Требуется определить, есть ли в нем цикл, и, если есть, вывести его.

Формат ввода

В первой строке дано одно число n — количество вершин в графе (1 ≤ n ≤ 500). Далее в n строках задан 
сам граф матрицей смежности.

Формат вывода

Если в иcходном графе нет цикла, то выведите «NO». Иначе, в первой строке выведите «YES», во второй 
строке выведите число k — количество вершин в цикле, а в третьей строке выведите k различных чисел — 
номера вершин, которые принадлежат циклу в порядке обхода (обход можно начинать с любой вершины цикла). 
Если циклов несколько, то выведите любой.

Пример 1

Ввод
3
0 1 1
1 0 1
1 1 0

Вывод
YES
3
3 2 1

Пример 2

Ввод
4
0 0 1 0
0 0 0 1
1 0 0 0
0 1 0 0

Вывод
NO

Пример 3

Ввод
5
0 1 0 0 0
1 0 0 0 0
0 0 0 1 1
0 0 1 0 1
0 0 1 1 0

Вывод
YES
3
5 4 3

*/

const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

class Graph {
  data = {};

  addEdge(vertice1, vertice2) {
    if (vertice1 !== vertice2) {
      this.addEdgeDirected(vertice1, vertice2);
      this.addEdgeDirected(vertice2, vertice1);
    }
  }

  addEdgeDirected(vertice1, vertice2) {
    this.data[vertice1].set(this.data[vertice1].size, vertice2);
  }

  addVertice(vertice) {
    if (typeof this.data[vertice] === 'undefined') {
      this.data[vertice] = new Map();
    }
  }

  dfsTopologicalAll(visited = {}) {
    for (const vertice in this.data) {
      if (this.data.hasOwnProperty(vertice) && typeof visited[vertice] === 'undefined') {

        const result = this.dfsTopological(vertice, visited);
        if (result) {
          return result;
        }
      }
    }

    return null;
  }

  dfsTopological(root, visited = {}) {
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
            if (visited[parent][2] !== current && parent !== current) {
              visited[current][2] = parent;

              const loopSequence = [parent];
              parent = visited[parent][2];

              while (parent && parent !== loopSequence[0]) {
                loopSequence.push(parent);
                parent = visited[parent][2];
              }
              return loopSequence;
            }
          }
          
          current = parent;
          action = 'side';
        } else {
          action = 'forward';
        }
      } else {
        visited[current][0] = 2; // visitStatus
        current = parent;
        action = 'back';
      }
    }

    return null;
  }
}

const graph = new Graph();

let i2 = '';
let chunk;

for (let i = 1; i < lines.length; ++i) {
  chunk = lines[i].trim().split(' ');

  for (let j = 0; j < chunk.length; ++j) {
    if (chunk[j] === '1') {
      i2 = j + 1;
      graph.addVertice(i.toString());
      graph.addVertice(i2.toString());
      graph.addEdgeDirected(i.toString(), i2.toString());
    }
  }
}

let output = 'NO';
const loop = graph.dfsTopologicalAll();

if (loop) {
  output = 'YES\n' + loop.length + '\n' + loop.join(' ');
}

fs.writeFileSync('output.txt', output);
