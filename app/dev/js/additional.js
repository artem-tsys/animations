'use strict'
Pictor.prototype.splitUp = function (word, id, separator, time) {
  console.log(id)
  var arr = word.split(separator);
  time = parseFloat(time)

  var i = 0;
  $.each(arr, function (index) {

    time += 0.1;
    i = 0;
    time = +time.toFixed(2);

    $(id).append(
      '<span class="charlie" data-animations="textAnimateLetter" data-times=" ' + time +
      '">' +
      (this == ' ' ? '&nbsp;' : this) +
      '</span>'
    );

    i++;
  });
};

Pictor.prototype.numberAnimation = function (amount, parent) {
  var options = {
    amount: amount,
    delay: 0,
    duration: 50,
  };
  var amount = options.amount;
  var time = amount / options.duration;
  var number = 0;
  var fixed = 0;
  if (amount.toString().split('.')[1]) {
    fixed = amount.toString().split('.')[1].length;
  }
  requestAnimationFrame(function interval() {
    number += time;
    parent.querySelector('.number').innerHTML =
      // Math.round(number * 100) / 100;
      number.toFixed(fixed);
    if (number >= amount) {
      document.querySelector('.number').innerHTML = amount;
      cancelAnimationFrame(interval);
    } else {
      requestAnimationFrame(interval);
    }
  });
};

Pictor.prototype.animateText = function () {
  var width = document.querySelector('#animate1').offsetWidth;
  var animate = '@keyframes animate1-text {' +
    '  from{' +
    '    opacity: 0;' +
    '    transform: rotateX(60deg);' +
    '    clip: rect(0px, '+width/2+'px, '+width+'px, '+width/2+'px);' +
    '  }' +
    '  5%{' +
    '    transform:scale(1)rotateX(50deg);' +
    '  }' +
    '  8.5%{' +
    '    clip: rect(0px, '+width+'px, '+width+'px, 0px);' +
    '}'+
    '  15%{' +
    '    opacity: 1;' +
    '  }' +
    '  20%{' +
    '    transform: rotateX(0deg);' +
    '  }' +
    '  36%,95%{' +
    '    transform:scale(0.8);' +
    '    opacity: 1;' +
    '  }' +
    '  to{' +
    '    opacity: 0;' +
    '    transform: scale(0.8)rotateX(0deg);' +
    '  }' +
    '}' +
    '.animate1-text{' +
    '  position: absolute;' +
    '  clip: rect(0, '+width+'px, '+width+'px, 0);' +
    '  animation: animate1-text 10s linear;' +
    '}'+
    '.animate1-finish{' +
    '  animation: animate1-finish 0.1s linear;' +
    '}'
  ;

  var style = document.createElement("style");
  style.innerHTML = animate;
  $('head').append(style);
};