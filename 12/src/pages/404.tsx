import ErrorTemplate from '@/components/error/ErrorTemplate';

export default function Custom404() {
  return (
    <ErrorTemplate
      statusCode={404}
      messageTitle="페이지를 찾을 수 없습니다."
      messageText="페이지를 찾을 수 없습니다."
      icon={<h2>404</h2>}
    />
  );
}
