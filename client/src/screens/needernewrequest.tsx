import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { materialUiTheme, palette } from '../style/theming';
import NeederNavBar from '../shared/NeederNavBar';
import styled from 'styled-components';
import { DOMAIN } from '../constants';

declare var gapi: any
let submitted =0;

class needernewrequest extends React.Component<any,any> {

    constructor(props: any) {
        super(props);
        this.state = {
            itemName: '',
            itemDescription: '',
            itemUrl: '',
            validName: '',
            validSubfields: ''
        };
    }

    isOrderValid() {
        if(this.state.itemName == '') {
        this.setState({
            validName: "Name cannot be blank"
        });            
            return 0;
        }
        else{
        this.setState({
            validName: ""
        });              
        }
        if(this.state.itemDescription == '' && this.state.itemUrl == '') {
        this.setState({
            validSubfields: "Both URL and description cannot be blank"
        }); 
            return 0;
        }
        else{
        this.setState({
            validSubfields: ""
        });              
        }        
        return 1;
    }

    getId() {
        var loadGapiClient = new Promise(function(resolve, reject) {
            gapi.load('client:auth2', resolve);
        })
        var id = loadGapiClient.then(() => {
            return gapi.auth2.init().then(() => {
                var auth2 = gapi.auth2.getAuthInstance();
                var idToken = auth2.currentUser.get().getAuthResponse().id_token;
                console.log(idToken);
                return idToken;
            })
        })
        return id;
    }

    updateItemName(e:any) {
        this.setState({
            itemName: e.target.value
        });
    }

    updateItemDescription(e:any) {
        this.setState({
            itemDescription: e.target.value
        });
    }

    updateItemUrl(e:any) {
        this.setState({
            itemUrl: e.target.value
        });
    }    

    submit(e: any) {
        if(submitted == 0 && this.isOrderValid() == 1) {
            submitted = 1;
            this.getId().then((idToken) => {
                var request = DOMAIN + "placeOrder" + "?orderName=" + this.state.itemName + "&orderDescription=" + this.state.itemDescription + "&orderUrl=" + this.state.itemUrl;
                fetch(request, {
                    method: 'POST',
                    body: idToken
                });

                var userType = this.getUserType(idToken);
                userType.then(response => {
                    if(response == 1) {
                        location.href = '/NeederDashboard'
                    }
                    else if(response == 2) {
                        location.href = '/ProviderDashboard'
                    }
                    else if(response == 3) {
                        location.href = '/AdminDashboard'
                    }
                });
            });
        }
    }

    returnToDashboard(e: any) {
        this.getId().then((idToken) => {
            var userType = this.getUserType(idToken);
            userType.then(response => {
                if(response == 1) {
                    location.href = '/NeederDashboard'
                }
                else if(response == 2) {
                    location.href = '/ProviderDashboard'
                }
                else if(response == 3) {
                    location.href = '/AdminDashboard'
                }
            });
        });
}

    getUserType(idToken: String) {
        var request = DOMAIN + "getUserType";
        return fetch(request, {
            method: 'POST',
            body: idToken
        }).then(response => response.json())
        .then(responseJson => {
            return responseJson;
        });
    }

    render() {

        return (
            <MuiThemeProvider muiTheme={materialUiTheme}>
                <WrappedText>
                    <NeederNavBar/>
                    <div className={'textfield'}>
                        <TextField
                            onChange={e=>this.updateItemName(e)}
                            value={this.state.itemName}
                            floatingLabelText="Item Name"
                            errorText={this.state.validName}
                        /><br />
                        <br />
                        <TextField
                            onChange={e=>this.updateItemUrl(e)}
                            value={this.state.itemUrl}
                            floatingLabelText="URL"
                            errorText={this.state.validSubfields}
                        />
                        <br />
                        <TextField
                            onChange={e=>this.updateItemDescription(e)}
                            value={this.state.itemDescription}
                            floatingLabelText="Description of the item."
                            errorText={this.state.validSubfields}
                            multiLine={true}
                            rows={5}
                        /><br />
                        <RaisedButton
                            onClick={e=>this.submit(e)}
                            label="Submit"
                        />
                        <FlatButton label="Cancel" onClick={e=>this.returnToDashboard(e)} />
                    </div>
                </WrappedText>
            </MuiThemeProvider>
        )
    }
}

const WrappedText = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${palette.backgroundColor};
  min-height: 100%;
  .textfield {
      padding-top: 64px;
  }
`;

export default needernewrequest;