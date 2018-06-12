import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {DOMAIN, LOGINPAGE} from '../constants';

declare var gapi: any

class NeederNavBar extends React.Component {

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
            <AppBar
                style={{ position: 'fixed', top: 0}}
                title={<img src={require('../logo.png')} height={'60px'} width={'auto'} onClick={e=>this.returnToDashboard(e)}/>}
                iconElementRight={MenuLogged(this)}
                showMenuIconButton={false}
                />
        )
    }
}

const MenuLogged = (context: any) => (
<FlatButton label={'Sign out'} onClick={context.signOut}/>
);

export default NeederNavBar;