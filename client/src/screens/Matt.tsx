import * as React from 'react';
import styled from 'styled-components';
import { palette, spaces } from '../style/theming';
import { ExampleEntity, fetchExample } from '../api';
import { AsyncValueProps, withAsyncValue } from '../shared/withAsyncValue';

const MattWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: ${spaces.wide}px;
  
  .header-text {
    color: ${palette.accent1Color};
    margin-bottom: ${spaces.wide}px;
    letter-spacing: 3px;
    font-size: 80px;
  }
  
  .message-text {
    color: ${palette.textColor};
  }
`;

type Props = AsyncValueProps<Array<ExampleEntity>>;
const UnwrappedMatt = (props: Props) => (
  <MattWrapper>
    <div className="header-text">Matt</div>
    <div className="message-text">
    Apparently I'm egotistical enough to make an example page all about me so please enjoy deleting this!
      Here is some data from the database:
      {JSON.stringify(props.async)}
    </div>
  </MattWrapper>
);

export const Matt = withAsyncValue(
  fetchExample
)(UnwrappedMatt);
