
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const BASE_ADMIN = "/dashboard";

const BASE_IMG = "/storage";

const IMG_DEFAULT = "/assets/photos/img-blank.PNG";

const NAVIGATION = [
    {
        segment: "/home",
        title: 'Home',
        icon: <DashboardIcon />,
    },
    {
        segment: "/pedidos",
        title: 'Pedidos',
        icon: <LocalShippingIcon />,
    },
    {
        segment: "/clientes",
        title: 'Clientes',
        icon: <PersonIcon />,
    },
    {
        segment: "/productos",
        title: 'Productos',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: "/reportes",
        title: 'Reportes',
        icon: <BarChartIcon />,
    },
];

export { BASE_ADMIN, NAVIGATION, BASE_IMG, IMG_DEFAULT }