#!/usr/bin/env python3

import cgi
import cgitb
import os.path
import html

# ブラウザでのデバッグを有効にする --- (*1)
cgitb.enable()

# 全体の設定 --- (*2)
FILE_LOG = "chat-log.txt"

# HTMLを画面に出力する --- (*3)
def print_html(body):
    # ヘッダを出力
    print("Content-Type: text/html; charset=utf-8")
    print("")    
    # HTMLを出力
    print("""
<html><head><meta charset="utf-8">
<title>チャット</title></head><body>
<h1>チャット</h1>
<div><form>
名前: <input type="text" name="name" size="8">
本文: <input type="text" name="body" size="20">
<input type="submit" value="発言">
<input type="hidden" name="mode" value="write">
</form></div><hr>
{0}
</body></html>
    """.format(body))

# 画面に書き込みログを表示する --- (*4)
def mode_read(form):
    # ログを読み取る
    log = ""
    if os.path.exists(FILE_LOG):
        with open(FILE_LOG, "r", encoding='utf-8') as f:
            log = f.read()
    print_html(log)

# 任意のURLにジャンプする --- (*5)
def jump(url):
    # ヘッダを出力
    print("Status: 301 Moved Permanently")
    print("Location: " + url)
    print("")
    # HTMLを出力(ヘッダがうまく動かなかった時の対策)
    print('<html><head>')
    print('<meta http-equiv="refresh" content="0;'+url+'">')
    print('</head><body>')
    print('<a href="'+url+'">jump</a></body></html>')

# メッセージの書き込み --- (*6)
def mode_write(form):
    # パラメータを取得
    name = form.getvalue("name", "no name")
    body = form.getvalue("body", "")
    # HTMLに変換
    name = html.escape(name)
    body = html.escape(body)
    # ファイルに保存 --- (*6a)
    with open(FILE_LOG, "a+", encoding='utf-8') as f:
        f.write("<p>{0}: {1}</p><hr>\n".format(name,body))
    # 書き込み後にリダイレクトする
    jump('chat.py')

# メイン処理 --- (*7)
def main():
    # フォームの値を取得
    form = cgi.FieldStorage()
    # modeパラメータを取得
    mode = form.getvalue("mode", "read")
    # modeの値によって処理を変更
    if mode == "read": mode_read(form)
    elif mode == "write": mode_write(form)
    else: mode_read(form)

if __name__ == "__main__":  # --- (*8)
    main()


