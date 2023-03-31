import ErrorTemplate from './ErrorTemplate';

export interface CustomErrorProps {
  onReset?: () => void;
}
export default function ({ onReset }: CustomErrorProps) {
  return (
    <ErrorTemplate
      messageTitle="인증에 실패했습니다."
      messageText="다시 로그인 해 주세요"
      statusCode="401"
      icon={<h1>401</h1>}
      button={onReset ? <button onClick={onReset}>다시시도</button> : undefined}
    />
  );
}
