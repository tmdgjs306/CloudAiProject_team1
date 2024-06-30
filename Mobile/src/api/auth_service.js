import firebase from 'firebase/auth';
import App from '../../firebase'; 

class authService {
        login(providerName){
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return App.auth().signInWithPopup(authProvider);
    }
}

export default new authService();