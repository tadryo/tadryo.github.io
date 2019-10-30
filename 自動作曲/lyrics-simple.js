$(function(){
});

// g_debug = false;
g_debug = true;
g_base = 'http://genhori.jp';
g_keyword = [];
g_db = 'pops-f'
g_length = 22;
g_num_line = 4;
g_num_verse = 1;


function transfer(){
  g_lyrics = $('#textarea_lyrics').get(0).value;
  g_win = window.open('http://www.orpheus-music.org/v3/simple.php?id='+id, null);
  setTimeout("g_win.document.getElementById('text').innerHTML = g_lyrics", 200);
//  $('#div_debug').append("id = "+id);
}

function generate_lyrics(verseno){
  $('#div_select'+verseno).empty();
  chasen(verseno);
}

function refresh(verseno, lineno, newline){
  var text = $('#textarea_lyrics').get(0).value.split('\n');
  text[ (g_num_line+1)*verseno+lineno ] = newline;
//  text[lineno] = newline;
  $('#textarea_lyrics').get(0).value = text.join('\n');
}

function append_verse(){
//  if(g_num_verse >=3) return;
  var html = '<div id="div_verse' + g_num_verse + '" class="compobox">';
  html += '<div class="line_title">' + (g_num_verse+1) + '番</div>';
  html += '<span class="artcl">キーワード</span>';
  for(var i=0; i<5; i++){
    html += '<input type="text" id="input_keyword' + g_num_verse + i + '"></input>';
    html += "\n";
  }
  html += '<button onClick="generate_lyrics(' + g_num_verse + ')">歌詞を作る</button><br/>';
  html += '<div id="div_select'+ g_num_verse + '"></div></div>';
  $('#div_verses').append(html);
  $('#button_append_verse').html((g_num_verse+2) + '番を作る');
  g_num_verse++;
}

function randperm(list){
  var perm = [];
  for(var i=0; i<list.length; i++) perm.push([i, Math.random()]);
  perm.sort(function(x, y){ return x[1] - y[1] });
  var list2 = new Array(list.length);
  for(i=0; i<list.length; i++) list2[i] = list[perm[i][0]];
  return list2;
}

function generate(verseno, lineno){

  if(g_debug){
    var html =  '歌詞を作っています';
    html += '　キーワード：<span class="keyword">' + g_keyword[lineno].join('、') + '</span>';
    html += '　1行の長さ：' + g_length + '<br/>';
    $('#div_debug').append(html);
  }

  html = '<div id="div_select'+verseno+lineno+'" class="line">'+(lineno+1)+'行目の歌詞を作っています</div>';
  $('#div_select'+verseno).append(html);
//  html = '歌詞を作っています'
//  $('#div_select'+verseno+lineno).html(html);

  $.ajax({
    url : g_base + '/lyrics5/lyrics.cgi',
    dataType : 'jsonp',
    jsonp : 'callback',
    data : {
      req : 'generate',
      database : g_db,
      length : g_length,
      keyword : encodeURI(g_keyword[lineno].join(' '))
    },

    success : function(json){
      if(g_debug){
        var html = '歌詞を作りました<br/><br/>';
        $('#div_debug').append(html);
      }
      var result = decodeURI(json.data).split('\n');
      result.pop();
//      result = randperm(result);
      html = '<select class="lyrics" onChange="refresh('+verseno+', '+lineno+',options[selectedIndex].value)">'
      $.each(result, function(){
        html += '<option>' + this + '</option>';
//        html += '<option>' + this + '。</option>';
      });
      html += '</select>'
      $('#div_select'+verseno+lineno).html(html);
        refresh(verseno, lineno, result[0]);
//      refresh(verseno, lineno, result[0]+'。');
    },

    error: function(){
      alert('歌詞の作成中に通信エラーが発生しました');
    },

    complete : function(){
      if(lineno < g_num_line-1){
        generate(verseno, lineno+1);
      }
    }
  });

}


