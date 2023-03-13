/*

20. Пирамидальная сортировка

Ограничение времени	2 секунды
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Отсортируйте данный массив. Используйте пирамидальную сортировку.

Формат ввода

Первая строка входных данных содержит количество элементов в массиве N, N ≤ 10^5. Далее задаются N целых 
чисел, не превосходящих по абсолютной величине 10^9.

Формат вывода

Выведите эти числа в порядке неубывания.

Пример 1

Ввод
1
1

Вывод
1 

Пример 2

Ввод
2
3 1

Вывод
1 3 

*/

const fs = require('fs');

const array = fs.readFileSync('input.txt', 'utf8')
  .toString()
  .trim()
  .split('\n')[1]
  .split(' ');

function numberFrom(array, index) {
  if (typeof array[index] === 'string') {
    array[index] = parseInt(array[index]);
  }
  return array[index];
}

function swap(array, index1, index2) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

function heapSinkDown(array, heapLength, value, index) {
  if (index < 0 || index > heapLength) {
    return;
  }

  const leftIndex = index * 2 + 1;
  const leftValue = (leftIndex < heapLength) ? array[leftIndex] : null;

  const rightIndex = leftIndex + 1;
  const rightValue = (rightIndex < heapLength) ? array[rightIndex] : null;

  const isLeftBigger = (typeof leftValue === 'number' && value < leftValue);
  const isRightBigger = (typeof rightValue === 'number' && value < rightValue);

  if (isLeftBigger && isRightBigger) {
    if (leftValue > rightValue) {
      swap(array, index, leftIndex);
      heapSinkDown(array, heapLength, value, leftIndex);
    } else {
      swap(array, index, rightIndex);
      heapSinkDown(array, heapLength, value, rightIndex);
    }
  } else if (isLeftBigger) {
    swap(array, index, leftIndex);
    heapSinkDown(array, heapLength, value, leftIndex);
  } else if (isRightBigger) {
    swap(array, index, rightIndex);
    heapSinkDown(array, heapLength, value, rightIndex);
  }
}

function heapSort(array) {
  let value = Infinity;
  let index = array.length - 1;
  while (index >= 0) {
    if (value !== array[index]) {
      value = numberFrom(array, index);
      heapSinkDown(array, array.length, value, index)
    } else {
      --index;
    }
  }

  for (let i = array.length - 1; i >= 0; --i) {
    swap(array, 0, i);
    heapSinkDown(array, i, array[0], 0);
  }
}

heapSort(array);

fs.writeFileSync('output.txt', array.join(' '));
