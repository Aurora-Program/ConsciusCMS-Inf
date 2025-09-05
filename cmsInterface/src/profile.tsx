
import { useAppDispatch, useAppSelector } from "./hooks"
import { useState, useEffect } from "react"
import { Modal } from "react-bootstrap"
import {  editSettingAction, editSettingSecAction } from "./Settings/settingsSlice"
import { uploadImage } from "./Editor/editorService"
import "./profile.css"
import AuroraPage from "./components/AuroraPage"
import { useT } from './util/useTranslation'

function Profile (){

    const dispatch = useAppDispatch()
    
    
    
    const websiteName =  useAppSelector ((state) => state.settings.websiteName)
    const logo =  useAppSelector ((state) => state.settings.logo)
    const loginImage =  useAppSelector ((state) => state.settings.loginPicture)
    const contactName =  useAppSelector ((state) => state.settings.contactName)
    const contactphonNumber =  useAppSelector ((state) => state.settings.PhoneNumber)
    const contactEmailAddress =  useAppSelector ((state) => state.settings.EmailAddress)
    const licenseModel =  useAppSelector ((state) => state.settings.licenseModel)
    const LicenseExpiration =  useAppSelector ((state) => state.settings.licenseExpiration)


    const [showContact, setShowContact] = useState(false)
    const [showPhone, setShowPhone] = useState(false)
    const [showEmail, setShowEmail] = useState(false)


    const [templogo, setTempLogo] = useState<string>("")
    const [tempWebsiteName, setTempWebsiteName] = useState<string>("")
    const [temploginImage, setTempLoginImage] = useState<string>("")

    const [showLogo, setShowLogo] = useState(false)
    const [showWSName, setShowWSName] = useState(false)
    const [showLoginImage, setShowLoginImage] = useState(false)
    const [showLicenses, setShowLicenses] = useState(false)
    const [logimg, setLogoimg] = useState<File | null>(null)
    const [picimg, setPicimg] = useState<File | null>(null)
  


    const [tempContactName, setTempContactName] = useState("")
    const [tempContactPhone, setTempContactPhone] = useState("")
    const [tempContactEmail, setTempContactEmail] = useState("")
    
    useEffect(()=> {setTempWebsiteName(websiteName || "")}, [websiteName])
    useEffect(()=> {setTempLogo(logo || "")}, [logo])
    useEffect(()=> {setTempLoginImage(loginImage || "")}, [loginImage])
    useEffect(()=> {setTempContactName(contactName || "")}, [contactName])
    useEffect(()=> {setTempContactPhone(contactphonNumber || "")}, [contactphonNumber])
    useEffect(()=> {setTempContactEmail(contactEmailAddress || "")}, [contactEmailAddress])

  
    const t = useT()

    return (
        <AuroraPage variant="default">
            {/* Profile Header */}
            <div className="profile-header">
                <h1>🌅 {websiteName || t('profile.defaultWebsite')}</h1>
                <p>{t('profile.subtitle')}</p>
            </div>

            {/* Profile Content Grid */}
            <div className="profile-grid">
                {/* Website Customization Card */}
                <div className="profile-card">
                    <div className="profile-card-header">
                        <svg className="profile-card-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <h3>{t('profile.customizationTitle')}</h3>
                    </div>
                    <div className="profile-card-body">
                        <div className="profile-field">
                            <label className="profile-field-label">{t('profile.websiteNameLabel')}</label>
                            <input 
                                type="text" 
                                className="profile-field-value" 
                                value={websiteName} 
                                readOnly 
                                disabled
                            />
                            <button className="profile-edit-btn" onClick={() => setShowWSName(true)}>
                                {t('profile.edit')}
                            </button>
                        </div>

                        <div className="profile-field">
                            <label className="profile-field-label">{t('profile.logoLabel')}</label>
                            <input 
                                type="text" 
                                className="profile-field-value" 
                                value={logo} 
                                readOnly 
                                disabled
                            />
                            <button className="profile-edit-btn" onClick={() => setShowLogo(true)}>
                                {t('profile.edit')}
                            </button>
                        </div>

                        <div className="profile-field">
                            <label className="profile-field-label">{t('profile.loginImageLabel')}</label>
                            <input 
                                type="text" 
                                className="profile-field-value" 
                                value={loginImage} 
                                readOnly 
                                disabled
                            />
                            <button className="profile-edit-btn" onClick={() => setShowLoginImage(true)}>
                                {t('profile.edit')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contact Information Card */}
                <div className="profile-card">
                    <div className="profile-card-header">
                        <svg className="profile-card-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        <h3>{t('profile.contactTitle')}</h3>
                    </div>
                    <div className="profile-card-body">
                        <div className="profile-field">
                            <label className="profile-field-label">{t('profile.contactNameLabel')}</label>
                            <input 
                                type="text" 
                                className="profile-field-value" 
                                value={contactName} 
                                readOnly 
                                disabled
                            />
                            <button className="profile-edit-btn" onClick={() => setShowContact(true)}>
                                {t('profile.edit')}
                            </button>
                        </div>

                        <div className="profile-field">
                            <label className="profile-field-label">{t('profile.phoneLabel')}</label>
                            <input 
                                type="text" 
                                className="profile-field-value" 
                                value={contactphonNumber} 
                                readOnly 
                                disabled
                            />
                            <button className="profile-edit-btn" onClick={() => setShowPhone(true)}>
                                {t('profile.edit')}
                            </button>
                        </div>

                        <div className="profile-field">
                            <label className="profile-field-label">{t('profile.emailLabel')}</label>
                            <input 
                                type="text" 
                                className="profile-field-value" 
                                value={contactEmailAddress} 
                                readOnly 
                                disabled
                            />
                            <button className="profile-edit-btn" onClick={() => setShowEmail(true)}>
                                {t('profile.edit')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* License Information Card */}
                <div className="profile-card license-card">
                    <div className="profile-card-header">
                        <svg className="profile-card-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <h3>{t('profile.licenseInfoTitle')}</h3>
                    </div>
                    <div className="profile-card-body">
                        <div className="profile-field">
                            <label className="profile-field-label">{t('profile.licenseModelLabel')}</label>
                            <input 
                                type="text" 
                                className="profile-field-value" 
                                value={licenseModel} 
                                readOnly 
                                disabled
                            />
                        </div>

                        <div className="profile-field">
                            <label className="profile-field-label">{t('profile.expirationLabel')}</label>
                            <input 
                                type="text" 
                                className="profile-field-value" 
                                value={LicenseExpiration} 
                                readOnly 
                                disabled
                            />
                        </div>

                        <div className="license-info">
                            <h5>{t('profile.additionalInfoTitle')}</h5>
                            <p>{t('profile.additionalInfoBody')}</p>
                            <div className="license-action">
                                <a 
                                    href="#" 
                                    className="license-link" 
                                    onClick={(e) => {e.preventDefault(); setShowLicenses(true)}}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                                    </svg>
                                    {t('profile.viewTerms')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Website Name Modal */}
            <Modal show={showWSName} onHide={() => setShowWSName(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('profile.siteModalTitle')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label className="modal-label">
                            {t('profile.siteModalLabel')}
                        </label>
                        <input 
                            type="text" 
                            className="modal-input"
                            placeholder={t('profile.siteModalPlaceholder')}
                            onChange={(e) => setTempWebsiteName(e.target.value)} 
                            value={tempWebsiteName}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn-modern btn-secondary-modern" 
                        onClick={() => setShowWSName(false)}
                    >
                        {t('profile.cancel')}
                    </button>
                    <button 
                        className="btn-modern btn-primary-modern" 
                        onClick={() => {
                            dispatch(editSettingAction({Area:"Profile", Setting:"WebsiteName", Value: tempWebsiteName})); 
                            setShowWSName(false)
                        }}
                    > 
                        {t('profile.saveChanges')}
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Logo Modal */}
            <Modal show={showLogo} onHide={() => setShowLogo(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('profile.logoModalTitle')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label className="modal-label">
                            {t('profile.logoModalLabel')}
                        </label>
                        <input 
                            type="file" 
                            className="modal-input"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setTempLogo(e.target.files[0].name); 
                                    setLogoimg(e.target.files[0]);
                                }
                            }} 
                            accept=".png,.svg"
                        />
                        {templogo && (
                            <p style={{marginTop: '10px', fontSize: '14px', color: '#666'}}>
                                Archivo: {templogo}
                            </p>
                        )}
                        {logimg && (
                            <div className="image-preview">
                                <img src={URL.createObjectURL(logimg)} alt="Vista previa del logo" />
                            </div>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn-modern btn-secondary-modern" 
                        onClick={() => setShowLogo(false)}
                    >
                        {t('profile.cancel')}
                    </button>
                    <button 
                        className="btn-modern btn-primary-modern" 
                        onClick={() => {
                            if (logimg && templogo) {
                                uploadImage(logimg, templogo); 
                                dispatch(editSettingAction({Area:"Profile", Setting:"Logo", Value: templogo})); 
                                setShowLogo(false);
                            }
                        }}
                    >
                        {t('profile.saveLogo')}
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Login Image Modal */}
            <Modal show={showLoginImage} onHide={() => setShowLoginImage(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('profile.loginImageModalTitle')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label className="modal-label">
                            {t('profile.loginImageModalLabel')}
                        </label>
                        <input 
                            type="file" 
                            className="modal-input"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setTempLoginImage(e.target.files[0].name); 
                                    setPicimg(e.target.files[0]);
                                }
                            }} 
                            accept=".jpg,.jpeg,.webp"
                        />
                        {temploginImage && (
                            <p style={{marginTop: '10px', fontSize: '14px', color: '#666'}}>
                                Archivo: {temploginImage}
                            </p>
                        )}
                        {picimg && (
                            <div className="image-preview">
                                <img src={URL.createObjectURL(picimg)} alt="Vista previa de la imagen de login" />
                            </div>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn-modern btn-secondary-modern" 
                        onClick={() => setShowLoginImage(false)}
                    >
                        {t('profile.cancel')}
                    </button>
                    <button 
                        className="btn-modern btn-primary-modern" 
                        onClick={() => {
                            if (picimg && temploginImage) {
                                uploadImage(picimg, temploginImage); 
                                dispatch(editSettingAction({Area:"Profile", Setting:"LoginPicture", Value: temploginImage})); 
                                setShowLoginImage(false);
                            }
                        }}
                    > 
                        {t('profile.saveImage')}
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Contact Name Modal */}
            <Modal show={showContact} onHide={() => setShowContact(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('profile.contactModalTitle')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label className="modal-label">
                            {t('profile.contactModalLabel')}
                        </label>
                        <input 
                            type="text" 
                            className="modal-input"
                            placeholder={t('profile.contactModalPlaceholder')}
                            value={tempContactName}  
                            onChange={(e) => setTempContactName(e.target.value)} 
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn-modern btn-secondary-modern" 
                        onClick={() => setShowContact(false)}
                    >
                        {t('profile.cancel')}
                    </button>
                    <button 
                        className="btn-modern btn-primary-modern" 
                        onClick={() => {
                            dispatch(editSettingSecAction({Area:"Profile", Setting:"ContactName", Value: tempContactName})); 
                            setShowContact(false)
                        }}
                    > 
                        {t('profile.saveChanges')}
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Phone Modal */}
            <Modal show={showPhone} onHide={() => setShowPhone(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('profile.phoneModalTitle')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label className="modal-label">
                            {t('profile.phoneModalLabel')}
                        </label>
                        <input 
                            type="tel" 
                            className="modal-input"
                            placeholder={t('profile.phoneModalPlaceholder')}
                            value={tempContactPhone} 
                            onChange={(e) => setTempContactPhone(e.target.value)} 
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn-modern btn-secondary-modern" 
                        onClick={() => setShowPhone(false)}
                    >
                        {t('profile.cancel')}
                    </button>
                    <button 
                        className="btn-modern btn-primary-modern"   
                        onClick={() => {
                            dispatch(editSettingSecAction({Area:"Profile", Setting:"ContactPhone", Value: tempContactPhone})); 
                            setShowPhone(false)
                        }}
                    >
                        {t('profile.saveChanges')}
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Email Modal */}
            <Modal show={showEmail} onHide={() => setShowEmail(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('profile.emailModalTitle')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label className="modal-label">
                            {t('profile.emailModalLabel')}
                        </label>
                        <input 
                            type="email" 
                            className="modal-input"
                            placeholder={t('profile.emailModalPlaceholder')}
                            value={tempContactEmail} 
                            onChange={(e) => setTempContactEmail(e.target.value)} 
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn-modern btn-secondary-modern" 
                        onClick={() => setShowEmail(false)}
                    >
                        {t('profile.cancel')}
                    </button>
                    <button 
                        className="btn-modern btn-primary-modern"   
                        onClick={() => {
                            dispatch(editSettingSecAction({Area:"Profile", Setting:"ContactEmail", Value: tempContactEmail})); 
                            setShowEmail(false)
                        }}
                    >
                        {t('profile.saveChanges')}
                    </button>
                </Modal.Footer>
            </Modal>

            {/* License Terms Modal */}
            <Modal show={showLicenses} onHide={() => setShowLicenses(false)} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('profile.licenseModalTitle')}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight: '70vh', overflowY: 'auto'}}>
                    <div style={{padding: '20px'}}>
                        <h5 style={{color: 'var(--color-primary)', marginBottom: '20px'}}>{t('profile.termsHeading')}</h5>

                        <p style={{marginBottom: '15px'}}>
                            {t('profile.termsIntro')}
                        </p>
                        
                        <h6 style={{color: 'var(--color-primary)', marginTop: '20px', marginBottom: '10px'}}>{t('profile.termsSection1Heading')}</h6>
                        <p style={{marginBottom: '15px'}}>
                            {t('profile.termsSection1')}
                        </p>

                        <p style={{marginBottom: '15px'}}>
                            {t('profile.termsSection2')}
                        </p>

                        <h6 style={{color: 'var(--color-primary)', marginTop: '20px', marginBottom: '10px'}}>{t('profile.termsSection3Heading')}</h6>
                        <p style={{marginBottom: '15px'}}>
                            {t('profile.termsSection3')}
                        </p>

                        <p style={{marginBottom: '15px'}}>
                            {t('profile.termsIntroRestrictions')}
                        </p>

                        <ul style={{marginBottom: '20px', paddingLeft: '20px'}}>
                            <li style={{marginBottom: '8px'}}>{t('profile.termsList1')}</li>
                            <li style={{marginBottom: '8px'}}>{t('profile.termsList2')}</li>
                            <li style={{marginBottom: '8px'}}>{t('profile.termsList3')}</li>
                            <li style={{marginBottom: '8px'}}>{t('profile.termsList4')}</li>
                            <li style={{marginBottom: '8px'}}>{t('profile.termsList5')}</li>
                        </ul>

                        <div style={{backgroundColor: 'var(--color-gray-50)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid var(--color-warning)'}}>
                            <p style={{margin: 0, fontSize: '14px', color: 'var(--text-secondary)'}}>
                                <strong>{t('profile.noteStrong')}</strong> {t('profile.noteBody')}
                            </p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn-modern btn-primary-modern" 
                        onClick={() => setShowLicenses(false)}
                    >
                        {t('profile.understood')}
                    </button>
                </Modal.Footer>
            </Modal>
        </AuroraPage>
    )
}

export default Profile