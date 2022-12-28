import { RepositoryFactory } from "../repository/RepositoryFactory";
import { STATE } from "src/utils/view-state";
import { useState } from "react";

const authRepository = RepositoryFactory.get('auth');

export default function AuthService() {
    const [sendResetLinkState, setSendResetLinkState] = useState(STATE.Default);
    const [resetPasswordState, setResetPasswordState] = useState(STATE.Default);
    const [confirmPasswordState, setConfirmPasswordState] = useState(STATE.Default);
    const [loginState, setLoginState] = useState(STATE.Default);
    const [logoutState, setLogoutState] = useState(STATE.Default);
    const [registerState, setRegisterState] = useState(STATE.Default);
    const [sendVerificationLinkState, setSendVerificationLinkState] = useState(STATE.Default);
    const [verifyState, setVerifyState] = useState(STATE.Default);
    const [refreshTokenState, setRefreshTokenState] = useState(STATE.Default);
    const [whoamiState, setWhoamiState] = useState(STATE.Default);
    const [auth, setAuth] = authRepository.authSession();

    async function sendResetPasswordLink(email) {
        setSendResetLinkState(STATE.Loading);

        const result = await authRepository.sendResetPasswordLink(email);
        if (result.status === 'error') {
            setSendResetLinkState(STATE.Error(result));
            return;
        }

        setSendResetLinkState(STATE.Success(result));
    }

    async function resetPassword(payloads) {
        setResetPasswordState(STATE.Loading);

        const result = await authRepository.resetPassword(payloads);
        if (result.status === 'error') {
            setResetPasswordState(STATE.Error(result));
            return;
        }

        setResetPasswordState(STATE.Success(result));
    }

    async function confirmPassword(password) {
        setConfirmPasswordState(STATE.Loading);

        const result = await authRepository.confirmPassword(password);
        if (result.status === 'error') {
            setConfirmPasswordState(STATE.Error(result));
            return;
        }

        setConfirmPasswordState(STATE.Success(result));
    }

    async function login(credential, password) {
        setLoginState(STATE.Loading);

        const result = await authRepository.login(credential, password);
        if (result.status === 'error') {
            setLoginState(STATE.Error(result));
            return;
        }

        setLoginState(STATE.Success(result));
    }

    async function logout() {
        setLogoutState(STATE.Loading);

        const result = await authRepository.logout();
        if (result.status === 'error') {
            setLogoutState(STATE.Error(result));
            return;
        }

        setLogoutState(STATE.Success(result));
    }

    async function register(payloads) {
        setRegisterState(STATE.Loading);

        const result = await authRepository.register(payloads);
        if (result.status === 'error') {
            setRegisterState(STATE.Error(result));
            return;
        }

        setRegisterState(STATE.Success(result));
    }

    async function sendVerificationLink(email) {
        setSendVerificationLinkState(STATE.Loading);

        const result = await authRepository.sendVerificationLink(email);
        if (result.status === 'error') {
            setSendVerificationLinkState(STATE.Error(result));
            return;
        }

        setSendVerificationLinkState(STATE.Success(result));
    }

    async function verify(token, email) {
        setVerifyState(STATE.Loading);

        const result = await authRepository.verify(token, email);
        if (result.status === 'error') {
            setVerifyState(STATE.Error(result));
            return;
        }

        setVerifyState(STATE.Success(result));
    }

    async function refreshToken(refreshToken) {
        setRefreshTokenState(STATE.Loading);

        const result = await authRepository.refreshToken(refreshToken);
        if (result.status === 'error') {
            setRefreshTokenState(STATE.Error(result));
            return;
        }

        setRefreshTokenState(STATE.Success(result));
    }

    async function whoami() {
        setWhoamiState(STATE.Loading);

        const result = await authRepository.whoami();
        if (result.status === 'error') {
            setWhoamiState(STATE.Error(result));
            return;
        }

        setWhoamiState(STATE.Success(result));
    }

    return {
        // State holder
        sendResetLinkState,
        resetPasswordState,
        confirmPasswordState,
        loginState,
        logoutState,
        registerState,
        sendVerificationLinkState,
        verifyState,
        refreshTokenState,
        whoamiState,
        auth, 
        setAuth,

        // Method
        login,
        logout,
        register,
        sendResetPasswordLink,
        resetPassword,
        confirmPassword,
        sendVerificationLink,
        verify,
        refreshToken,
        whoami,
    };
}