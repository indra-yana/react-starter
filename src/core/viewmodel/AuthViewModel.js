import { RepositoryFactory } from "../repository/RepositoryFactory";
import { useState } from "react";
import { STATE } from "../../utils/view-state";

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

    async function login(credential, password) {
        setState(STATE.Loading);
        
        const result = await authRepository.login(credential, password);

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

    return [
        state,
        login,
        register,
        sendResetPasswordLink,
    ];
}