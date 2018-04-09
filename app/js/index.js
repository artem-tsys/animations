'use strict';
window.HELP_IMPROVE_VIDEOJS = false;

function VideoPlayer () {
  var videoElem = document.createElement ('VIDEO');
  videoElem.setAttribute ('src', './app/img/Sequence.mp4');
  videoElem.setAttribute ('class', 'video-js vjs-fluid');
  videoElem.setAttribute ('controls', true);
  videoElem.setAttribute ('id', 'js--video-player');
  this.video = videoElem;
  console.log(videoElem);
}

VideoPlayer.prototype.animationStart = (function (el) {
  var animations = {
    animation: 'animationstart',
    OAnimation: 'oAnimationStart',
    MozAnimation: 'mozAnimationStart',
    WebkitAnimation: 'webkitAnimationStart',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}) (document.createElement ('div'));

VideoPlayer.prototype.animationEnd = (function (el) {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}) (document.createElement ('div'));

VideoPlayer.prototype.fetchData = function (uri, callback) {
  var self = this;
  fetch (uri)
    .then (function (response) {
      return response.json ();
    })
    .then (function (myJson) {
      self.data = myJson;
      callback ();
    });
};

VideoPlayer.prototype.init = function () {
  var self = this;
  var video = self.video;
  this.fetchData ('data.json', function callback () {
    console.log(self.data);
    $ ('.js-name').text (self.data.name);
    $ ('.js-month').text (self.data.month );
    $ ('#animate3 .animate3__line1').text (
      self.data.animate3.line1
    );
    $ ('#animate3 .animate3__line2').text (
      self.data.animate3.line2
    );
    $ ('#animate3 .animate3__line3').text (
      self.data.animate3.line3
    );

    $ ('#animate4 .animate4__line1').text (
      self.data.animate4.line1
    );
    $ ('#animate4 .animate4__line2').text (
      self.data.animate4.line2
    );
    $ ('.animate5 .line1').text (
      self.data.animate5.line1
    );
    $ ('.animate5 .line2').text (
      self.data.animate5.line2
    );




    // $ ('.js-recent_pmt_date .calendar__data .num').text (
    //   self.data.recent_pmt_date.date
    // );
    // $ ('.js-recent_pmt_date .calendar__data .year').text (
    //   self.data.recent_pmt_date.year
    // );
    // $ ('.js-due_date .calendar__month').text (self.data.due_date.month);
    // $ ('.js-due_date .calendar__data .num').text (self.data.due_date.date);
    // $ ('.js-due_date .calendar__data .year').text (self.data.due_date.year);
    // self.divideWordIntoLetters (self.data.month);
    CHARLIE.setup (video);
    return;
  });

  // $ ('.charlie').on (self.animationStart, function (el) {
  //   if (this.id === 'amount') {
  //     self.numberAnimation (self.data.total_charges, 0, 50, this);
  //   } else if (this.id === 'textAnimate4amount') {
  //     self.numberAnimation (self.data.recent_pmt_amt, 0, 50, this);
  //   } else if (this.id === 'textAnimate5amount') {
  //     self.numberAnimation (self.data.overall_balance, 0, 50, this);
  //   } else if (this.id === 'textAnimate6amount') {
  //     self.numberAnimation (self.data.min_payment, 0, 50, this);
  //   } else if (this.id === 'textAnimate7__amount1') {
  //     self.numberAnimation (self.data.points_earned_month, 0, 50, this);
  //   } else if (this.id === 'textAnimate7__amount2') {
  //     self.numberAnimation (self.data.total_points_earned, 0, 50, this);
  //   }
  // });
  videoPlayerWrapper.append (video);
  self.myPlayer = videojs ('js--video-player', {
    controls: true,
    autoplay: false,
    preload: false,
  });

  var currentTime = 0;

  //This example allows users to seek backwards but not forwards.
  //To disable all seeking replace the if statements from the next
  //two functions with myPlayer.currentTime(currentTime);

  self.myPlayer.on ('seeking', function (event) {
    if (currentTime < self.myPlayer.currentTime ()) {
      self.myPlayer.currentTime (currentTime);
    }
  });

  self.myPlayer.on ('seeked', function (event) {
    if (currentTime < self.myPlayer.currentTime ()) {
      self.myPlayer.currentTime (currentTime);
    }
  });
};
var vPlayer = new VideoPlayer (),
  video = vPlayer.video,
  textAnimationBlock = document.getElementById ('textAnimationBlock');

// VideoPlayer.prototype.numberAnimation = function (
//   amount,
//   delay,
//   duration,
//   parent
// ) {
//   var options = {
//     amount: amount,
//     delay: delay,
//     duration: duration,
//   };
//   var amount = options.amount;
//   var time = amount / options.duration;
//   var number = 0;
//   var fixed = 0;
//   if (amount.toString ().split ('.')[1]) {
//     fixed = amount.toString ().split ('.')[1].length;
//   }
//   requestAnimationFrame (function interval () {
//     number += time;
//     parent.querySelector ('.number').innerHTML =
//       // Math.round(number * 100) / 100;
//       number.toFixed (fixed);
//     if (number >= amount) {
//       document.querySelector ('.number').innerHTML = amount;
//       cancelAnimationFrame (interval);
//     } else {
//       requestAnimationFrame (interval);
//     }
//   });
// };

// VideoPlayer.prototype.divideWordIntoLetters = function (month) {
//   var word = month;
//   var str = word.split ('');
//   $.each (str, function (index) {
//     // идем по массиву
//     $ ('#textAnimate2').append (
//       '<span class="charlie" data-animations="textAnimateLetter" data-times="2.' +
//       index +
//       '">' +
//       (this == ' ' ? '&nbsp;' : this) +
//       '</span>'
//     );
//   });
// };

$ (document).ready (function () {
  video.addEventListener ('loadedmetadata', function () {
    vPlayer.init ();

    var videoParent = video.parentElement;
    videoParent.insertBefore (textAnimationBlock, video);
  });
  // divideWordIntoLetters ();
  textAnimationBlock.classList.add ('is-ready');
});