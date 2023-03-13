/*

11. Стек с защитой от ошибок

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Научитесь пользоваться стандартной структурой данных stack для целых чисел. Напишите программу, содержащую 
описание стека и моделирующую работу стека, реализовав все указанные здесь методы. Программа считывает 
последовательность команд и в зависимости от команды выполняет ту или иную операцию. После выполнения 
каждой команды программа должна вывести одну строчку. Возможные команды для программы:

push n
Добавить в стек число n (значение n задается после команды). Программа должна вывести ok.

pop
Удалить из стека последний элемент. Программа должна вывести его значение.

back
Программа должна вывести значение последнего элемента, не удаляя его из стека.

size
Программа должна вывести количество элементов в стеке.

clear
Программа должна очистить стек и вывести ok.

exit
Программа должна вывести bye и завершить работу.

Перед исполнением операций back и pop программа должна проверять, содержится ли в стеке хотя бы один элемент. 
Если во входных данных встречается операция back или pop, и при этом стек пуст, то программа должна вместо 
числового значения вывести строку error.

Формат ввода

Вводятся команды управления стеком, по одной на строке

Формат вывода

Программа должна вывести протокол работы стека, по одному сообщению на строке

Пример 1

Ввод
push 1
back
exit

Вывод
ok
1
bye

Пример 2

Ввод
size
push 1
size
push 2
size
push 3
size
exit

Вывод
0
ok
1
ok
2
ok
3
bye

Пример 3

Ввод
push 3
push 14
size
clear
push 1
back
push 2
back
pop
size
pop
size
exit

Вывод
ok
ok
2
ok
ok
1
ok
2
2
1
1
0
bye

*/

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const stack = {
  data: [],
  log: '',
  push(n) {
    this.data.push(n);
    this.log += 'ok\n';
  },
  pop() {
    if (this.data.length < 1) {
      this.log += 'error\n';
    } else {
      this.log += this.data.pop() + '\n';
    }
  },
  back() {
    if (this.data.length < 1) {
      this.log += 'error\n';
    } else {
      this.log += this.data[this.data.length - 1] + '\n';
    }
  },
  size() {
    this.log += this.data.length + '\n';
  },
  clear() {
    this.data = [];
    this.log += 'ok\n';
  },
  exit() {
    this.log += 'bye';
  },
};

for (let i = 0; i < input.length; ++i) {
  const [command, value] = input[i].split(' ');
  stack[command](value);

  if (command === 'exit') {
    break;
  }
}

const output = stack.log;

fs.writeFileSync('output.txt', output);
