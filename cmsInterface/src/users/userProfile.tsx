import { Button, FormControl, FormLabel, Modal } from "react-bootstrap"
import { useState } from "react"

import { changePassword, verifySoftwareMFA } from "./authService"
import { Form} from "react-bootstrap"
import userImage from '../assets/user.jpg'
import { useAppSelector, useAppDispatch } from "../hooks"
import { setMFA, setSoftwareMFA } from "./authService"
import {QRCodeSVG} from 'qrcode.react'

import { getUserProfileAction, editUserProfileAction, acceptEulaAction  } from "./userSlice"
import { useEffect } from "react"

import "./userProfileModern.css"
import { editItem } from "../Schema/schemaService"
import AuroraPage from "../components/AuroraPage"
import { useT } from "../util/useTranslation"

function UserProfile(){

const name = useAppSelector((state) => state.user.name )
const email = useAppSelector((state) => state.user.email )
const roles = useAppSelector((state) => state.user.role )
const mfa = useAppSelector((state) => state.user.mfa )
const eula = useAppSelector((state) => state.user.eulaAccepted )
const eulaDate = useAppSelector((state) => state.user.eulaAcceptedDate )
const dispatch = useAppDispatch()
const t = useT()
useEffect(()=> { dispatch(getUserProfileAction(email))},[])
const [error, setError] = useState("")
const [oldPassword, setOldPassword] = useState("")
const [newPassword, setNewPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [secretCode, setSecretCode] = useState("")
const [mfaConfiguration, setMfaConfiguration] = useState(false)
const [mfaError, setMfaError] = useState("")
const [code, setCode] = useState("")

const [passwordChangeShow, setPasswordChangeShow] = useState(false)
const [passwordChangedShow, setPasswordChangedShow] = useState(false)
const [mfaChangedShow, setMfaChangedShow] = useState(false)
const [loginHistoryShow, setLoginHistoryShow] = useState(false)
const [tfaShow, setTfaShow] = useState()
const lastLogin = useAppSelector((state)=> state.user.lastLogin)

useEffect(()=> { dispatch(getUserProfileAction(email))})


const clearValue = () => {
    setMfaConfiguration(false);
    setMfaError("");
    setCode("")
    setNewPassword("");
    setOldPassword("");
    setConfirmPassword("")
    setError("")

}

const handleChangeMFA = async (e)=>{
    setMfaConfiguration(e.target.checked )
    dispatch(editUserProfileAction ({Area:email, Setting:"MFA",  Value: e.target.checked }))

    if (e.target.checked) {
    const temp = await  setSoftwareMFA(e.target.checked);
    setSecretCode(temp );
    }
    else {
        setMFA(false)
    }
}


const handleChangePassword  = async () => {
   try {
    
    
    if (newPassword == confirmPassword){
        
       
        await changePassword(oldPassword, newPassword)

        setPasswordChangedShow(true)
 
clearValue()


    }
    else
    {
        setError("Password does not match")
    }

}
catch(error){
    console.log(error)
    setError(error.message)

}

}



return(
    <AuroraPage variant="default">
    <div className="user-profile-container">
        {/* User Profile Header */}
        <div className="user-profile-header">
            <img src={userImage} alt="User Avatar" className="user-avatar" />
            <div className="user-info">
                <h1>👤 {name || t('userProfile.defaultUser')}</h1>
                <p>{t('userProfile.emailLabel').replace('{email}', email)}</p>
                <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px'}}>
                    {roles && roles.map((role, index) => (
                        <span key={index} className="user-badge">{role}</span>
                    ))}
                </div>
            </div>
        </div>

        {/* Profile Content Grid */}
        <div className="user-profile-grid">
            {/* Security Settings Card */}
            <div className="user-profile-card">
                <div className="user-profile-card-header">
                    <svg className="user-profile-card-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17 15.4,17.5 14.8,17.5H9.2C8.6,17.5 8,17 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                    </svg>
                    <h3>{t('userProfile.securityTitle')}</h3>
                </div>
                <div className="user-profile-card-body">
                    <div className="security-item">
                        <div className="security-item-info">
                            <h4>{t('userProfile.twoFactorTitle')}</h4>
                            <p>{t('userProfile.securitySubtitle')}</p>
                        </div>
                        <div className="status-indicator {mfa ? 'active' : 'inactive'}">
                            <span className="status-dot"></span>
                            {mfa ? t('userProfile.twoFactorActive') : t('userProfile.twoFactorInactive')}
                        </div>
                    </div>

                    <button className="action-button" onClick={() => setPasswordChangeShow(true)}>
                        {t('userProfile.changePasswordButton')}
                    </button>
                    
                    <button className="action-button secondary" onClick={() => setTfaShow(true)}>
                        {t('userProfile.configure2FAButton')}
                    </button>
                </div>
            </div>

            {/* Activity & Info Card */}
            <div className="user-profile-card">
                <div className="user-profile-card-header">
                    <svg className="user-profile-card-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
                    </svg>
                    <h3>{t('userProfile.activityTitle')}</h3>
                </div>
                <div className="user-profile-card-body">
                    <div className="activity-item">
                        <div className="activity-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9,12L11,14L15,10L21,16V4H3V16L9,12Z"/>
                            </svg>
                        </div>
                        <div className="activity-info">
                            <h4>{t('userProfile.lastLogin')}</h4>
                            <p>{lastLogin && lastLogin[1] ? lastLogin[1].toString().substring(0,21) : t('userProfile.notAvailable')}</p>
                        </div>
                    </div>

                    <div className="activity-item">
                        <div className="activity-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"/>
                            </svg>
                        </div>
                        <div className="activity-info">
                            <h4>{t('userProfile.eulaAccepted')}</h4>
                            <p>{eula ? t('userProfile.eulaYes').replace('{date}', eulaDate?.toString().slice(0,21)) : t('userProfile.eulaNo')}</p>
                        </div>
                    </div>

                    <button className="action-button secondary" onClick={() => setLoginHistoryShow(true)}>
                        {t('userProfile.viewLoginHistory')}
                    </button>
                </div>
            </div>
        </div>
    </div>
        
    {/* Password Change Modal */}
    <Modal show={passwordChangeShow} onHide={() => {setPasswordChangeShow(false); clearValue()}} size="lg" centered>

      
        <Modal.Header closeButton>

            <h4>
            {t('userProfile.changePasswordModalTitle')}
            </h4>
        </Modal.Header>
        <Modal.Body>
            <p>
            {t('userProfile.changePasswordModalBody')}
            </p>


            <br/>
            <FormLabel>{t('userProfile.currentPassword')}</FormLabel>
            <FormControl type="password" onChange={
    
                (e)=> setOldPassword(e.target.value)} value={oldPassword} 
                
                
                >

            </FormControl>


            <FormLabel>{t('userProfile.newPassword')}</FormLabel>
            <FormControl type="password" onChange={(e)=> setNewPassword(e.target.value) } value={newPassword}>

            </FormControl>

            <FormLabel>{t('userProfile.confirmNewPassword')}</FormLabel>
            <FormControl type="password" onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword}>

            </FormControl>
            <br/>
            <p style={{color: "red"}}>
                {error} 
            </p>

        </Modal.Body>
        <Modal.Footer>
            <Button onClick={()=>{setPasswordChangeShow(false); clearValue()}}>{t('userProfile.cancel')}</Button>
            <Button onClick={handleChangePassword}>{t('userProfile.changePassword')}</Button>


        </Modal.Footer>

    </Modal>

    <Modal show={tfaShow}  onHide={()=> {setTfaShow(false);clearValue()}} size="lg" >


<Modal.Header closeButton>
    <h4>  {t('userProfile.set2FATitle')}</h4>
</Modal.Header>
<Modal.Body>
<Form.Check // prettier-ignore
    checked= {mfa}
        type="switch"
        id="custom-switch"
        value="true"
    label={t('userProfile.enable2FALabel')} onChange={(e)=>
            handleChangeMFA(e)}
      />

{mfaConfiguration ? 


<div > 
<div style={{ margin:"20px 20px 20px 20px", width:"100%"}}>   
   
    <p>
    {t('userProfile.scanQRCodeInstruction')}
    </p>
   
      <div style={{margin:"20px auto 20px auto", width:"100%", display:"flex", flexDirection:"column"}} >
        <div style={{margin:"auto"}}>
            <QRCodeSVG value={"otpauth://totp/consciusCMS:" + email +"?secret=" + secretCode +"&issuer=consciusCMS"} />
            </div>
    

<div style={{ margin:"20px auto 20px auto"}} >
   
        <FormLabel ><span style={{margin:"auto"}}><nobr>{t('userProfile.codeLabel')}</nobr></span></FormLabel>
    <Form.Control value={code} onChange={(e)=> setCode(e.target.value)} style={{width:"200px"}}></Form.Control>
</div>
</div>
    </div> 
<div>
    <p style={{color:"red"}}>{mfaError}</p>
</div>
</div>

: 
<>
{mfa ? 

<div style={{width:"100%"}}>
    <p style={{textAlign:"center"}}>
    <span style={{fontSize:"20px"}}> {t('userProfile.mfaEnabled')}</span>
    </p>
    
    </div>
    

    : 
<div style={{width:"100%"}}>
    <p style={{textAlign:"center"}}>
    <span style={{fontSize:"20px"}}> {t('userProfile.mfaDisabled')}</span>
    </p>
    
    </div>

    }
    </>
}
</Modal.Body>
<Modal.Footer>
    <Button onClick={()=>{setTfaShow(false); clearValue()}}>{t('userProfile.cancel')} </Button>
    <Button onClick={async ()=>{if(mfa) {     try {await verifySoftwareMFA(code); setMFA(true);  setTfaShow(false); setMfaChangedShow(true); clearValue()} catch(error){setMfaError(error.message)}} else{setTfaShow(false)} }}>{t('userProfile.ok')} </Button>
</Modal.Footer>

</Modal>

<Modal show={mfaChangedShow}  onHide={()=> setMfaChangedShow(false)} size="sm" >


<Modal.Header closeButton>
    <h4>
    {t('userProfile.2faSuccessTitle')}
    </h4>
</Modal.Header>

<Modal.Footer>
    <Button onClick={()=>{setMfaChangedShow(false)}}>{t('userProfile.ok')} </Button>

</Modal.Footer>

</Modal>


  <Modal show={passwordChangedShow}  onHide={()=> setPasswordChangedShow(false)} size="sm" >


<Modal.Header closeButton>
    <h4>
    {t('userProfile.passwordChangedSuccessTitle')}
    </h4>
</Modal.Header>

<Modal.Footer>
    <Button onClick={()=>{setPasswordChangedShow(false)}}>{t('userProfile.ok')} </Button>

</Modal.Footer>

</Modal>


<Modal show={loginHistoryShow}  onHide={()=> setLoginHistoryShow(false)} size="lg" >


<Modal.Header closeButton>
    <h4>
   {t('userProfile.loginHistoryTitle')}
    </h4>
</Modal.Header>
<Modal.Body>
    <p>
 {t('userProfile.loginHistoryLabel')}
 </p>
 {lastLogin.slice(-25).map(i => <><li><span>{i.toString()?.substring(0,21)} </span></li> </>)}

</Modal.Body>

<Modal.Footer>
    <Button onClick={()=>{setLoginHistoryShow(false)}}>{t('userProfile.ok')} </Button>
</Modal.Footer>
</Modal>
    </AuroraPage>
)
    
}

export default UserProfile