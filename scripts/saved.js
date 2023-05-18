
// TODO: Implement (Boards Functions)
const populateBoardCards = function () {
    const uUid = localStorage.getItem('userUid')
    const uDisplayName = localStorage.getItem('userDisplayName')
    function cardSkeleton() {
        let cardNum = 0
        db.collection("users").doc(uUid).collection(uDisplayName + " savedBoards")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => { // get all chessboards
                    cardNum += 1
                    // populate a chess board to the page
                    $("#boardCards").append(`
                    <div id="${cardNum}">
                    <h3 id="title">${doc.data().savedName}</h3>

        <div id="boardDescription">
            <h3 id="descriptionLabel">&nbsp;&nbsp;Board Description:</h3>
            <textarea id="boardDescriptionText" placeholder="Board Description" disabled>${doc.data().description}</textarea>
        </div>
        <br>
        <div id="endButtons">

            <button class="boardCardButton" id="editBoardCardButton">Edit</button>

            <button class="boardCardButton" id="saveBoardCardButton">Save</button>

            <button class="savedBoardMenuButton" id="closeSaveMenuButton">Return to Saved Boards</button>

            <button class="savedBoardMenuButton" id="openBoardMenuButton">Open Board in Editor</button>

            <button class="savedBoardMenuButton" id="analyzeBoardMenuButton">Open Board in Analysis</button>
            </div>
                `)});
            })
            .catch((error) => { // catch errors
                console.log("Error getting documents: ", error);
            });

    }
    cardSkeleton(); //invoke the function
}

// TODO: Implement (Boards Functions)
const searchBoardCards = function () {
    const uUid = localStorage.getItem('userUid')
    const uDisplayName = localStorage.getItem('userDisplayName')
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
                    <div id="${cardNum}">
                    <h3 id="title">${doc.data().savedName}</h3>

        <div id="boardDescription">
            <h3 id="descriptionLabel">&nbsp;&nbsp;Board Description:</h3>
            <textarea id="boardDescriptionText" placeholder="Board Description" disabled>${doc.data().description}</textarea>
        </div>
        <br>
        <div id="endButtons">

            <button class="boardCardButton" id="editBoardCardButton">Edit</button>

            <button class="boardCardButton" id="saveBoardCardButton">Save</button>

            <button class="savedBoardMenuButton" id="closeSaveMenuButton">Return to Saved Boards</button>

            <button class="savedBoardMenuButton" id="openBoardMenuButton">Open Board in Editor</button>

            <button class="savedBoardMenuButton" id="analyzeBoardMenuButton">Open Board in Analysis</button>
            </div>
                `)
                });
            })
            .catch((error) => { // catch errors
                console.log("Error getting documents: ", error);
            });

    }
    cardSkeleton(); //invoke the function

}



// TODO: Implement (Menu Functions)
const openBoardMenu = function () {

}

// TODO: Implement (Menu Functions)
const closeBoardMenu = function () {

}



// TODO: Implement (Card Functions)
const editBoardCard = function () {

}

// TODO: Implement (Card Functions)
const saveBoardCard = function () {

}



// TODO: Implement (Call Functions)
const openBoardInEditor = function () {

}

// TODO: Implement (Call Functions)
const openBoardInAnalyzer = function () {

}



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