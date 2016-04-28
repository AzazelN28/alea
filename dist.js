(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.alea = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.reset = reset;
exports.random = random;
exports.floatBetween = floatBetween;
exports.intBetween = intBetween;
exports.fudge = fudge;
exports.dice = dice;
exports.roll = roll;
exports.shuffle = shuffle;
exports.pick = pick;
exports.take = take;
/** @module alea */

/**
 * @default 12345
 * @const {Number} INCREMENT
 * @private
 */
var INCREMENT = 12345;

/**
 * @default 1103515245
 * @const {Number} MULTIPLIER
 * @private
 */
var MULTIPLIER = 1103515245;

/**
 * @default 2147483648
 * @const {Number} MODULUS
 * @private
 */
var MODULUS = 2147483648;

/**
 * @default 0
 * @private
 */
var seed = 0;

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
  return (value + increment) * multiplier % modulus;
}

/**
 * Resets the seed used to generate next pseudo-random numbers.
 *
 * @param {Number} newSeed New seed value
 * @return {Number} Returns the newSeed
 * @example
 * reset();
 */
function reset(newSeed) {
  return seed = newSeed;
}

/**
 * Generates a new pseudo-random number between 0 and 1.
 *
 * @return {Number} A number between 0 and 1
 * @example
 * random();
 */
function random() {
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
function floatBetween(max, min) {
  return random() * (max - min) + min;
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
function intBetween(max, min) {
  return Math.round(floatBetween(max, min));
}

/**
 * Generates a pseudo-random number between -1 and 1.
 *
 * @return {Number} A pseudo-random integer number between -1 and 1
 * @example
 * fudge();
 */
function fudge() {
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
function dice(sides) {
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
function roll(dices) {
  if (typeof dices === "number" || dices instanceof Number) {
    return dice(dices);
  } else if (typeof dices === "string" || dices instanceof String) {
    return dices.replace(/\s+/g, "").match(/(\+|\-|\*|\/)?([0-9]+)?(d[0-9]+|f)/g).map(function (value) {
      return value.match(/(\+|\-|\*|\/)?([0-9]+)?(d|f)([0-9]+)?/);
    }).reduce(function (initial, current) {
      var _current = _slicedToArray(current, 5);

      var fullMatch = _current[0];
      var operation = _current[1];
      var count = _current[2];
      var type = _current[3];
      var sides = _current[4];


      if (!count) count = 1;
      if (sides) sides = parseInt(sides, 10);

      var func = type === "d" ? dice : fudge;
      for (var i = 0; i < count; i++) {
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
function shuffle(array) {
  var o = array.slice();
  for (var j, x, i = o.length - 1; i; j = intBetween(i, 0), x = o[--i], o[i] = o[j], o[j] = x) {}
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
function pick(o) {
  var count = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

  var result = [];
  if (count === 0) {
    return result;
  }

  for (var i = 0; i < count; i++) {
    var index = intBetween(o.length - 1, 0);
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
function take(o) {
  var count = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

  var array = o.slice();
  var result = [];
  if (count === 0) {
    return result;
  }

  var length = Math.min(count, array.length);
  for (var i = 0; i < length; i++) {
    var index = intBetween(array.length - 1, 0);
    result.push(array.splice(index, 1).shift());
  }

  return result;
}

exports.default = {
  dice: dice,
  floatBetween: floatBetween,
  fudge: fudge,
  intBetween: intBetween,
  random: random,
  reset: reset,
  roll: roll,
  shuffle: shuffle,
  pick: pick,
  take: take
};

},{}]},{},[1])(1)
});