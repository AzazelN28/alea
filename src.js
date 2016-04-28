/** @module alea */

/**
 * @default 12345
 * @const {Number} INCREMENT
 * @private
 */
const INCREMENT = 12345;

/**
 * @default 1103515245
 * @const {Number} MULTIPLIER
 * @private
 */
const MULTIPLIER = 1103515245;

/**
 * @default 2147483648
 * @const {Number} MODULUS
 * @private
 */
const MODULUS = 2147483648;

/**
 * @default 0
 * @private
 */
let seed = 0;

/**
 * Linear Congruential Generator
 *
 * <code>value + increment * multiplier % modulus</code>
 *
 * @see https://en.wikipedia.org/wiki/Linear_congruential_generator
 * @param {Number} value
 * @param {Number} increment
 * @param {Number} multiplier
 * @param {Number} modulus
 * @return {Number}
 * @private
 */
function lcg(value, increment, multiplier, modulus) {
  return ((value + increment) * multiplier) % modulus;
}

/**
 * Resets the seed used to generate next pseudo-random numbers.
 *
 * @param {Number} newSeed New seed value
 * @return {Number} Returns the newSeed
 * @example
 * reset();
 */
export function reset(newSeed) {
  return seed = newSeed;
}

/**
 * Generates a new pseudo-random number between 0 and 1.
 *
 * @return {Number} A number between 0 and 1
 * @example
 * random();
 */
export function random() {
  seed = lcg(seed, INCREMENT, MULTIPLIER, MODULUS);
  return seed / MODULUS;
}

/**
 * Generates a new pseudo-random float number between min and max.
 *
 * @param {Number} max
 * @param {Number} min
 * @return {Number} A pseudo-random float number between min and max
 * @example
 * floatBetween(1.5,0.5);
 * floatBetween(2.5,1.5);
 * floatBetween(3.1415,6.2830);
 */
export function floatBetween(max, min) {
  return (random() * (max - min)) + min;
}

/**
 * Generates a new pseudo-random integer number between min and max.
 *
 * @param {Number} max
 * @param {Number} min
 * @return {Number} A pseudo-random integer number between int and max
 * @example
 * intBetween(12,1);
 * intBetween(6,1);
 * intBetween(4,1);
 */
export function intBetween(max, min) {
  return Math.round(floatBetween(max, min));
}

/**
 * Generates a pseudo-random number between -1 and 1.
 *
 * @return {Number} A pseudo-random integer number between -1 and 1
 * @example
 * fudge();
 */
export function fudge() {
  return intBetween(1, -1);
}

/**
 * Generates a pseudo-random number between sides and 1.
 *
 * @param {Number} sides Dice sides
 * @return {Number} A pseudo-random integer number between <code>sides</code> and 1
 * @example
 * dice(6);
 * dice(10);
 * dice(12);
 */
export function dice(sides) {
  return intBetween(sides, 1);
}

/**
 * Generates a pseudo-random number based on a expression.
 *
 * @param {String|Number} dices
 * @return {Number}
 * @example
 * roll("1d6 + 3d2 - 4d10 * 2d12");
 * roll("4d6");
 * roll("1f");
 * roll("4f + 4d6");
 */
export function roll(dices) {
  if (typeof dices === "number" || dices instanceof Number) {
    return dice(dices);
  } else if (typeof dices === "string" || dices instanceof String) {
    return dices.replace(/\s+/g,"").match(/(\+|\-|\*|\/)?([0-9]+)?(d[0-9]+|f)/g).map((value) => {
      return value.match(/(\+|\-|\*|\/)?([0-9]+)?(d|f)([0-9]+)?/);
    }).reduce((initial, current) => {
      let [fullMatch,operation,count,type,sides] = current;

      if (!count) count = 1;
      if (sides) sides = parseInt(sides, 10);

      const func = (type === "d" ? dice : fudge);
      for (let i = 0; i < count; i++) {
        if (operation === "-") {
          initial -= func(sides);
        } else if (operation === "*") {
          initial *= func(sides);
        } else if (operation === "/") {
          initial /= func(sides);
        } else {
          initial += func(sides);
        }
      }
      return initial;
    }, 0);
  }
}

/**
 * Shuffles an array using Fisherman-Yates algorithm
 *
 * @see https://css-tricks.com/snippets/javascript/shuffle-array/
 * @param {Array} array Array that is going to be shuffled
 * @return {Array} Returns a shuffled copy of the input array.
 * @example
 * shuffle([1,2,3,4]);
 */
export function shuffle(array) {
  const o = array.slice();
  for (let j, x, i = o.length - 1; i; j = intBetween(i,0), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

/**
 * Picks one or more elements from an array.
 *
 * @param {Array} array Array that is going to be used to pick a value
 * @param {Number} count Number of elements to pick from the array
 * @return {Array} Returns elements from the array (with repetition)
 * @example
 * pick([1,2,3,4,5,6,7,8], 3);
 */
export function pick(o, count = 1) {
  const result = [];
  if (count === 0) {
    return result;
  }

  for (let i = 0; i < count; i++) {
    const index = intBetween(o.length - 1, 0);
    result.push(o[index]);
  }

  return result;
}

/**
 * Takes one or more elemnts from an array.
 *
 * @param {Array} array Array that is going to be used to pick a value
 * @param {Number} count Number of elements to pick from the array
 * @return {Array} Returns a part of the array (without repetition)
 * @example
 * take([1,2,3,4,5,6,7,8], 3);
 */
export function take(o, count = 1) {
  const array = o.slice();
  const result = [];
  if (count === 0) {
    return result;
  }

  const length = Math.min(count, array.length);
  for (let i = 0; i < length; i++) {
    const index = intBetween(array.length - 1, 0);
    result.push(array.splice(index, 1).shift());
  }

  return result;
}

export default {
  dice,
  floatBetween,
  fudge,
  intBetween,
  random,
  reset,
  roll,
  shuffle,
  pick,
  take
};
