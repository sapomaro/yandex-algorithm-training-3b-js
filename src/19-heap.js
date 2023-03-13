/*

19. Хипуй

Ограничение времени	2 секунды
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

В этой задаче вам необходимо самостоятельно (не используя соответствующие классы и функции стандартной 
библиотеки) организовать структуру данных Heap для хранения целых чисел, над которой определены следующие 
операции: a) Insert(k) – добавить в Heap число k ; b) Extract достать из Heap наибольшее число (удалив 
его при этом).

Формат ввода

В первой строке содержится количество команд N (1 ≤ N ≤ 100000), далее следуют N команд, каждая в своей 
строке. Команда может иметь формат: “0 <число>” или “1”, обозначающий, соответственно, операции 
Insert(<число>) и Extract. Гарантируется, что при выполнении команды Extract в структуре находится 
по крайней мере один элемент.

Формат вывода

Для каждой команды извлечения необходимо отдельной строкой вывести число, полученное при выполнении 
команды Extract.

Пример 1

Ввод
2
0 10000
1

Вывод
10000

Пример 2

Ввод
14
0 1
0 345
1
0 4346
1
0 2435
1
0 235
0 5
0 365
1
1
1
1

Вывод
345
4346
2435
365
235
5
1

*/

const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

class Heap {
  data = [];

  insert(value) {
    this.data.push(value);
    this.bubbleUp(value, this.data.length - 1);
  }

  extract() {
    const rootValue = this.data[0];
    const backValue = this.data.pop();

    if (this.data.length >= 1) {
      this.data[0] = backValue;
      this.sinkDown(backValue, 0);
    }

    return rootValue;
  }

  bubbleUp(value, index) {
    if (index <= 0 || index > this.data.length) {
      return;
    }

    const parentIndex = Math.floor((index - 1) / 2);
    const parentValue = this.data[parentIndex];

    if (typeof parentValue === 'number' && value > parentValue) {
      this.swap(index, parentIndex);
      this.bubbleUp(value, parentIndex);
    }
  }

  sinkDown(value, index) {
    if (index < 0 || index > this.data.length) {
      return;
    }

    const leftIndex = index * 2 + 1;
    const leftValue = this.data[leftIndex];

    const rightIndex = index * 2 + 2;
    const rightValue = this.data[rightIndex];

    const isLeftBigger = (typeof leftValue === 'number' && value < leftValue);
    const isRightBigger = (typeof rightValue === 'number' && value < rightValue);

    if (isLeftBigger && isRightBigger) {
      if (leftValue > rightValue) {
        this.swap(index, leftIndex);
        this.sinkDown(value, leftIndex);
      } else {
        this.swap(index, rightIndex);
        this.sinkDown(value, rightIndex);
      }
    } else if (isLeftBigger) {
      this.swap(index, leftIndex);
      this.sinkDown(value, leftIndex);
    } else if (isRightBigger) {
      this.swap(index, rightIndex);
      this.sinkDown(value, rightIndex);
    }
  }

  swap(index1, index2) {
    const temp = this.data[index1];
    this.data[index1] = this.data[index2];
    this.data[index2] = temp;
  }
}

const heap = new Heap();

let output = '';

for (let i = 1; i < lines.length; ++i) {
  const [command, num] = lines[i].split(' ');
  if (command === '0') {
    heap.insert(parseInt(num));
  } else {
    output += heap.extract() + '\n';
  }
}

fs.writeFileSync('output.txt', output.trim());
