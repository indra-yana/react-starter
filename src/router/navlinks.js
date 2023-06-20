const LINKS = {
    // Home link
    home: {
        path: '/',
        name: 'home',
    },
    help: {
        path: '/help',
        name: 'home.help',
    },

    // Auth link
    login: {
        path: '/auth/login',
        name: 'auth.login',
    },
    register: {
        path: '/auth/register',
        name: 'auth.register',
    },
    forgot: {
        path: '/auth/forgot',
        name: 'auth.forgot',
    },
    reset: {
        path: '/auth/reset/:token',
        name: 'auth.reset',
    },
    confirm: {
        path: '/auth/confirm',
        name: 'auth.confirm',
    },
    verify: {
        path: '/auth/verify/:expire/:token',
        name: 'auth.verify',
    },

    // Dashboard link
    dashboard: {
        path: '/dashboard',
        name: 'dashboard.index',
    },

    // Manage user link
    manage_user: {
        path: '/dashboard/user/manage',
        name: 'dashboard.user.manage',
    },
    create_user: {
        path: '/dashboard/user/manage/create',
        name: 'dashboard.user.manage.create',
    },
    edit_user: {
        path: '/dashboard/user/manage/edit/:id',
        name: 'dashboard.user.manage.edit',
    },

    // Manage role
    manage_role: {
        path: '/dashboard/user/role',
        name: 'dashboard.user.role',
    },
    create_role: {
        path: '/dashboard/user/role/create',
        name: 'dashboard.user.role.create',
    },
    edit_role: {
        path: '/dashboard/user/role/edit/:id',
        name: 'dashboard.user.role.edit',
    },

    // Setting
    setting: {
        path: '/dashboard/setting',
        name: 'dashboard.setting',
    },

    // About
    about: {
        path: '/dashboard/about',
        name: 'dashboard.about',
    },

};

export const link = {
    getPath: (name) => {
        if (!LINKS[name]) {
            throw new Error(`Link with path '${name}' not defined!`);
        }

        return LINKS[name].path
    },

    getName: (name) => {
        if (!LINKS[name]) {
            throw new Error(`Link with name '${name}' not defined!`);
        }

        return LINKS[name].name
    },
}