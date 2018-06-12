import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { materialUiTheme, spaces, palette } from '../style/theming';
import styled from 'styled-components';
import {teal400} from "material-ui/styles/colors";
import { LOGINPAGE } from '../constants';
import { RaisedButton } from 'material-ui';

declare var gapi: any;

class WaitApproval extends React.Component {

    signOut() {
        var loadGapiClient = new Promise(function(resolve, reject) {
            gapi.load('client:auth2', resolve);
        })
        loadGapiClient.then(() => {
            gapi.auth2.init().then(() => {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
                location.href = LOGINPAGE;                                
            });
        });      
    }

    render() {

        return(
        <MuiThemeProvider muiTheme={materialUiTheme}>
            <div style={ { backgroundColor: teal400, minHeight: '100%' } }>
            <WrappedText>
                <img src={require('../logo.png')} height={'300px'} width={'auto'}/>
                <div className="header-text">Please wait for the admin's approval.</div>
           </WrappedText>
           <ButtonWrapper>
               <RaisedButton 
                    label='Sign Out' 
                    onClick={this.signOut}
                    labelStyle={{color: palette.primary2Color}}
                />
           </ButtonWrapper>
           </div>
        </MuiThemeProvider>
    );
    }
}

const WrappedText = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spaces.wide}px;

  .header-text {
    color: ${palette.alternateTextColor};
    margin-bottom: ${spaces.wide}px;
    letter-spacing: 3px;
    font-size: 50px;
  }

`;

const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spaces.wide}px;
`;

export default WaitApproval;