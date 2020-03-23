import firebase from "firebase";
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import {DeliveryRidesAvailability} from "./model";

class Firebase {
    private auth: firebase.auth.Auth;
    // private appVerifier: firebase.auth.RecaptchaVerifier;
    private readonly deliveryRidesCallable: firebase.functions.HttpsCallable;
    private readonly deliveryRidesAvailabilityCallable: firebase.functions.HttpsCallable;

    constructor(config: Object) {
        const application = app.initializeApp(config);

        this.auth = application.auth();
        this.auth.languageCode = 'cs';
        const functions = application.functions('europe-west1');
        // this.appVerifier = new auth.RecaptchaVerifier('recaptcha-container');
        this.deliveryRidesCallable = functions.httpsCallable('deliveryRides');
        this.deliveryRidesAvailabilityCallable = functions.httpsCallable('deliveryRidesAvailability');
    }

    doSignOut = () => this.auth.signOut();
    doSignIn = (email: string, password: string) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    };

    addDeliveryRide = (data: Object) => {
        return this.deliveryRidesCallable(data)
          .then(data => {
            if (data.data.code !== undefined) {
              throw data.data.code;
            }

            return data.data;
          })
    };

    getDeliveryRidesAvailability = async () => {
      const result = await this.deliveryRidesAvailabilityCallable();
      return result.data as DeliveryRidesAvailability;
    };

    addAuthObserver = (callback: (user: firebase.User | null) => void) => {
      this.auth.onAuthStateChanged(callback)
    };
}
export default Firebase;
