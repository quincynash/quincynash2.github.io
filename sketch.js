let equation, solution, button, mobile;
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
  button.position(width/2 - button.width/2, height/2 + 100)
  equation.position(width/2 - equation.width/2, height/2 - equation.height/2)
}

function inList(element, array) {
  for (var part of array) {
    if (element == part) {
      return true
    }
  }
  return false
}

function isInt(num) {
  return Number.isInteger(num)
}

function isLetter(char) {
  return char.toLowerCase() != char.toUpperCase()
}

function beginningChars(string, chr) {
  var counter = 0
  for (var part of string) {
    if (part == chr) {
      counter += 1
    } else {
      return counter
    }
  }
}

function mySplit(string, chars=["+", "-"], remove=" ") {
  var sub = "";
  var list = []
  var stringLength = string.length
  
  for (var i = 0; i < stringLength; i++) {
    chr = string[i]
    if (inList(chr, chars) || i == stringLength - 1) {
      if (i == stringLength - 1) {
        if (!inList(chr, chars)) {
          sub += chr
        }
      }
      sub = sub.split(remove).join("")
      if (i != beginningChars(string, " ")) {
        list.push(sub)
      }
      sub = ""
      if (chr == "-") {
        sub = "-"
      }
    } else {
      sub += chr
    }
  }
  return list
}

function variables(equation) {
  var text = equation.value()
  var a = mySplit(text)[0] + " "
  a = a.slice(0, -2)
  if (a.length == 2) {
    a = "1" + a[0] + " "
  } else if (a.length == 2 && a[0] == "-") {
    a = "-" + a[a.length - 1] + " "
  } else if (a.length == 3 && a[0] == "-" && isLetter(a[1])) {
    a = "-1" + a[a.length - 2] + " "
  }
  var b = mySplit(text)[1] + " "
  b = b.slice(0, -2)
  if (b == "") {
    b = "1"
  } else if (b == "-") {
    b = "-1"
  }
  var c = mySplit(text)[2]
  var v = a[a.length - 2]
  a = a.slice(0, -2)
  if (a != undefined && b != undefined && c == undefined) {
    c = 0
  }
  //print(a, b, c, v)
  return [a, b, c, v]
}

function factors(num, sort=false) {
  facts = []
  for (var i = 1; i <= ceil(sqrt(abs(num))); i++) {
    if (num % i == 0) {
      facts.push(i)
      facts.push(num / i)
    }
  }
  if (sort) {
    facts.sort()
  }
  return facts
}

function copyText(text) {
  text.select()
  text.setSelectionRange(0, 99999) /*For mobile devices*/

  document.execCommand("copy")

  setTimeout(function() {alert("Copied Solution!")}, 150)
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
  var facts = factors(a)
  var string = ""
  var varA, varB, varC, varD, first, second;
  
  for (var factor of facts) {
    varA = factor
    varB = -answer1 * varA
    varC = a / factor
    varD = -answer2 * varC
    
    if (varB * varD == c && (varA * varD + varB * varC) == b) {
      break
    }
  }
    
  var num, nums;
    
  if (!isInt(varB) && isInt(varB * varD)) {
    nums = factors(varD)
    for (num of nums) {
      if (isInt(varB * num) && isInt(varA * num) && isInt(varC / num)) {
        varA *= num
        varB *= num
        varC /= num
        varD /= num
        break
      }
    }
  }
  if (!isInt(varA) && isInt(varA * varC)) {
    nums = factors(varC)
    for (num of nums) {
      if (isInt(varA * num) && isInt(varB * num) && isInt(varD / num)) {
        varA *= num
        varB *= num
        varC /= num
        varD /= num
        break
      }
    }
  }
    
  if (!isInt(varD) && isInt(varB * varD)) {
    nums = factors(varB)
    for (num of nums) {
      if (isInt(varD * num) && isInt(varA / num) && isInt(varC * num)) {
        varA /= num
        varB /= num
        varC *= num
        varD *= num
        break
      }
    }
  }
  if (!isInt(varC) && isInt(varA * varC)) {
    nums = factors(varA)
    for (num of nums) {
      if (isInt(varC * num) && isInt(varB / num) && isInt(varD * num)) {
        varA /= num
        varB /= num
        varC *= num
        varD *= num
        break
      }
    }
  }
     
  if (varA < 0 && varC < 0) {
    varA *= -1
    varB *= -1
    varC *= -1
    varD *= -1
  }

  if (varA == 1) {
    varA = ""
  } else if (varA == -1) {
    varA = "-"
  }
    
  if (varC == 1) {
    varC = ""
  } else if (varC == -1) {
    varC = "-"
  }
  
  if (int(varB) > 0) {
    string += "(" + str(varA) + v + " + " + str(varB) + ")"
  } else if (int(varB) < 0) {
    string += "(" + str(varA) + v + " - " + str(-varB) + ")"
  } else if (varA != undefined) {
    string += str(varA) + v
    first = true
  }
    
  if (int(varD) > 0) {
    string += "(" + str(varC) + v + " + " + str(varD) + ")"
  } else if (int(varD) < 0) {
    string += "(" + str(varC) + v + " - " + str(-varD) + ")"
  } else if (varA != undefined) {
    string = str(varC) + v + string
    second = true
  }
  
  if (string == "xx" || string == "" || (first && second) || varA == undefined || varC == undefined) {
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
