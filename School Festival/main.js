let name = document.getElementById('name');
let score = document.getElementById('score');
let text = document.getElementById('text');
function butotnClick(){
  console.log(name);
  console.log(score);
  text.innerText = '名前：' + name.value + '　スコア：' + score.value;
}
