document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  let currentInput = "";
  let currentOperator = "";
  let firstOperand = "";
  let secondOperand = null;

  function updateDisplay(input) {
    display.firstChild.innerText = input || "0";
  }

  function handleNumberClick(number) {
    if (currentInput === "0" || currentInput === "") {
      currentInput = number;
    } else {
      currentInput += number;
    }
    if (secondOperand === null) {
      firstOperand += number;
      updateDisplay(firstOperand);
    } else {
      secondOperand += number;
      updateDisplay(secondOperand);
    }
  }

  function handleOperatorClick(operator) {
    debugger;
    if (firstOperand === "" || !!secondOperand) return;

    currentOperator = operator;
    updateDisplay(currentOperator);
    secondOperand = "";
    firstOperand = parseFloat(firstOperand);
    currentInput = "";
  }

  function calculateResult() {
    secondOperand = parseFloat(secondOperand);
    let result = 0;

    switch (currentOperator) {
      case "+":
        result = firstOperand + secondOperand;
        break;
      case "-":
        result = firstOperand - secondOperand;
        break;
      case "X":
        result = firstOperand * secondOperand;
        break;
      case "/":
        if (secondOperand !== 0) {
          result = firstOperand / secondOperand;
        } else {
          alert("Erro: Divisão por zero!");
          clearAll();
          return;
        }
        break;
      case "%":
        result = (firstOperand * secondOperand) / 100;
        break;
      default:
        break;
    }

    result = Math.round(result * 100) / 100;

    currentInput = result.toString();
    currentOperator = "";
    firstOperand = result;
    updateDisplay(currentInput);
  }

  function handleEqualsClick() {
    calculateResult();
    secondOperand = null;
  }

  function clearAll() {
    currentInput = "";
    clearVariables();
  }

  function clearVariables() {
    currentOperator = "";
    firstOperand = "";
    secondOperand = null;
    updateDisplay();
  }

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const buttonText = button.innerText;

      if (/[0-9]/.test(buttonText)) {
        handleNumberClick(buttonText);
      } else if (/[+\-X/%]/.test(buttonText)) {
        handleOperatorClick(buttonText);
      } else if (buttonText === "=") {
        handleEqualsClick();
      } else if (buttonText === "AC") {
        clearAll();
      }
    });
  });
});
