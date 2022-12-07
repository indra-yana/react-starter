import { RepositoryFactory } from "../repository/RepositoryFactory";
import { STATE } from "../../utils/view-state";
import { useState } from "react";

const userRepository = RepositoryFactory.get('user');

export function UserViewModel() {
    const [state, setState] = useState(STATE.Default);

    async function list() {
        setState(STATE.Loading);
        
        const result = await userRepository.list();
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }

    async function show(id) {
        setState(STATE.Loading);
        
        const result = await userRepository.show(id);
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }

    async function create(payloads) {
        setState(STATE.Loading);
        
        const result = await userRepository.create(payloads);
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }
    
    async function update(payloads) {
        setState(STATE.Loading);
        
        const result = await userRepository.update(payloads);
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }
    
    async function deleteData(id) {
        setState(STATE.Loading);
        
        const result = await userRepository.deleteData(id);
        if (result.status === 'error') {
            setState(STATE.Error(result));
            return;
        }

        setState(STATE.Success(result));
    }

    return {
        state,
        list,
        show,
        create,
        update,
        deleteData,
    };
}