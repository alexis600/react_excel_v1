// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
// Msal Configurations
const config = {
    auth: {
        authority: "https://login.microsoftonline.com/common",
        clientId: "f64a759d-3cd6-4ef1-a9d9-d881e19bd88c",
        postLogoutRedirectUri: "http://localhost:3000",
        redirectUri: "http://localhost:3000",
        validateAuthority: true,
// After being redirected to the "redirectUri" page, should user
// be redirected back to the Url where their login originated from?
        navigateToLoginRequestUrl: true
    },
    cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true
    }// si falla probar poner localStorage y true
};
// Authentication Parameters
export const authenticationParameters = {
scopes: ["User.Read"
//`f64a759d-3cd6-4ef1-a9d9-d881e19bd88c/.default`
]
}
export const authenticationParametersGraph = {
scopes: [
'openid'
]
}
// Options
export const options = {
loginType: LoginType.Popup,
tokenRefreshUri: window.location.origin +'/auth.html'
}
export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)