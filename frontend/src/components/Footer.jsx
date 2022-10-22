import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer section page__footer">
      <p className="footer__copyright">
        <a
          className="footer__link button"
          href="https://github.com/artemshchirov"
          target="_blank"
          rel="noreferrer">
          {t('footer__copyright')}
        </a>
      </p>
    </footer>
  );
}

export default Footer;
