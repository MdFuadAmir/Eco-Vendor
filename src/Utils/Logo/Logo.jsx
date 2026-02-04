import { Link } from "react-router-dom";
import image from "../../assets/Logo/eco.png"

const Logo = () => {
    return (
        <Link to={'/'}>
            <img src={image} alt="" className="rounded-full w-32 hover:scale-105 duration-300"/>
        </Link>
    );
};

export default Logo;