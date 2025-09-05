import { Button, FormControl, FormLabel, Modal, Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import { changePassword, verifySoftwareMFA, setMFA, setSoftwareMFA } from "./authService"
import userImage from '../assets/user.jpg'
import { useAppSelector, useAppDispatch } from "../hooks"
import {QRCodeSVG} from 'qrcode.react'
import { getUserProfileAction, editUserProfileAction } from "./userSlice"
import "./userProfileModern.css"

function UserProfile(){
    const name = useAppSelector((state) => state.user.name)
    const email = useAppSelector((state) => state.user.email)
    const roles = useAppSelector((state) => state.user.role)
    const mfa = useAppSelector((state) => state.user.mfa)
    const eula = useAppSelector((state) => state.user.eulaAccepted)
    const eulaDate = useAppSelector((state) => state.user.eulaAcceptedDate)
    const lastLogin = useAppSelector((state) => state.user.lastLogin)
    const dispatch = useAppDispatch()
    
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
    const [tfaShow, setTfaShow] = useState(false)

    useEffect(() => { 
        if (email) {
            dispatch(getUserProfileAction(email))
        }
    }, [email, dispatch])

    const clearValue = () => {
        setMfaConfiguration(false)
        setMfaError("")
        setCode("")
        setNewPassword("")
        setOldPassword("")
        setConfirmPassword("")
        setError("")
    }

    const handleChangeMFA = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setMfaConfiguration(e.target.checked)
        dispatch(editUserProfileAction({Area: email, Setting: "MFA", Value: e.target.checked}))

        if (e.target.checked) {
            const temp = await setSoftwareMFA(e.target.checked)
            setSecretCode(temp)
        } else {
            setMFA(false)
        }
    }

    const handleChangePassword = async () => {
        try {
            if (newPassword === confirmPassword) {
                await changePassword(oldPassword, newPassword)
                setPasswordChangedShow(true)
                clearValue()
            } else {
                setError("Password does not match")
            }
        } catch(error: any) {
            console.log(error)
            setError(error.message)
        }
    }

    return (
        <>
            <div className="user-profile-container">
                {/* User Profile Header */}
                <div className="user-profile-header">
                    <div className="user-avatar-container">
                        <img src={userImage} alt="User Avatar" className="user-avatar" />
                        <div className="user-status-indicator">
                            <div className="status-dot active"></div>
                        </div>
                    </div>
                    <div className="user-info">
                        <h1>👤 {name || "Usuario"}</h1>
                        <p className="user-email">📧 {email}</p>
                        <div className="user-roles">
                            {roles && roles.map((role: string, index: number) => (
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
                            <h3>🔐 Configuración de Seguridad</h3>
                        </div>
                        <div className="user-profile-card-body">
                            <div className="security-item">
                                <div className="security-item-info">
                                    <h4>Autenticación de Dos Factores</h4>
                                    <p>Mejora la seguridad de tu cuenta con 2FA</p>
                                </div>
                                <div className={`status-indicator ${mfa ? 'active' : 'inactive'}`}>
                                    <span className="status-dot"></span>
                                    {mfa ? "Activo" : "Inactivo"}
                                </div>
                            </div>

                            <div className="security-actions">
                                <button className="action-button primary" onClick={() => setPasswordChangeShow(true)}>
                                    🔑 Cambiar Contraseña
                                </button>
                                
                                <button className="action-button secondary" onClick={() => setTfaShow(true)}>
                                    🛡️ Configurar 2FA
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Activity & Info Card */}
                    <div className="user-profile-card">
                        <div className="user-profile-card-header">
                            <svg className="user-profile-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
                            </svg>
                            <h3>📊 Actividad Reciente</h3>
                        </div>
                        <div className="user-profile-card-body">
                            <div className="activity-item">
                                <div className="activity-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9,12L11,14L15,10L21,16V4H3V16L9,12Z"/>
                                    </svg>
                                </div>
                                <div className="activity-info">
                                    <h4>Último Acceso</h4>
                                    <p>{lastLogin && lastLogin[1] ? lastLogin[1].toString().substring(0,21) : "No disponible"}</p>
                                </div>
                            </div>

                            <div className="activity-item">
                                <div className="activity-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"/>
                                    </svg>
                                </div>
                                <div className="activity-info">
                                    <h4>EULA Aceptado</h4>
                                    <p>{eula ? `Sí - ${eulaDate?.toString().slice(0,21)}` : "No aceptado"}</p>
                                </div>
                            </div>

                            <button className="action-button secondary" onClick={() => setLoginHistoryShow(true)}>
                                📊 Ver Historial de Accesos
                            </button>
                        </div>
                    </div>

                    {/* Account Status Card */}
                    <div className="user-profile-card span-full">
                        <div className="user-profile-card-header">
                            <svg className="user-profile-card-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,4V6C15,7.1 14.1,8 13,8H11C9.9,8 9,7.1 9,6V4L3,7V9H21M3,10V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V10H3Z"/>
                            </svg>
                            <h3>ℹ️ Estado de la Cuenta</h3>
                        </div>
                        <div className="user-profile-card-body">
                            <div className="account-status-grid">
                                <div className="status-item">
                                    <div className="status-item-icon">🔐</div>
                                    <div className="status-item-content">
                                        <h4>Seguridad</h4>
                                        <p>Configuración básica activa</p>
                                    </div>
                                </div>
                                <div className="status-item">
                                    <div className="status-item-icon">✅</div>
                                    <div className="status-item-content">
                                        <h4>Verificación</h4>
                                        <p>Cuenta verificada</p>
                                    </div>
                                </div>
                                <div className="status-item">
                                    <div className="status-item-icon">📧</div>
                                    <div className="status-item-content">
                                        <h4>Email</h4>
                                        <p>Configurado y activo</p>
                                    </div>
                                </div>
                                <div className="status-item">
                                    <div className="status-item-icon">🛡️</div>
                                    <div className="status-item-content">
                                        <h4>2FA</h4>
                                        <p>{mfa ? "Habilitado" : "Disponible"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            {/* Password Change Modal */}
            <Modal show={passwordChangeShow} onHide={() => {setPasswordChangeShow(false); clearValue()}} size="lg" centered>
                <Modal.Header closeButton className="modern-modal-header">
                    <h4>🔑 Cambiar Contraseña</h4>
                </Modal.Header>
                <Modal.Body className="modern-modal-body">
                    <p>Por favor proporciona tu contraseña actual y la nueva contraseña:</p>

                    <div className="form-group">
                        <FormLabel>Contraseña actual:</FormLabel>
                        <FormControl 
                            type="password" 
                            onChange={(e) => setOldPassword(e.target.value)} 
                            value={oldPassword}
                            className="modern-form-control"
                        />
                    </div>

                    <div className="form-group">
                        <FormLabel>Nueva contraseña:</FormLabel>
                        <FormControl 
                            type="password" 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            value={newPassword}
                            className="modern-form-control"
                        />
                    </div>

                    <div className="form-group">
                        <FormLabel>Confirmar nueva contraseña:</FormLabel>
                        <FormControl 
                            type="password" 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            value={confirmPassword}
                            className="modern-form-control"
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="modern-modal-footer">
                    <Button variant="outline-secondary" onClick={() => {setPasswordChangeShow(false); clearValue()}}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleChangePassword}>
                        Cambiar Contraseña
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* 2FA Configuration Modal */}
            <Modal show={tfaShow} onHide={() => {setTfaShow(false); clearValue()}} size="lg" centered>
                <Modal.Header closeButton className="modern-modal-header">
                    <h4>🛡️ Configurar Autenticación de Dos Factores</h4>
                </Modal.Header>
                <Modal.Body className="modern-modal-body">
                    <Form.Check 
                        checked={mfa}
                        type="switch"
                        id="custom-switch"
                        label="Habilitar 2FA" 
                        onChange={handleChangeMFA}
                        className="modern-switch"
                    />

                    {mfaConfiguration ? (
                        <div className="mfa-setup">
                            <p>
                                Por favor, escanea este código QR con tu aplicación de autenticación y proporciona el código generado para completar la configuración de 2FA.
                            </p>
                            
                            <div className="qr-code-container">
                                <QRCodeSVG value={`otpauth://totp/ConscioCMS:${email}?secret=${secretCode}&issuer=ConscioCMS`} />
                            </div>

                            <div className="form-group">
                                <FormLabel>Código de verificación:</FormLabel>
                                <FormControl 
                                    value={code} 
                                    onChange={(e) => setCode(e.target.value)}
                                    className="modern-form-control verification-code"
                                    placeholder="Ingresa el código de 6 dígitos"
                                />
                            </div>

                            {mfaError && (
                                <div className="error-message">
                                    {mfaError}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="mfa-status">
                            {mfa ? (
                                <div className="status-active">
                                    <span className="status-icon">✅</span>
                                    <span className="status-text">MFA está habilitado</span>
                                </div>
                            ) : (
                                <div className="status-inactive">
                                    <span className="status-icon">⚠️</span>
                                    <span className="status-text">MFA está deshabilitado</span>
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="modern-modal-footer">
                    <Button variant="outline-secondary" onClick={() => {setTfaShow(false); clearValue()}}>
                        Cancelar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={async () => {
                            if(mfa) {     
                                try {
                                    await verifySoftwareMFA(code)
                                    setMFA(true)
                                    setTfaShow(false)
                                    setMfaChangedShow(true)
                                    clearValue()
                                } catch(error: any) {
                                    setMfaError(error.message)
                                }
                            } else {
                                setTfaShow(false)
                            }
                        }}
                    >
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Success Modals */}
            <Modal show={mfaChangedShow} onHide={() => setMfaChangedShow(false)} size="sm" centered>
                <Modal.Header closeButton className="modern-modal-header">
                    <h4>✅ 2FA Configurado</h4>
                </Modal.Header>
                <Modal.Body className="modern-modal-body">
                    <p>La autenticación de dos factores se ha configurado exitosamente.</p>
                </Modal.Body>
                <Modal.Footer className="modern-modal-footer">
                    <Button variant="primary" onClick={() => setMfaChangedShow(false)}>
                        Entendido
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={passwordChangedShow} onHide={() => setPasswordChangedShow(false)} size="sm" centered>
                <Modal.Header closeButton className="modern-modal-header">
                    <h4>✅ Contraseña Cambiada</h4>
                </Modal.Header>
                <Modal.Body className="modern-modal-body">
                    <p>Tu contraseña se ha cambiado exitosamente.</p>
                </Modal.Body>
                <Modal.Footer className="modern-modal-footer">
                    <Button variant="primary" onClick={() => setPasswordChangedShow(false)}>
                        Entendido
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Login History Modal */}
            <Modal show={loginHistoryShow} onHide={() => setLoginHistoryShow(false)} size="lg" centered>
                <Modal.Header closeButton className="modern-modal-header">
                    <h4>📊 Historial de Accesos</h4>
                </Modal.Header>
                <Modal.Body className="modern-modal-body">
                    <div className="login-history">
                        <h5>Últimos 25 accesos:</h5>
                        <div className="login-history-list">
                            {lastLogin && lastLogin.slice(-25).map((login: any, index: number) => (
                                <div key={index} className="login-history-item">
                                    <span className="login-icon">🔐</span>
                                    <span className="login-date">{login.toString()?.substring(0,21)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modern-modal-footer">
                    <Button variant="primary" onClick={() => setLoginHistoryShow(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserProfile
