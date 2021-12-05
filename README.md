# About
**React Three Fiber**を使用して、Canvasに描いた絵を、3DのパネルにDisplacement Map Textureとして適用します。

https://nemutas.github.io/r3f-canvas-displacement/
![スクリーンショット 2021-12-05 170920](https://user-images.githubusercontent.com/46724121/144739143-61fc55ad-1f95-40ec-bcaf-f29fe1e0f733.png)

# Detail
Displacement Mapは、黒を0、白を1としてメッシュに凸をつけます。Textureを元にメッシュ形状を変更するため、メッシュは細かく細分化されている必要があります。

* Panelの細分化の調整
<img src='https://user-images.githubusercontent.com/46724121/144739401-026cac8f-fb4d-4ca4-86c4-eccf4a4e371e.png' width=700 />

* ワイヤーフレームと影のオンオフ
<img src='https://user-images.githubusercontent.com/46724121/144739474-093a91a0-b779-4d55-81d2-9ab963066616.png' width=700 />

* 色と凸の大きさの調整
<img src='https://user-images.githubusercontent.com/46724121/144739530-abeb765a-2c61-42a0-9e51-eeadc55a639d.png' width=700 />

* Canvasのコントロール
<img src='https://user-images.githubusercontent.com/46724121/144739613-268fc93e-d4f4-4688-a221-fbdcc9c1f9d0.png' height=500 />

# Framework・Libraries
* CRA（Create React App）
* TypeScript
* [React Three Fiber](https://docs.pmnd.rs/home)
* [leva](https://github.com/pmndrs/leva)
* [Material UI](https://mui.com/)
* [emotion/css](https://emotion.sh/docs/@emotion/css)
