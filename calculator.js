let runningTotal = 0;
let buffer = "0";
let previousOperator;
let result = "0";
const screen = document.querySelector(".result");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
    result = value;
  } else {
    buffer += value;
    result += value;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  result += previousOperator;
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "*") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      result = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
      break;
    case "bck":
      if (buffer.length === 1) {
        buffer = "0";
        result = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
        result = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      handleMath(value);
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
  console.log(result);
}

function init() {
  document.querySelector(".cal-btn").addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
  });
}

init();