function chasen(verseno){

  g_keyword = [];

  var keyword = '';
  for(var i=0; i<5; i++){
    keyword += $('#input_keyword'+verseno+i).get(0).value.replace(/\s/g,'');
    if(i < 4) keyword += ' ';
  }

  if(keyword.replace(/\s/g,'') == ''){
    alert('キーワードを入力してください');
    return;
  }

  if(g_debug){
    var html = 'キーワードを分析しています<br/>';
    $('#div_debug').html(html);
  }

  html = 'キーワードを分析しています';
  $('#div_select'+verseno+'0').html(html);

  $.ajax({
    url : g_base + '/lyrics5/lyrics.cgi',
    dataType : 'jsonp',
    jsonp : 'callback',
    data : {
      req : 'chasen',
      keyword : encodeURI(keyword)
    },

    success : function(json){
      var result = [];
      $.each(decodeURI(json.data).split('\n'), function(){
        result.push(this.split('\t'));
      });
      for(var i=0; i<result.length; i++){
        var pos = result[i][3].split('-')[0];
        if(pos=='名詞' || pos=='形容詞' || pos=='動詞'){
          g_keyword.push(result[i][2]);
        } else if(pos=='未知語'){
//          g_keyword.push(result[i][0]);
        } else if(pos=='記号'){
        }
      }
      if(g_debug){
        var html = 'キーワードを分析しました　';
        html += 'キーワード：<span class="keyword">' + g_keyword.join('、') + '</span><br/><br/>';
        $('#div_debug').append(html);
      }
      if(g_keyword.length == 0){
        alert('キーワードには、日本語で、名詞、形容詞、または動詞を入力してください');
        return;
      }
    },

    error: function(){
      alert('キーワードの分析中に通信エラーが発生しました');
    },

    complete : function(){
      if(g_keyword.length > 0){

        if(g_keyword.length < g_num_line * 2){
          add_keyword(verseno);
        } else {
          g_keyword = assign_keyword(g_keyword, g_num_line);
          generate(verseno, 0);
        }

      }
    }
  });

}


function add_keyword(verseno){

  $.ajax({
    url : g_base + '/lyrics5/lyrics.cgi',
    dataType : 'jsonp',
    jsonp : 'callback',
    data : {
      req : 'ambience',
//      database : g_db,
      keyword : encodeURI(g_keyword.join(' '))
//      keyword : encodeURI(g_keyword.join('\t'))
//      keyword : encodeURI(g_keyword[lineno].join(' '))
    },

    success : function(json){
      $.each(decodeURI(json.data).split(' '), function(){
        g_keyword.push(this);
      });
      if(g_keyword[g_keyword.length-1]=='') g_keyword.pop();
      if(g_keyword.length > g_num_line * 2){
        g_keyword = g_keyword.slice(0, g_num_line * 2);
      }
//      if(g_keyword.length > g_num_line){
//        g_keyword = g_keyword.slice(0, g_num_line);
//      }

      if(g_debug){
        var html = 'キーワードを追加しました　';
        html += 'キーワード：<span class="keyword">' + g_keyword.join('、') + '</span><br/><br/>';
        $('#div_debug').append(html);
      }
    },

    error: function(){
      alert('キーワードの追加中に通信エラーが発生しました');
    },

    complete : function(){
      g_keyword = assign_keyword(g_keyword, g_num_line);
      generate(verseno, 0);
    }
  });

}


function assign_keyword(keyword, num_line){
  var i, j

  var num_key = keyword.length;
  var key = [];
  var tmp = [];

  if(num_key >= num_line){
    var num = [];
    var quot = Math.floor(num_key / num_line);
    var rema = num_key % num_line;
    for(i=0; i<num_line; i++) num.push(quot);
    for(i=0; i<rema; i++) num[i] += 1;
    for(i=0; i<num_line-1; i++) num[i+1] += num[i];
    num.unshift(0);

    for(i=0; i<num_line; i++){
      tmp = [];
      for(j=num[i]; j<num[i+1]; j++){
        tmp.push(keyword[j]);
      }
      key.push(tmp);
//      key.push( [ keyword.slice(num[i], num[i+1]) ] );
    }
  } else {

    for(i=0; i<num_line; i++){
      tmp = [];
      if(i<num_key){
        tmp.push(keyword[i]);
      } else {
        tmp.push(keyword[num_key-1]);
      }
      key.push(tmp);
    }

  }
  return key;
}

/*
function assign(keyword){
  var tmp = [];
  $.each(keyword, function(){
    tmp.push([this]);
  });
  return tmp;
}
*/
