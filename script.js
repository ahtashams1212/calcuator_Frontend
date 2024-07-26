document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let currentOperation = null;
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            switch (value) {
                case 'C':
                    currentInput = '';
                    currentOperation = null;
                    firstOperand = null;
                    updateDisplay();
                    break;
                case '=':
                    if (currentOperation && firstOperand !== null) {
                        calculate();
                    }
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '^':
                    if (currentInput) {
                        if (firstOperand === null) {
                            firstOperand = parseFloat(currentInput);
                        } else if (currentOperation) {
                            calculate();
                        }
                        currentOperation = value;
                        currentInput = '';
                    }
                    break;
                case 'sqrt':
                    if (currentInput) {
                        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                        updateDisplay();
                    }
                    break;
                case 'log':
                    if (currentInput) {
                        currentInput = Math.log10(parseFloat(currentInput)).toString();
                        updateDisplay();
                    }
                    break;
                default:
                    currentInput += value;
                    updateDisplay();
                    break;
            }
        });
    });

    function calculate() {
        if (currentOperation && firstOperand !== null) {
            let result;
            const secondOperand = parseFloat(currentInput);

            switch (currentOperation) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    result = firstOperand / secondOperand;
                    break;
                case '^':
                    result = Math.pow(firstOperand, secondOperand);
                    break;
                default:
                    return;
            }

            currentInput = result.toString();
            currentOperation = null;
            firstOperand = null;
            updateDisplay();
        }
    }

    function updateDisplay() {
        display.value = currentInput;
    }
});
