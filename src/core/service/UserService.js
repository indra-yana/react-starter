import { RepositoryFactory } from "../repository/RepositoryFactory";
import { STATE } from "src/utils/view-state";
import { useState } from "react";

const userRepository = RepositoryFactory.get('user');

export function UserService() {
    const [listState, setListState] = useState(STATE.Default);
    const [showState, setShowState] = useState(STATE.Default);
    const [createState, setCreateState] = useState(STATE.Default);
    const [updateState, setUpdateState] = useState(STATE.Default);
    const [deleteState, setDeleteState] = useState(STATE.Default);

    async function list() {
        setListState(STATE.Loading);
        
        const result = await userRepository.list();
        if (result.status === 'error') {
            setListState(STATE.Error(result));
            return;
        }

        setListState(STATE.Success(result));
    }

    async function show(id) {
        setShowState(STATE.Loading);
        
        const result = await userRepository.show(id);
        if (result.status === 'error') {
            setShowState(STATE.Error(result));
            return;
        }

        setShowState(STATE.Success(result));
    }

    async function create(payloads) {
        setCreateState(STATE.Loading);
        
        const result = await userRepository.create(payloads);
        if (result.status === 'error') {
            setCreateState(STATE.Error(result));
            return;
        }

        setCreateState(STATE.Success(result));
    }
    
    async function update(payloads) {
        setUpdateState(STATE.Loading);
        
        const result = await userRepository.update(payloads);
        if (result.status === 'error') {
            setUpdateState(STATE.Error(result));
            return;
        }

        setUpdateState(STATE.Success(result));
    }
    
    async function deleteData(id) {
        setDeleteState(STATE.Loading);
        
        const result = await userRepository.deleteData(id);
        if (result.status === 'error') {
            setDeleteState(STATE.Error(result));
            return;
        }

        setDeleteState(STATE.Success(result));
    }

    return {
        // State holder
        listState,
        showState,
        createState,
        updateState,
        deleteState,

        // Method
        list,
        show,
        create,
        update,
        deleteData,
    };
}