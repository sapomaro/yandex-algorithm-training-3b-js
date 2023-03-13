/*

A. Подземная доставка

Ограничение времени	2 секунды
Ограничение памяти	256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Для ускорения работы служб доставки под городом Длинноградом был прорыт тоннель, по которому ходит 
товарный поезд, останавливающийся на промежуточных станциях возле логистических центров. На станциях 
к концу поезда могут быть присоединены вагоны с определенными товарами, а также от его конца может 
быть отцеплено некоторое количество вагонов или может быть проведена ревизия, во время которой 
подсчитывается количество вагонов с определенным товаром.

Обработайте операции в том порядке, в котором они производились, и ответьте на запросы ревизии.

Формат ввода

В первой строке вводится число N (1 ≤ N ≤ 100000) — количество операций, произведенных над поездом.

В каждой из следующих N строк содержится описание операций. Каждая операция может иметь один из трех типов:

add <количество вагонов> <название товара> — добавить в конец поезда <количество вагонов> с грузом 
<название товара>. Количество вагонов не может превышать 10^9, название товара — одна строка из строчных 
латинских символов длиной до 20.

delete <количество вагонов> — отцепить от конца поезда <количество вагонов>. Количество отцепляемых вагонов 
не превосходит длины поезда.

get <название товара> — определить количество вагонов с товаром <название товара> в поезде. Название 
товара — одна строка из строчных латинских символов длиной до 20.

Формат вывода

На каждый запрос о количестве вагонов с определенным товаром выведите одно число — количество вагонов 
с таким товаром. Запросы надо обрабатывать в том порядке, как они поступали.

Пример 1

Ввод
7
add 10 oil
add 20 coal
add 5 oil
get coal
get oil
add 1 coal
get coal

Вывод
20
15
21

Пример 2

Ввод
6
add 5 oil
get coal
add 7 liverstock
delete 10
get oil
get liverstock

Вывод
0
2
0

*/

const fs = require('fs');

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

const lines = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

let action = '';
let param1 = '';
let param2 = '';
let quantity = 0;
let cargo = '';
let count = 0;

const goods = {};
const train = new Stack();

let result = [];

for (let i = 1; i < lines.length; ++i) {
  [action, param1, param2] = lines[i].split(' ');

  if (action === 'add') {
    quantity = parseInt(param1);
    cargo = param2;

    if (typeof goods[cargo] === 'undefined') {
      goods[cargo] = 0;
    }
    goods[cargo] += quantity;

    train.push([cargo, quantity]);
  } else if (action === 'delete') {
    count = parseInt(param1);

    while (count > 0) {
      [cargo, quantity] = train.pop();

      if (count >= quantity) {
        count -= quantity;
        goods[cargo] -= quantity;
      } else {
        quantity -= count;
        goods[cargo] -= count;

        train.push([cargo, quantity]);
        count = 0;
      }
    }
  } else if (action === 'get') {
    cargo = param1;

    if (typeof goods[cargo] === 'undefined') {
      result.push(0);
    } else {
      result.push(goods[cargo]);
    }
  }
}

const output = result.join('\n');

fs.writeFileSync('output.txt', output + '');
