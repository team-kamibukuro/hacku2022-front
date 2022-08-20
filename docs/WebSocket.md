## WebSocket 設計書

### websocket に connect した時

```
# フロント->バック

{
  "event": "CONNECT_SUCCESS",
  "playerId": "",
  "name":"",
  "language": "",
}
```

### websocket の接続を切った時

```
# フロント->バック

{
  "event": "DISCONNECT",
  "playerId": "",
}
```

### ルームに 4 人揃った時

```
# バック->フロント

{
  "event": "READY",
  "question": {
    "id": "",
    "name": "",
    "context": "",
  },
  "players": [
  {
    "id": "",
    "name": "",
    "isMaster": false,
    "language": "",
  },],
}
```

### コード更新

```
# フロント->バック

{
  "event": "UPDATE_CODE",
  "playerId": "",
  "code": "",
}

# バック->フロント

{
  "event": "UPDATE_CODE",
  "playerId": "",
  "code": "",
}
```

### ハート更新

```
# フロント->バック

{
  "event": "UPDATE_HEART",
  "playerId": "",
  "heart": "",
}

# バック->フロント

{
  "event": "UPDATE_HEART",
  "playerId": "",
  "heart": "",
}
```

### テストケースがすべて通った

```
# フロント->バック
{
  "event": "FINISHED",
  "playerId": "",
  "name": ""
}
# バック->フロント
{
  "event": "FINISHED",
  "playerId": "",
  "name": ""
}
```

### 全員が FINISH したとき

テストケース実行

↓

フロント：
テストケース実行 API のテストケースがすべて OK だったら、

- 時間を保持

- テストケースがすべて通った websocket をなげる\*1

↓

バック：

ブロードキャスト\*1

...全員が終了した場合 次へ

バック：

- 全員が終了した通知 websocket をなげる\*2

  ↓

フロント：

- current user の保持している時間と playerid, name をなげる =>\*2

↓

バック：

- 受け取った時間を集計してフロントにブロードキャスト =>\*3

#### テストケースがすべて通った \*1

```
# フロント->バック
{
  "event": "FINISHED",
  "playerId": "",
  "name": ""
}
# バック->フロント
{
  "event": "FINISHED",
  "playerId": "",
  "name": ""
}
```

#### 全員が終了した \*2

```
# バック->フロント
{
  "event": "ALL_FINISHED",
}
# バック->フロント
{
  "event": "ALL_FINISHED",
  "playerId": "",
  "name": "",
  "time": Date
}
```

#### 集計 \*3

```
# バック->フロント
{
  "event": "RANKING",
  "rank": [{
      "playerId": "",
      "name": "",
      "time": Date
    },
    {
      "playerId": "",
      "name": "",
      "time": Date
    },...] 配列0から順にランク低くなる
}
```

### 攻撃

```
# フロント->バック

{
  "event": "ATTACK",
  "attackType": "",
  "playerId": "",
  "name": "",
  "language": "",
  "code": "",
}

# バック->フロント

{
  "event": "ATTACK",
  "attackType": "",
  "playerId": "",
  "name": "",
  "language": "",
  "code": "",
}

# attackTypes

INDENT_INJECTION // インデントインジェクション
COMMENTOUT_INJECTION // コメントアウトインジェクション
TBC_POISONING // TBC ポイズニング
```

### ファイヤーウォール

```
# フロント->バック

{
  "event": "FIREWALL",
  "status": true,
  "playerId": "",
  "name": ””,
}

# バック->フロント

{
  "event": "FIREWALL",
  "status": true,
  "playerId": "",
  "name": ””,
}
```

### API

#### [API 設計書](https://github.com/team-kamibukuro/hacku2022-backend/tree/main/document/HTTP)

- [新規会員登録](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/siginup.md)
- [ログイン](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/login.md)
- [ルーム作成](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/create_room.md)
- [部屋 ID 取得](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/get_room_id.md)
- マッチングルーム入室
- [コンソール実行](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/console.md)
- [テストケース実行](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/testcase.md)
- 対戦履歴取得
- コード履歴取得
- スコア取得
