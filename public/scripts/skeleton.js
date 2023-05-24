const indexPage = "/index.html";

function loadSkeleton() {

    let path = window.location.pathname;

    firebase.auth().onAuthStateChanged(function (user) {
        if (path === indexPage) {
            console.log($('#navbarPlaceholder').load('../bars/nav_index.html'));
        } else {
            // User is at a different page.
            if (user) {
                // User is signed in.
                // Do something for the user here.
                console.log($('#navbarPlaceholder').load('../bars/nav_after_login.html'));
            } else {
                // Check if the user is opening a page they should not see (e.g. analysis, openBoard, profile, saved)
                let currentPage = window.location.href;
                if (currentPage.includes("analysis") || currentPage.includes("openBoard") || currentPage.includes("profile") || currentPage.includes("saved")) {
                    // If the user is not logged in, redirect them to the home page.
                    window.location.href = "/index";
                } else {
                    // Otherwise load the navbar for non-logged in users.
                    console.log($('#navbarPlaceholder').load('../bars/nav_b4_login.html'));
                }
            }
        }
        console.log($('#footerPlaceholder').load('../bars/footer.html'));
    });
}
loadSkeleton(); //invoke the function