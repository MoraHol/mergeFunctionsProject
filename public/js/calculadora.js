var keys = document.querySelectorAll('#calculator span')
var inputVal = ''
for (var i = 0; i < keys.length; i++) {
  keys[i].onclick = function () {
    var input = document.querySelector('.screen')
    var btnVal = this.innerHTML

    if (btnVal == 'C') {
      input.innerHTML = ''
      inputVal = input.innerHTML
    } else if (btnVal == 'x') {
      inputVal += '*'
      input.innerHTML += btnVal
    } else if (btnVal == '÷') {
      inputVal += '/'
      input.innerHTML += btnVal
    }
  
    else if (btnVal == '=') {
      var equation = inputVal;
      calculate(equation, input)
      inputVal = input.innerHTML
    } else {
      input.innerHTML += btnVal
      inputVal += btnVal
    }
    console.log(inputVal)
  }
}

function calculate(equation, input) {
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      input.innerHTML = this.responseText
    }
    if (this.status === 400) {
      input.innerHTML = 'eror: ha escrito mal la expresion'
    }
  }
  xhttp.open("GET", 'http://api.mathjs.org/v4/?expr=' + encodeURIComponent(equation), false)
  xhttp.send()
}