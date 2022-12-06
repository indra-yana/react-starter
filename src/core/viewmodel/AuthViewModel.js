import { RepositoryFactory } from "../repository/RepositoryFactory";
import { useState } from "react";
import { STATE } from "../../utils/constant";

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

    return [state, sendResetPasswordLink];
}