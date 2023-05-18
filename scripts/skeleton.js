function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            console.log($('#navbarPlaceholder').load('../bars/nav_after_login.html'));
            console.log($('#footerPlaceholder').load('../bars/footer.html'));
        } else {
            // No user is signed in.
            console.log($('#navbarPlaceholder').load('../bars/nav_b4_login.html'));
            console.log($('#footerPlaceholder').load('../bars/footer.html'));
        }
    });
}
loadSkeleton(); //invoke the function