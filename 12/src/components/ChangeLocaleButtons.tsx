import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const ChangeLocaleButtons = () => {
  const { t } = useTranslation();
  return (
    <>
      <Link href="/i18n" locale="en">
        <button>{t('common:en')}</button>
      </Link>
      <Link href="/i18n" locale="ko">
        <button>{t('common:ko')}</button>
      </Link>
    </>
  );
};

export default ChangeLocaleButtons;
