import { error, success } from "../../utils/response";
import { 
    login, 
    logout, 
    register, 
    resetPassword, 
    sendResetPasswordLink, 
    sendVerificationLink, 
    verify, 
    whoami 
} from "../datasource/remote/api/auth-api";

export class AuthRepository {
    async login(credential, password) {
        return await login(credential, password)
            .then(success)
            .catch(error);
    }

    async logout() {
        return await logout();
    }

    async register(payloads) {
        return await register(payloads)
            .then(success)
            .catch(error);
    }

    async sendVerificationLink(email) {
        return await sendVerificationLink(email)
            .then(success)
            .catch(error);
    }

    async verify(token, email) {
        return await verify(token, email)
            .then(success)
            .catch(error);
    }

    async sendResetPasswordLink(email) {
        return await sendResetPasswordLink(email)
            .then(success)
            .catch(error);
    }

    async resetPassword(password, password_confirmation) {
        return await resetPassword(password, password_confirmation)
            .then(success)
            .catch(error);
    }

    async refreshToken(refreshToken) {
        return await refreshToken(refreshToken)
            .then(success)
            .catch(error);
    }

    async whoami() {
        return await whoami()
            .then(success)
            .catch(error);
    }
}