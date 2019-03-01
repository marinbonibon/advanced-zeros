module.exports = function getZerosCount (number, base) {

  const { simpleNumbersResult, powerOfTwo, powerOfSimple } = simpleNumbers(base);
  const numZerosOfTwo = findZerosOfTwo(number, powerOfTwo);
  const numZerosOfPrime = findZerosOfPrime(number, simpleNumbersResult, powerOfSimple);

  return numZerosOfTwo > numZerosOfPrime && numZerosOfPrime !== 0 ? numZerosOfPrime : numZerosOfTwo;
};

// factor base into products of prime powers
function simpleNumbers (base) {
  // power of 2
  let powerOfTwo = 0;
  while (base % 2 === 0) {
    base = base / 2;
    powerOfTwo++;
  }

  if (base < 3) {
    return {
      simpleNumbersResult: 0,
      powerOfTwo: powerOfTwo
    };
  }

  // array of simple numbers > 2
  let primeArr = [];
  for (let i = 3; i <= base; i++) {
    while (base % i === 0) {
      base /= i;
      primeArr.push(i);
    }
  }

  // count power of the first simple number if power of 2 === 0
  let powerOfSimple = 0;
  if (primeArr.length) {
    powerOfSimple = primeArr.filter(currentElement => currentElement === primeArr[primeArr.length - 1]).length;
  }

  // leave no repeated simple numbers
  let noRepeat = primeArr.filter((num, i) => primeArr.indexOf(num) === i);

  return {
    simpleNumbersResult: noRepeat.length ? noRepeat : base,
    powerOfTwo: powerOfTwo,
    powerOfSimple: powerOfSimple
  };
}

//the highest power of 2 dividing number
function findZerosOfTwo (number, powerOfTwo) {

  let numOfZerosOfTwo = 0;
  while (number / 2 > 0) {
    numOfZerosOfTwo += Math.floor(number / 2);
    number = number / 2;
  }
  if (numOfZerosOfTwo > powerOfTwo && powerOfTwo !== 0) {
    numOfZerosOfTwo = Math.floor(numOfZerosOfTwo / powerOfTwo);
  }

  return numOfZerosOfTwo;
}

//the highest power of simple numbers > 2 dividing number
function findZerosOfPrime (number, simpleNumberResult, powerOfSimple) {

  let numOfZerosOfPrime = 0;
  while (number / simpleNumberResult[simpleNumberResult.length - 1] > 0) {
    numOfZerosOfPrime += Math.floor(number / simpleNumberResult[simpleNumberResult.length - 1]);
    number = number / simpleNumberResult[simpleNumberResult.length - 1];
  }
  if (numOfZerosOfPrime > powerOfSimple && powerOfSimple !== 0) {
    numOfZerosOfPrime = Math.floor(numOfZerosOfPrime / powerOfSimple);
  }

  return numOfZerosOfPrime;
}
