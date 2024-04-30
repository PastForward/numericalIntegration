$(document).ready(function() {
  
    $('.inputs').submit(function(e) {

    // prevents the submission from reloading the page
    e.preventDefault();

    // Get all the forms elements and their values 
    let func = $('#function').val();
    let getLowerLimit = $('#lowerLimit').val();
    let getUpperLimit = $('#upperLimit').val();
    let getSubIntervals = $('#subIntervals').val();
    
    // typecasting the inputs to their respective identities
    const equation = math.compile(func);
    let lowerLimit = Number(getLowerLimit);
    let upperLimit = Number(getUpperLimit);
    let subIntervals = Number(getSubIntervals);
    let isNegative = false

    // if the upper limit is smaller than the lower limit, swap them and
    // make the equation negative
    if (upperLimit <= lowerLimit) {
      isNegative = true;
      let temp = upperLimit;
      upperLimit = lowerLimit;
      lowerLimit = temp;
    }
    
    // calculating the delta x for the midpoint
    let deltaX = (upperLimit - lowerLimit) / subIntervals;

    // the x0 (left side) of the equation that is (x0 + x1) / 2
    let left = lowerLimit;

    // the x1 (right side) of the equation that is (x0 + x1) / 2
    let right = lowerLimit + deltaX;

    // holds the answer of each equation through the loop
    let answer = 0;

    // holds the complete answer
    let finalAnswer;
    
    // if the left value hasn't made it to the upper limit of integration, than continue
    while (left < upperLimit) {
      
      // calculating the midpoint at the current loop
      let currentMidpoint = (left + right) / 2
      answer += equation.evaluate({ x: currentMidpoint });
      // advancing the left and right values for the next loop
      left = right;
      right = right + deltaX;

    }
    
    // calculating the final answer, which is deltax * all the midpoints added up
    finalAnswer = deltaX * answer;
    if (isNegative) {
      finalAnswer *= -1;
    }

    console.log("delta x: " + deltaX);
    console.log("left: " + left);
    console.log("right: " + right);
    console.log("final answer: "+ finalAnswer);
   
    console.log("THE VALUES:");
    console.log(func);
    console.log(getLowerLimit);
    console.log(getUpperLimit);
    console.log(getSubIntervals);

    console.log('\nTHE VALUES IN MATH FORM:');
    console.log(equation);
    console.log(lowerLimit);
    console.log(upperLimit);
    console.log(subIntervals);

    // displaying the value
    
    console.log(finalAnswer);
    $("#answer").text(finalAnswer);

    // $('#answer').displayValue(finalAnswer); 
  });

  // jQuery.fn.displayValue = function(finalAnswer) {
    // console.log("displaying value!");
    // $(this).text(finalAnswer);
    // console.log(finalAnswer);
    // console.log(this.length);
  // }
});
