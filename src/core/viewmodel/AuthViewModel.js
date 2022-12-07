import { RepositoryFactory } from "../repository/RepositoryFactory";
import { STATE } from "../../utils/view-state";
import { useState } from "react";

const authRepository = RepositoryFactory.get('auth');

export function AuthViewModel() {
    const [state, setState] = useState(STATE.Default);

    async function sendResetPasswordLink(email) {
        setState(STATE.Loading);
        
        const result = await authRepository.sendResetPasswordLink(email);
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }

    async function resetPassword(password, password_confirmation) {
        setState(STATE.Loading);
        
        const result = await authRepository.resetPassword(password, password_confirmation);
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }

    async function login(credential, password) {
        setState(STATE.Loading);
        
        const result = await authRepository.login(credential, password);
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }

    async function logout() {
        setState(STATE.Loading);
        
        const result = await authRepository.logout();
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }

    async function register(payloads) {
        setState(STATE.Loading);
        
        const result = await authRepository.register(payloads);
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }
    
    async function sendVerificationLink(email) {
        setState(STATE.Loading);
        
        const result = await authRepository.sendVerificationLink(email);
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }

    async function verify(token, email) {
        setState(STATE.Loading);
        
        const result = await authRepository.verify(token, email);
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }

    async function refreshToken(refreshToken) {
        setState(STATE.Loading);
        
        const result = await authRepository.refreshToken(refreshToken);
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }

    async function whoami() {
        setState(STATE.Loading);
        
        const result = await authRepository.whoami();
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }

    return {
        state,
        login,
        logout,
        register,
        sendResetPasswordLink,
        resetPassword,
        sendVerificationLink,
        verify,
        refreshToken,
        whoami,
    };
}