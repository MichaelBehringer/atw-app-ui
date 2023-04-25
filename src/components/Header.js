import {useNavigate} from 'react-router-dom';
import logo from './ffLogo.png'; // with import

function Header() {
	const navigate = useNavigate();

  return (
    <div className='headlineContainer'>
      <p className='headline'>Atemschutzplegestelle</p>
      <img onClick={()=>navigate("/")} className='logo' alt='logo' src={logo}></img>
    </div>
  );
}

export default Header;
