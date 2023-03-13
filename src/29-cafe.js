/*

29. Кафе

Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt

Около Петиного университета недавно открылось новое кафе, в котором действует следующая система скидок: 
при каждой покупке более чем на 100 рублей покупатель получает купон, дающий право на один бесплатный 
обед (при покупке на сумму 100 рублей и меньше такой купон покупатель не получает).

Однажды Пете на глаза попался прейскурант на ближайшие N дней. Внимательно его изучив, он решил, что 
будет обедать в этом кафе все N дней, причем каждый день он будет покупать в кафе ровно один обед. 
Однако стипендия у Пети небольшая, и поэтому он хочет по максимуму использовать предоставляемую систему 
скидок так, чтобы его суммарные затраты были минимальны. Требуется найти минимально возможную суммарную 
стоимость обедов и номера дней, в которые Пете следует воспользоваться купонами.

Формат ввода

В первой строке входного файла записано целое число N (0 ≤ N ≤ 100). В каждой из последующих N строк 
записано одно целое число, обозначающее стоимость обеда в рублях на соответствующий день. Стоимость — 
неотрицательное целое число, не превосходящее 300.

Формат вывода

В первой строке выдайте минимальную возможную суммарную стоимость обедов. Во второй строке выдайте 
два числа K1 и K2 — количество купонов, которые останутся неиспользованными у Пети после этих N дней 
и количество использованных им купонов соответственно.

В последующих K2 строках выдайте в возрастающем порядке номера дней, когда Пете следует воспользоваться 
купонами. Если существует несколько решений с минимальной суммарной стоимостью, то выдайте то из них, 
в котором значение K1 максимально (на случай, если Петя когда-нибудь ещё решит заглянуть в это кафе). 
Если таких решений несколько, выведите любое из них.

Пример

Ввод
5
35
40
101
59
63

Вывод
235
0 1
5

*/

const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const days = parseInt(lines[0]) + 1;

const matrix = Array(days).fill().map(() => Array(days).fill(-1));

const prices = [0, parseInt(lines[1])];

if (days > 1) {
  if (prices[1] > 100) {
    matrix[1][1] = prices[1];
  } else {
    matrix[1][0] = prices[1];
  }
}

let useCoupon = 0;
let skipCoupon = 0;
let gainCoupon = 0;
let min = 0;

for (let day = 2; day < days; ++day) {
  const cost = parseInt(lines[day]);
  prices.push(cost);

  for (let coupon = 0; coupon < days; ++coupon) {
    useCoupon = (cost > 0 && matrix[day - 1][coupon + 1] >= 0) ?
      matrix[day - 1][coupon + 1] : Infinity;
    skipCoupon = (cost <= 100 && matrix[day - 1][coupon] >= 0) ?
      matrix[day - 1][coupon] + cost : Infinity;
    gainCoupon = (cost > 100 && matrix[day - 1][coupon - 1] >= 0) ?
      matrix[day - 1][coupon - 1] + cost : Infinity;

    min = Math.min(useCoupon, skipCoupon, gainCoupon);
  
    if (min === Infinity) {
      min = -1;
    }

    matrix[day][coupon] = min;
  }
}

let currentIndex = 0;
let minTotalCost = Infinity;

for (let coupon = days - 1; coupon >= 0; --coupon) {
  if (matrix[days - 1][coupon] > 0 && matrix[days - 1][coupon] < minTotalCost) {
    minTotalCost = matrix[days - 1][coupon];
    currentIndex = coupon;
  }
}

let couponsLeft = currentIndex;
let couponsUsed = 0;
const couponDays = [];

for (let day = days - 1; day > 0; --day) {
  if (matrix[day][currentIndex] === matrix[day - 1][currentIndex + 1]) {
    ++couponsUsed;
    couponDays.push(day);
    ++currentIndex;
  } else if (matrix[day][currentIndex] === matrix[day - 1][currentIndex - 1] + prices[day]) {
    --currentIndex;
  }
}

if (minTotalCost === Infinity) {
  minTotalCost = 0;
}

if (couponsLeft < 0) {
  couponsLeft = 0;
}

const output = minTotalCost + '\n' + couponsLeft + ' ' + couponsUsed + '\n' + couponDays.reverse().join('\n');

fs.writeFileSync('output.txt', output.trim());
