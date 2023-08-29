function butotnClick(){
  msg.innerText = 'お名前は' + name.value + 'さんですね';
}

let name = document.getElementById('name');
name.value = '名前';
let msg = document.getElementById('msg');

let checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', butotnClick);
