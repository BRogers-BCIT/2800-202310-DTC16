function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        localStorage.clear();
      }).catch((error) => {
        // An error happened.
      });
}