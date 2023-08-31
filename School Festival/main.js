function butotnClick(){
  score1 = document.getElementById('score1');
  score2 = document.getElementById('score2');
  text = document.getElementById('text');
  console.log(score1.value);
  console.log(score2.value);
  text.innerText = 'スコア1：' + score1.value + '　スコア2：' + score2.value;
}
