import ChangeLocaleButtons from '@/components/ChangeLocaleButtons';
import { GetServerSideProps } from 'next';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';

const I18nPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const name = '이름';

  return (
    <>
      <h1>
        <Trans i18nKey="title">{t('book:title')}</Trans>
      </h1>

      <ul>
        <li>{t('book:name', { name })}</li>
        <li>{t('book:email', { email: 'ian@sample.com' })}</li>
      </ul>
      <Link href="/i18n" locale="en">
        <button>{t('common:en')}</button>
      </Link>
      <Link href="/i18n" locale="ko">
        <button>{t('common:ko')}</button>
      </Link>
      {/* <ChangeLocaleButtons /> */}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  console.log(ctx.locale);

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'en', ['book', 'common'])),
    },
  };
};

export default I18nPage;
