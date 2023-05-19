const indexPage = "/index.html";

function loadSkeleton() {

    let path = window.location.pathname;
    console.log(path);

    firebase.auth().onAuthStateChanged(function (user) {
        if (path === indexPage) {
            // User is at the home page.
            console.log(`User is at home page`)
            console.log($('#navbarPlaceholder').load('../bars/nav_index.html'));
        } else { 
            // User is at a different page.
            console.log(`User is not at home page`)
            if (user) {
                // User is signed in.
                // Do something for the user here.
                console.log(`Authentication successful`)
                console.log($('#navbarPlaceholder').load('../bars/nav_after_login.html'));
            } else {
                // No user is signed in.
                console.log(`Authentication failed or missing`)
                console.log($('#navbarPlaceholder').load('../bars/nav_b4_login.html'));
                
            }
        }
        console.log($('#footerPlaceholder').load('../bars/footer.html'));
    });
}
loadSkeleton(); //invoke the function