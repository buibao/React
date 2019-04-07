import auth0 from 'auth0-js'
//dev-dllr-qeg.auth0.com
//2HAuBE8ECAS1ur375iYDBW7C213KWvW7

export default class Auth{
    auth0 = new auth0.WebAuth({
        domain: 'dev-dllr-qeg.auth0.com',
        clientID: '2HAuBE8ECAS1ur375iYDBW7C213KWvW7',
        redirectUri: 'http://localhost:3000/callback',
        responseType:'token id_token',
        scope:'openid profile email'
    })
    login =() => {
        this.auth0.authorize()
    }
}