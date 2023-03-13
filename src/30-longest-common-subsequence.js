/*

30. НОП с восстановлением ответа

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Даны две последовательности, требуется найти и вывести их наибольшую общую подпоследовательность.

Формат ввода

В первой строке входных данных содержится число N – длина первой последовательности (1 ≤ N ≤ 1000). 
Во второй строке заданы члены первой последовательности (через пробел) – целые числа, не превосходящие 
10000 по модулю.

В третьей строке записано число M – длина второй последовательности (1 ≤ M ≤ 1000). В четвертой строке 
задаются члены второй последовательности (через пробел) – целые числа, не превосходящие 10000 по модулю.

Формат вывода

Требуется вывести наибольшую общую подпоследовательность данных последовательностей, через пробел.

Пример 1

Ввод	
3
1 2 3
3 
2 3 1

Вывод
2 3 

Пример 2

Ввод
3
1 2 3
3 
3 2 1

Вывод
1 

*/

const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const sequence1 = ('- ' + lines[1]).trim().split(' ');

const sequence2 = ('+ ' + lines[3]).trim().split(' ');

const matrix = Array(sequence1.length).fill().map(() => Array(sequence2.length).fill(0));

for (let s1 = 1; s1 < sequence1.length; ++s1) {
  for (let s2 = 1; s2 < sequence2.length; ++s2) {
    if (sequence1[s1] === sequence2[s2]) {
      matrix[s1][s2] = matrix[s1 - 1][s2 - 1] + 1;
    } else {
      matrix[s1][s2] = Math.max(matrix[s1 - 1][s2], matrix[s1][s2 - 1]);
    }
  }
}

function buildSequence(s1, s2) {
  if (!matrix[s1][s2]) {
    return '';
  } else if (sequence1[s1] === sequence2[s2]) {
    return buildSequence(s1 - 1, s2 - 1) + ' ' + sequence1[s1];
  } else if (matrix[s1 - 1][s2] > matrix[s1][s2 - 1]) {
    return buildSequence(s1 - 1, s2);
  } else {
    return buildSequence(s1, s2 - 1);
  }
}

const output = buildSequence(sequence1.length - 1, sequence2.length - 1).trim();

fs.writeFileSync('output.txt', output);
