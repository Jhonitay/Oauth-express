const {google} = require('googleapis')

const Oauth2 = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'http://localhost:4000/auth/google/callback'
    )
const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
    
]
const authorizationUrl = Oauth2.generateAuthUrl({
    access_type : 'offline',
    scope : scopes,
    include_granted_scopes: true

})


module.exports= {Oauth2 , authorizationUrl}