# React Starter

This project is purposed for building your awesome app that needed a starting point with basic fitur that listed bellow:

<ul>
    <li>Basic Authentication
        <ul>
            <li>Login</li>
            <li>Register</li>
            <li>Forgot Password</li>
            <li>Verify Account</li>
            <li>Password Confirmation</li>
        </ul>
    </li>
    <li>User Management</li>
    <li>Role Management</li>
</ul>
<p>Core feature included in this project:</p>
<ul>
    <li>React v18.2.0</li>
    <li>React Router v6.5.0</li>
    <li><a href="https://vitejs.dev/guide/" target="_blank">Vite</a></li>
    <li>Multi Language Using <a href="https://www.i18next.com" target="_blank">i18next</a> and <a href="https://react.i18next.com">react i18next</a> </li>
    <li>Secure Local Storage Using <a href="https://github.com/softvar/secure-ls" target="_blank">secure ls</a></li>
</ul>

# API

This project can integrated with backend service project <a href="https://github.com/indra-yana/nestjs-starter" target="__blank">NestJS-Starter</a> as REST API Project.
The API Spec will described bellow:

### General Header Request :
- Header :
    - Authorization: "jwt.token"
    - Content-Type: application/json
    - Accept: application/json
    - Accept-Language: id|en

## Authentication

Request :
- Method : POST
- Endpoint : `/api/v1/auth/login`
- Header : [General Header](#general-header-request)
- Body :

```json 
{
    "credential": "john.doe@gmail.com",
    "password": "secret",
    "remember": true|false,
}
```

- Response Success :

```json 
{
    "statusCode": 200,
    "status": "success",
    "message": "Success Message",
    "data": {
        "success_data"
    }
}
```

- Response Error :

```json 
{
    "statusCode": 500,
    "status": "error",
    "message": "Error Message",
    "error": {
        "error_data"
    }
}
```

### TODO
