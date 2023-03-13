/*

3. Коллекционер Диего

Ограничение времени	2 секунды
Ограничение памяти	256Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Диего увлекается коллекционированием наклеек. На каждой из них написано число, и каждый коллекционер мечтает 
собрать наклейки со всеми встречающимися числами.

Диего собрал N наклеек, некоторые из которых, возможно, совпадают. Как-то раз к нему пришли K коллекционеров. 
i-й из них собрал все наклейки с номерами не меньшими, чем pi. Напишите программу, которая поможет каждому 
из коллекционеров определить, сколько недостающих ему наклеек есть у Диего. Разумеется, гостей Диего 
не интересуют повторные экземпляры наклеек.

Формат ввода

В первой строке содержится единственное число N (0 ≤ N ≤ 100 000) — количество наклеек у Диего.

В следующей строке содержатся N целых неотрицательных чисел (не обязательно различных) — номера наклеек Диего. 
Все номера наклеек не превосходят 10^9.

В следующей строке содержится число K (0 ≤ K ≤ 100 000) — количество коллекционеров, пришедших к Диего. 
В следующей строке содержатся K целых чисел pi (0 ≤ pi ≤ 10^9), где pi — наименьший номер наклейки, 
не интересующий i-го коллекционера.

Формат вывода

Для каждого коллекционера в отдельной строке выведите количество различных чисел на наклейках, которые есть 
у Диего, но нет у этого коллекционера.

Пример 1

Ввод	
1
5
2
4 6

Вывод
0
1

Пример 2

Ввод	
3
100 1 50
3
300 0 75

Вывод
3
0
2

*/

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').toString();

function binarySearchClosestLesser(arr, val) {
  let start = 0;
  let end = arr.length - 1;
  let mid = 0;

  if (val <= arr[start]) {
    return -1;
  }
  if (val > arr[end]) {
    return end;
  }

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (arr[mid] === val) {
      return mid - 1;
    }

    if (val < arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  while (mid >= 0 && val <= arr[mid]) {
    --mid;
  }

  return mid;
}

const inputArr = input.split('\n');

const hostNumbersHash = {};

const hostNumbers = inputArr[1]
    .split(' ')
    .map((value) => {
      if (!hostNumbersHash[value]) {
        hostNumbersHash[value] = true;
        return parseInt(value);
      }
      return -1;
    })
    .filter((value) => value !== -1)
    .sort((a, b) => a - b);

const guestsCount = parseInt(inputArr[2]);

const guestsMinNumber = inputArr[3].split(' ');

let result = '';

for (let i = 0; i < guestsCount; ++i) {
  const guestMinNumber = parseInt(guestsMinNumber[i]);

  let count = binarySearchClosestLesser(hostNumbers, guestMinNumber) + 1;

  if (i > 0) {
    result += '\n';
  }

  result += count;
}

fs.writeFileSync('output.txt', result);
