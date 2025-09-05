import { useAppSelector } from "./hooks"
import { useAppDispatch } from "./hooks"
import { useT } from './util/useTranslation'
import { getLoginsAction } from "./users/userSlice"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import "./dashboard.css"
import AuroraPage from "./components/AuroraPage"
import PlatformsExample from "./components/PlatformsExample"

// Modern SVG Icons
const AnnouncementIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" fill="currentColor"/>
    <path d="M18.7491 9V9.7041C18.7491 10.5491 18.9903 11.3752 19.4422 12.0782L20.5496 13.8012C21.5612 15.3749 20.789 17.5139 19.0296 18.0116C14.4273 19.3134 9.57274 19.3134 4.97036 18.0116C3.21105 17.5139 2.43882 15.3749 3.45036 13.8012L4.5578 12.0782C5.00972 11.3752 5.25087 10.5491 5.25087 9.7041V9C5.25087 5.13401 8.13401 2 12 2C15.866 2 18.7491 5.13401 18.7491 9Z" fill="currentColor"/>
  </svg>
);

const NewsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 8H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 16H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FeaturesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StatsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 9L13 14L9 10L3 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TemplateIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Dashboard() {
  const dispatch = useAppDispatch()
  useEffect(() => { dispatch(getLoginsAction()) }, [])

  const licenseModel = useAppSelector((state) => state.settings.licenseModel)
  const licenseExp = useAppSelector((state) => state.settings.licenseExpiration)
  const lastLogin = useAppSelector((state) => state.user.lastLogin)
  const userName = useAppSelector((state) => state.user.name)
  const role = useAppSelector((state) => state.user.role)
  const t = useT()

  return (
    <AuroraPage variant="default">
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <h1 className="welcome-title">{t('dashboard.welcomeTitle').replace('{name}', userName || 'User')}</h1>
        <p className="welcome-subtitle">
          {t('dashboard.welcomeSubtitle')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <StatsIcon />
            </div>
          </div>
          <h3 className="stat-value">Active</h3>
          <p className="stat-label">{t('dashboard.systemStatus')}</p>
          <div className="stat-change positive">
            <span>✓ {t('dashboard.allSystemsOperational')}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <AnnouncementIcon />
            </div>
          </div>
          <h3 className="stat-value">{licenseModel || "Premium"}</h3>
          <p className="stat-label">{t('dashboard.licensePlan')}</p>
          <div className="stat-change">
            <span>{t('dashboard.expires').replace('{date}', licenseExp || 'Never')}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <EditIcon />
            </div>
          </div>
          <h3 className="stat-value">{role || "User"}</h3>
          <p className="stat-label">{t('dashboard.yourRole')}</p>
          <div className="stat-change">
            <span>{t('dashboard.lastLogin').replace('{date}', lastLogin || 'Today')}</span>
          </div>
        </div>
      </div>

      {/* Content Cards */}
      <div className="content-cards">
        <div className="dashboard-card">
          <div className="card-header-modern">
            <h2 className="card-title-modern">
              <AnnouncementIcon />
              {t('dashboard.latestAnnouncements')}
            </h2>
          </div>
          <div className="card-body-modern">
            <div className="card-content">
              <h3>{t('dashboard.editorGettingStartedTitle')}</h3>
              <p>
                {t('dashboard.editorGettingStartedBody')}
              </p>
              <Link to="/site/editor" className="action-button" style={{ marginTop: "1rem" }}>
                <EditIcon />
                <span>{t('dashboard.openEditor')}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2 className="quick-actions-title">
            <FeaturesIcon />
            {t('dashboard.quickActions')}
          </h2>
          <div className="quick-actions-grid">
            <Link to="/site/editor" className="quick-action-item">
              <EditIcon className="quick-action-icon" />
              <span className="quick-action-text">{t('dashboard.editContent')}</span>
            </Link>
            {role === "Admin" && (
              <Link to="/site/schema" className="quick-action-item">
                <TemplateIcon className="quick-action-icon" />
                <span className="quick-action-text">{t('dashboard.manageTemplates')}</span>
              </Link>
            )}
            <Link to="/site/reports" className="quick-action-item">
              <StatsIcon className="quick-action-icon" />
              <span className="quick-action-text">{t('dashboard.viewReports')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="modern-grid">
        <div className="dashboard-card">
          <div className="card-header-modern">
            <h2 className="card-title-modern">
              <NewsIcon />
              {t('dashboard.whatsNew')}
            </h2>
          </div>
          <div className="card-body-modern">
            <div className="card-content">
              <h3>{t('dashboard.enhanced2FA')}</h3>
              <p>
                {t('dashboard.enhanced2FABody')}
              </p>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header-modern">
            <h2 className="card-title-modern">
              <FeaturesIcon />
              {t('dashboard.upgradeYourWebsite')}
            </h2>
          </div>
          <div className="card-body-modern">
            <div className="card-content">
              <h3>{t('dashboard.expandYourPossibilities')}</h3>
              <p>
                {t('dashboard.learnMore')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuroraPage>
  )
}

export default Dashboard