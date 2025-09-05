import {useDispatch } from 'react-redux'
import {signOut} from '../users/authService.ts'
import {useNavigate } from 'react-router-dom'
import {logout} from '../users/userSlice.js'
import userImage from '../assets/user.jpg'
import AuroraLogo from '../components/Logo/AuroraLogo.tsx'
import SocialLinks from '../components/SocialLinks/SocialLinks.tsx'
import "./head.css"
import { useAppSelector } from '../hooks.tsx';
import LanguageSelector from '../util/multiselector';


function parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }


const Head = () => {
    const dispatch = useDispatch();
    
    const websiteName =  useAppSelector ((state) => state.settings.websiteName)
    const userName = useAppSelector((state)=> state.user.name)
    const role  = useAppSelector((state)=> state.user.role)
    const navigate = useNavigate();
  

    try {
        const IdToken = parseJwt(sessionStorage["idToken"].toString())
        console.log(IdToken)
    }
    catch{
        console.log("Error to parse the token")
    }

    const signOutClick = ()=> {
        signOut();
        dispatch(logout())
        navigate('/login')
    }
    
    return(
        <div className="modern-header header-animate">
            {/* Brand Section */}
            <div className="header-brand">
                <AuroraLogo size="md" />
                <div className="brand-subtitle">{websiteName}</div>
            </div>
            
            {/* Enlaces Sociales */}
            <div className="header-social">
                <SocialLinks variant="header" size="sm" />
            </div>
            
            {/* Language selector */}
            <div style={{marginLeft: 12}}>
                <LanguageSelector />
            </div>
            
            {/* User Profile Section */}
            <div className="header-profile-section">
                <div className="profile-container">
                    <img 
                        src={userImage} 
                        className="profile-picture"
                        alt="Profile Picture"
                    />
                    <div className="profile-info">
                        <span className="profile-name">{userName }</span>
                        <span className="profile-role-badge">{role }</span>
                    </div>
                </div>
                
                <button 
                    className="profile-logout-btn"
                    onClick={signOutClick}
                    aria-label="Logout"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 17L21 12M21 12L16 7M21 12H9M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}
export default Head