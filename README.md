# zh-TW.EldenRingMap - In process

- MySQL Schema 在 databaseSchema.sql
- eldenringMarker_en2zhtw.xlsx 可以找到marker type中英對照表

## APIs for Frontend Testing
### Markers - 都是GET （先用.json充當db）
##### 取得所有markers
```
127.0.0.1:3150/test/api/all
```

##### 取得特定type markers
```
127.0.0.1:3150/test/api/:type
```
  - e.g:
    ```
    127.0.0.1:3150/test/api/SiteOfGrace
    ```


- Marker的interface
```
interface DataRow {
    id: number,
    type: string,
    name: string,
    desc: string,
    lng: string,
    lat: number,
    is_underground: number,
    position: number,
    is_achivement: number,
    is_lock: number,
    delete_request: number,
    likecount: number,
    dislikecount: number,
    ip: string,
    is_deleted: number,
    create_date: string,
    update_date: string
}
```

### User - POST - 登入註冊等等
登入：
```
127.0.0.1:3150/auth/login
```
Body : 
```
{
    "email":"yoyoyo@gmail.com",
    "password":"To26292661@"
}
```
登入成功：
```
status:200
{
    "token": "xxxxx"
    "message": "Logged in successfully"
}
```
token為 JWT
--------------------
註冊：
```
127.0.0.1:3150/auth/register
```
Body : 
```
{
    "email":"yoyddoyo@gmail.com",
    "username":"test123",
    "password":"To26292661@"
}
```
註冊成功：
```
status:201
{
    "message": "User Created Successfully",
    "status": 201
}
```
