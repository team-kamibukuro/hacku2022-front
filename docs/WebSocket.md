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
# バック->フロント

{
  "event": "FINISHED",
  "playerId": "",
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
}

# バック->フロント

{
  "event": "FIREWALL",
  "status": true,
  "playerId": "",
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
- 順位取得
- 対戦履歴取得
- コード履歴取得
- スコア取得
