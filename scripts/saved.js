var menuOpen = false;
var currentBoardID = null;
const uUid = localStorage.getItem('userUid')
const uDisplayName = localStorage.getItem('userDisplayName')


// TODO: Test (Boards Functions)
const populateBoardCards = function () {
    function cardSkeleton() {
        let cardNum = 0
        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards")
            .get()
            .then((querySnapshot) => {
                console.log(querySnapshot)
                querySnapshot.forEach((doc) => { // get all chessboards
                    cardNum += 1
                    // populate a chess board to the page
                    $("#chessCardGroup").append(`
                        <div id="${cardNum}" class="card py-2 mx-2 bg-light" style="width: 10rem;">
                            <button class="openCard" id="${doc.id}">
                                <div class="card-body>
                                        <h5 class="boardTitle" id="title">${doc.data().boardName}</h5>
                                    <ul>
                                        <li class="FEN">${doc.data().boardFEN}</li>
                                        <li class="description">${doc.data().boardDescription}</li>
                                        <li class="dateSaved">${doc.data().savedDate}</li>
                                    </ul>
                                </div>
                            </button>
                        </div>`)
                });
            })
            .catch((error) => { // catch errors
                console.log("Error getting documents: ", error);
            });

    }
    cardSkeleton(); //invoke the function
}

// TODO: Test (Boards Functions)
const searchBoardCards = function () {
    console.log("searching")
    if (menuOpen == true && jQuery("#searchName").val() != "") {
        let cardNum = 0
        let nameSearch = jQuery("#searchName").val();
        nameSearch = nameSearch.toLowerCase();
        function cardSkeleton() {
            db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").where("boardName", "==", nameSearch)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => { // get all recipes
                        cardNum += 1
                        // populate a recipe card to the page
                        $("#chessCardGroup").append(`
                        <div id="${cardNum}" class="card py-2 mx-2 bg-light" style="width: 10rem;">
                            <button class="openCard" id="${doc.id}">
                                <div class="card-body>
                                        <h5 class="boardTitle" id="title">${doc.data().boardName}</h5>
                                    <ul>
                                        <li class="FEN">${doc.data().boardFEN}</li>
                                        <li class="description">${doc.data().boardDescription}</li>
                                        <li class="dateSaved">${doc.data().savedDate}</li>
                                    </ul>
                                </div>
                            </button>
                        </div>`)
                    });
                })
                .catch((error) => { // catch errors
                    console.log("Error getting documents: ", error);
                });

        }
        cardSkeleton(); //invoke the function
    }
}



// TODO: Test (Menu Functions)
const openBoardMenu = function () {
    console.log("opening menu")
    // If no menu is already open
    if (menuOpen == false) {

        let boardName = null;
        let boardDescription = null;
        let boardFEN = null;
        let boardDate = null;
        currentBoardID = $(this).attr("id");

        // Set the save board menu to visible and the background to half transparency
        $(`#savedBoardMenu`).css("display", "block");
        $(`#titleArea`).css("opacity", "0.5");
        $(`#searchArea`).css("opacity", "0.5");
        $(`#boardCards`).css("opacity", "0.5");

        // Save the name of the clicked board
        currentBoard = $(this).attr("id");

        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").doc(currentBoardID).get().then(function (doc) {
            boardName = doc.data().boardName;
            boardDescription = doc.data().boardDescription;
            boardFEN = doc.data().boardFEN;
            boardDate = doc.data().savedDate;
        })
            // Populate the menu with the board's information
            .then(function () {
                $(`#menuTitle`).html(boardName);
                $(`#boardDescriptionText`).val(boardDescription);
                $(`#boardFEN`).html(boardFEN);
                $(`#dateSaved`).html(boardDate);
            })

            .catch(function (error) {
                console.log("Error getting document:", error);
            });

        // Set open menu to true to indicate a menu is open
        menuOpen = true;
    }
}

