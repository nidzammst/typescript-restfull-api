# Address API Spec

## Create Address

Endpoint : POST /api/address/:idContact/addresses

Request Header :

- X-API-TOKEN

request Body :

```json
{
  "street": "Jl. somethong",
  "city": "kota something",
  "province": "provinsi apa",
  "country": "negara",
  "postal_code": "40215"
}
```

Response Body (Success)

```json
{
  "data": {
    "id": 1,
    "street": "Jl. somethong",
    "city": "kota something",
    "province": "provinsi apa",
    "country": "negara",
    "postal_code": "40215"
  }
}
```

Response Body (Failed)

```json
{ "errors": "Postal Code is Required" }
```

## Get Address

Endpoint : GET /api/address/:idContact/addresses/:idAddress

Response Body (Success)

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jl. somethong",
      "city": "kota something",
      "province": "provinsi apa",
      "country": "negara",
      "postal_code": "40215"
    },
    {
      "id": 2,
      "street": "Jl. somethong",
      "city": "kota something",
      "province": "provinsi apa",
      "country": "negara",
      "postal_code": "40215"
    }
  ]
}
```

Response Body (Failed)

```json
{ "errors": "Address is not Found" }
```

## Update Address

Endpoint : DELETE /api/address/:idContact/addresses/:idAddress

Response Body (Success)

```json
{
  "data": {
    "id": 1,
    "street": "Jl. somethong",
    "city": "kota something",
    "province": "provinsi ganti",
    "country": "negara",
    "postal_code": "40215"
  }
}
```

Response Body (Failed)

```json
{ "errors": "Address is not Found" }
```

## Remove Address

Endpoint : GET /api/address/:idContact/addresses/:idAddress

Response Body (Success)

```json
{
  "data": "Ok"
}
```

Response Body (Failed)

```json
{ "errors": "Address is not Found" }
```
