let name = document.getElementById('name');
let text = document.getElementById('text');
let check = document.getElementById('check');
check.addEventListener('click', butotnClick);
function butotnClick(){
  text.innerText = 'お名前は' + name.value + 'さんですね';
}
