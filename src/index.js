function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let ops = {'+': 1, '-': 1, '*': 2, '/': 2};
    let peek = (a) => a[a.length - 1];
    let stack = [];
    let output = [];
  
    let input = expr.split('');
    let accum = '';
    input.forEach((token, index) => {
        if (!isNaN(parseFloat(token))) {
            accum += token;
            if(index !== input.length - 1 && !isNaN(parseFloat(input[index + 1]))){
            } else {
                output.push(accum);
                accum = '';
            }
        }
    
        if (token in ops) {
            while (peek(stack) in ops && ops[token] <= ops[peek(stack)])
            output.push(stack.pop());
            stack.push(token);
        }
    
        if (token === '(') {
            stack.push(token);
        }
    
        if (token == ')') {
            while (peek(stack) !== '('){
                if(stack.length === 0){
                    throw Error("ExpressionError: Brackets must be paired");
                } else {
                    output.push(stack.pop());
                }
            }
            stack.pop();
        }
        return output;
    })
    
    stack.forEach((e) => {
        if(e === '('){
            throw Error("ExpressionError: Brackets must be paired");
        }
    })
    
      output = output.concat(stack.reverse());
      return rpn(output);
}

function rpn(arr){
    let accum = [];
    arr.forEach((e) => {
        if(!isNaN(parseFloat(e))){
            accum.push(parseFloat(e));
        } 
        else if (e === '+'){
            accum.push(accum.pop() + accum.pop());
        }
        else if (e === '-'){
            let r = accum.pop();
            let l = accum.pop(); 
            accum.push(l - r);
        }
        else if (e === '*'){
            accum.push(accum.pop() * accum.pop());
        }
        else if (e === '/'){
            let r = accum.pop();
            let l = accum.pop(); 
            if (r === 0){
                throw Error('TypeError: Division by zero.');
            }
            accum.push(l / r);
        }
    })
    return accum.pop();
}

module.exports = {
    expressionCalculator
}