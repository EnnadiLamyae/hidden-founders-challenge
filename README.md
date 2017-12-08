# hidden-founders-challenge  https://lamyaechallenge.firebaseapp.com
(I deployed the application  using Firebase)

git clone https://github.com/EnnadiLamyae/hidden-founders-challenge.git

cd hidden-founders-challenge

npm install

# Create you app in facebook dashboard for developers 

see https://developers.facebook.com/docs/

and add http://localhost:3000 in Valid OAuth redirects URIs

# Setting up the project 

Open project in  your preferred IDE.

in  plugin/fb-config put you appId 

# To use Firebase 

create your project in Firebase see https://firebase.google.com/docs/web/setup?authuser=0

override rules in Firebase Console  with the rules used in this project (storage.rules && database.rules.json)

but before in storage.rules replace  {bucket} with your code.appspot.com (see storage in Firebase Console gs://code.appspot.com

service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write
    }
  }
}

#in our project edit plugin/firebase-config

replace  let config = ...

with  : in your firebase console -> Project overview -> add firebase to your web application 
copy  you let config ..

That's it 

# in your terminal 

npm run build 

npm run start 

P.S :  when you sign in please wait a second for loading your profile , then navigate to your profile to see your albums 
if the albums don't appear reload your page with a simple ctrl+shift+R . Now you'll be able to see your albums .
if you want to save a photo just click save and check your console if it's saved you'll see it otherwise a error will appear 
if you want to see if your photos is really saved or not Go to your Firebase console in storage . 





