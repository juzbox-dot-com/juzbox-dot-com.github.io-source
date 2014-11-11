Title: Pericanを使ったサイト構築手順
Category: misc
Tags: pelican

Pelicanでblogを構築しようなんて考えるのはたいていpython使いでしょうから，こんな記事を書いてもどうするんだ，とも思いますが，自分用の備忘録も込めて，Pelicanでのblog構築の手順を簡単にまとめておきます．環境はOSX 10.10 + Homebrewで入れたPython 3.4.2 + Perican 3.5です．

# インストール
インストールは http://docs.getpelican.com/en/3.5.0/install.html に従えばいい感じです．

```bash
$ pip install pelican Markdown typogrify BeautifulSoup4
```

bs4は，僕が今回使ったElegantというテーマで必要なもので，テーマによっては不要です．ちなみに，テーマを管理する`pelican-themes`コマンドがsite-packagesにテーマをぶち込んだりしているのを見るにつけ，pelicanの開発者たちはvirtualenvを使うことを前提にしている感があるので，素直にvirtualenvの中でやるのが無難そうです．

# ひな形の作成
インストールが終わったら，適当なディレクトリを掘って

```bash
$ pelican-quickstart
```

で質問に答えていくとscaffoldを作ってくれます．これが終わった時点でgitのリポジトリを作っておくと良さそうです．

# 設定・プラグイン・テーマ
設定は基本的に`pelicanconf.py`に記述していきます．こいつは単なるpythonファイルなので，当然ですがもし中でいろいろやりたければ，好き放題にいろいろできます．また，テーマとプラグインを使えるようにしておきましょう．テーマについては，

```python
THEME = 'themes/pelican-elegant'
```

のように，`pelicanconf.py`からの相対パスでテーマの場所を記述します．（上述した`perican-theme`というコマンドもありますが，使う必要は全くありません．）
プラグインについては，`PLUGIN_PATH`にプラグインたちが入ったディレクトリを指定し，`PLUGINS`にプラグイン名文字列のリストを指定します．
githubにpelican公式の[pelican-themes](https://github.com/getpelican/pelican-themes), [pelican-plugins](https://github.com/getpelican/pelican-plugins)というリポジトリがあって，そこに多くのテーマやプラグインが集められています．

僕はテーマはどのみち自分が決めたものしか使わないので，ベースフォルダの下にthemesというフォルダを作って，その中に自分が使いたいテーマだけを`git submodule add`し，プラグインについては何を使いたくなるかわからないと思ったのでpelican-pluginsリポジトリをplugins以下に`git submodule add`することにしました．

## Elegant
テーマは，[Elegant](https://github.com/talha131/pelican-elegant)というのを使うことにしました．見た目がすっきりしていて，responsiveであり，また，機能も豊富な感じで気に入りました．設定方法は， [作者のブログ](http://oncrashreboot.com/elegant-best-pelican-theme-features) に書かれています．

上の説明をよく読むとちゃんと書いてあるのですが，トップページに表示する自己紹介は，

```python
LANDING_PAGE_ABOUT = {
    'title': 'I\'m a firecracker',
    'details': '<h1>Bang!</h1>'
}
```

などと書くとそれが表示されます（htmlタグもそのまま書けるようです）．

# 記事を書く
マークアップ言語としてはMarkdown, reStructuredText, htmlが使えますが，僕はMarkdownを使うことにしました．ファイル冒頭に以下の様な感じでメタデータを書いておきます．Titleは必須の属性で，ないとコンパイル時に怒られます．

```
Title: 鳥類の体の構造
Category: misc
Tags: pelican, sparrow, duck
```

palicanconf.pyに

```python
FILENAME_METADATA = '(?P<date>\d{4}-\d{2}-\d{2})_(?P<slug>.*)'
```

と書いておくと，`2014-11-11_my-great-post.md`というファイル名があったときに，そこからdateとslugのメタデータを抽出してくれます．

# 最後に
このblogの生成元になっているソースを[githubのリポジトリ](https://github.com/juzbox-dot-com/juzbox-dot-com.github.io-source)に載せてあるので，もし必要があれば参照してください．また， https://github.com/getpelican/pelican/wiki/Powered-by-Pelican にPelicanを使っているサイトとそのソースが紹介されています．あの kernel.org も実はPelicanを使っていたのですね．

それでは，皆様もPericanで楽しいblogライフをお過ごしください！
