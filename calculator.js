
function add(a, b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b==0) return "You can't divide by 0!";
    return a/b;
}


function operate(num1, num2, op){
    switch(op){
        case '+':
            return add(num1, num2);
        
        case '-':
            return subtract(num1, num2);
        
        case '*':
            return multiply(num1, num2);
        
        case '/':
            return divide(num1, num2);

        default:
            return num2;
    }
}


let firstOperand = null;
let operator = null;
let secondOperand = false;


const inputField = document.querySelector('#inputField input')
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button =>{
    button.addEventListener('click', ()=>{
        const value = button.textContent;

        if(['+', '-', '*', '/'].includes(value)){
            handleOperator(value);
            return;
        }

        if(secondOperand){
            inputField.value = value;
            secondOperand = false;
        }
        else{
            inputField.value = inputField.value === '0'? value : inputField.value + value;
        }
    });
});

function handleOperator(nextOperator){
    const inputValue = parseFloat(inputField.value);

    if(operator && secondOperand){
        operator = nextOperator;
        return;
    }

    if(firstOperand === null){
        firstOperand = inputValue;
    }else if(operator){
        const result = operate(firstOperand, inputValue, operator);
        inputField.value = (typeof result === "number" && result%1 !==0)? result.toFixed(6) : result;
        firstOperand = parseFloat(inputField.value);
    }

    operator = nextOperator;
    secondOperand = true;
}



const equalButton = document.querySelector('#equal');

equalButton.addEventListener('click', ()=>{
    const inputValue = parseFloat(inputField.value);

    if(operator === null || secondOperand){
        return;
    }

    const result = operate(firstOperand, inputValue, operator);
    inputField.value = (typeof result === "number" && result % 1 !== 0)? result.toFixed(6):result;
    firstOperand = null;
    operator = null;
    secondOperand = false;
});


const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', ()=>{
    inputField.value = "";
    firstOperand = null;
    operator = null;
    secondOperand = false;
});

