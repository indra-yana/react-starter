import { STATE } from "src/utils/view-state";
import { useState } from "react";
import AuthRepository from "src/core/repository/AuthRepository";

const authRepository = new AuthRepository();

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
        if (result.error) {
            setSendResetLinkState(STATE.Error(result));
            return;
        }

        setSendResetLinkState(STATE.Success(result));
    }

    async function resetPassword(payloads) {
        setResetPasswordState(STATE.Loading);

        const result = await authRepository.resetPassword(payloads);
        if (result.error) {
            setResetPasswordState(STATE.Error(result));
            return;
        }

        setResetPasswordState(STATE.Success(result));
    }

    async function confirmPassword(password) {
        setConfirmPasswordState(STATE.Loading);

        const result = await authRepository.confirmPassword(password);
        if (result.error) {
            setConfirmPasswordState(STATE.Error(result));
            return;
        }

        setConfirmPasswordState(STATE.Success(result));
    }

    async function login(credential, password) {
        setLoginState(STATE.Loading);

        const result = await authRepository.login(credential, password);
        if (result.error) {
            setLoginState(STATE.Error(result));
            return;
        }

        setLoginState(STATE.Success(result));
    }

    async function socialLogin(credential, provider) {
        setLoginState(STATE.Loading);

        const result = await authRepository.socialLogin(credential, provider);
        if (result.error) {
            setLoginState(STATE.Error(result));
            return;
        }

        setLoginState(STATE.Success(result));
    }

    async function logout() {
        setLogoutState(STATE.Loading);

        const result = await authRepository.logout();
        if (result.error) {
            setLogoutState(STATE.Error(result));
            return;
        }

        setLogoutState(STATE.Success(result));
    }

    async function register(payloads) {
        setRegisterState(STATE.Loading);

        const result = await authRepository.register(payloads);
        if (result.error) {
            setRegisterState(STATE.Error(result));
            return;
        }

        setRegisterState(STATE.Success(result));
    }

    async function sendVerificationLink(email) {
        setSendVerificationLinkState(STATE.Loading);

        const result = await authRepository.sendVerificationLink(email);
        if (result.error) {
            setSendVerificationLinkState(STATE.Error(result));
            return;
        }

        setSendVerificationLinkState(STATE.Success(result));
    }

    async function verify(expire, token, email) {
        setVerifyState(STATE.Loading);

        const result = await authRepository.verify(expire, token, email);
        if (result.error) {
            setVerifyState(STATE.Error(result));
            return;
        }

        setVerifyState(STATE.Success(result));
    }

    async function refreshToken(refreshToken) {
        setRefreshTokenState(STATE.Loading);

        const result = await authRepository.refreshToken(refreshToken);
        if (result.error) {
            setRefreshTokenState(STATE.Error(result));
            return;
        }

        setRefreshTokenState(STATE.Success(result));
    }

    async function whoami() {
        setWhoamiState(STATE.Loading);

        const result = await authRepository.whoami();
        if (result.error) {
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
        socialLogin,
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