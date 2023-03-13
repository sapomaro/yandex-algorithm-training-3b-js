/*

40. Метро

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Метрополитен состоит из нескольких линий метро. Все станции метро в городе пронумерованы натуральными 
числами от 1 до N. На каждой линии расположено несколько станций. Если одна и та же станция расположена 
сразу на нескольких линиях, то она является станцией пересадки и на этой станции можно пересесть с любой 
линии, которая через нее проходит, на любую другую (опять же проходящую через нее).

Напишите программу, которая по данному вам описанию метрополитена определит, с каким минимальным числом 
пересадок можно добраться со станции A на станцию B. Если данный метрополитен не соединяет все линии 
в одну систему, то может так получиться, что со станции A на станцию B добраться невозможно, в этом случае 
ваша программа должна это определить.

Формат ввода

Сначала вводится число N — количество станций метро в городе (2 ≤ N ≤ 100). Далее следует число M — количество 
линий метро (1 ≤ M ≤ 20). Далее идет описание M линий. Описание каждой линии состоит из числа Pi — количество 
станций на этой линии (2 ≤ Pi ≤ 50) и Pi чисел, задающих номера станций, через которые проходит линия (ни через 
какую станцию линия не проходит дважды).

Затем вводятся два различных числа: A — номер начальной станции, и B — номер станции, на которую нам нужно 
попасть. При этом если через станцию A проходит несколько линий, то мы можем спуститься на любую из них. 
Так же если через станцию B проходит несколько линий, то нам не важно, по какой линии мы приедем.

Формат вывода

Выведите минимальное количество пересадок, которое нам понадобится. Если добраться со станции A на станцию B 
невозможно, программа должна вывести одно число –1 (минус один).

Пример

Ввод
5
2
4 1 2 3 4
2 5 3
3 1

Вывод
0

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
      this.data[vertice] = new Set();
    }
  }

  addEdge(vertice1, vertice2) {
    if (vertice1 !== vertice2) {
      this.addEdgeDirected(vertice1, vertice2);
      this.addEdgeDirected(vertice2, vertice1);
    }
  }

  addEdgeDirected(vertice1, vertice2) {
    this.data[vertice1].add(vertice2);
  }

  bfsTransfers(vertice1, vertice2) {
    if (vertice1 === vertice2) {
      return 0;
    }

    const visited = {};

    const queueList = [new Queue(2000)];
    let queueIndex = 0;
    queueList[queueIndex].push(vertice1);

    let vertice = '';
    let neighbor = '';
    let distance = 0;

    while (typeof queueList[queueIndex] !== 'undefined') {
      vertice = queueList[queueIndex].pop();

      visited[vertice] = true;

      for (neighbor of this.data[vertice]) {
        if (neighbor === vertice2) {
          return queueIndex;
        }

        if (typeof visited[neighbor] === 'undefined') {
          distance = queueIndex + (neighbor[0] === 'E' ? 1 : 0);

          if (typeof queueList[distance] === 'undefined') {
            queueList[distance] = new Queue(2000);
          }
          queueList[distance].push(neighbor);
        }
      }

      if (queueList[queueIndex].size === 0) {
        ++queueIndex;
      }
    }

    return -1;
  }
}

const graph = new Graph();

let a = '';
let b = '';

let way = 0;
let wayStation1 = '';
let wayStation2 = '';
let exitStation1 = '';
let exitStation2 = '';

for (let i = 2; i < lines.length; ++i) {
  if (i === lines.length - 1) {
    [a, b] = lines[i].trim().split(' ').map(((value) => 'E_' + value));
    break;
  }

  way = i - 1;
  const line = lines[i].trim().split(' ');

  for (let j = 2; j < line.length; ++j) {
    exitStation1 = 'E_' + line[j - 1];
    exitStation2 = 'E_' + line[j];
    wayStation1 = way + '_'+ line[j - 1];
    wayStation2 = way + '_'+ line[j];

    graph.addVertice(exitStation1);
    graph.addVertice(exitStation2);
    graph.addVertice(wayStation1);
    graph.addVertice(wayStation2);

    graph.addEdge(wayStation1, wayStation2);
    graph.addEdge(wayStation1, exitStation1);
    graph.addEdge(wayStation2, exitStation2);
  }
}

const output = '' + graph.bfsTransfers(a, b);

fs.writeFileSync('output.txt', output);
