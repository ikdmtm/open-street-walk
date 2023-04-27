# open-street-walk

## フロントエンド

-   node.js: 18.15.0
-   next.js: 13.2.3
-   react: 18.0.0
-   yarn: 4.0.0

*   パッケージ  
    js-cookie: 3.0.1  
    leaflet: 1.9.3  
    react-leaflet: 4.2.1

## バックエンド

<https://github.com/ikdmtm/open-street-walk-backend>

-   ruby: 3.2.1
-   rails: 7.0.4

*   gem  
    devise  
    devise_token_auth  
    rack-cors  
    aws-sdk-s3

-   db: postgresql
-   storage: S3

## 概要

散歩がより楽しくなるようなアプリ  
地図上にピンを設置してスポットを共有することができる

## 使いかた

現在地ボタンで現在地周辺のピンを見る
共有したいスポットがあればピンを作成する

## API のエンドポイント

| HTTP verb | パス           | 　コントローラー#アクション　          | 　目的　         |
| --------- | -------------- | -------------------------------------- | ---------------- |
| GET       | /              | pins#index                             | ピンの情報を取得 |
| POST      | /pins          | pins#create                            | ピンを新規作成   |
| POST      | /auth/sign_in  | devise_token_auth/sessions#create      | ログイン         |
| DELETE    | /auth/sign_out | devise_token_auth/sessions#destroy     | ログアウト       |
| POST      | /auth          | devise_token_auth/registrations#create | 新規登録         |

## データベース

![image](https://user-images.githubusercontent.com/77443881/234790573-835c087f-384f-40b0-a0fb-a03813830341.png)

## 追加予定の機能

-   お気に入り機能
-   マイページの作成
    -   作成したピンの表示
    -   作成したピンの削除ボタン
-   住所を指定してマップを移動
