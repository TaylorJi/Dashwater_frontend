import { faDiagramProject, faBell, faSdCard, faLock } from '@fortawesome/free-solid-svg-icons';

export const sidebarCategories = [
    {
        'icon': faDiagramProject,
        'description': 'Dashboard',
        'link': '/dashboard'
    },
    // {
    //     'icon': faBell,
    //     'description': 'Alerts',
    //     'link': '/alerts'
    // },
    {
        'icon': faSdCard,
        'description': 'Manage Devices',
        'link': '/manageDevices'
    },
    {
        'icon': faLock,
        'description': 'Admin Portal',
        'link': '/adminPortal'
    }
];