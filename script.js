let display = document.getElementById('display');
let expression = '';

function appendNumber(value) {
    const lastChar = expression[expression.length - 1];
    const lastPart = expression.split(' ').pop();

    if (value === '0' && lastPart === '0' && !lastPart.includes('.')) return;

    if (lastPart.length === 1 && lastPart[0] === '0' && value !== '.') {
        expression = expression.slice(0, -1) + value;
        updateDisplay();
        return;
    }

    if (value === '.') {
        if (lastPart.includes('.')) return;
    }

    if (lastChar === '-' && (expression.length === 1 || '*/+-'.includes(expression[expression.length - 2]))) {
        expression += value;
    } else if ('*/+-'.includes(lastChar)) {
        expression += ' ' + value;
    } else {
        expression += value;
    }
    updateDisplay();
}

function appendOperator(value) {
    const lastChar = expression[expression.length - 1];
    
    if (expression.length === 0) {
        if (value === '-') {
            expression += value;
            updateDisplay();
        }
        return;
    }

    if ('*/+-'.includes(lastChar)) {
        if (value === '-' && ('*/'.includes(lastChar))) {
            expression += ' ' + value;
        } else {
            expression = expression.slice(0, -1) + value;
        }
    } else {
        expression += ' ' + value;
    }
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    display.innerHTML = '';
}

function removeLast() {
    expression = expression.trimEnd();
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    expression = expression.trim();

    const divisionByZeroPattern = /\/\s*0/;
                                    
    if (divisionByZeroPattern.test(expression)) {
        display.innerHTML = '<span style="color: gray;"> Error </span>';
        expression = '';
        return;
    }

    if (expression.length > 0) { 
        try {
            let result = eval(expression.replace(/\s+/g, '')); 
            result = Math.round(result * 100000) / 100000; 
            display.innerHTML = `<span style="color: black;">${result}</span>`; 
            expression = result.toString(); 
        } catch (error) {
            display.innerHTML = '<span style="color: gray;"> Error </span>';
            expression = ''; 
        }
    }
}

function updateDisplay() {
    const parts = expression.split(' ').map((part, index) => {
        return `<span style="color: ${index === expression.split(' ').length - 1 ? 'black' : 'gray'};">${part}</span>`;
    });
    display.innerHTML = parts.join(' '); 
}
