// Firebase has been replaced with FeathersJS API
// See /packages/emporium/src/api/client.ts for the new API client

// import firebase from '@firebase/app';
// import '@firebase/firestore';

// const config = {
//     apiKey: process.env.NX_apiKey,
//     authDomain: process.env.NX_authDomain,
//     databaseURL: process.env.NX_databaseURL,
//     projectId: process.env.NX_projectId,
//     storageBucket: process.env.NX_storageBucket,
//     messagingSenderId: process.env.NX_messagingSenderId
// };

// firebase.initializeApp(config);
// const firestore = firebase.firestore();
// const settings = {};
// firestore.settings(settings);
// firestore.enablePersistence().catch(console.error);

// Stub export for backwards compatibility during migration
export const db = {
    doc: () => ({
        set: () => Promise.resolve(),
        get: () => Promise.resolve({ exists: false }),
        onSnapshot: () => () => {},
        update: () => Promise.resolve(),
        delete: () => Promise.resolve()
    }),
    collection: () => ({
        add: () => Promise.resolve(),
        where: () => ({
            get: () => Promise.resolve({ docs: [] }),
            onSnapshot: () => () => {}
        }),
        onSnapshot: () => () => {}
    })
};
