# mayfes2018-pikyou

## Publishment

assets/README.md をご覧ください。

## Development
### Required environments
* \*nix OS/environment
* yarn

### Setup
```console
$ yarn
$ yarn build
(もしくは $ yarn watch)
```
で、index.htmlをブラウザで表示すればいけます。  

### Scripts
`yarn build`:tsファイルとxmlファイルをビルドする。  
`yarn build:tsc`:`xml`ファイルをビルドする。  
`yarn watch`:browserで動作確認できる。  

### Commit

```console
$ yarn run format
$ yarn run lint
```

しないとPull Requestのときに怒られます。

### memo
`src`に`*.ts`を、`assets`に`*.html`を入れるつもりでフォルダ分けしました。  
