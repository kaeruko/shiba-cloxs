# しばちゃん画像置き場

ここに、ねんねが描いた絵をあとから追加します。

おすすめのファイル名:

- `01-gohan.png`
- `02-wanpro.png`
- `03-asobu.png`
- `04-neko.png`
- `05-oyatsu.png`
- `06-unchi.png`
- `07-kimochii.png`
- `08-nenne.png`

画像を置いたら、`app.js` の各イベントにある `image: null` を、たとえば次のように変更します。

```js
image: "./assets/06-unchi.png",
```

画像が未設定のイベントは、自動で仮の絵文字しばちゃんを表示します。
