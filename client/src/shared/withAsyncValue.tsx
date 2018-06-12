import { Abortable } from 'abortable';
import { ApiResponse } from 'abortable-networking';
import { assign } from 'lodash';
import { Component, ComponentClass, ComponentType, createElement } from 'react';
import { AsyncProps, withAsyncResource } from 'with-async-resource';
import { ErrorBox } from './error-box/ErrorBox';
import { LinearProgress } from 'material-ui';

type State = { isTakingALongTime: boolean };
export type AsyncValueProps<T> = { async: T };

export const withAsyncValue = <OP, T>(
  abortableProducer: (props: OP) => Abortable<ApiResponse<T>>,
  shouldReRequest?: (props: OP, nextProps: OP) => boolean,
) =>
  (WrappedComponent: ComponentType<OP & AsyncValueProps<T>>): ComponentType<OP> =>
    withAsyncResource<OP, ApiResponse<T>>(abortableProducer, shouldReRequest)(
      class AsyncValueWrapper extends Component<OP & AsyncProps<ApiResponse<T>>, State> {
        _isMounted = false;
        asyncDurationTimer = null as number | null;
        state = {
          isTakingALongTime: false,
        };
        
        updateTimerState = () => this.setState((state) => {
          return this._isMounted
            ? ({ ...state, isTakingALongTime: true })
            : false;
        })
        
        componentDidMount() {
          this._isMounted = true;
          // tslint:disable-next-line:no-any The Nods typings clash with the browser typings here
          this.asyncDurationTimer = setTimeout(this.updateTimerState, 500) as any as number;
        }
        
        componentWillUnmount() {
          this._isMounted = false;
          if (this.asyncDurationTimer != null) {
            clearTimeout(this.asyncDurationTimer);
          }
        }
        
        render () {
          const { isTakingALongTime } = this.state;
          const { error, isLoading, result } = this.props.async;
          if (isLoading) {
            return isTakingALongTime ? createElement(LinearProgress) : null;
          }
          
          if (error != null || result == null) {
            return createElement(ErrorBox as any, { error }); // tslint:disable-line:no-any
          }
          
          // tslint:disable-next-line:no-any
          const enhancedProps: OP & AsyncValueProps<T> = assign({}, this.props, { async: result.body }) as any;
          return createElement(WrappedComponent as ComponentClass<OP & AsyncValueProps<T>>, enhancedProps);
        }
      });
