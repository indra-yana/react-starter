import { useState } from "react";
import { VIEW_STATE } from "../../utils/constant";
import { RepositoryFactory } from "../repository/RepositoryFactory";

const authRepository = RepositoryFactory.get('auth');

export function useAuthViewModel() {
    const [state, setState] = useState(VIEW_STATE);

    async function sendResetPasswordLink(email) {
        setState({
            ...VIEW_STATE,
            loading: true,
        });

        const result = await authRepository.sendResetPasswordLink(email);
        if (result.status === 'error') {
            setState({
                ...VIEW_STATE,
                error: true,
                result,
            });

            return;
        }

        setState({
            ...VIEW_STATE,
            success: true,
            result,
        });
    }

    return [state, sendResetPasswordLink];
}