import * as React from 'react';
import { browserHistory } from '../browserHistory';
import { RaisedButton, FlatButton, FlatButtonProps } from 'material-ui';

// Todo Waiting on v1.x of material-ui for native link support see https://github.com/mui-org/material-ui/issues/7186
type Props = { children?: string, to: string } & FlatButtonProps;
export const LinkedRaisedButton = (props: Props) =>
  <RaisedButton {...props} onClick={() => browserHistory.push(props.to)}/>;

export const LinkedFlatButton = (props: Props) =>
  <FlatButton {...props} onClick={() => browserHistory.push(props.to)}/>;
