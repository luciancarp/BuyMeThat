import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { spaces } from '../style/theming';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export type ScreenProps = {
  className?: string,
  children?: React.ReactNode,
  pageTitle?: string,
};

const defaultPageTitle = 'Buy Me That';

class UnstyledScreen extends React.Component<ScreenProps> {
  componentDidMount() {
    document.title = this.props.pageTitle
      ? `${defaultPageTitle} - ${this.props.pageTitle}`
      : defaultPageTitle;
  }
  
  componentWillUnmount() {
    document.title = defaultPageTitle;
  }
  
  render() {
    const { className, children } = this.props;
    return <div className={className}>{children}</div>;
  }
}

export const Screen = styled(UnstyledScreen)`
  animation: ${fadeIn} 0.3s;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  padding: ${spaces.wide}px;
  position: relative;
`;
