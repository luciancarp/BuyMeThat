import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { materialUiTheme, spaces } from '../style/theming';
import styled, { injectGlobal } from 'styled-components';
import GLogin from '../screens/GLogin';
import {teal400} from "material-ui/styles/colors";

const WrappedText = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spaces.wide}px;
`;

const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spaces.wide}px;
`;

injectGlobal`
  @import url(//fonts.googleapis.com/css?family=Open+Sans:400|Raleway:300);
  
  * {
    box-sizing: border-box;
  }
  
  body, html, #root {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    height: 100%;
    width: 100%;
  }
  
  h1, h2, h3, h4 {
    font-family: 'Raleway', 'Open Sans', sans-serif;
    margin-bottom: ${spaces.medium}px;
    margin-top: 0;
  }
`;

const LoginScreen = () => (
    <MuiThemeProvider muiTheme={materialUiTheme}>
        <div style={ { backgroundColor: teal400, minHeight: '100%' } }>
        <WrappedText>
            <img src={require('../logo.png')} height={'300px'} width={'auto'}/>
        </WrappedText>
        <ButtonWrapper>
            <GLogin/>
        </ButtonWrapper>
        </div>
    </MuiThemeProvider>
);

export default LoginScreen;