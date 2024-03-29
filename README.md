# OpenStreetWalk

アプリ URL: https://open-street-walk.vercel.app/

## 概要

散歩がより楽しくなるようなアプリです。
散歩中に面白い場所を見つけたら、地図上にピンを作成することで散歩スポットを共有することができます。

## 使い方

現在地ボタンで現在地周辺のピンを見る  
![現在地周辺に移動](https://user-images.githubusercontent.com/77443881/237013966-36a9ca1d-7ccb-4625-8d92-57cb059ba3ba.gif)

ピンをクリックしてピンの情報を見る  
![ポップアップを表示](https://user-images.githubusercontent.com/77443881/237014318-663c2378-7cdb-46e5-939c-706e7893dbcd.gif)

共有したいスポットがあればログインしてピンを作成する  
![ログインとピンの作成](https://user-images.githubusercontent.com/77443881/237014411-d0fba90e-79c5-40af-a807-4e0294183baa.gif)

## 開発環境

-   Ubuntu 22.04
-   Node.js 18.15.0
-   Yarn 4.0.0
-   Ruby 3.2.1
-   PostgreSQL 14.7

## 技術スタック

### フロントエンド

-   React 18.0.0
-   Next.js 13.2.3
-   Vercel

#### 使用パッケージ

-   js-cookie 3.0.1
-   leaflet 1.9.3
-   react-leaflet 4.2.1

### バックエンド

バックエンドのリポジトリ: <https://github.com/ikdmtm/open-street-walk-backend>

-   Ruby on Rails 7.0.4
-   DB: PostgreSQL
-   Storage: AWS S3
-   PaaS: fly.io

#### 使用 gem

-   devise
-   devise_token_auth
-   rack-cors
-   aws-sdk-s3
-   pg

## API のエンドポイント

| HTTP verb | パス           | 　コントローラー#アクション　          | 　機能　                 |
| --------- | -------------- | -------------------------------------- | ------------------------ |
| GET       | /              | pins#index                             | すべてのピンの情報を取得 |
| GET       | /pins/:id      | pins#show                              | ピンの情報を取得         |
| POST      | /pins          | pins#create                            | ピンの新規作成           |
| DELETE    | /pins/:id      | pins#delete                            | ピンの削除               |
| POST      | /auth/sign_in  | devise_token_auth/sessions#create      | ログイン                 |
| DELETE    | /auth/sign_out | devise_token_auth/sessions#destroy     | ログアウト               |
| POST      | /auth          | devise_token_auth/registrations#create | 新規登録                 |
| GET       | /users/:id     | users#show                             | マイページ               |

## データベース設計

![image](https://user-images.githubusercontent.com/77443881/234790573-835c087f-384f-40b0-a0fb-a03813830341.png)

## 追加予定の機能

-   お気に入り機能
-   ピンの共有機能
