alea
====

Alea is a pseudo-random number generator using a [Linear Congruential Generator](https://en.wikipedia.org/wiki/Linear_congruential_generator).

## Install

To install alea simply do:

```
npm install alea
```

## How to use it

```javascript
import alea from "alea";

// random() generates a pseudo-random number between 0 and 1
alea.random();

// fudge() generates a pseudo-random integer number between -1 and 1
alea.fudge();

// dice(sides) generates a pseudo-random integer number between sides and 1.
alea.dice(6);

// roll(expression) generates a pseudo-random integer number using the passed expression.
alea.roll("2d6 + 1d12");

// intBetween(max, min) generates pseudo-random integer number between min and max.
alea.intBetween(12,1);

// floatBetween(max, min) generates a pseudo-random float number between min and max.
alea.floatBetween(4.5,2.1);
```
