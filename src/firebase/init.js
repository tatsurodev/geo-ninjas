// firebase, firestoreを使えるようにインポート
import firebase from 'firebase'
import firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBgTXV9oIfyttWmnNf7q6bubW_61ev-2q8",
  authDomain: "udemy-geo-ninjas-3658b.firebaseapp.com",
  databaseURL: "https://udemy-geo-ninjas-3658b.firebaseio.com",
  projectId: "udemy-geo-ninjas-3658b",
  storageBucket: "udemy-geo-ninjas-3658b.appspot.com",
  messagingSenderId: "993176629836",
  appId: "1:993176629836:web:1595bffb16f4c7b3"
};

// 上記設定でfirebase開始
const firebaseApp = firebase.initializeApp(firebaseConfig);

// firestoreをエクスポート
export default firebaseApp.firestore();
