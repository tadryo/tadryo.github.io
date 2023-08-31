function butotnClick(){
  name = document.getElementById('name');
  score = document.getElementById('score');
  text = document.getElementById('text');
  text.innerText = '名前：' + name.value + '　スコア：' + score.value;
}