// TODO: Test (Menu Functions)
const closeBoardMenu = function () {

    // If the menu is open
    if (menuOpen == true) {

        // Set the save board menu to visible and the background to half transparency
        $(`#savedBoardMenu`).css("display", "none");
        $(`#titleArea`).css("opacity", "1");
        $(`#searchArea`).css("opacity", "1");
        $(`#boardCards`).css("opacity", "1");

        // Forget the name of the clicked board
        currentBoardCard = null;

        // Set open menu to true to indicate a menu is open
        menuOpen = false;
    }
}



// TODO: Test (Card Functions)
const editBoardCard = function () {

    // Enable the board name and description text boxes to be edited
    $(`#boardName`).prop("disabled", false);
    $(`#boardDescriptionText`).prop("disabled", false);

}

// TODO: Test (Card Functions)
const saveBoardCard = function () {

    // Get the board name and description
    let boardName = $(`#boardName`).val();
    let boardDescription = $(`#boardDescriptionText`).val();

    // Save the board to the database
    db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").doc(currentBoardID).update({
        boardName: boardName,
        boardDescription: boardDescription,
        savedDate: new Date().toISOString().split('T')[0],

    }).then(function () {

        // Disable editing the board name and description text boxes
        $(`#boardName`).prop("disabled", true);
        $(`#boardDescriptionText`).prop("disabled", true);


    }).catch(function (error) {

        // Catch any errors
        console.error("Error writing document: ", error);

    });

}



// TODO: Test (Call Functions)
const openBoardInEditor = function () {
    let boardFEN = null;
    let boardName = null;
    let boardDescription = null;

    // Save the board's FEN to the database
    function getCardFEN() {
        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").where("name", "==", currentBoardCard)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => { // get all recipes
                    boardFEN = doc.data().FEN;
                    boardName = doc.data().name;
                    boardDescription = doc.data().description;
                });
            })
            .catch((error) => { // catch errors
                console.log("Error getting documents: ", error);
            });
    }

    getCardFEN();

    db.collection("users").doc(uUid).update({
        currentFEN: boardFEN,
        currentBoardName: currentBoardName,
        currentBoardDescription: currentBoardDescription

    }).then(function () {
        // Call the analysis page
        window.location.href = "../pages/savedBoard.html";

    }).catch(function (error) {
        // Catch any errors
        console.error("Error writing document: ", error);
    });

}

// TODO: Test (Call Functions)
const openBoardInAnalyzer = function () {
    let boardFEN = null;
    let boardName = null;
    let boardDescription = null;

    // Save the board's FEN to the database
    function getCardFEN() {
        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").where("name", "==", currentBoardCard)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => { // get all recipes
                    boardFEN = doc.data().FEN;
                    boardName = doc.data().name;
                    boardDescription = doc.data().description;
                });
            })
            .catch((error) => { // catch errors
                console.log("Error getting documents: ", error);
            });
    }

    getCardFEN();

    db.collection("users").doc(uUid).update({
        currentFEN: boardFEN,
        currentBoardName: currentBoardName,
        currentBoardDescription: currentBoardDescription

    }).then(function () {
        // Call the analysis page
        window.location.href = "../pages/analysis.html";

    }).catch(function (error) {
        // Catch any errors
        console.error("Error writing document: ", error);
    });

}


// TODO: Test (Setup)
setup = function () {

    // Boards Functions
    populateBoardCards();
    $("body").on("click", "#searchButton", searchBoardCards);

    // Menu Functions
    $("body").on("click", ".openCard", openBoardMenu);
    $("body").on("click", ".closeCard", closeBoardMenu);

    // Card Functions
    $("body").on("click", ".edit", editBoardCard);
    $("body").on("click", ".save", saveBoardCard);

    // Call Functions
    $("body").on("click", ".openEditor", openBoardInEditor);
    $("body").on("click", ".openAnalysis", openBoardInAnalyzer);

}
$(document).ready(setup)