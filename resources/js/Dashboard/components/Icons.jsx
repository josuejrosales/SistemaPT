import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoIcon from '@mui/icons-material/Info';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

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
        case "UPDATE-PHOTO":
            return <CameraAltIcon fontSize='large' />
        default:
            break;
    }
}

export default getIcon;