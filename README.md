# TokyoTechPortalLogin
#東工大ポータルログイン
###前書き
東工大ポータルの自動ログイン用につくりました。  
使い勝手は悪いです。  
自己責任でご利用ください。
不具合があればissueどうぞ。
###使い方
このレポジトリをzipファイルでダウンロードしてもらって、
展開したフォルダ（Zipフォルダと呼びます）に Matrix.txt を作ってください。  
そこに、A1A2A3・・・J5J6J7　となるように並べてください。  
例)ABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFG  
そしたら、Zipフォルダをchrome拡張として追加します。  
chromeの右上の三点リーダー的なのから、設定  
（あるいは）ctrl( or command ) + ,  
→拡張機能
→パッケージ化されていない拡張機能を読み込む  
→Zipフォルダを選択  
→以上！

###注意
ログイン画面にアクセスする方法はいくつかあるのですが、
普通にログインしようとした場合と、ocw-iでセッションタイムエラー
になった時のみ対応しています。  
もしそれ以外のケース（教務Webシステムなどからのアクセスなど）で
自動ログインが実行されなかったら、
manifest.jsonの"content_scripts"というところに
以下のように追加してください。  
```json:manifest.json
"content_scripts" : [
    {
        "matches" : ["もともとあるURL"],
        "js" : ["Main.js"]
    },
    {
        (省略)
    }, (←これを忘れないように！)
    {
        "matches" : ["追加したいURL"],
        "js" : ["Main.js"]
    }
],
```
他の人の環境で実行したことがないので、
もしかしたらURLは全部設定し直さないといけないかもしれないです。