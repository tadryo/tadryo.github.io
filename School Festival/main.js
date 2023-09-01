var max = 0, middle = 0, min = 0;
var max_name = "？？？？？", middle_name = "？？？？？", min_name = "？？？？？";
const music = new Audio('win.mp3');

function butotnClick(){
  score1 = document.getElementById('score1');
  score2 = document.getElementById('score2');
  first = document.getElementById('first');
  second = document.getElementById('second');
  third = document.getElementById('third');
  console.log(max, middle, min);
  if (max < parseInt(score2.value)) {
    first.innerText = score1.value + ' スコア：' + parseInt(score2.value);
    second.innerText = max_name + ' スコア：' + max;
    third.innerText = middle_name + ' スコア：' + middle;
    max = parseInt(score2.value);
    max_name = score1.value;
  } else if (middle < parseInt(score2.value)) {
    second.innerText = score1.value + ' スコア：' + parseInt(score2.value);
    third.innerText = min_name + ' スコア：' + middle;
    middle = parseInt(score2.value);
    middle_name = score1.value;
  } else if (min < parseInt(score2.value)) {
    third.innerText = score1.value + ' スコア：' + parseInt(score2.value);
    min = parseInt(score2.value);
    min_name = score1.value;
  } else {

  }
}
