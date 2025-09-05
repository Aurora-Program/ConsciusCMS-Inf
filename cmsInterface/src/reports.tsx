import "./reports.css"
import AuroraPage from "./components/AuroraPage"
import { useT } from './util/useTranslation'

function Reports (){
    const t = useT()
    return (
        <AuroraPage variant="default">
            {/* Reports Header */}
            <div className="reports-header">
                <h1>📊 {t('reports.headerTitle')}</h1>
                <p>{t('reports.headerSubtitle')}</p>
            </div>

            {/* Reports Grid */}
            <div className="reports-grid">
                {/* Most Visited Pages Card */}
                <div className="report-card">
                    <div className="report-card-header">
                        <svg className="report-card-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
                        </svg>
                        <h3>{t('reports.mostVisited')}</h3>
                    </div>
                    <div className="report-card-body">
                        <div className="restriction-notice">
                            <div className="restriction-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"/>
                                </svg>
                            </div>
                            <div className="restriction-text">
                                {t('reports.restrictionText')}
                            </div>
                            <div className="restriction-subtitle">
                                {t('reports.restrictionSubtitle')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visit Location Card */}
                <div className="report-card">
                    <div className="report-card-header">
                        <svg className="report-card-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                        </svg>
                        <h3>{t('reports.visitLocation')}</h3>
                    </div>
                    <div className="report-card-body">
                        <div className="restriction-notice">
                            <div className="restriction-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"/>
                                </svg>
                            </div>
                            <div className="restriction-text">
                                {t('reports.restrictionText')}
                            </div>
                            <div className="restriction-subtitle">
                                {t('reports.visitLocationSubtitle')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Traffic Overview Card */}
                <div className="report-card">
                    <div className="report-card-header">
                        <svg className="report-card-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3,3V21H21V19H5V3H3M16,11H18V18H16V11M10,7H12V18H10V7M4,14H6V18H4V14M19,16H21V18H19V16M19,10H21V14H19V10M19,4H21V8H19V4M13,1H15V4H13V1Z"/>
                        </svg>
                        <h3>{t('reports.trafficOverview')}</h3>
                    </div>
                    <div className="report-card-body">
                        <div className="chart-placeholder">
                            <svg className="chart-placeholder-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M5,9.5L7.5,14H2.5L5,9.5M3,4H7L13,16L15.5,12H22V14H17L14.5,18H9.5L3,6V4Z"/>
                            </svg>
                            <div className="chart-placeholder-text">
                                {t('reports.trafficChart')}
                                <br/>
                                <small>{t('reports.availableSoon')}</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Device Types Card */}
                <div className="report-card">
                    <div className="report-card-header">
                        <svg className="report-card-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/>
                        </svg>
                        <h3>{t('reports.deviceTypes')}</h3>
                    </div>
                    <div className="report-card-body">
                        <div className="chart-placeholder">
                            <svg className="chart-placeholder-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z"/>
                            </svg>
                            <div className="chart-placeholder-text">
                                {t('reports.deviceDistribution')}
                                <br/>
                                <small>{t('reports.availableSoon')}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upgrade Card */}
            <div className="upgrade-card">
                <h2>🚀 {t('reports.upgradeTitle')}</h2>
                <p>
                    {t('reports.upgradeBody')}
                </p>
                
                <ul className="features-list">
                    <li className="feature-item">
                        <h4>📈 {t('reports.featureRealtimeTitle')}</h4>
                        <p>{t('reports.featureRealtimeBody')}</p>
                    </li>
                    <li className="feature-item">
                        <h4>🗺️ {t('reports.featureHeatmapsTitle')}</h4>
                        <p>{t('reports.featureHeatmapsBody')}</p>
                    </li>
                    <li className="feature-item">
                        <h4>📊 {t('reports.featureCustomReportsTitle')}</h4>
                        <p>{t('reports.featureCustomReportsBody')}</p>
                    </li>
                    <li className="feature-item">
                        <h4>🎯 {t('reports.featureConversionTitle')}</h4>
                        <p>{t('reports.featureConversionBody')}</p>
                    </li>
                </ul>

                <button className="upgrade-button">
                    {t('reports.upgradeButton')}
                </button>
            </div>
        </AuroraPage>
    )
}

export default Reports