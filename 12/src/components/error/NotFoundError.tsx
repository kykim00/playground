import { CustomErrorProps } from './AuthError';
import ErrorTemplate from './ErrorTemplate';

export default function ({ onReset }: CustomErrorProps) {
  return (
    <ErrorTemplate
      statusCode={404}
      messageText="찾을 수 없습니다."
      messageTitle="Not Found Error"
      icon={<h1>404</h1>}
      button={onReset ? <button onClick={onReset}>다시시도</button> : undefined}
    />
  );
}
