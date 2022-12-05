import apiClient from "../api-client";

export async function login(credential, password) {
    return await apiClient.post('/v1/auth/login', {
        credential,
        password,
    });
}

export async function logout() {
    return await apiClient.post('/v1/auth/logout');
}

export async function register(payloads) {
    return await apiClient.post('/v1/auth/register', payloads, { 
        headers: {'Content-Type': 'multipart/form-data' }
    });
}

export async function sendVerificationLink(email) {
    await apiClient.post('/v1/auth/verify/resend', {
        email,
    });
}

export async function verify(token, email) {
    await apiClient.put('/v1/auth/verify', {
        token,
        email
    });
}

export async function sendResetPasswordLink(email) {
    await apiClient.post('/v1/auth/password/email', {
        email,
    });
}

export async function resetPassword(password, password_confirmation) {
    await apiClient.post('/v1/auth/password/email', {
        password,
        password_confirmation,
    });
}

export async function refreshToken(refreshToken) {
    await apiClient.post('/v1/auth/refreshToken', {
        refreshToken,
    });
}

export async function whoami() {
    await apiClient.get('/v1/auth/whoami');
}