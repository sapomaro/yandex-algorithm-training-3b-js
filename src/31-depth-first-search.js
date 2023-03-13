/*

31. Поиск в глубину

                     Все языки	  Python 3.6
Ограничение времени	 2 секунды	  5 секунд
Ограничение памяти	 256Mb	      256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Дан неориентированный граф, возможно, с петлями и кратными ребрами. Необходимо построить компоненту 
связности, содержащую первую вершину.

Формат ввода

В первой строке записаны два целых числа N (1 ≤ N ≤ 10^3) и M (0 ≤ M ≤ 5 * 10^5) — количество вершин 
и ребер в графе. В последующих M строках перечислены ребра — пары чисел, определяющие номера вершин, 
которые соединяют ребра.

Формат вывода

В первую строку выходного файла выведите число K — количество вершин в компоненте связности. Во вторую 
строку выведите K целых чисел — вершины компоненты связности, перечисленные в порядке возрастания номеров.

Пример

Ввод
4 5
2 2
3 4
2 3
1 3
2 4

Вывод
4
1 2 3 4

*/

const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

class Graph {
  data = {};

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

  dfs(vertice, visited = {}) {
    if (typeof this.data[vertice] !== 'undefined') {
      visited[vertice] = parseInt(vertice);

      for (let neighbor of this.data[vertice]) {
        if (typeof visited[neighbor] === 'undefined') {
          this.dfs(neighbor, visited);
        }
      }
    }

    return visited;
  }
}

const graph = new Graph();

let [vertice1, vertice2] = ['', ''];

graph.addVertice('1');

for (let i = 1; i < lines.length; ++i) {
  [vertice1, vertice2] = lines[i].split(' ');

  graph.addVertice(vertice1);
  graph.addVertice(vertice2);
  graph.addEdge(vertice1, vertice2);
}

const list = Object.values(graph.dfs('1')).sort((a, b) => a - b);

const output = list.length + '\n' + list.join(' ');

fs.writeFileSync('output.txt', output);
