## WebSocket 設計書

### websocket に connect した時

- フロント->バック

```JSON
{
  "event": "CONNECT_SUCCESS",
  "playerId": "",
  "name":"",
  "language": "",
}
```

### websocket の接続を切った時

- フロント->バック

```JSON
{
  "event": "DISCONNECT",
  "playerId": "",
}
```

### ルームに 4 人揃った時

- バック->フロント

```JSON
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

- フロント->バック

```JSON
{
  "event": "UPDATE_CODE",
  "playerId": "",
  "code": "",
}
```

- バック->フロント

```JSON
{
  "event": "UPDATE_CODE",
  "playerId": "",
  "code": "",
}
```

### ハート更新

- フロント->バック

```JSON
{
  "event": "UPDATE_HEART",
  "playerId": "",
  "heart": "",
}
```

- バック->フロント

```JSON
{
  "event": "UPDATE_HEART",
  "playerId": "",
  "heart": "",
}
```

### FINISH

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

- フロント->バック

```JSON
{
  "event": "FINISHED",
  "playerId": "",
  "name": ""
}
```

- バック->フロント

```JSON
{
  "event": "FINISHED",
  "playerId": "",
  "name": ""
}
```

#### 全員が終了した \*2

- バック->フロント

```JSON
{
  "event": "ALL_FINISHED",
}
```

- フロント->バック

```JSON
{
  "event": "ALL_FINISHED",
  "playerId": "",
  "name": "",
  "time": "", 差分
}
```

#### 集計 \*3

- バック->フロント

```JSON
{
  "event": "RANKING",
  "users": [{
      "playerId": "",
      "name": "",
      "time": "",
      "rank": 1,
    },
    {
      "playerId": "",
      "name": "",
      "time": "",
      "rank": 1,
    },]
}
```

### 攻撃

- attackTypes

```
INDENT_INJECTION // インデントインジェクション
COMMENTOUT_INJECTION // コメントアウトインジェクション
TBC_POISONING // TBC ポイズニング
RANSOMWARE // ランサムウェア
```

attackType が

INDENT_INJECTION // インデントインジェクション
COMMENTOUT_INJECTION // コメントアウトインジェクション
TBC_POISONING // TBC ポイズニング

の場合

- フロント->バック

```JSON
{
  "event": "ATTACK",
  "attackType": "",
  "playerId": "",
  "name": "",
  "language": "",
  "code": "",
  "firewall": true,
}
```

- バック->フロント(**※送信したユーザーも含めブロードキャスト**)

```JSON
{
  "event": "ATTACK",
  "attackType": "",
  "playerId": "",
  "name": "",
  "language": "",
  "code": "",
  "firewall": true,
}
```

RANSOMWARE // ランサムウェア
の場合、

- フロント->バック

```JSON
{
  "event": "ATTACK",
  "attackType": "RANSOMWARE",
  "playerId": "",
  "name": "",
  "heart": 2,
  "firewall": true,
}
```

- バック->フロント(**※送信したユーザーも含めブロードキャスト**)

```JSON
{
  "event": "ATTACK",
  "attackType": "RANSOMWARE",
  "playerId": "",
  "name": "",
  "heart": 2,
  "firewall": true,
}
```

### ファイヤーウォール

- フロント->バック

```JSON
{
  "event": "FIREWALL",
  "status": true,
  "playerId": "",
  "name": "",
}
```

- バック->フロント
  (**※送信したユーザーも含めブロードキャスト**)

```JSON
{
  "event": "FIREWALL",
  "status": true,
  "playerId": "",
  "name": "",
}
```

### 500 番エラー

- フロント->バック

```JSON
{
  "event": "500_ERROR",
  "status": true,
  "playerId": "",
  "name": "",
}
```

- バック->フロント

```JSON
{
  "event": "500_ERROR",
  "status": true,
  "playerId": "",
  "name": "",
}
```

### API

#### [API 設計書](https://github.com/team-kamibukuro/hacku2022-backend/tree/main/document/HTTP)

- [新規会員登録](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/siginup.md)
- [ログイン](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/login.md)
- [ルーム作成](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/create_room.md)
- [部屋 ID 取得](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/get_room_id.md)
- [マッチングルーム入室](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/matching_room.md)
- [コンソール実行](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/console.md)
- [テストケース実行](https://github.com/team-kamibukuro/hacku2022-backend/blob/main/document/HTTP/testcase.md)
- 対戦履歴取得
- コード履歴取得
- スコア取得
