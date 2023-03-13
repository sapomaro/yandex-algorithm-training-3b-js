/*

21. Три единицы подряд

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

По данному числу N определите количество последовательностей из нулей и единиц длины N, в которых 
никакие три единицы не стоят рядом.

Формат ввода

Во входном файле написано натуральное число N, не превосходящее 35.

Формат вывода

Выведите количество искомых последовательностей. Гарантируется, что ответ не превосходит 2^31-1.

Пример

Ввод
1

Вывод
2

*/

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').toString().trim();

const len = parseInt(input);

const tribonacciCache = [0, 2, 4, 7];

function tribonacci(num) {
  if (typeof tribonacciCache[num] === 'number') {
    return tribonacciCache[num];
  } else {
    tribonacciCache[num] = tribonacci(num - 3) + tribonacci(num - 2) + tribonacci(num - 1);
    return tribonacciCache[num];
  }
}

const output = '' + tribonacci(len);

fs.writeFileSync('output.txt', output);

/**
 * 1 ~   2 = 2
 * 2 ~   4 = 4
 * 3 ~   8 = 7+1
 * 4 ~  16 = 13+3
 * 5 ~  32 = 24+8
 * 6 ~  64 = 44+20
 * 7 ~ 128 = 81+47
 * 8 ~ 256 = 149+107
 * 9 ~ 512 = 274+238
 */
