/*

2. Красивая строка

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Красотой строки назовем максимальное число идущих подряд одинаковых букв. (красота строки abcaabdddettq равна 3)

Сделайте данную вам строку как можно более красивой, если вы можете сделать не более k операций замены символа.

Формат ввода

В первой строке записано одно целое число k (0 ≤ k ≤ 10^9)

Во второй строке дана непустая строчка S (|S| ≤ 2 ⋅ 10^5). Строчка S состоит только из маленьких латинских букв.

Формат вывода

Выведите одно число — максимально возможную красоту строчки, которую можно получить.

Пример 1

Ввод
2
abcaz

Вывод
4
Пример 2

Ввод
2
helto

Вывод
3

*/

const fs = require('fs');

const [num, str] = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const len = str.length;

const replaces = parseInt(num);

let max = 1;
let submax = 0;
let letter = '';
let start = 0;
let end = 0;
let skips = 0;

for (let i = 97; i <= 122; ++i) {
  letter = String.fromCharCode(i);
  start = 0;
  end = 0;
  skips = replaces;
  
  for (let s = 0; s < len; ++s) {
    ++end;

    if (letter !== str[s]) {
      if (skips <= 0) {
        while (str[start] === letter) {
          ++start;
        }
        ++start;
      } else {
        --skips;
      }
    }

    submax = end - start + skips;
    if (max < submax) {
      max = submax;
    }
  }
}

if (max > len) {
  max = len;
}

const output = '' + max;

fs.writeFileSync('output.txt', output);
