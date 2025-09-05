import { useT, useTranslation } from './util/useTranslation';

const TestTranslations = () => {
  const t = useT();
  const { currentLanguage } = useTranslation();

  console.log('Current language:', currentLanguage);
  console.log('Test translation call result:', t('platforms.heroTitle'));

  // Test different levels of access
  const platforms = t('platforms');
  console.log('Platforms object:', platforms);

  const heroTitle = t('platforms.heroTitle');
  console.log('Hero title:', heroTitle);

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      <h2>Translation Debug</h2>
      <p>Current Language: {currentLanguage}</p>
      <p>Platforms object type: {typeof platforms}</p>
      <p>Hero Title: {heroTitle}</p>
      <p>Hero Highlight: {t('platforms.heroTitleHighlight')}</p>
      <p>Hero Subtitle: {t('platforms.heroSubtitle')}</p>
    </div>
  );
};

export default TestTranslations;
