# Eco-mmerce

Models:

*User*

```
- email : string, required, unique, email format
- firstName : string, required
- lastName : string, required
- phoneNumber : integer, required
- password : string, required
- picture: url, required
- role : string
- username: string, required

```

*Products*

```
- name : string, required
- price : integer, required
- stock : string, required
- weight : double,required
- status : string,required
- ingridient : string,required
- picture : string,required, url format
- UserId : string,required
- CategoryId : string,required
```

*Chats*

```
- BuyerId : string, required
- SellerId : text, required
- Message : integer, required
```

list of available endpoints:
- `POST /buyers/register`
- `POST /buyers/login`
- `POST /buyers/login/google`
- `POST /sellers/register`
- `POST /sellers/login`
- `GET /buyers/products`
- `GET /buyers/products/:id`
- `GET /brands`
- `GET /categories`
- `GET /ingridients` 

routes below need authentication & authorization

- `GET /buyers/carts`
- `GET /buyers/history`
- `POST /buyers/carts`
- `POST /buyers/checkout`
- `DELETE /buyers/carts`
- `DELETE /buyers/carts/:id`
- `GET /chats/:id`
- `GET /sellers/chats`
- `GET /sellers/products`
- `GET /sellers/products/:id`
- `POST /sellers/products`
- `PUT /sellers/products/:id`
- `DELETE /sellers/products/:id` 


<br>
<br>


<br>

## GET /brands

description:
get all brands from database


Response:

- status: 200
- body:

```json
[
    {
        "id": "integer",
        "name": "string",
    },
  ...,
  ...,
]
```

<br>

## GET /categories

description:
get all categories from database


Response:

- status: 200
- body:

```json
[
    {
        "id": "integer",
        "name": "string",
    },
  ...,
  ...,
]
```

<br>

## GET /ingridients

description:
get all ingredients from database


Response:

- status: 200
- body:

```json
[
    {
        "id": "integer",
        "name": "string",
    },
  ...,
  ...,
]
```

<br>

## POST /buyers/register || /sellers/register

Request:

- data:

```json
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "password": "string",
  "phoneNumber": "integer",
  "picture": "file",
  "username": "string",
}
```

Response:

- status: 201
- body:
    ​

```json
{
  "id": "integer",
  "email": "string",
}
```

*Response (400 - Bad Request)*

```json
{
  "message": "<field> cannot be empty"
}
```

*Response (400 - Bad Request)*

```json
{
  "message": "Invalid email format"
}
```

*Response (400 - Bad Request)*

```json
{
  "message": "Email already exists"
}
```

<br>

## POST /buyers/login || /sellers/logins

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
    ​

```json
{
  "access_token": "jwt string",
  "id": "integer",
  "role": "string",
  "picture": "string",
  "firstName": "string",
  "lastName": "string",
}
```

*Response (401 - Unauthenticated)*

```json
{ "message": "Invalid Email or Password" }
```

<br>

## GET /buyers/products

description:
get all products from database


Response:

- status: 200
- body:

```json
[
    {
        "id": "integer",
        "name": "string",
        "price": "integer",
        "stock": "Integer",
        "picture": "url String",
        "harmfulIngridient": ["string"],
        "Category": {
            "id": "integer",
            "name": "string"
        },
        "Brands": [
            {
                "id": integer,
                "name": "string"
            }
        ]
    },
  ...,
  ...,
]
```

<br>

## GET /products/:id

description:
get the details of a product 

Response:

- status: 201
- body:

```json
{
    "id": 3,
    "name": "string",
    "price": "integer",
    "stock": "integer",
    "weight": "integer",
    "status": "string",
    "description": "string",
    "ingridient": ["string"],
    "picture": "url string",
    "harmfulIngridient": ["string"],
    "UsersProducts": [
        {
            "ProductId": "integer",
            "User": {
                "id": "integer",
                "firstName": "string",
                "lastName": "string",
                "role": "string"
            }
        }
    ],
    "Category": {
        "id": "integer",
        "name": "string"
    },
    "Brands": [
        {
            "id": "integer",
            "name": "string"
        }
    ]
}
```

*Response (404 - Not Found)*

```json
{ "message": "ID not found !" }
```

<br>


## GET /buyers/carts

description:
show cart

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
    {
        "Product": {
            "id": "integer",
            "name": "string",
            "stock": "integer",
            "price": "string",
            "weight": "integer",
            "status": "string",
            "picture": "url string",
            "UsersProducts": {
                "User": {
                    "id": "integer",
                    "firstName": "string",
                    "lastName": "string"
                }
            },
            "qty": "integer"
        }
    },
	...,
	...
]
```

*Response (401 - Unauthorized)*

```json
{
    "message": "You are not authorized!"
}
```

<br>

## POST /buyers/carts

description:
add product to cart

Request:

- headers: access_token (string)
- body: 
```json
{
	ProductId: "integer"
}
```

Response:

- status: 200
- body:

```json
{
    "message": "Product is added to cart"
}
```

*Response (401 - Unauthorized)*

```json
{
    "message": "You are not authorized!"
}
```

<br>

## DELETE /buyers/carts/:id

description:
delete items in a cart

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{
    "message": "Product has been reduced by one"
}
```



<br>

## POST /buyers/carts/checkout

description:
checkout cart

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{
    "token": "b8e4cd43-717b-49b4-b9c7-82ff1c054ff3",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/b8e4cd43-717b-49b4-b9c7-82ff1c054ff3"
}
```
<br>

## GET /buyers/history

description:
get order history

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
    {
        "Product": {
            "id": "integer",
            "name": "string",
            "stock": "integer",
            "price": "string",
            "weight": "integer",
            "status": "string",
            "picture": "url string",
            "UsersProducts": {
                "User": {
                    "id": "integer",
                    "firstName": "string",
                    "lastName": "string"
                }
            },
            "qty": "integer"
        }
    },
	...,
	...
]
```

<br>

## GET /chats/:id

description:
get chat with another user

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
    {
        "BuyerId": 'integer',
        "SellerId": 'integer',
        "message": "string",
        "fullName": "string"
    },
	...,
	...
]
```

<br>

## GET /sellers/chats/:id

description:
get chat to another user

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
    {
        "BuyerId": 'integer',
        "SellerId": 'integer',
        "message": "string",
        "User": {
			"id": 'integer',
			"firstName": 'string',
			"lastName": 'string'
		}
    },
	...,
	...
]
```


## Global Error

*Response (401 - Unauthorized)*

```json
{ "message": "you are not authorized!" }
```
