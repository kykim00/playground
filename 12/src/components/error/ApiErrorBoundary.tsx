import { AxiosError } from 'axios';
import React, { PropsWithChildren } from 'react';

const initialState = {};
interface State {
  shouldHandleError?: boolean;
  shouldRethrow?: boolean;
  error?: AxiosError;
}
class ApiErrorBoundary extends React.Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      shouldHandleError: undefined,
      shouldRethrow: undefined,
      error: undefined,
    };
  }
  // 하위 트리에서 throw된 error를 받습니다.
  // 이 에러는 카카오페이지 웹에서 사용되는 에러 코드 정보를 담고 있습니다.
  static getDerivedStateFromError(error: AxiosError) {
    if ('이 Error Boundary에서 처리할 수 없는 에러 코드') {
      return {
        shouldHandleError: false,
        // 여기서 처리 할 수 없는 에러라면 render 단계에서 rethrow 하여 상위 에러 바운더리에서 처리하도록 합니다.
        shouldRethrow: true,
        error,
      };
    }
    return {
      shouldHandleError: true,
      shouldRethrow: false,
      error,
    };
  }

  render() {
    if (this.state.shouldRethrow) {
      throw this.state.error;
    }
    if (!this.state.shouldHandleError) {
      return this.props.children;
    }
    return (
      <div>
        <h2>Oops, there is an error!</h2>
        <button type="button" onClick={() => this.setState({ shouldHandleError: false })}>
          Try again?
        </button>
      </div>
    );
    // if(미로그인 에러 코드) {
    // 	return (
    // 		<AuthError />
    // 	)
    // }
    // if(네트워크 에러 코드) {
    // 	// ApiErrorBoundary와 중복되는 에러 처리 코드입니다.
    // 	// Fetcher위에 ApiErrorBoundary가 누락 혹은 제외된 경우
    // 	return (
    // 		<NetworkError onClickRetry={() => this.setState({ shouldHandleError: false})} />
    // 	)
    // }
    // ...
    // return (
    // 	<UnknownError onClickRetry={() => this.setState({ shouldHandleError: false})} />
    // )
  }
}

export default ApiErrorBoundary;
