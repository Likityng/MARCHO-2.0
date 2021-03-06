var $ = require('jquery');
import "slick-carousel";
require('fancybox')($);
import "ion-rangeslider";
var customSelect = require("custom-select").default;

$(function () {

  // slider
  $(".top-slider__inner").slick({
    dots: true,
    autoplay: true,
    fade: true,
    arrows: false,
    autoplaySpeed: 2000
  });
  
//filter price
  $(".filter-price__imput").ionRangeSlider({
    type: "double",
    prefix: "$",
    onStart: function (data) {
      $(".filter-price__from").text(data.from);
      $(".filter-price__to").text(data.to);
    },
    onChange: function (data) {
      $(".filter-price__from").text(data.from);
      $(".filter-price__to").text(data.to);
    },
  });

});

// star rating
const ratingItemsList = document.querySelectorAll('.star__item');
const ratingItemsArray = Array.prototype.slice.call(ratingItemsList);
ratingItemsArray.forEach(item =>
  item.addEventListener('click', () => {
    const { itemValue } = item.dataset;
    item.parentNode.dataset.totalValue = item.dataset.itemValue;
  })
);

// custom select
customSelect('.select-style');


// time
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
function initializeClock(id, endtime) {
  var clock = document.querySelector('.promo__clock');
  var daysSpan = clock.querySelector('.promo__days');
  var hoursSpan = clock.querySelector('.promo__hours');
  var minutesSpan = clock.querySelector('.promo__minutes');
  var secondsSpan = clock.querySelector('.promo__seconds');
  function updateClock() {
    var t = getTimeRemaining(endtime);
    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
var deadline = $('.promo__clock').attr('data-time');
initializeClock('promo__clock', deadline);