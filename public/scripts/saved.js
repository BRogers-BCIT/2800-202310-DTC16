// user information and multi-use variables
var menuOpen = false;
var currentBoardID = null;
const uUid = localStorage.getItem('userUid')
const uDisplayName = localStorage.getItem('userDisplayName')
let currentCardFen = null;
let deleteConfirm = false;
let saveConfirm = false;

// TODO: Test (Boards Functions)
const populateBoardCards = function () {

    // Clear the search term
    $("#searchInput").val("");

    // Clear the populated board cards
    $("#chessCardGroup").html("");

    // Populate the cards with the saved boards
    function cardSkeleton() {

        // Set the card number
        let cardNum = 0

        // Get all the saved boards from the users collection
        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    // Give each card a unique id
                    cardNum += 1

                    // populate a chess board to the page
                    $("#chessCardGroup").append(`
                        <div id="${cardNum}" class="card">
                        <button class="openCard" id="${doc.id}" data-toggle="modal" data-target=".bd-example-modal-lg">
                        <div class="card-body">
                            
                                
                                        <h5 class="boardTitle" id="title">${doc.data().boardName}</h5>
                                    <ul>
                                        <li class="FEN">FEN: ${doc.data().boardFEN}</li>
                                        <li class="description">Description: ${doc.data().boardDescription}</li>
                                        <li class="dateSaved">Date Saved: ${doc.data().savedDate}</li>
                                    </ul>


                            </div>
                            </button>
                        </div>`
                    )
                });
            })

            .catch((error) => { // catch errors
                console.log("Error getting documents: ", error);
            });

    }

    //invoke the populate cards function
    cardSkeleton();

}


// TODO: Test (Boards Functions)
const searchBoardCards = function () {

    // Clear the populated board cards
    $("#chessCardGroup").html("");

    // Populate the cards with the saved boards
    function cardSkeleton() {

        // Set the card number
        let cardNum = 0

        // Get the search term
        let nameSearch = $("#searchInput").val().trim();

        // Get all the saved boards from the users collection
        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").where("boardName", "==", nameSearch)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    // Give each card a unique id
                    cardNum += 1

                    // populate a chess board to the page
                    $("#chessCardGroup").append(`
                        <div id="${cardNum}" class="card" style="width: 20rem;">
                            <button class="openCard" id="${doc.id}" data-toggle="modal" data-target=".bd-example-modal-lg" >
                                <div class="card-body">
                                        <h5 class="boardTitle" id="title">Board Name: ${doc.data().boardName}</h5>
                                    <ul>
                                        <li class="FEN">FEN: ${doc.data().boardFEN}</li>
                                        <li class="description">Description: ${doc.data().boardDescription}</li>
                                        <li class="dateSaved">Date Saved: ${doc.data().savedDate}</li>
                                    </ul>
                                </div>
                            </button>
                        </div>`
                    )
                });
            })

            .catch((error) => { // catch errors
                console.log("Error getting documents: ", error);
            });

    }

    //invoke the search cards function
    cardSkeleton();

}



// TODO: Test (Menu Functions)
const openBoardMenu = function () {



    // Board information variables
    let boardName = null;
    let boardDescription = null;
    let boardFEN = null;
    let boardDate = null;

    // Reset the delete confirm button
    saveConfirm = false;
    $("#saveBoardCardButton").html("Save");
    $("#saveBoardCardButton").css("margin-right", "calc((90% - 142px) / 2);");
    $("#editBoardCardButton").css("margin-left", "calc((90% - 142px) / 2)");
    $("#saveBoardCardButton").attr("data-dismiss", "");

    // Reset the save confirm button
    deleteConfirm = false;
    $("#deleteBoardCardButton").html("Delete");
    $("#deleteBoardCardButton").css("margin-left", "calc(50% - 50px)");
    $("#deleteBoardCardButton").attr("data-dismiss", "");

    // Set the save board menu to visible and the background to half transparency
    $(`#savedBoardMenu`).css("display", "block");
    $(`#titleArea`).css("opacity", "0.5");
    $(`#searchArea`).css("opacity", "0.5");
    $(`#boardCards`).css("opacity", "0.5");

    // Save the name of the clicked board to a global variable
    currentBoardID = $(this).attr("id");
    console.log(currentBoardID);

    // Get the document from the user's collection with the same id as the clicked board
    db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").doc(currentBoardID).get().then(function (doc) {
        // Set the values of the board information variables to the values from the database
        boardName = doc.data().boardName.trim();
        boardDescription = doc.data().boardDescription.trim();
        boardFEN = doc.data().boardFEN;
        currentCardFen = doc.data().boardFEN;
        boardDate = doc.data().savedDate;
    })

        .then(function () {
            // Populate the menu with the board's information
            $(`#boardName`).val(boardName);
            $(`#boardDescriptionText`).val(boardDescription);
            $(`#boardFEN`).html(boardFEN);
            $(`#dateSaved`).html(boardDate);
        })

        .catch(function (error) {
            // Catch errors
            console.log("Error getting document:", error);
        });

}


// TODO: Test (Card Functions)
const editBoardCard = function () {

    // Enable the board name and description text boxes to be edited
    $(`#boardName`).prop("disabled", false);
    $(`#boardDescriptionText`).prop("disabled", false);

}

