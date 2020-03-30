import { endOfDay, startOfDay } from 'date-fns'
import firebase from "firebase";
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import { DeliveryRidesAvailability } from "./model";

class Firebase {
  private auth: firebase.auth.Auth;
  private readonly createDeliveryRideCallable: firebase.functions.HttpsCallable;
  private readonly deliveryRidesAvailabilityCallable: firebase.functions.HttpsCallable;
  private readonly cancelDeliveryRideCallable: firebase.functions.HttpsCallable;
  private firestore: firebase.firestore.Firestore;

  constructor(config: Object) {
    const application = app.initializeApp(config);

    this.auth = application.auth();
    this.auth.languageCode = 'cs';
    this.firestore = application.firestore();
    const functions = application.functions('europe-west1');
    this.createDeliveryRideCallable = functions.httpsCallable('createDeliveryRide');
    this.deliveryRidesAvailabilityCallable = functions.httpsCallable('deliveryRidesAvailability');
    this.deliveryRidesAvailabilityCallable = functions.httpsCallable('deliveryRidesAvailability');
    this.cancelDeliveryRideCallable = functions.httpsCallable('cancelDeliveryRide');
  }

  doSignOut = () => this.auth.signOut();
  doSignIn = (email: string, password: string) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  sendPasswordResetEmail = (email: string, returnUrl: string) => {
    const options = returnUrl ? { url: returnUrl } : null;
    return this.auth.sendPasswordResetEmail(email, options);
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

  getDeliveryRides = async (callback: any, date?: Date | null) => {
    const token = await this.auth.currentUser?.getIdTokenResult();
    const organization = token?.claims.organization;

    const start = startOfDay(date || new Date());
    const end = endOfDay(date || new Date());

    return this.firestore.collection('deliveryRides')
      .where('organizationId', '==', organization)
      .where('created', '>=', start)
      .where('created', '<=', end)
      .orderBy('created', 'desc')
      .onSnapshot(callback)
  };

  cancelDeliveryRide = (rideDocumentId: string) => {
    return this.cancelDeliveryRideCallable({ rideDocumentId });
  };
}

export default Firebase;
