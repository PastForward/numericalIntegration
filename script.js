$(document).ready(function() {
  

    $('.trapezoidInputs').submit(function(e) {
    
    // prevents the submission from reloading the page
    e.preventDefault();
    
    // Get all the forms elements and their values 
    let func = $('#trapezoidFunction').val();
    let getLowerLimit = $('#trapezoidLowerLimit').val();
    let getUpperLimit = $('#trapezoidUpperLimit').val();
    let getSubIntervals = $('#trapezoidSubIntervals').val();
    
    // typecasting the inputs to their respective identities
    const equation = math.compile(func);
    let lowerLimit = Number(getLowerLimit);
    let upperLimit = Number(getUpperLimit);
    let subIntervals = Number(getSubIntervals);
    let isNegative = false;

    // if the upper limit is smaller than the lower limit, swap them 
    if (upperLimit <= lowerLimit) {
      isNegative = true;
      let temp = upperLimit;
      upperLimit = lowerLimit;
      lowerLimit = temp;
    }

    let point = lowerLimit;
    let answer = 0;
    // technically denoted as the height of the trapezoid, h, but its also deltaX
    let deltaX = (upperLimit - lowerLimit) / subIntervals;


    while (point <= upperLimit) {

      // if the point is at either the beginning or the end of the limit,
      // then it will not be multiplied by 2
      if (point === lowerLimit || point === upperLimit) {
        answer += equation.evaluate({ x: point });

      } else answer += 2 * equation.evaluate({ x: point });
      
      point += deltaX;
    }
    
    // calculating the final answer, which is deltax * all the midpoints added up
    let finalAnswer = answer * (deltaX / 2);

    if (isNegative) {
      finalAnswer *= -1;
    }

    // displaying the value in the answer slot
    $("#trapezoidAnswer").text(finalAnswer);

  });

    $('.midpointInputs').submit(function(e) {
    
    // prevents the submission from reloading the page
    e.preventDefault();

    // Get all the forms elements and their values 
    let func = $('#midpointFunction').val();
    let getLowerLimit = $('#midpointLowerLimit').val();
    let getUpperLimit = $('#midpointUpperLimit').val();
    let getSubIntervals = $('#midpointSubIntervals').val();
    
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

    // displaying the value in the answer slot
    $("#midpointAnswer").text(finalAnswer);
  });

  $('.simpsonInputs').submit(function(e) {
    
    // prevents the submission from reloading the page
    e.preventDefault();

    // Get all the forms elements and their values 
    let func = $('#simpsonFunction').val();
    let getLowerLimit = $('#simpsonLowerLimit').val();
    let getUpperLimit = $('#simpsonUpperLimit').val();
    let getSubIntervals = $('#simpsonSubIntervals').val();
    
    // typecasting the inputs to their respective identities
    const equation = math.compile(func);
    let lowerLimit = Number(getLowerLimit);
    let upperLimit = Number(getUpperLimit);
    let subIntervals = Number(getSubIntervals);
    let isNegative = false

    if (upperLimit <= lowerLimit) {
      isNegative = true;
      let temp = upperLimit;
      upperLimit = lowerLimit;
      lowerLimit = temp;
    }

    let deltaX = (upperLimit - lowerLimit) / subIntervals;
    // skipping the first integration for the while loop
    let point = lowerLimit;
    let answer = 0;
    let nCount = 0;

    answer += equation.evaluate({ x: point });
    point += deltaX;
    while (point <= upperLimit - deltaX) {
     
      console.log(equation.evaluate({ x: point}));
       if (nCount % 2 == 0) {
        answer += 4 * equation.evaluate({ x: point });

      } else answer += 2 * equation.evaluate({ x: point });

      point += deltaX;
      nCount++;
    }
      answer += equation.evaluate({ x: point });

    let finalAnswer = answer * (deltaX / 3);
    
    if (isNegative) {
      finalAnswer *= -1;
    }

    // displaying the value in the answer slot
    $("#simpsonAnswer").text(finalAnswer);

  });
});
