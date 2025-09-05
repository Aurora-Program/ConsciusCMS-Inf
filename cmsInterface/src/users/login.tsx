// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp, confirmSignUp, forgotPassword, firstLogin, provideSoftwareTokenLogin, resendConfirmationCode } from './authService.js';
import { useAppDispatch, useAppSelector } from '../hooks.js';
import { acceptEulaAction, authenticate } from './userSlice.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Modal } from 'react-bootstrap';
import './login.css';
import { getSettingAction } from '../Settings/settingsSlice.js';
import LanguageSelector from '../util/multiselector';
import { useT } from '../util/useTranslation';

function parseJwt(token: string) {
  const base64Url = token.split('.')[1] || '';
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  try {
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return {} as any;
  }
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_CONTENT_BUCKET_URL as string;
  const allowSignup = (import.meta.env.VITE_ALLOW_SIGNUP === '1' || import.meta.env.VITE_ALLOW_SIGNUP === 'true');

  const websiteName = useAppSelector((state) => state.settings.websiteName);
  const logo = useAppSelector((state) => state.settings.logo);
  const loginImage = useAppSelector((state) => state.settings.loginPicture);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password1, setPassword1] = useState('');

  const [isSignUp, setIsSignUp] = useState(false);
  const [signupName, setSignupName] = useState('');
  const [signupCode, setSignupCode] = useState('');
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);
  const [showSignupInfoModal, setShowSignupInfoModal] = useState(false);

  const [resetPasswordShow, setResetPasswordShow] = useState(false);
  const [tempForgotPassword, setTempForgotPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'firstlogin' | 'SMS' | 'resetPassword'>('login');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [session, setSession] = useState('');
  const [licenseShow, setLicenseShow] = useState(false);

  const t = useT();

  // Extract a friendly message from common auth error strings.
  // If the string contains two colons (e.g. "Sign in failed: Error: UserNotFoundException: User does not exist."),
  // return the text after the second colon. Otherwise try to strip a leading "Error:" and fall back to raw text.
  const formatAuthDetail = (raw: string) => {
    if (!raw) return '';
    // Normalize and trim
    const s = String(raw).trim();

    // Prefer the text after the last colon so we get the final human-friendly message
    // Example: "Error:\nNotAuthorizedException: Incorrect username or password." -> "Incorrect username or password."
    const lastColon = s.lastIndexOf(':');
    if (lastColon >= 0 && lastColon < s.length - 1) {
      return s.substring(lastColon + 1).trim();
    }

    // If no colon present, try to strip a leading 'Error:' marker
    const errIdx = s.indexOf('Error:');
    if (errIdx >= 0) {
      return s.substring(errIdx + 'Error:'.length).trim();
    }

    // Fallback: return the original trimmed string
    return s;
  };

  const ErrorBox = ({ msg, wrapperClass = '' }: { msg?: string; wrapperClass?: string }) => {
    if (!msg) return null;
    return (
      <div className={wrapperClass}>
        <div className="alert alert-danger" role="alert">
          <span style={{ fontWeight: 700 }}>{t('login.errorPrefix')}</span>
          <span className="loginErrorP" style={{ marginLeft: 8 }}>{formatAuthDetail(msg)}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!allowSignup && isSignUp) setIsSignUp(false);
  }, [allowSignup, isSignUp]);

  function clearValues() {
    setPassword('');
    setConfirmPassword('');
    setPassword1('');
  }

  const handleForgotPassword = async () => {
    setPassword('');
    try {
      await forgotPassword(tempForgotPassword);
      setErrorMessage('');
      setMode('resetPassword');
      setResetPasswordShow(false);
      clearValues();
    } catch (error: any) {
      setErrorMessage(String(error?.message || error));
    }
  };

  const handleFirstLogin = async (e: any) => {
    e.preventDefault();
    if (password1 !== confirmPassword) {
      setErrorMessage('*Password confirmation does not match');
      return;
    }
    try {
      await firstLogin(email, password1, session);
  dispatch((acceptEulaAction as any)(email));
  setErrorMessage('');
      clearValues();
    } catch (error: any) {
      setErrorMessage(error?.message || String(error));
    }
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('*Password does not match');
      return;
    }
    try {
      await signUp(email, password, signupName || email);
      setErrorMessage('');
      setShowSignupConfirm(true);
    } catch (error: any) {
      setErrorMessage(error?.message || String(error));
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      await confirmSignUp(email, signupCode);
      setErrorMessage('');
      setShowSignupConfirm(false);
      setIsSignUp(false);
      setSignupName('');
      setSignupCode('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setErrorMessage(error?.message || String(error));
    }
  };

  const handleSoftwareToken = async (e: any) => {
    e.preventDefault();
    try {
      const res = await provideSoftwareTokenLogin(email, code, session);
      setErrorMessage('');
      if (res.AuthenticationResult && typeof res.AuthenticationResult.AccessToken !== 'undefined') {
        sessionStorage.setItem('accessToken', res.AuthenticationResult.AccessToken);
        if (sessionStorage.getItem('accessToken')) {
          const IdToken = parseJwt(sessionStorage['idToken']?.toString?.() || '');
          dispatch(authenticate({ "email": IdToken.email, "name": IdToken.name, "role": IdToken['cognito:groups'] }));
          navigate('/site/home');
          clearValues();
        }
      }
    } catch (error: any) {
      setErrorMessage(error?.message || String(error));
    }
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await signIn(email, password);
      setErrorMessage('');
      if (res.AuthenticationResult && typeof res.AuthenticationResult.AccessToken !== 'undefined') {
        sessionStorage.setItem('accessToken', res.AuthenticationResult.AccessToken);
        if (sessionStorage.getItem('accessToken')) {
          const IdToken = parseJwt(sessionStorage['idToken']?.toString?.() || '');
          dispatch(authenticate({ "email": IdToken.email, "name": IdToken.name, "role": IdToken['cognito:groups'] }));
          await dispatch(getSettingAction('Profile'));
          navigate('/site/home');
        }
      } else {
        switch (res.ChallengeName) {
          case 'NEW_PASSWORD_REQUIRED':
            setMode('firstlogin');
            setSession(res.Session ?? '');
            break;
          case 'SOFTWARE_TOKEN_MFA':
            setMode('SMS');
            setSession(res.Session ?? '');
            break;
        }
      }
    } catch (error: any) {
      setErrorMessage(`Sign in failed: ${error}`);
    }
  };

  if (mode === 'login') {
    return (
      <>
        <div className='loginContainer'>
          <div className='colIzquierda'>
            <img src={url + '/' + loginImage} className='loginImage' />
          </div>
          <div className='colDerecha'>
            <div className='loginBox'>
              <div className='loginHead'>
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  <div className='loginLogoDiv'><img className='loginLogoImage' src={url + '/' + logo} /></div>
                  <div className='loginTitleDiv'><h3>{websiteName}</h3></div>
                  <div className='loginLangSelectorWrapper'><LanguageSelector /></div>
                </div>
              </div>

              <div className='loginTextP'>
                <p>
                  <span><i className="bi bi-person-circle me-2"></i>{t('login.welcome')}</span><br />
                  <span className='login-subtitle'>{t('login.subtitle')}</span>
                </p>
              </div>

              <div style={{ marginTop: '8px', textAlign: 'center' }}>
                {allowSignup ? (
                  <button type='button' className='btn btn-link' onClick={() => { if (isSignUp) { setIsSignUp(false); setErrorMessage(''); } else { setShowSignupInfoModal(true); } }}>
                    {isSignUp ? t('login.haveAccount') : t('login.noAccount')}
                  </button>
                ) : null}
              </div>

              <Form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
                <div className='loginControls'>
                  <div className='modern-input-group'>
                    <i className='bi bi-envelope input-icon'></i>
                    <Form.Control className='loginInputText modern-input' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('login.emailPlaceholder')} required />
                  </div>

                  {isSignUp && (
                    <div className='modern-input-group'>
                      <i className='bi bi-person input-icon'></i>
                      <Form.Control className='loginInputText modern-input' id='name' type='text' value={signupName} onChange={(e) => setSignupName(e.target.value)} placeholder={t('login.namePlaceholder')} required />
                    </div>
                  )}

                  <div className='modern-input-group'>
                    <i className='bi bi-lock input-icon'></i>
                    <Form.Control className='loginInputText modern-input' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('login.passwordPlaceholder')} required />
                  </div>

                  {isSignUp && (
                    <div className='modern-input-group'>
                      <i className='bi bi-shield-lock input-icon'></i>
                      <Form.Control className='loginInputText modern-input' id='confirmPassword' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t('login.confirmPasswordPlaceholder')} required />
                    </div>
                  )}

                  <Button className='loginInputBotton modern-login-btn' variant='primary' type='submit'>
                    {isSignUp ? t('login.createAccount') : t('login.signIn')}
                  </Button>
                </div>
              </Form>

              <ErrorBox msg={errorMessage} wrapperClass='loginErrorDiv' />

              <div style={{ marginTop: 12, textAlign: 'center' }}>
                <div className='loginForgotDiv' onClick={() => { setErrorMessage(''); setResetPasswordShow(true); }}>
                  <p className='loginForgotP'><i className='bi bi-question-circle me-1'></i>{t('login.forgotPassword')}</p>
                </div>
                {allowSignup ? (
                  <div style={{ marginTop: 8 }}>
                    <button type='button' className='btn btn-link' onClick={() => { setIsSignUp(!isSignUp); setErrorMessage(''); }}>
                      {isSignUp ? '¿Ya tienes cuenta? Iniciar sesión' : '¿No tienes cuenta? Crear cuenta'}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <Modal show={resetPasswordShow} onHide={() => setResetPasswordShow(false)} centered>
          <Modal.Header closeButton><Modal.Title>{t('login.resetPasswordTitle')}</Modal.Title></Modal.Header>
          <Modal.Body>
            <p>{t('login.resetPasswordBody')}</p>
            <Form.Label>Dirección de e-mail:</Form.Label>
            <div className='input-group'>
              <span className='input-group-text'><i className='bi bi-envelope'></i></span>
              <Form.Control type='email' placeholder='ejemplo@correo.com' onChange={(e) => setTempForgotPassword(e.target.value)} value={tempForgotPassword} />
            </div>
            {errorMessage && <ErrorBox msg={errorMessage} wrapperClass='mt-3' />}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-secondary' onClick={() => setResetPasswordShow(false)}>Cancelar</Button>
            <Button variant='primary' onClick={handleForgotPassword}>{t('login.resetPasswordButton')}</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showSignupInfoModal} onHide={() => setShowSignupInfoModal(false)} centered>
          <Modal.Header closeButton><Modal.Title>{t('login.createAccountInfoTitle')}</Modal.Title></Modal.Header>
          <Modal.Body>{t('login.createAccountInfoBody')}</Modal.Body>
          <Modal.Footer>
            <Button variant='outline-secondary' onClick={() => setShowSignupInfoModal(false)}>Cancelar</Button>
            <Button variant='primary' onClick={() => { setIsSignUp(true); setShowSignupInfoModal(false); }}>Continuar</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showSignupConfirm} onHide={() => setShowSignupConfirm(false)} centered>
          <Modal.Header closeButton><Modal.Title>{t('login.confirmRegistrationTitle')}</Modal.Title></Modal.Header>
          <Modal.Body>
            <p>{t('login.confirmRegistrationBody').replace('{email}', email)}</p>
            <Form.Group>
              <Form.Control type='text' value={signupCode} onChange={(e) => setSignupCode(e.target.value)} placeholder='Código de confirmación' />
            </Form.Group>
            {errorMessage && <ErrorBox msg={errorMessage} wrapperClass='mt-2' />}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowSignupConfirm(false)}>Cancelar</Button>
            <Button variant='outline-primary' onClick={async () => { try { await resendConfirmationCode(email); setErrorMessage('Se reenvió el código. Revisa tu correo.'); } catch (err: any) { setErrorMessage(err?.message || String(err)); } }}>{t('login.resendCode')}</Button>
            <Button variant='primary' onClick={handleConfirmSignUp}>{t('login.confirm')}</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={licenseShow} onHide={() => setLicenseShow(false)} size='xl' centered>
          <Modal.Header closeButton><Modal.Title>{t('login.eulaTitle')}</Modal.Title></Modal.Header>
          <Modal.Body>
            <p>Texto de los términos y condiciones...</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={() => setLicenseShow(false)}>{t('login.eulaClose')}</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  // other modes: first login, SMS, resetPassword - render a simplified form
  return (
    <>
      <div className='loginContainer'>
        <div className='colDerecha'>
          <div className='loginBox'>
            <div className='loginHead'><h3>{websiteName}</h3></div>
            <div className='loginForm'>
              <Form onSubmit={mode === 'SMS' ? handleSoftwareToken : mode === 'resetPassword' ? handleFirstLogin : handleFirstLogin}>
                {mode === 'SMS' && (
                  <div className='input-group mb-3'>
                    <span className='input-group-text'><i className='bi bi-phone-fill'></i></span>
                    <Form.Control type='text' value={code} onChange={(e) => setCode(e.target.value)} placeholder='Código SMS' required />
                  </div>
                )}

                {mode !== 'SMS' && (
                  <>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'><i className='bi bi-lock-fill'></i></span>
                      <Form.Control type='password' value={password1} onChange={(e) => setPassword1(e.target.value)} placeholder='Nueva contraseña' required />
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'><i className='bi bi-shield-lock-fill'></i></span>
                      <Form.Control type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirmar contraseña' required />
                    </div>
                  </>
                )}

                <Button variant='primary' type='submit'>Confirmar</Button>
              </Form>

              {errorMessage && <ErrorBox msg={errorMessage} wrapperClass='mt-3' />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
