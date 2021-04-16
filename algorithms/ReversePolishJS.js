/*
Evaluates the prefix expression and calculates the result for the given
variable values.

@param {String} expression - the prefix expression to evaluate.
@param {Object} variables - all the variables in the expression are the keys of
    this object and their corresponding values are the values the variable
    should take
@returns {Number|null} the numerical result of the expression evaluated with the
    given variable values. If the expression is invalid, it will return `null`.
*/
function result_expression(expression, variables) {
    let prefix = expression.split(' ').filter(item => item !== '');
    let prefixStack = [];
    if (prefix.length > 0) {
        for (let i = prefix.length - 1; i >= 0; i--) {
            let element = prefix[i];
            if (isOperator(element)) {
                let res =  compute(prefixStack.pop(), operation(element), prefixStack.pop(), variables);
                prefixStack.push(
                   res
                );
            } else {
                prefixStack.push(element);
            }
        }
    }
    return prefixStack.pop();
}

function compute(a, fn, b, variables) {
    if (isNaN(a)) {
        a = variables[a];
    }
    if (isNaN(b)) {
        b = variables[b];
    }
    let res = fn(parseInt(a), parseInt(b));
    console.log(res);
    return res;
}

function operation(element) {
    switch(element) {
        case '+': return (a, b) => a + b;
        case '-': return (a, b) => a - b;
        case '*': return (a, b) => a * b;
        case '/': return (a, b) => a / b;
        default: return (a, b) => {}
    }
}

function isOperator(element) {
    switch(element) {
        case '+':
        case '-':
        case '*':
        case '/':
            return true;
        default:
            return false;
    }
}
process.stdin.resume();