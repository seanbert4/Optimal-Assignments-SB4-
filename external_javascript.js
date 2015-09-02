/*
Coderbyte "Hard" Challenge

Have the function OptimalAssignments(strArr) read strArr which will represent an NxN matrix and it will be in the following format:
["(n,n,n...)","(...)",...] where the n's represent integers. 
This matrix represents a machine at row i performing task at column j. 
The cost for this is matrix[i][j]. 
Your program should determine what machine should perform what task so as to minimize the whole cost and it should return the pairings of machines to tasks in the following format:
(i-j)(...)... 
Only one machine can perform one task. 
For example: if strArr is ["(5,4,2)","(12,4,3)","(3,4,13)"] then your program should return (1-3)(2-2)(3-1) because assigning the machines to these tasks gives the least cost. 
The matrix will range from 2x2 to 6x6, there will be no negative costs in the matrix, and there will always be a unique answer. 


Input = "(1,2,1)","(4,1,5)","(5,2,1)" 
Output = "(1-1)(2-2)(3-3)"

Input = "(13,4,7,6)","(1,11,5,4)","(6,7,2,8)","(1,3,5,9)" 
Output = "(1-2)(2-4)(3-3)(4-1)"
*/


function OptimalAssignments(strArr) {

  function calculateCost(permutation) { //Format of input: [[1, 1], [2, 2], [3, 3]] where subarray[0] is the robot and subarray[1] is the task assignment.
    var totalCost = 0,
        taskCost;
    for (var i = 0; i < permutation.length; i++) {
      taskCost = strArr[i][(permutation[i][1] - 1)];
      totalCost += taskCost;
    }
    return totalCost;
  }

  function findBestSolution(bestSolution, nextSolution) {
    if (calculateCost(bestSolution) <= calculateCost(nextSolution)) {
      return bestSolution;
    }
    return nextSolution;
  }

  function firstPermutation(num) {
    var array = [];
    for (var i = 1; i <= num; i++) {
      array.push(i);
    }
    return array;
  }

  function formatInput(element, index, array) {
    array[index] = function() {
      while (element.indexOf("(") >= 0) {
        element = element.replace("(", "");
      }
      while (element.indexOf(")") >= 0) {
        element = element.replace(")", "");
      }
      element = element.split(",");
      element.forEach(function(el, i, arr) {
        arr[i] = Number(el);
      })
      return element;
    }();
  }

  function formatOutput(array) { //input is [[1, 1], [2, 2], [3, 3]]; output is "(1-1)(2-2)(3-3)"
    var result = "";
    array.forEach(function(element, index, array) {
      result += "(" + element[0] + "-" + element[1] + ")";
    });
    return result;
  }

  function formatPermutations(subArray, index, array) { //input is [1, 2, 3]; output is [[1,1], [2, 2], [3, 3]]
    var results = [];
    for (var i = 0; i < subArray.length; i++) {
      var result = [];
      result.push(i + 1);
      result.push(subArray[i]);
      results.push(result);
    }
    array[index] = results;
  }

  function nextPermutation(array) {
    
    function getK(array) {
      for (var k = (array.length - 2); k >= 0; k--) {
        if (array[k] < array[k + 1]) {
          return k;
        }
      }
      return null;
    }

    function getL(array) {
      for (var l = (array.length - 1); l >= 0; l--) {
        if (array[k] < array[l]) {
          return l;
        }
      }
    }

    function reverse(array, index) {
      var reversedElements = array.splice(index, array.length - index);
      reversedElements.sort();
      reversedElements.forEach(function(currentNum) {
        array.push(currentNum);
      })
      return array;
    }

    var k = getK(array);
    if (k === null) {
      return null;
    }
    var l = getL(array),
        tempValue = array[k];
    array[k] = array[l];
    array[l] = tempValue;
    return reverse(array, k + 1);
  }

  var numberOfRobots = strArr.length;
  strArr.forEach(formatInput);
  var allPermutations = [],
      thisPermutation = firstPermutation(numberOfRobots);
  while (thisPermutation != null) {
    allPermutations.push(thisPermutation);
    thisPermutation = nextPermutation(thisPermutation.slice());
  }
  allPermutations.forEach(formatPermutations);
  var bestSolution = allPermutations.reduce(findBestSolution);
  bestSolution = formatOutput(bestSolution);
  return bestSolution;
}

//var strArr = ["(1,2,1)","(4,1,5)","(5,2,1)"];
var strArr = ["(13,4,7,6)","(1,11,5,4)","(6,7,2,8)","(1,3,5,9)"];
console.log(OptimalAssignments(strArr));










