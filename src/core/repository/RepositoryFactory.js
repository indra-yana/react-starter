import { AuthRepository } from "./AuthRepository"

const repositories = {
    auth: new AuthRepository(),
}

export const RepositoryFactory = {
    get: (name) => repositories[name],
}