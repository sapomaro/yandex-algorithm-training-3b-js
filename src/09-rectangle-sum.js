/*

9. Сумма в прямоугольнике

Ограничение времени	3 секунды
Ограничение памяти	256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Вам необходимо ответить на запросы узнать сумму всех элементов числовой матрицы N×M в прямоугольнике 
с левым верхним углом (x1, y1) и правым нижним (x2, y2)

Формат ввода

В первой строке находится числа N, M размеры матрицы (1 ≤ N, M ≤ 1000) и K — количество запросов 
(1 ≤ K ≤ 100000). Каждая из следующих N строк содержит по M чисел`— элементы соответствующей строки 
матрицы (по модулю не превосходят 1000). Последующие K строк содержат по 4 целых числа, разделенных 
пробелом x1 y1 x2 y2 — запрос на сумму элементов матрице в прямоугольнике (1 ≤ x1 ≤ x2 ≤ N, 1 ≤ y1 ≤ y2 ≤ M)

Формат вывода

Для каждого запроса на отдельной строке выведите его результат — сумму всех чисел в элементов матрице 
в прямоугольнике (x1, y1), (x2, y2)

Пример

Ввод
3 3 2
1 2 3
4 5 6
7 8 9
2 2 3 3
1 1 2 3

Вывод
28
21

*/

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').toString();

const lines = input.trim().split('\n');

const settings = lines[0].split(' ');

const matrixSizeX = parseInt(settings[0]);
const matrixSizeY = parseInt(settings[1]);

const matrix = new Array(matrixSizeX + 1);
matrix[0] = new Array(matrixSizeY + 1).fill(0);

let output = '';

for (let i = 1; i < lines.length; ++i) {
  if (i <= matrixSizeX) {
    let sum = 0;
    matrix[i] = ('0 ' + lines[i])
        .trim()
        .split(' ')
        .map((value, y) => {
          sum += parseInt(value);
          return sum + matrix[i - 1][y];
        });
  } else {
    const [x1, y1, x2, y2] = lines[i].trim().split(' ');

    const sum = matrix[x2][y2] + matrix[x1 - 1][y1 - 1] - matrix[x2][y1 - 1] - matrix[x1 - 1][y2];

    if (output !== '') {
      output += '\n';
    }
    output += sum;
  }
}

fs.writeFileSync('output.txt', output);
