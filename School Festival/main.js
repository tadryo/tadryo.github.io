var max = 0, middle = 0, min = 0;

function butotnClick(){
  score1 = document.getElementById('score1');
  score2 = document.getElementById('score2');
  first = document.getElementById('first');
  second = document.getElementById('second');
  third = document.getElementById('third');
  console.log(score1);
  console.log(score2);
  if (max < score2) {
    max = score2;
    first.innerText = '名前：' + score1.value + '　スコア：' + score2.value;
  } else if (middle < score2) {
    middle = score2;
    second.innerText = '名前：' + score1.value + '　スコア：' + score2.value;
  } else if (min < score2) {
    min = score2;
    third.innerText = '名前：' + score1.value + '　スコア：' + score2.value;
  }
}
