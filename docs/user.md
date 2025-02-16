# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "nidzammst",
  "password": "rahasia",
  "name": "AHmad Nidzam Musthafa"
}
```

Respose Body (Success)

```json
{
  "data": {
    "username": "nidzammst",
    "name": "Ahmad Nidzam Musthafa"
  }
}
```

Response Body (false)

```json
{
  "errors": "username must not blank ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "nidzammst",
  "password": "rahasia"
}
```

Respose Body (Success)

```json
{
  "data": {
    "username": "nidzammst",
    "name": "Ahmad Nidzam Musthafa",
    "token": "uuid"
  }
}
```

Response Body (false)

```json
{
  "errors": "username or password is wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- X-api-token : token

Request Body :

```json
{
  "username": "nidzammst",
  "password": "rahasia"
}
```

Respose Body (Success)

```json
{
  "data": {
    "username": "nidzammst",
    "name": "Ahmad Nidzam Musthafa",
    "token": "uuid"
  }
}
```

Response Body (false)

```json
{
  "errors": "unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-api-token : token

Respose Body (Success)

```json
{
  "data": {
    "username": "nidzammst" /* tidak wajib */,
    "name": "Ahmad Nidzam Musthafa" /* tidak wajib */
  }
}
```

Response Body (false)

```json
{
  "errors": "unauthorized, ..."
}
```

## Logout User

Endpoint : PATCH /api/users/current

Request Header :

- X-api-token : token

Request Body :

```json
{
  "name": "nidzammst_baru",
  "password": "12345baru"
}
```

Respose Body (Success)

```json
{
  "data": {
    "username": "nidzammst" /* tidak wajib */,
    "name": "Ahmad Nidzam Musthafa" /* tidak wajib */
  }
}
```

Response Body (false)

```json
{
  "errors": "unauthorized, ..."
}
```
