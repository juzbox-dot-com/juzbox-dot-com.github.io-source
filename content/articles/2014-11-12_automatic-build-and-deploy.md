Title: Travis CIを使った自動build & deploy
Category: misc
Tags: travis, pelican, github

![Travis CI]({filename}/static/travis-mascot.png)

静的サイトジェネレータでは，記事を書いたあと，手元の環境でコンパイルし，それをアップロードするのが普通の手順ですが，継続的インテグレーション(CI)サービスを使うことで，コンパイル & アップロードをCIサービス上で行うことができます．記事を書いて，そのソースをcommit, pushすれば，しばらくすると勝手にサイトが更新されているというわけです．素敵ですね．これなら出先など，自分のPCが使えない環境でも，blogを更新できますよ〜．

今回は，サイトのホストとしてGitHub Pagesを用い，CIはGitHubの公開リポジトリに対しては無料で利用できるTravis CIを用いました．GitHub Pagesは独自ドメインにも対応しており，staticなファイルのホストに限っていえば，とても良い選択肢に思えます．

PelicanのソースをGitHub上に載せておき，Travis CI上でPelicanを動かしてコンパイルし，それをGitHub pageのリポジトリ(username/username.github.ioなど)に自動でdeployさせるように設定します．ソースリポジトリにpushされると，CIがトリガされて勝手に走ります．

若干古い記事ですが，基本的には http://zonca.github.io/2013/09/automatically-build-pelican-and-publish-to-github-pages.html の手順通りでうまくいきました．

以下にいくつかの注意点をまとめておきます．

- 当然ながら，`requirements.txt`には適宜必要なパッケージを追加する
- Pythonのバージョンを手元の環境と揃えておくと良い
- `make html`とあるところを`make publish`に変更した（これで`publishconf.py`の設定も反映されるようになる）
- GitHubのtokenはDeploy先リポジトリのownerでログインして，Settings→Applications→Generate new tokenで作成できる．deploy先が公開リポジトリなら，Scopeはpublic_repoにチェック．
- `.travis.yml`も公開リポジトリ上に置かれるので，Travisがdeployするのに使うtokenを，Travis CIが生成した鍵ペアの公開鍵で暗号化してやる必要がある．この鍵はrepository-specificなので（この鍵ペアがもし全ユーザーで共通だったら，他人の暗号を自分の設置した`.travis.yml`に書いてTravisに復号させることで平文を得ることができてしまう！），`$ travis encrypt GH_TOKEN=TOKEN_FROM_GITHUB`は生成元のソースリポジトリ（deploy先ではないよ）に移動して行う．
- ソースリポジトリでsubmoduleのurlがgit@github.com:user/repo.gitの形式になっている場合，Travisからcheckoutできずエラーになってしまう．これが起きたら，`.travis.yml`の`before_install`に
`- sed -i 's/git@github.com:/https:\/\/github.com\//' .gitmodules`
を加えて，on-the-flyで置換してやればよい．

初めてCIを使ったのですが，ログを眺めていると，CIが走る度にクリーンな環境から環境構築（必要なpythonパッケージたちのインストールやソースリポジトリのcheckout）をするところから始めていて，計算機資源を~~無駄に~~大変贅沢に使っている感がありました．CI上でのビルドからデプロイまでの一連の作業におおよそ2分半かかっていますが，そのうち2分以上はpythonパッケージのインストールに使われていました．なんだかなぁ．静的サイトジェネレータは地球にやさしいかと思っていましたが，CIを使った自動deployを組んだらむしろ無駄な計算機資源を食いつぶしていますね．そして，Travis CIさん，貴重な計算機資源をこんなどーでもいいブログに使ってしまいすみません．そしてマスコット（記事冒頭）がちょっと愛らしいですね．公開リポジトリなら無料で利用できるけれど，こんな大盤振る舞いしていて儲けが出せているのでしょうか．なんだかこちらが心配になってしまいます．なるべく無駄なpushは控えよう…．
