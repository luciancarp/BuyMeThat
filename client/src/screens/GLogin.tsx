import * as React from 'react';
import { DOMAIN } from '../constants';

declare var gapi: any

class GLogin extends React.Component{

    constructor(props: any){
        super(props);
        this.onSignIn = this.onSignIn.bind(this)
    }

    componentDidMount() {
        console.log('this mounted')
        gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 220,
            'height': 50,
            'longtitle': true,
            'theme': 'light',
            'onsuccess': this.onSignIn,
            'prompt': 'select_account'
        });
    }


    onSignIn(googleUser: any) {
        var idToken = googleUser.getAuthResponse().id_token;
        var request = DOMAIN + "onLogin";
        fetch(request, {
            method: 'POST',
            body: idToken
        })
        .then(response => {
            if(response.status == 200) {
                var userType = this.getUserType(idToken);
                userType.then(response => {
                    if(response == 0) {
                        location.href = '/WaitApproval'
                    }
                    else if(response == 1) {
                        location.href = '/NeederDashboard'
                    }
                    else if(response == 2) {
                        location.href = '/ProviderDashboard'
                    }
                    else if(response == 3) {
                        location.href = '/AdminDashboard'
                    }
                });
            }
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
        return(
            <div>
                <div id="my-signin2" data-onsuccess={this.onSignIn}></div>
            </div>
        )
    }


}

export default GLogin;