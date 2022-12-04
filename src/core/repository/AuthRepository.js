import { error, success } from "../../utils/response";
import { login, register } from "../datasource/remote/api/auth-api";

export class AuthRepository {
    async login(credential, password) {
        return await login(credential, password)
            .then(success)
            .catch(error);
    }

    async register(payloads) {
        return await register(payloads)
            .then(success)
            .catch(error);
    }
}