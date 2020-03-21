import app from 'firebase/app';
import {auth} from 'firebase';
import 'firebase/auth';

class Firebase {
    private auth: firebase.auth.Auth;
    private appVerifier: firebase.auth.RecaptchaVerifier;

    constructor(config: Object) {
        app.initializeApp(config);

        this.auth = app.auth();
        this.appVerifier = new auth.RecaptchaVerifier('recaptcha-container');
    }

    doSignOut = () => this.auth.signOut();
    doSignIn = () => {
        
        return this.auth.signInWithPhoneNumber('+420 776 630 842', this.appVerifier);
    };
}
export default Firebase;