import { CustomErrorProps } from './AuthError';
import ErrorTemplate from './ErrorTemplate';

export default function ({ onReset }: CustomErrorProps) {
  return (
    <ErrorTemplate
      statusCode="Client Error"
      messageTitle="타입 에러"
      messageText="response 형식이 맞지 않습니다."
      icon={<h1>Type Error</h1>}
      button={onReset ? <button onClick={onReset}>다시시도</button> : undefined}
    />
  );
}
