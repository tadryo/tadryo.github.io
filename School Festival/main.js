function butotnClick(){
  score1 = document.getElementById('score1');
  score2 = document.getElementById('score2');
  text = document.getElementById('text');
  console.log(score1);
  console.log(score2);
  text.innerText = '名前：' + score1.value + '　スコア：' + score2.value;
}
