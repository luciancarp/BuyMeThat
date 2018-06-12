import * as React from 'react';
import styled from 'styled-components';
import { palette, spaces } from '../../style/theming';

type BaseProps = { className?: string, title?: string };
type CustomErrorBoxProps =  BaseProps & { children?: any }; // tslint:disable-line:no-any
type FromErrorErrorBoxProps = BaseProps & { error?: Error };
type ErrorBoxProps = BaseProps | CustomErrorBoxProps | FromErrorErrorBoxProps;

export const ErrorBoxWrapper = styled.div`
  align-self: flex-start;
  background-color: lightyellow;
  border-left: ${palette.accent1Color} solid 3px;
  margin-bottom: ${spaces.medium}px;
  padding: ${spaces.medium}px;
`;

export const Title = styled.div`
  font-weight: bold;
`;

export const ContentWrapper = styled.div`margin-top: ${spaces.narrow}`;

export const ErrorBox: React.StatelessComponent<ErrorBoxProps> = (props: ErrorBoxProps) => {
  let content;
  const { error } = (props as FromErrorErrorBoxProps);
  if ((props as CustomErrorBoxProps).children != null) {
    content = (props as CustomErrorBoxProps).children;
  } else if (error != null) {
    content = process.env.NODE_ENV === 'development'
      ? <div><pre>{error.message}</pre><pre>{error.stack}</pre></div>
      : (error as any).userVisibleMessage; // tslint:disable-line:no-any
  }
  const title = props.title || 'Something has gone wrong while loading the page';
  return (
    <ErrorBoxWrapper>
      {title && <Title>{title}</Title>}
      {content && <ContentWrapper>{content}</ContentWrapper>}
    </ErrorBoxWrapper>
  );
};
