import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import InfoIcon from '@mui/icons-material/Info';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCardIcon from '@mui/icons-material/AddCard';
import CategoryIcon from '@mui/icons-material/Category';

const getIcon = (type) => {
    switch (type) {
        case "ADD-PEDIDO":
            return <AddShoppingCartIcon fontSize='large' />
        case "ADD-PERSON":
            return <PersonIcon fontSize='large' />
        case "ADD-REGISTER":
            return <PostAddIcon fontSize='large' />
        case "ADD":
            return <AddBusinessIcon fontSize='large' />
        case "SHOW":
            return <InfoIcon fontSize='large' />
        case "DELETE":
            return <InfoIcon fontSize='large' />
        case "UPDATE-PHOTO":
            return <CameraAltIcon fontSize='large' />
        case "ADD-PAGO":
            return <AddCardIcon fontSize='large' />
        case "ADD-CATEGORY":
            return <CategoryIcon fontSize='large' />
        default:
            break;
    }
}

export default getIcon;