// TODO: Test (Card Functions)
const saveBoardCard = function () {

    if (saveConfirm != true) {
        saveConfirm = true;
        $("#saveBoardCardButton").html("Confirm Save");
        $("#saveBoardCardButton").css("margin-right", "calc((90% - 200px) / 2)");
        $("#editBoardCardButton").css("margin-left", "calc((90% - 200px) / 2)");
        $("#saveBoardCardButton").attr("data-dismiss", "modal");
    } else {
        // Get the boards name and description from the text boxes
        let boardName = $(`#boardName`).val();
        let boardDescription = $(`#boardDescriptionText`).val();

        // Delete the board from the database
        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").doc(currentBoardID)
            .delete()
            .catch(function (error) {
                // Catch any errors
                console.error("Error removing document: ", error);
            });


        // Save the boards name and description to the database with an updated date
        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").doc(boardName).set({
            boardName: boardName,
            boardDescription: boardDescription,
            savedDate: new Date().toISOString().split('T')[0],
            boardFEN: currentCardFen

        }).then(function () {
            // Disable editing the board name and description text boxes
            $(`#boardName`).prop("disabled", true);
            $(`#boardDescriptionText`).prop("disabled", true);

        }).catch(function (error) {
            // Catch any errors
            console.error("Error writing document: ", error);
        });
        saveConfirm = false;
        // Close the menu and refresh the board cards
        populateBoardCards();
    }
}

const deleteBoardCard = function () {

    // Only delete a board if one is selected
    if (currentBoardID != null && deleteConfirm == true) {
        // Delete the board from the database
        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").doc(currentBoardID)
            .delete()
            .then(function () {
                // Refresh the board cards
                populateBoardCards();
            }).catch(function (error) {
                // Catch any errors
                console.error("Error removing document: ", error);
            });
    }

    if (deleteConfirm == false) {
        deleteConfirm = true;
        $("#deleteBoardCardButton").html("Confirm Delete");
        $("#deleteBoardCardButton").css("margin-left", "calc(50% - 80px)");
        $("#deleteBoardCardButton").attr("data-dismiss", "modal");
    }
}


// TODO: Test (Call Functions)
const openBoardInEditor = function () {

    // Board information variables
    let boardFEN = null;
    let boardName = null;
    let boardDescription = null;
    let boardSavedDate = null;

    // Get the board's information from the database
    function getCardFEN() {
        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").where("boardName", "==", currentBoardID)
            .get()
            .then((querySnapshot) => {
                // Get the information from the matching board's document
                querySnapshot.forEach((doc) => {
                    boardFEN = doc.data().boardFEN;
                    boardName = doc.data().boardName;
                    boardDescription = doc.data().boardDescription;
                    boardSavedDate = doc.data().savedDate;
                });
            }).then(function () {

                // Update the board information to the user's document in the database
                db.collection("users").doc(uUid).update({
                    currentFEN: boardFEN,
                    currentBoardName: boardName,
                    currentBoardDescription: boardDescription,
                    currentBoardSavedDate: boardSavedDate,

                }).then(function () {
                    // Call the openBoard page
                    window.location.href = "/openBoard";

                }).catch(function (error) {
                    // Catch any errors
                    console.error("Error writing document: ", error);
                });
            })
            .catch((error) => {
                // catch errors
                console.log("Error getting documents: ", error);
            });
    }
    getCardFEN();

}

// TODO: Test (Call Functions)
const openBoardInAnalyzer = function () {

    // Board information variables
    let boardFEN = null;
    let boardName = null;
    let boardDescription = null;

    // Get the board's information from the database
    function getCardFEN() {
        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").where("boardName", "==", currentBoardID)
            .get()
            .then((querySnapshot) => {
                // Get the information from the matching board's document
                querySnapshot.forEach((doc) => {
                    boardFEN = doc.data().boardFEN;
                    boardName = doc.data().boardName;
                    boardDescription = doc.data().boardDescription;
                });
            }).then(function () {

                // Update the board information to the user's document in the database
                db.collection("users").doc(uUid).update({
                    currentFEN: boardFEN,
                    currentBoardName: boardName,
                    currentBoardDescription: boardDescription,

                }).then(function () {
                    // Set form to board fen
                    $(`#fenInput`).val(boardFEN);
                    // Submit form
                    $(`#fenToAnalysis`).submit();

                }).catch(function (error) {
                    // Catch any errors
                    console.error("Error writing document: ", error);
                });
            })
            .catch((error) => {
                // catch errors
                console.log("Error getting documents: ", error);
            });
    }

    // Call the get information function
    getCardFEN();

}


// TODO: Test (Setup)
setup = function () {

    // Boards Functions
    populateBoardCards();

    // Disable editing the board name and description text boxes
    $(`#boardName`).prop("disabled", true);
    $(`#boardDescriptionText`).prop("disabled", true);

    // Search Functions
    $("body").on("click", "#searchButton", searchBoardCards);

    // Menu Functions
    $("body").on("click", ".openCard", openBoardMenu);

    // Card Functions
    $("body").on("click", ".edit", editBoardCard);
    $("body").on("click", ".save", saveBoardCard);
    $("body").on("click", ".delete", deleteBoardCard);

    // Call Functions
    $("body").on("click", ".openEditor", openBoardInEditor);
    $("body").on("click", ".openAnalysis", openBoardInAnalyzer);

}
$(document).ready(setup)