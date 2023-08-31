var max = 0, middle = 0, min = 0;

function butotnClick(){
  score1 = document.getElementById('score1');
  score2 = document.getElementById('score2');
  first = document.getElementById('first');
  second = document.getElementById('second');
  third = document.getElementById('third');
  console.log(score2.value);
  if (max < score2.value) {
    max = score2.value;
    first.innerText = '名前：' + score1.value + '　スコア：' + score2.value;
    console.log(max,middle,min);
  }
  /* else if (middle < score2.value) {
    console.log(2);
    middle = score2.value;
    second.innerText = '名前：' + score1.value + '　スコア：' + score2.value;
    console.log(max,middle,min);
  } else if (min < score2.value) {
    console.log(3);
    min = score2.value;
    third.innerText = '名前：' + score1.value + '　スコア：' + score2.value;
    console.log(max,middle,min);
  }*/
}
