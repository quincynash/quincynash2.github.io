let equation, solution;

function setup() {
  createCanvas(windowWidth, windowHeight);
  equation = createInput("")
  equation.position(width/2 - equation.width/2, height/2 - equation.height/2)
  equation.input(solveEquation)
  
  solution = "No Solution"
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function variables(equation) {
  var text = equation.value()
  return "Solution"
}

function factored(vars) {
  return vars
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
