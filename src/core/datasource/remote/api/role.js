import apiClient from "../api-client";

export async function list() {
    return await apiClient.get('/v1/role/list');
}

export async function show(id) {
    return await apiClient.get(`/v1/role/show/${id}`);
}

export async function create(payloads) {
    return await apiClient.post('/v1/role/create', payloads);
}

export async function update(payloads) {
    return await apiClient.put('/v1/role/update', payloads);
}

export async function deleteData(id) {
    return await apiClient.delete('/v1/role/delete', {
        data: { id }
    });
}