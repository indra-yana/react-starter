import { error, success } from "../../utils/response";
import { useLocalStorage } from "../datasource/local/local-storage";
import { 
    confirmPassword,
    login, 
    logout, 
    register, 
    resetPassword, 
    sendResetPasswordLink, 
    sendVerificationLink, 
    verify, 
    whoami 
} from "../datasource/remote/api/auth";

export default class AuthRepository {
    async login(credential, password) {
        return await login(credential, password)
            .then(success)
            .catch(error);
    }

    async logout() {
        return await logout()
            .then(success)
            .catch(error);;
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

    async resetPassword(payloads) {
        return await resetPassword(payloads)
            .then(success)
            .catch(error);
    }

    async confirmPassword(password) {
        return await confirmPassword(password)
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

    authSession() {
        const [auth, setAuth] = useLocalStorage('auth', {});
        return [auth, setAuth];
    }
}