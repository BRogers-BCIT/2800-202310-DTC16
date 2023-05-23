var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      //------------------------------------------------------------------------------------------
      // The code below is modified from default snippet provided by the FB documentation.
      //
      // If the user is a "brand new" user, then create a new "user" in your own database.
      // Assign this user with the name and email provided.
      // Before this works, you must enable "Firestore" from the firebase console.
      // The Firestore rules must allow the user to write.
      //------------------------------------------------------------------------------------------
      var user = authResult.user; // get the user object from the Firebase authentication database
      if (authResult.additionalUserInfo.isNewUser) {
        console.log(user)
        //if new user
        db.collection("users")
          .doc(user.uid)
          .set({
            //write to firestore. We are using the UID for the ID in users collection
            name: user.displayName, //"users" collection
            email: user.email, //with authenticated user's ID (user.uid)
            rating: "0000",
            currentFEN: "XXXXXXXXXXX",
            currentBoardName: "XXXXXXXXXXX",
            currentBoardDescription: "XXXXXXXXXXX",
            currentBoardSavedDate: "XXXXXXXXXXX",
          })
          .then(function () {
            console.log("New user added to firestore");
            window.location.assign("profile.html"); //re-direct to main.html after signup
          })
          .catch(function (error) {
            console.log("Error adding new user: " + error);
          });
      } else {
        localStorage.setItem('userUid', user.uid)
        localStorage.setItem('userDisplayName', user.displayName)
        return true;
      }
      db.collection("users").doc(user.uid).collection(user.displayName + " savedBoards").doc("Starting Board").set({
        //create placeholder recipe
        boardName: "Starting Board",
        boardDescription: "This is the starting board",
        boardFEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        savedDate: new Date().toISOString().split('T')[0],
      });
      localStorage.setItem('userUid', user.uid)
      localStorage.setItem('userDisplayName', user.displayName)
      return false;

    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
    //sets userUid and userDisplayName as a local storage variable

  },

  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.

  signInFlow: "popup",
  signInSuccessUrl: "/profile",

  signInOptions: [

    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);