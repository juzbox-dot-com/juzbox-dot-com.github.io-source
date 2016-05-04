title: OSX 日本語環境でUS配列キーボードを快適に使う
category: tech
tags: osx, memo

OSXで修飾キーなどのキーバインドを変更する方法としては，

- "System Preferences"の"Modifier keys"
- [Seil](https://pqrs.org/osx/karabiner/seil.html.ja) / [Karabiner](https://pqrs.org/osx/karabiner/index.html.ja)

などがありますが，後者の方が圧倒的に柔軟です．ここでは，US104配列のキーボードでの僕の設定を備忘録としてメモしておきます．

僕は，下の表のようにリマップしています．（過去にWindowsを使っていた頃の癖が抜けず，コピーやペーストには左下のキーを使ってしまうので，CtrlをCommandにbindしています．）

| 変更前 | 変更後 |
| --- | --- |
| Caps Lock | Ctrl |
| lt. Ctrl | lt. Command |
| lt. Windows | lt. Option |
| lt. Alt | lt. Command |
| rt. Alt | rt. Command |
| rt. Windows | rt. Option |
| Application | Fn |

下の画像の通りSeil, Karabinerを設定することで，上記通りのマッピングに加えて，スペースキーの両脇のキーで日本語/英語入力切り替え，Fnキーとの同時押しでの輝度や音量の調節などが実現できました．
（SeilでApplicationキーをFnにバインドすると，どうにもうまくFnとファンクションキーとの同時押しでの輝度等の調整ができなかったので，これだけKarabinerでリマップしています．）ご参考になれば幸いです．

{% img fresco /static/seil.png "Seil" %}

{% img fresco /static/karabiner.png "Karabiner" %}
