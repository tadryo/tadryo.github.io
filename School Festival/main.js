var max = 0, middle = 0, min = 0;
var max_name = "？？？？？", middle_name = "？？？？？", min_name = "？？？？？";
const music = new Audio('win.mp3');

function butotnClick(){
  score1 = document.getElementById('score1');
  score2 = document.getElementById('score2');
  first = document.getElementById('first');
  second = document.getElementById('second');
  third = document.getElementById('third');
  if (max < parseInt(score2.value)) {
    music.play();
    first.innerText = score1.value + ' スコア：' + parseInt(score2.value);
    second.innerText = max_name + ' スコア：' + max;
    third.innerText = middle_name + ' スコア：' + middle;
    min = middle;
    min_name = middle_name;
    middle = max;
    middle_name = max_name;
    max = parseInt(score2.value);
    max_name = score1.value;
  } else if (middle < parseInt(score2.value)) {
    music.play();
    second.innerText = score1.value + ' スコア：' + parseInt(score2.value);
    third.innerText = middle_name + ' スコア：' + middle;
    min = middle;
    min_name = middle_name;
    middle = parseInt(score2.value);
    middle_name = score1.value;
  } else if (min < parseInt(score2.value)) {
    music.play();
    third.innerText = score1.value + ' スコア：' + parseInt(score2.value);
    min = parseInt(score2.value);
    min_name = score1.value;
  } else {

  }
  console.log(max, middle, min);
}
