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
<p>
    You must provide your own API before using this project, or you can see in the `core/remote/api/*.js` directory to see how endpoint used in this project. 
    The API Spec will described bellow:
</p>
<ul>
    <li>TODO</li>
</ul>

Request :
- Header :
    - accessToken : "your access token key"

## Authentication

Request :
- Method : POST
- Endpoint : `api/v1/auth/login`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "credential": "string|email|username|unique",
    "password": "string|password",
    "remember": "boolean",
}
```

Response :

```json 
{
    "statusCode": 200,
    "status": "success",
    "message": "Login successfully.",
    "data": {
        "user": {
            "id": "string",
            "name": "string",
            "username": "string|unique",
            "email": "string|email",
            "emailVerifiedAt": "iso_date|null",
            "createdAt": "iso_date|2022-09-04T13:54:28.953Z",
            "updatedAt": "iso_date|2022-09-04T13:54:28.953Z",
            "avatar": "url|string"
        },
        "token": {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....."
        }
    }
}
```

### TODO
