import firebase from "firebase";
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';

class Firebase {
    private auth: firebase.auth.Auth;
    // private appVerifier: firebase.auth.RecaptchaVerifier;
    private functions: firebase.functions.Functions;
    private deliveryRides: firebase.functions.HttpsCallable;

    constructor(config: Object) {
        const application = app.initializeApp(config);

        this.auth = application.auth();
        this.auth.languageCode = 'cs';
        this.functions = application.functions('europe-west1');
        // this.appVerifier = new auth.RecaptchaVerifier('recaptcha-container');
        this.deliveryRides = this.functions.httpsCallable('deliveryRides');
    }

    doSignOut = () => this.auth.signOut();
    doSignIn = (email: string, password: string) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    };

    addDeliveryRide = (data: Object) => {
        return this.deliveryRides(data)
    };

    addAuthObserver = (callback: any) => {
      this.auth.onAuthStateChanged(callback)
    };

    getUser = () => {
      return this.auth.currentUser;
    };
}
export default Firebase;
