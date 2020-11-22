let equation, solution, button, mobile;
let characters = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  equation = createInput("")
  equation.position(width/2 - equation.width/2, height/2 - equation.height/2)
  equation.input(solveEquation)
  
  mobile = isMobile()
  
  button = createButton(str(mobile))
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

function isMobile() {
  var mobile = false; //initiate as false
// device detection
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    mobile = true;
  }
  return mobile
}

function inList(element, array) {
  for (var part of array) {
    if (element == part) {
      return true
    }
  }
  return false
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
  if (a.length == 2 || a[0] == "-") {
    a = "1" + a[0] + " "
  }
  var b = mySplit(text)[1] + " "
  b = b.slice(0, -2)
  if (b == "") {
    b = "1"
  }
  var c = mySplit(text)[2]
  var v = a[a.length - 2]
  a = a.slice(0, -2)
  //print(a, b, c, v)
  return [a, b, c, v]
}

function factors(num) {
  facts = []
  for (var i = 1; i <= ceil(sqrt(num)); i++) {
    if (num % i == 0) {
      facts.push(i)
      facts.push(num / i)
    }
  }
  return [...new Set(facts)]
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
  
  if (answer1 < 0) {
    string += "(" + str(varA) + v + " + " + str(varB) + ")"
  } else if (answer1 > 0) {
    string += "(" + str(varA) + v + " - " + str(-varB) + ")"
  } else if (varA != undefined) {
    string += str(varA) + v
    first = true
  }
    
  if (answer2 < 0) {
    string += "(" + str(varC) + v + " + " + str(varD) + ")"
  } else if (answer2 > 0) {
    string += "(" + str(varC) + v + " - " + str(-varD) + ")"
  } else if (varA != undefined) {
    string += str(varC) + v
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
