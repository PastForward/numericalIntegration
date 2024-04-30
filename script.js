$(document).ready(function() {

  $('.inputs').submit(function(e) {
    e.preventDefault();

    // Get all the forms elements and their values 
    let func = $('#function').val();
    let getLowerLimit = $('#lowerLimit').val();
    let getUpperLimit = $('#upperLimit').val();
    let getSubIntervals = $('#subIntervals').val();

    // typecasting the inputs to their respective identities
    let equation = math.compile(func);
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

    let deltaX = (upperLimit - lowerLimit) / subIntervals;

    let left = lowerLimit;

    let right = lowerLimit + deltaX;

    let answer = 0;

    let finalAnswer;
    while (left < upperLimit) {
      
      let currentMidpoint = (left + right) / 2
      answer += math.evaluate({ x: currentMidpoint });

      left = right;
      right = right + h;

      
     
      
    }
    
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
