
import Schema from './Schema/Schema';
import Editor from './Editor/Editor';
import Admin from './admin';
import Login from './users/login';
import Dashboard from './dashboard';

import './App.css';

import { Callback } from './callback';
import { authenticate } from './users/userSlice';
import Reports from './reports';
import Profile from './profile';
import { Navigate } from 'react-router-dom';
import { Routes,Route} from "react-router-dom";
import { getSettingAction } from './Settings/settingsSlice';
import { useAppDispatch } from './hooks';
import Terms from './legal/terms';
import AvisoLegal from './legal/aviso';
import UserProfile from './users/userProfile';

function App() {
  const dispatch = useAppDispatch()
  dispatch(getSettingAction())
  // Request Profile-specific settings from primary settings service
  dispatch(getSettingAction("Profile"))

function parseJwt (token : string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  const searchParams = new URLSearchParams(document.location.search)

    if (sessionStorage.getItem('idToken')) {
      const IdToken = parseJwt(sessionStorage["idToken"].toString())
      console.log(IdToken)
      dispatch(authenticate({"email": IdToken.email, "name":IdToken.name, "role" :IdToken["cognito:groups"]}))

    } else {
      console.error('Session token was not set properly.');
    }
                         
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    return !!accessToken;}

  return (
    <div className="app-container">
    <Routes>
      <Route path="login" element={<Login></Login>}></Route>  
      <Route path = "login/callback" element = {<Callback code={searchParams.get("code") || ""} />}></Route>
    </Routes>
    <Routes>
    
      <Route path="/" element={isAuthenticated() ? <Navigate replace to="site/home" /> : <Navigate replace to="login" />} />
      <Route path="site/" element={<Admin/>}>
            <Route path ="/site/home" element={ <Dashboard/>}></Route>
            <Route path ="/site/schema" element={  <Schema />}></Route>
            <Route path ="/site/editor" element={ <Editor/>} ></Route>
            <Route path ="/site/reports" element={ <Reports/> }></Route>
            <Route path ="/site/settings" element={  <Profile/> } ></Route>
            <Route path ="/site/terms" element={ <Terms/> }></Route>
            <Route path ="/site/avisolegal" element={  <AvisoLegal/> } ></Route>
            <Route path ="/site/profile" element={  <UserProfile/> } ></Route>
        </Route>
    </Routes>
    </div>
  )
}

export default App
