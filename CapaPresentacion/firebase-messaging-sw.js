importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCd9wLb52UiS3lO2MUtp9tImGObXa57ucw",
    authDomain: "notiapp-a07a0.firebaseapp.com",
    projectId: "notiapp-a07a0",
    storageBucket: "notiapp-a07a0.appspot.com",
    messagingSenderId: "678165333357",
    appId: "1:678165333357:web:3d4605a5702f04a8cd4664"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    // Customize notification here
    //const notificationTitle = 'Background Message Title';
    //const notificationOptions = {
    //    body: 'Background Message body.',
    //    icon: '/firebase-logo.png'
    //};

    //self.registration.showNotification(notificationTitle, notificationOptions);
});