var currentUser;

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userRating = userDoc.data().rating;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userRating != null) {
                        document.getElementById("ratingInput").value = userRating;
                    }
                })
        } else {

        }
    });
}

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
    $("#nameInput").css("color", "black");
    $("#emailInput").css("color", "black");
    $("#ratingInput").css("color", "black");
}

function saveUserInfo() {

    //a) get user entered values
    var userName = document.getElementById("nameInput").value;
    var userEmail = document.getElementById("emailInput").value;
    var userRating = document.getElementById("ratingInput").value;

    // b) update user's document in Firestore
    currentUser.update({
        name: userName,
        email: userEmail,
        rating: userRating,
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    // c) disable the form fields
    document.getElementById('personalInfoFields').disabled = true;
    $("#nameInput").css("color", "gray");
    $("#emailInput").css("color", "gray");
    $("#ratingInput").css("color", "gray");
}

function sendPasswordReset() {
    var auth = firebase.auth();
    var emailAddress = document.getElementById("emailInput").value;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        $(`#resetSentText`).html(`Password reset email sent to ${emailAddress}`);
    }).catch(function (error) {
        // An error happened.
        $(`#resetSentText`).html(`Error sending email to ${emailAddress}`);
    });
}

setup = function () {

    //call the function to run it 
    populateUserInfo();
}
$(document).ready(setup)
