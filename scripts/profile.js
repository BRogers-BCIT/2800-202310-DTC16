var currentUser;

function populateUserInfo() {
    firebase.auth().onAuthStateChanged( user => {
        // Check if user is signed in:
        if ( user ) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection( "users" ).doc( user.uid )
            //get the document for current user.
            currentUser.get()
                .then( userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userSchool = userDoc.data().email;
                    var userPass = userDoc.data().password;
                    var userKeyword = userDoc.data().keyword;

                    //if the data fields are not empty, then write them in to the form.
                    if ( userName != null ) {
                        document.getElementById( "nameInput" ).value = userName;
                    }
                    if ( userSchool != null ) {
                        document.getElementById( "emailInput" ).value = userSchool;
                    }
                    if ( userPass != null ) {
                        document.getElementById( "passwordInput" ).value = userPass;
                    }
                    if ( userKeyword != null ) {
                        document.getElementById( "keywordInput" ).value = userKeyword;
                    }
                } )
        } else {
            // No user is signed in.
            console.log( "No user is signed in" );
        }
    } );
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById( 'personalInfoFields' ).disabled = false;
}

function saveUserInfo() {
    // console.log("inside saveUserInfo")
    //enter code here

    //a) get user entered values
    var userName = document.getElementById( "nameInput" ).value;
    var userSchool = document.getElementById( "schoolInput" ).value;
    var userPass = document.getElementById( "passwordInput" ).value;
    var userKeyword = document.getElementById( "keywordInput" ).value;


    //b) update user's document in Firestore
    currentUser.update( {
            name: userName,
            email: userSchool,
            password: userPass,
            keyword: userKeyword,
        } )
        .then( () => {
            console.log( "Document successfully updated!" );
        } )

    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}