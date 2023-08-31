var max = 0;

function butotnClick(){
  score1 = document.getElementById('score1');
  score2 = document.getElementById('score2');
  first = document.getElementById('first');
  second = document.getElementById('second');
  third = document.getElementById('third');
  console.log(max, score2.value);
  if (max < score2.value) {
    max = score2.value;
    first.innerText = '名前：' + score1.value + '　スコア：' + score2.value;
  }
}
