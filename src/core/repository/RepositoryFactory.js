import AuthRepository from "./AuthRepository"
import UserRepository from "./UserRepository"

const repositories = {
    auth: new AuthRepository(),
    user: new UserRepository(),
}

export const RepositoryFactory = {
    get: (name) => repositories[name],
}