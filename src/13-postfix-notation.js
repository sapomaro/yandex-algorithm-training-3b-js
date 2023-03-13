/*

13. Постфиксная запись

Ограничение времени	1 секунда
Ограничение памяти	256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

В постфиксной записи (или обратной польской записи) операция записывается после двух операндов. Например, 
сумма двух чисел A и B записывается как A B +. Запись B C + D * обозначает привычное нам (B + C) * D, 
а запись A B C + D * + означает A + (B + C) * D. Достоинство постфиксной записи в том, что она не требует 
скобок и дополнительных соглашений о приоритете операторов для своего чтения.

Формат ввода

В единственной строке записано выражение в постфиксной записи, содержащее цифры и операции +, -, *. 
Цифры и операции разделяются пробелами. В конце строки может быть произвольное количество пробелов.

Формат вывода

Необходимо вывести значение записанного выражения.

Пример

Ввод
8 9 + 1 7 - *

Вывод
-102

*/

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').toString().trim().split(' ');

const len = input.length;

const stack = {
  data: [],
  push(char) {
    this.data.push(char);
  },
  pop() {
    return this.data.pop();
  },
  get back() {
    return this.data[this.data.length - 1];
  },
  get size() {
    return this.data.length;
  },
};

let char = '';
let a = 0;
let b = 0;

for (let i = 0; i < len; ++i) {
  char = input[i];

  if (char === '+') {
    a = stack.pop();
    b = stack.pop();
    stack.push(b + a);
  }
  else if (char === '-') {
    a = stack.pop();
    b = stack.pop();
    stack.push(b - a);
  }
  else if (char === '*') {
    a = stack.pop();
    b = stack.pop();
    stack.push(b * a);
  }
  else if (char === '/') {
    a = stack.pop();
    b = stack.pop();
    stack.push(b / a);
  }
  else {
    stack.push(parseInt(char));
  }
}

let output = '' + stack.back;

fs.writeFileSync('output.txt', output);
