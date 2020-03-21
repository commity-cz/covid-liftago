import app from 'firebase/app';
// import {auth} from 'firebase';
import 'firebase/auth';

class Firebase {
    private auth: firebase.auth.Auth;
    // private appVerifier: firebase.auth.RecaptchaVerifier;

    constructor(config: Object) {
        app.initializeApp(config);

        this.auth = app.auth();
        // this.appVerifier = new auth.RecaptchaVerifier('recaptcha-container');
    }

    doSignOut = () => this.auth.signOut();
    doSignIn = () => {
        return this.auth.signInWithEmailAndPassword('krejzd@gmail.com', '5FGMyvtrLe');
    };
}
export default Firebase;