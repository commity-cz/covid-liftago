import firebase from "firebase";
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import {DeliveryRidesAvailability} from "./model";

class Firebase {
  private auth: firebase.auth.Auth;
  private readonly createDeliveryRideCallable: firebase.functions.HttpsCallable;
  private readonly deliveryRidesAvailabilityCallable: firebase.functions.HttpsCallable;
  private firestore: firebase.firestore.Firestore;

  constructor(config: Object) {
    const application = app.initializeApp(config);

    this.auth = application.auth();
    this.auth.languageCode = 'cs';
    this.firestore = application.firestore();
    const functions = application.functions('europe-west1');
    this.createDeliveryRideCallable = functions.httpsCallable('createDeliveryRide');
    this.deliveryRidesAvailabilityCallable = functions.httpsCallable('deliveryRidesAvailability');
  }

  doSignOut = () => this.auth.signOut();
  doSignIn = (email: string, password: string) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  addDeliveryRide = (data: Object) => {
    return this.createDeliveryRideCallable(data)
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

  getDeliveryRides = async (callback: any) => {
    const token = await this.auth.currentUser?.getIdTokenResult();
    const organization = token?.claims.organization;
    this.firestore.collection('deliveryRides')
      .where('organizationId', '==', organization)
      .orderBy('created', 'desc')
      .onSnapshot(callback)
  }
}

export default Firebase;
