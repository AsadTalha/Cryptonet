

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBZIClMDlL6Hx_v1F8TW_pE-v6AYsBwO7g",
 authDomain: "crynptonet.firebaseapp.com",
 databaseURL: "https://crynptonet.firebaseio.com",
 projectId: "crynptonet",
 storageBucket: "crynptonet.appspot.com",
 messagingSenderId: "490831695867"
};
firebase.initializeApp(config);

export default firebase;
