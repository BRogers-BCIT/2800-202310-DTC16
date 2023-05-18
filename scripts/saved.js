
// TODO: Implement (Boards Functions)
const populateBoardCards = function () {

}

// TODO: Implement (Boards Functions)
const searchBoardCards = function () {

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