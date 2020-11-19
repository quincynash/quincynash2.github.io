let equation;

function setup() {
  createCanvas(windowWidth, windowHeight);
  equation = createInput("")
  equation.position(width/2 - equation.width/2, height/2 - equation.height/2)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function variables(equation) {
  return [1, 2, 3]
}

function factored(variables) {
  return variables
}

function draw() {
  background(255);
  textAlign(CENTER, CENTER)
  
  textSize(12)
  textFont("Futura")
  text("Enter your equation:", width/2, height/2 - equation.height)
  text("Factored: " + factored(variables(equation)), width/2, height/2 + equation.height)
    
  textSize(40)
  text("Factoring Quadratics", width/2, 50)
  
  textSize(15)
  text("By: Quincy Nash", width/2, 100)
}
