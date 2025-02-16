# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "firstname": "Ahmad Nidzam",
  "lastname": "Musthafa",
  "email": "nidzam0501@gmail.com",
  "phone": "6289660590803"
}
```

Response Body (success)

```json
{
  "data": {
    "id": 1,
    "firstname": "Ahmad Nidzam",
    "lastname": "Musthafa",
    "email": "nidzam0501@gmail.com",
    "phone": "6289660590803"
  }
}
```

Response Body (failed)

```json
{
  "errors": "firsname must not blank, ..."
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "firstname": "Ahmad Nidzam",
  "lastname": "Musthafa",
  "email": "nidzam0501@gmail.com",
  "phone": "6289660590803"
}
```

Response Body (success)

```json
{
  "data": {
    "id": 1,
    "firstname": "Ahmad Nidzam",
    "lastname": "Musthafa",
    "email": "nidzam0501@gmail.com",
    "phone": "6289660590803"
  }
}
```

Response Body (failed)

```json
{
  "errors": "Contact is not found"
}
```

## Update Contact

Endpoint : PUT /api/contacts

request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "firstname": "Ahmad Nidzam",
  "lastname": "Musthafa",
  "email": "nidzam0501@gmail.com",
  "phone": "62896605908"
}
```

Response Body (success)

```json
{
  "data": {
    "id": 1,
    "firstname": "Ahmad Nidzam",
    "lastname": "Musthafa",
    "email": "nidzam0501@gmail.com",
    "phone": "62896605908"
  }
}
```

Response Body (failed)

```json
{
  "errors": "firsname must not blank, ..."
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

request Header :

- X-API-TOKEN : token

Response Body (success)

```json
{
  "data": "Ok"
}
```

Response Body (failed)

```json
{
  "errors": "Contact is not found, ..."
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameters :

- name : string, contact firstname or contact lastname ==> optional
- phone : string, contact phone, opsional
- email : string, contact email, opsional
- page : number, default = 1
- size : number, default = 10

request Header :

- X-API-TOKEN : token

Response Body (success)

```json
{
  "data": [
    {
      "id": 1,
      "firstname": "Ahmad Nidzam",
      "lastname": "Musthafa",
      "email": "nidzam0501@gmail.com",
      "phone": "62896605908"
    },
    {
      "id": 2,
      "firstname": "Ahmad Nidzam",
      "lastname": "Musthafa",
      "email": "nidzam0501@gmail.com",
      "phone": "62896605908"
    }
  ],
  "paging": {
    "current-page": 1,
    "total_page": 2,
    "size": 10
  }
}
```

Response Body (failed)

```json
{
  "errors": "unauthorized, ..."
}
```
