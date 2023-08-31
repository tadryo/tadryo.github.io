var max = 0, middle = 0, min = 0;

function butotnClick(){
  score1 = document.getElementById('score1');
  score2 = document.getElementById('score2');
  first = document.getElementById('first');
  second = document.getElementById('second');
  third = document.getElementById('third');
  if (max < parseInt(score2.value)) {
    max = parseInt(score2.value);
    first.innerText = '名前：' + score1.value + '　スコア：' + score2.value;
  } else if (middle < parseInt(score2.value)) {
    middle = parseInt(score2.value);
    second.innerText = '名前：' + score1.value + '　スコア：' + score2.value;
  } else if (min < parseInt(score2.value)) {
    min = parseInt(score2.value);
    third.innerText = '名前：' + score1.value + '　スコア：' + score2.value;
  }
}
