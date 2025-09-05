import React from 'react';
import '../styles/standardLayout.css';

interface AuroraPageProps {
  children: React.ReactNode;
  variant?: 'default' | 'narrow' | 'wide';
  className?: string;
  padding?: boolean;
}

const AuroraPage: React.FC<AuroraPageProps> = ({ 
  children, 
  variant = 'default', 
  className = '', 
  padding = true 
}) => {
  const getContainerClass = () => {
    let baseClass = 'aurora-container';
    
    switch (variant) {
      case 'narrow':
        baseClass += ' aurora-container--narrow';
        break;
      case 'wide':
        baseClass += ' aurora-container--wide';
        break;
      default:
        break;
    }
    
    return baseClass;
  };

  return (
    <div className={`aurora-page ${className}`}>
      <div className={getContainerClass()}>
        <div className={`${padding ? 'aurora-content--padded' : 'aurora-content'} aurora-page-content`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuroraPage;
