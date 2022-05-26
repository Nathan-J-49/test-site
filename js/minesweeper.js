var rows = 5;
var cols = 5
var mines = 4;
var openSquares;

var board = document.getElementById("board");
var squares = initialize(board, rows, cols);
resetGame()


function initialize(table, rows, cols) {

  var newArr = [];

  for (var r = 0; r < rows; r++) {

    var row = table.insertRow(r);
    newArr[r] = [];

    for (var c = 0; c < cols; c++) {

      var cell = row.insertCell(c);
      cell.setAttribute("class", "square");
      newArr[r][c] = cell;
      cell.row = r;
      cell.col = c;

      cell.onclick = function () {
        clickSquare(this.row, this.col);
      }
      cell.oncontextmenu = function () {
        rightClick(this.row, this.col);
      }
    }
  }
  return newArr;
}


function resetGame() {
  openSquares = rows * cols - mines;

  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      var elem = squares[r][c];
      elem.setAttribute("mine", "0");
      elem.innerHTML = "";
      elem.style.backgroundColor = "white";
      elem.style.color = "black";
    }
  }

  
  var count = mines;
  while (count > 0) {
    var mineRow = randomInt(0, rows);
    var mineCol = randomInt(0, cols);
    var elem = squares[mineRow][mineCol];
    if (elem.getAttribute("mine") != "1") {
      elem.setAttribute("mine", "1");
      count--;
      console.log(mineRow, mineCol)
    }
  }
}


function clickSquare(row, col) {
  var elem = squares[row][col];
  if (elem.innerHTML == "") {
    if (elem.getAttribute("mine") == "1") {
      elem.style.backgroundColor = "red";
      elem.innerHTML = "X";
      alert("Game Over");
      resetGame();
    } else {
      checkTouching(row, col);
      if (openSquares == 0) {
        alert("You Win");
        resetGame();
      }
    }
  }
}
  
function rightClick(row, col) {
  event.preventDefault();
  var elem = squares[row][col];
  if (elem.innerHTML == "") {
    elem.innerHTML = "⚑";
    elem.style.color = "darkRed";
  } else if (elem.innerHTML == "⚑") {
    elem.innerHTML = "";
    elem.style.color = "black";
  }
}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function checkMine(row, col) {
  if (squares[row][col].getAttribute("mine") == "1") {
    return true;
  } else false;
}

function checkTouching(row, col) {
  var mineCount = 0;
  for (var r = row - 1; r < row + 2; r++) {
    for (var c = col - 1; c < col + 2; c++) {

      if (!((r == row && c == col) || r < 0 || r >= rows ||
        c < 0 || c >= cols)) {
        if (checkMine(r, c)) {
          mineCount++;
        }
      }
    }
  }
  squares[row][col].innerHTML = mineCount;
  openSquares--;


  if (mineCount == 0) {
    for (var r = row - 1; r < row + 2; r++) {
      for (var c = col - 1; c < col + 2; c++) {
        if (!((r == row && c == col) || r < 0 || r >= rows ||
          c < 0 || c >= cols)) {
          if (squares[r][c].innerHTML == "") {
            checkTouching(r, c);
          }
        }
      }
    }
  }
}
