import { error, success } from "src/utils/response";
import { 
    create, 
    deleteData, 
    list, 
    show, 
    update 
} from "../datasource/remote/api/user";

export default class UserRepository {
    async list(page, limit) {
        return await list(page, limit)
            .then(success)
            .catch(error);
    }

    async show(id) {
        return await show(id)
            .then(success)
            .catch(error);
    }

    async create(payloads) {
        return await create(payloads)
            .then(success)
            .catch(error);
    }
    
    async update(payloads) {
        return await update(payloads)
            .then(success)
            .catch(error);
    }
    
    async deleteData(id) {
        return await deleteData(id)
            .then(success)
            .catch(error);
    }

}