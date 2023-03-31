import { AxiosError } from 'axios';
import React, { PropsWithChildren } from 'react';
import { ZodError as ZodErrorType } from 'zod';
import AuthError from './AuthError';
import NotFoundError from './NotFoundError';
import ZodError from './ZodError';
interface State {
  error?: Error;
}

const initState: State = {
  error: undefined,
};
class ApiErrorBoundary extends React.Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = initState;
  }

  reset = () => {
    this.setState(initState);
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    if (error instanceof ZodErrorType) {
      return <ZodError />;
    }
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 401:
          return <AuthError />;
        case 404:
          return <NotFoundError onReset={this.reset} />;
        case 500:
        default:
          throw error;
      }
    }

    throw error;
  }
}

export default ApiErrorBoundary;
