/*

12. Правильная скобочная последовательность

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Рассмотрим последовательность, состоящую из круглых, квадратных и фигурных скобок. Программа дожна 
определить, является ли данная скобочная последовательность правильной. Пустая последовательность 
явлется правильной. Если A – правильная, то последовательности (A), [A], {A} – правильные. Если A и B – 
правильные последовательности, то последовательность AB – правильная.

Формат ввода
В единственной строке записана скобочная последовательность, содержащая не более 100000 скобок.

Формат вывода
Если данная последовательность правильная, то программа должна вывести строку yes, иначе строку no.

Пример 1

Ввод
()[]

Вывод
yes

Пример 2

Ввод
([)]

Вывод
no

Пример 3

Ввод
(

Вывод
no

*/

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').toString().trim();

const len = input.length;

const stack = {
  data: '',
  push(char) {
    this.data += char;
  },
  pop() {
    this.data = this.data.slice(0, -1);
  },
  get back() {
    return this.data[this.data.length - 1];
  },
  get size() {
    return this.data.length;
  },
};

let char = '';
let back = '';
let valid = true;

for (let i = 0; i < len; ++i) {
  char = input[i];
  back = stack.back;

  if (char === '(' || char === '[' || char === '{') {
    stack.push(char);
  } else {
    if ((char === ')' && back !== '(') ||
        (char === ']' && back !== '[') ||
        (char === '}' && back !== '{')) {
      valid = false;
      break;
    } else {
      stack.pop();
    }
  }
}

let output = 'yes';

if (!valid || stack.size !== 0) {
  output = 'no';
}

fs.writeFileSync('output.txt', output);
