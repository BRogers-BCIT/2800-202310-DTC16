let eggStep;
const homePage = `/index`;
const eggPage = `/egg`;

// this function changes colors of parts of the logo to
// indicate the progress of getting to the easter egg page

function eggFeedback() {

    if (eggStep >= 1) {
        $(`#firstStep img`).addClass(`logoInvert`);
        // turns the logo orange when first step is clicked
    } else {
        $(`#firstStep img`).removeClass(`logoInvert`);
        //  removes the orange color from the logo when
        // page gets refreshed
    }
    if (eggStep >= 2) {
        $(`#secondStep`).addClass(`deepBlue`); // turns "Mind" into blue
    } else {
        $(`#secondStep`).removeClass(`deepBlue`);
        // removes the blue color from "Mind" when
        // if first step is clicked after second step
    }
}

// this function sets up the click events
// for the logo to get to the easter egg page

let setup = function () {
        eggStep = 0;

    $("#firstStep").click(function () {
        eggStep = 1;
        $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="${homePage}">.AI</a>`);
        // ensures "AI" still redirects to home page when first step is clicked
        // but second step is not clicked
        eggFeedback();
    });
    $("#secondStep").click(function (event) {
        if (eggStep === 1) {
            event.preventDefault();
            eggStep = 2;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="${eggPage}">.AI</a>`);
            // ensures "AI" redirects to easter egg page 
            // when first and second step are clicked in order

        } else {
            eggStep = 0;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="${homePage}">.AI</a>`);
            // ensures "AI" redirects to home page when step two is clicked
            // before step one
        }
        eggFeedback();
    });
    $("#thirdStep").click(function () {
        if (eggStep !== 2) {
            eggStep = 0;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="${homePage}">.AI</a>`);
            // ensures "AI" still redirects to home page when third step is clicked
            // without clicking first and second step
        }
        eggFeedback();
    });
};
$(document).ready(setup); // when document is ready, run setup function