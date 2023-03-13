/*

17. Игра в пьяницу

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

В игре в пьяницу карточная колода раздается поровну двум игрокам. Далее они вскрывают по одной верхней 
карте, и тот, чья карта старше, забирает себе обе вскрытые карты, которые кладутся под низ его колоды. 
Тот, кто остается без карт – проигрывает. Для простоты будем считать, что все карты различны по номиналу, 
а также, что самая младшая карта побеждает самую старшую карту ("шестерка берет туза"). Игрок, который 
забирает себе карты, сначала кладет под низ своей колоды карту первого игрока, затем карту второго игрока 
(то есть карта второго игрока оказывается внизу колоды). Напишите программу, которая моделирует игру 
в пьяницу и определяет, кто выигрывает. В игре участвует 10 карт, имеющих значения от 0 до 9, большая 
карта побеждает меньшую, карта со значением 0 побеждает карту 9.

Формат ввода

Программа получает на вход две строки: первая строка содержит 5 чисел, разделенных пробелами — номера 
карт первого игрока, вторая – аналогично 5 карт второго игрока. Карты перечислены сверху вниз, то есть 
каждая строка начинается с той карты, которая будет открыта первой.

Формат вывода

Программа должна определить, кто выигрывает при данной раздаче, и вывести слово first или second, после чего 
вывести количество ходов, сделанных до выигрыша. Если на протяжении 10^6 ходов игра не заканчивается, 
программа должна вывести слово botva.

Пример 1

Ввод
1 3 5 7 9
2 4 6 8 0

Вывод
second 5

Пример 2

Ввод
2 4 6 8 0
1 3 5 7 9

Вывод
first 5

Пример 3

Ввод
1 7 3 9 4
5 8 0 2 6

Вывод
second 23

*/

const fs = require('fs');

class Queue {
  data = [];
  start = 0;
  end = 0;
  max = Infinity;

  constructor(max = Infinity, str) {
    this.max = max;
    str.trim().split(' ').forEach((item) => {
      this.push(parseInt(item));
    });
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

const [line1, line2] = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const player1 = new Queue(10, line1);
const player2 = new Queue(10, line2);

let output = '';

let card1 = 0;
let card2 = 0;

let turn = 0;
const limit = 1000000;

while (player1.size !== 0 && player2.size !== 0) {
  if (++turn > limit) {
    break;
  }

  card1 = player1.pop();
  card2 = player2.pop();

  if (card1 === 0 && card2 === 9) {
    player1.push(card1);
    player1.push(card2);
  } else if (card1 === 9 && card2 === 0) {
    player2.push(card1);
    player2.push(card2);
  } else if (card1 > card2) {
    player1.push(card1);
    player1.push(card2);
  } else if (card1 < card2) {
    player2.push(card1);
    player2.push(card2);
  }
}

if (turn > limit) {
  output = 'botva';
} else if (player1.size === 0) {
  output = 'second ' + turn;
} else {
  output = 'first ' + turn;
}

fs.writeFileSync('output.txt', output);
