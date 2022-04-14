## 環境変数の設定

.env
```
DATABASE_URL="postgresql://postgres:root@localhost:5432/postgres"
AWS_ACCESS_KEY_ID="dummy"
AWS_SECRET_ACCESS_KEY="dummy"
AWS_PROFILE="dummy"
AWS_REGION="ap-northeast-1"
```

## 開発手順
```
make start
```
PostgreSQLとpgadmin4が立ち上がる
```
yarn install
yarn dev
```
Fastifyが立ち上がる

## API設計書
```
make start
```
OR
```
yarn dev
```

`http://localhost:8080/docs`にアクセス

## ER図
![ERD](/prisma/ERD.svg)