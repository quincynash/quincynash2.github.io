let equation, solution, button;
let characters = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  equation = createInput("")
  equation.position(width/2 - equation.width/2, height/2 - equation.height/2)
  equation.input(solveEquation)
  
  button = createButton("Copy Solution")
  button.position(width/2 - button.width/2, height/2 + 100)
  button.mousePressed(copySolution)
  
  solution = "No Solution"
  
  for (var i = unchar('A'); i <= unchar('Z'); i++) {
    characters.push(char(i))
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function variables(equation) {
  var text = equation.value()
  return [1, -2, -4, "x"]
}

function copyText(text) {
  text.select();
  text.setSelectionRange(0, 99999); /*For mobile devices*/

  document.execCommand("copy");

  alert("Copied Solution!");
}

function copySolution() {
  var old = equation.elt.value
  equation.elt.value = solution
  copyText(equation.elt)
  equation.elt.value = old
}

function factored(vars) {
  var a = vars[0] 
  var b = vars[1]
  var c = vars[2]
  var v = vars[3]
  var answer1 = (-b + sqrt(b ** 2 - (4 * a * c))) / (2 * a)
  var answer2 = (-b - sqrt(b ** 2 - (4 * a * c))) / (2 * a)
  var string = ""
  
  if (answer1 < 0) {
    string += "(" + v + " + " + str(-answer1) + ")"
  } else if (answer1 > 0) {
    string += "(" + v + " - " + str(answer1) + ")"
  } else {
    string += v
  }
  if (answer2 < 0) {
    string += "(" + v + " + " + str(-answer2) + ")"
  } else if (answer2 > 0) {
    string += "(" + v + " - " + str(answer2) + ")"
  } else {
    string += "x"
  }
  
  if (string == "xx") {
    string = "No Solution"
  }
  return string
}

function solveEquation() {
  solution = factored(variables(equation))
}  

function draw() {
  background(255);
  textAlign(CENTER, CENTER)
  
  textSize(12)
  textFont("Futura")
  text("Enter your equation:", width/2, height/2 - equation.height)
  text("Factored: " + solution, width/2, height/2 + equation.height * 2)
    
  textSize(40)
  text("Factoring Quadratics", width/2, 50)
  
  textSize(15)
  text("By: Quincy Nash", width/2, 100)
}
