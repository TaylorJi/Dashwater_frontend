import { faDiagramProject, faBell, faSdCard, IconDefinition } from '@fortawesome/free-solid-svg-icons';

type sidebarType = {
    [key: string]: IconDefinition | string;
}

export const sidebarCategories = [
    {
        'icon': faDiagramProject,
        'description': 'Dashboard',
        'link': '/dashboard'
    },
    {
        'icon': faBell,
        'description': 'Alerts',
        'link': '/alerts'
    },
    {
        'icon': faSdCard,
        'description': 'Manage Devices',
        'link': '/manageDevices'
    }
];