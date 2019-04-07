import * as firebase from 'firebase';

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDrXm8LLARO3vnhOn5bdDYemJF9yym8i2o",
        authDomain: "reatebb.firebaseapp.com",
        databaseURL: "https://reatebb.firebaseio.com",
        projectId: "reatebb",
        storageBucket: "reatebb.appspot.com",
        messagingSenderId: "258477766249"
      };
      firebase.initializeApp(config);

// firebase.database().ref().set({
//   name: 'Heu unu'
// });

const database = firebase.database();

database.ref().set({
  age: 20,
  isSingle: false,
  location: {
    city: 'ha noi',
    country: 'vit nam'
  }
});

// database.ref().set('This is my data.');

database.ref('age').set(20);
database.ref('location/city').set('xi gon');

database.ref('attributes').set({
  height: 73,
  weight: 150,
  nested: {
      nested: {
          name:'nested'
      }
  }
}).then(()=>{
    console.log('update success');
})
database.ref('attributes/nested/nested/name').set('nested 2');


 database.ref('attributes/nested/nested/name').set(null);
 database.ref('attributes/nested/nested/name').remove();
database.ref('attributes').update({
    height: 100,
    weight: 100,
  });
database.ref('arrayData').push({
    description: 'Rent',
    note: '',
    amount: 1095100,
    createdAt: 976123498163
  });
  database.ref('arrayData').push({
    description: 'Rent2',
    note: '',
    amount: 109510,
    createdAt: 976121498763
  });
  database.ref()
  .once('value')
  .then((snapshot) => {
    const expenses = [];

    snapshot.forEach((childSnapshot) => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });

    console.log(expenses);
  });
console.log('change the data.');