import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { useActiveMenu } from "../../../hooks/useActiveMenu";
import { useEffect } from "react";

export const menuItems = [
    {
        label: 'Dashboard',
        name: 'dashboard.index',
        icon: 'fas fa-dashboard',
        to: '/dashboard',
    },
    {
        label: 'Users',
        name: 'dashboard.user.index',
        icon: 'fas fa-users',
        subMenu: [
            {
                label: 'Manage',
                name: 'dashboard.user.manage',
                to: '/dashboard/user/manage',
                routeAction: [
                    'create',
                    'update',
                    'detail',
                ]
            },
            {
                label: 'Role',
                name: 'dashboard.user.role',
                to: '/dashboard/user/role',
            },
        ],
    },
    {
        label: 'About',
        name: 'dashboard.about',
        to: '/dashboard/about',
        icon: 'fas fa-info-circle'
    },
];

export default function SideBarMenu(props) {
    const { search = '' } = props;
    const [currentRouteName] = useActiveMenu();
    const [ menus, setMenus ] = useState(menuItems);

    useEffect(() => {
        let filteredMenu = menus.filter((menu) => {
            return menu.label.toLowerCase().indexOf(search) != -1
        });

        setMenus(search ? filteredMenu : menuItems);
    }, [search]);

    function hasSubMenu(subMenu, currentRouteName) {
        const subMenuName = [];
        subMenu.forEach(item => {
            const { name, routeAction = [] } = item;
            subMenuName.push(name);
    
            if (routeAction.length > 0) {
                routeAction.forEach(action => {
                    subMenuName.push(name.concat(`.${action}`))
                });
            }
        });
    
        return subMenuName.includes(currentRouteName);
    }

    return (
        <>
            <ul className="list-unstyled components mb-5">
                {menus.map((menu) =>
                    <Fragment key={menu.name}>
                        {menu.subMenu 
                            ?
                            <li className={hasSubMenu(menu.subMenu, currentRouteName) ? 'active' : ''}>
                                <a className="nav-main dropdown-toggle" href={`#pageSubmenu-${menu.label}`} data-bs-toggle="collapse" aria-expanded="false">
                                    <i className={`side-icon ${menu.icon} `}></i>
                                    {menu.label}
                                </a>
                                <ul className={`collapse list-unstyled ${hasSubMenu(menu.subMenu, currentRouteName) ? 'show' : ''}`} id={`pageSubmenu-${menu.label}`}>
                                    {menu.subMenu.map((sub) =>
                                        <MenuItem key={sub.name} menu={sub} currentRouteName={currentRouteName} className="nav-link nav-sub" />
                                    )}
                                </ul>
                            </li>
                            :
                            <MenuItem menu={menu} currentRouteName={currentRouteName} />
                        }
                    </Fragment>
                )}
            </ul>
        </>
    )
}

function MenuItem(props) {
    const { menu, currentRouteName, className = "nav-main" } = props;

    function hasRouteAction(menu, parentName, currentRouteName) {
        const subActionName = [];
        const { routeAction = [] } = menu;

        if (routeAction.length > 0) {
            routeAction.forEach(action => {
                subActionName.push(parentName.concat(`.${action}`))
            });
        }

        return subActionName.includes(currentRouteName);
    }

    return (
        <li className={currentRouteName === menu.name || hasRouteAction(menu, menu.name, currentRouteName) ? 'active' : ''}>
            <NavLink to={menu.to} className={className}>
                {menu.icon &&
                    <i className={`side-icon ${menu.icon}`}></i>
                }
                {menu.label}
            </NavLink>
        </li>
    )
}