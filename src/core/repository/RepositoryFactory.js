import AuthRepository from "./AuthRepository"
import RoleRepository from "./RoleRepository"
import UserRepository from "./UserRepository"

const repositories = {
    auth: new AuthRepository(),
    user: new UserRepository(),
    role: new RoleRepository(),
}

export const RepositoryFactory = {
    get: (name) => repositories[name],
}