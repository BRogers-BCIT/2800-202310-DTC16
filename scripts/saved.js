var menuOpen = false;
var currentBoardCard = null;
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
                    $("#boardCards").append(`
                    <div id="${cardNum}">
                        <h3 id="title">${doc.data().boardName}</h3>

                        <div id="boardDescription">
                            <h3 id="descriptionLabel">&nbsp;&nbsp;Board Description:</h3>
                            <textarea id="boardDescriptionText" placeholder="Board Description" disabled>${doc.data().boardDescription}</textarea>
                        </div>

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
    if (menuOpen == true && jQuery("#searchName").val() != "") {
        let cardNum = 0
        let nameSearch = jQuery("#searchName").val();
        nameSearch = nameSearch.toLowerCase();
        function cardSkeleton() {
            db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").where("name", "==", nameSearch)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => { // get all recipes
                        cardNum += 1
                        // populate a recipe card to the page
                        $("#boardCards").append(`
                    
                `)
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
    // If no menu is already open
    if (menuOpen == false) {

        // Set the save board menu to visible and the background to half transparency
        $(`#savedBoardMenu`).css("display", "block");
        $(`#titleArea`).css("opacity", "0.5");
        $(`#searchArea`).css("opacity", "0.5");
        $(`#boardCards`).css("opacity", "0.5");

        // Save the name of the clicked board
        currentBoardCard = $(this).find(`#title`).text()

        // Populate the menu with the board's information
        $(`#boardName`).val($(this).find(`#title`).text());
        $(`#boardDescriptionText`).val($(this).find(`#boardDescriptionText`).text());

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
    db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards").doc(boardName).update({
        boardName: boardName,
        boardDescription: boardDescription,

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
    $("body").on("click", ".search", searchBoardCards);

    // Menu Functions
    $("body").on("click", ".boardCard", openBoardMenu);
    $("body").on("click", ".close", closeBoardMenu);

    // Card Functions
    $("body").on("click", ".edit", editBoardCard);
    $("body").on("click", ".save", saveBoardCard);

    // Call Functions
    $("body").on("click", ".editCard", openBoardInEditor);
    $("body").on("click", ".analyzeCard", openBoardInAnalyzer);

}
$(document).ready(setup)