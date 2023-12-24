window.addEventListener('keydown', this.keyDown, false);

//variables
var random;

const container = document.getElementById("container");

//if color is true, circle is purple, if it is false then it is blue
var color = true;

var rows;
var cols;

var List;
var rows = 6;
var cols = 5;
var randomGoal;
var randomInitial;
var randomInitialValue;
var x;
var purplePortal;
var bluePortal;

var points = 0;

var number;

var free = new Array(rows * cols);

window.onload = setup();

function keyDown(e) {


}

function setup() {
  //if (validDim() == false) {
  //	console.log("error");
  //} else{
  List = initialSet(rows, cols);
  rows = List[0];
  cols = List[1];
  randomGoal = List[2];
  randomInitial = List[3];
  randomInitialValue = List[3];
  x = randomInitial;
  number = ((rows * cols) - (cols - 1));
  //}
  return;
}

function validDim() {
  rows = parseInt(sessionStorage.getItem('rows'));
  cols = parseInt(sessionStorage.getItem('cols'));
  console.log(cols)
  if (rows <= 0 || cols <= 0 || (rows == 1 && (cols == 1 || cols == 2) || (cols == 1 && (rows == 1 || rows == 2)) || isNaN(rows) || isNaN(cols))) {
    document.getElementById("error-para").innerHTML = "Invalid Row or Column number: Fatal Error";
    return false;
  }
  return true;
}


function initialSet(r, c) {
  List = makeRows(r, c);
  rows = List[0];
  cols = List[1];
  mult = rows * cols;
  randomGoal = Math.round(Math.random() * (mult - 1)) + 1;
  randomInitial = Math.round(Math.random() * (mult - 1)) + 1;
  bluePortal = cols;
  purplePortal = (rows * cols) - (cols - 1);
  while (randomGoal == cols || randomGoal == (mult - (cols - 1))) {
    randomGoal = Math.round(Math.random() * (mult - 1)) + 1;
  }
  while (randomInitial == cols || randomInitial == (mult - (cols - 1)) || randomInitial == randomGoal) {
    randomInitial = Math.round(Math.random() * (mult - 1)) + 1;
  }
  document.getElementById("grid" + randomInitial).innerText = "O";
  document.getElementById("grid" + randomGoal).innerText = "Goal";
  document.getElementById("grid" + purplePortal).innerText = "P";
  document.getElementById("grid" + bluePortal).innerText = "B";

  return [rows, cols, randomGoal, randomInitial];
}

function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (i = 1; i < (rows * cols) + 1; i++) {
    let cell = document.createElement("div");
    cell.innerText = " ";
    container.appendChild(cell).className = "grid-item";
    cell.id = "grid" + i;

  }

  return [rows, cols];
}


function checkerBFS(x, mode) {

  //TODO: DOES NOT WORK INFINITE LOOP

  // 1: character is blue and can only break 1
  // 2: character is purple and can only break 2

  var visited = new Array(rows * cols + 1);
  for (var i = 0; i < visited.length; i++) {
    visited[i] = false;
  }
  var queue = [];
  queue.push(x);

  visited[x] = true;

  while (queue.length > 0) {
    var head = queue[0];
    queue.shift();
    if (head == randomGoal || head == purplePortal || head == bluePortal) {
      return true;
    }
    alert(head);
    alert(visited);
    visited[head] = true;
    for (var i = 0; i < 8; i++) {
      var surrounding = [head - cols - 1, head - cols, head - cols + 1, head + 1, head + cols + 1, head + cols, head + cols - 1, head - 1];
      if (surrounding[i] <= (rows * cols) && surrounding[i] >= 0) {
        var temp = document.getElementById("grid" + surrounding[i]).innerHTML;
        if (!visited[surrounding[i]]) { //&& (temp == mode.toString() || temp == " ")) {
          queue.push(surrounding[i]);
        }
      }
    }
  }
  return false;
}

//these are the moving functions
//even though most of the code is similar, it would be easier
//for me in the future to make these all different functions
//example: left(1) instead of move(left, 1)

function left(mode) {
  try {
    var next = document.getElementById("grid" + x - 1).innerText;
    if (next == mode || next == " " || x - 1 == randomGoal || x - 1 == bluePortal || x - 1 == purplePortal) {
      x--;
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

function up(mode) {
  try {
    var next = document.getElementById("grid" + x - cols).innerText;
    if (next == mode || next == " " || x - cols == randomGoal || x - cols == bluePortal || x - cols == purplePortal) {
      x -= cols;
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

function down(mode) {
  try {
    var next = document.getElementById("grid" + x + cols).innerText;
    if (next == mode || next == " " || x + cols == randomGoal || x + cols == bluePortal || x + cols == purplePortal) {
      x += cols;
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

function right(mode) {
  try {
    var next = document.getElementById("grid" + x + 1).innerText;
    if (next == mode || next == " " || x + 1 == randomGoal || x + 1 == bluePortal || x + 1 == purplePortal) {
      x++;
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

