import React from 'react';
import './AuroraLogo.css';
import auroraLogoPng from '../../assets/Aurora-logo.PNG?url';

interface AuroraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const AuroraLogo: React.FC<AuroraLogoProps> = ({ 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'logo-sm',
    md: 'logo-md', 
    lg: 'logo-lg',
    xl: 'logo-xl'
  };

  return (
    <div className={`aurora-logo ${sizeClasses[size]} ${className}`}>
      <div className="logo-container">
        {/* Aurora Logo Image */}
        <img 
          src={auroraLogoPng} 
          alt="Aurora Logo" 
          className="aurora-logo-image"
        />
        {/* ConsciusCMS Text */}
        <div className="conscium-text">
          ConsciusCMS
        </div>
      </div>
    </div>
  );
};

export default AuroraLogo;
