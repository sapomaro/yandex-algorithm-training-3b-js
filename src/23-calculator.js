/*

23. Калькулятор

Ограничение времени	2 секунды
Ограничение памяти	256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Имеется калькулятор, который выполняет следующие операции:
- умножить число X на 2;
- умножить число X на 3;
- прибавить к числу X единицу.

Определите, какое наименьшее количество операций требуется, чтобы получить из числа 1 число N.

Формат ввода

Во входном файле написано натуральное число N, не превосходящее 10^6.

Формат вывода

В первой строке выходного файла выведите минимальное количество операций. Во второй строке выведите 
числа, последовательно получающиеся при выполнении операций. Первое из них должно быть равно 1, 
а последнее N. Если решений несколько, выведите любое.

Пример 1

Ввод
1

Вывод
0
1

Пример 2

Ввод
5

Вывод
3
1 3 4 5

*/

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').toString().trim();

const num = parseInt(input);

function calc(num, step = 0, subtotal = '') {
  subtotal = num + ' ' + subtotal;

  if (num === 1) {
    return [step, subtotal];
  }

  ++step;

  const [m1, d2, d3] = [num - 1, num / 2, num / 3];

  if (d3 % 1 === 0) {
    if ((m1 / 2) % 1 === 0) {
      const d3calc = calc(d3, step, subtotal);
      const m1calc = calc(m1, step, subtotal);
      return d3calc[0] < m1calc[0] ? d3calc : m1calc;
    } else {
      const d3calc = calc(d3, step, subtotal);
      const d2calc = calc(d2, step, subtotal);
      return d3calc[0] < d2calc[0] ? d3calc : d2calc;
    }
  } else if (d2 % 1 === 0) {
    if ((m1 / 3) % 1 === 0) {
      const d2calc = calc(d2, step, subtotal);
      const m1calc = calc(m1, step, subtotal);
      return d2calc[0] < m1calc[0] ? d2calc : m1calc;
    } else {
      return calc(d2, step, subtotal);
    }
  } else if (m1 >= 1) {
    return calc(m1, step, subtotal);
  }
}

const [steps, subtotals] = calc(num);

let output = steps + '\n' + subtotals.trim();

fs.writeFileSync('output.txt', output);
