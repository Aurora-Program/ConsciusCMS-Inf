import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setLanguage } from '../store/languageSlice';
import './multiselector.css';

const LanguageSelector: React.FC = () => {
    const dispatch = useDispatch();
    const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'ES', name: 'Español', flag: '🇪🇸' },
        { code: 'EN', name: 'English', flag: '🇺🇸' }
    ];

    const currentLang = languages.find(lang => lang.code === currentLanguage);

    const handleLanguageChange = (language: 'ES' | 'EN') => {
        dispatch(setLanguage(language));
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Close dropdown on escape key
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen]);

    return (
        <div className="modern-language-selector" ref={dropdownRef}>
            <button 
                className="language-selector-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select Language"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span className="current-language">
                    <span className="language-flag">{currentLang?.flag}</span>
                </span>
                <svg 
                    className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="currentColor"
                >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
            </button>
            
            {isOpen && (
                <div className="language-dropdown" role="listbox">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
                            onClick={() => handleLanguageChange(lang.code as 'ES' | 'EN')}
                            role="option"
                            aria-selected={currentLanguage === lang.code}
                        >
                            <span className="language-flag">{lang.flag}</span>
                            <span className="language-name">{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;