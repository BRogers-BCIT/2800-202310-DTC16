let eggStep = 0;
const homePage = `../index.html`;
const eggPage = `../egg.html`;

function eggFeedback() {
    console.log(eggStep);
    if (eggStep >= 1) {
        $(`#firstStep img`).addClass(`logoInvert`);
    } else {
        $(`#firstStep img`).removeClass(`logoInvert`);
    }
    if (eggStep >= 2) {
        $(`#secondStep`).addClass(`deepBlue`);
    } else {
        $(`#secondStep`).removeClass(`deepBlue`);
    }
}


setup = function () {
    eggStep = 0;

    $("#firstStep").click(function () {
        eggStep = 1;
        $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="${homePage}">.AI</a>`);
        eggFeedback();
    });
    $("#secondStep").click(function (event) {
        if (eggStep == 1) {
            event.preventDefault();
            eggStep = 2;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="${eggPage}">.AI</a>`);
        } else {
            eggStep = 0;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="${homePage}">.AI</a>`);
        }
        eggFeedback();
    });
    $("#thirdStep").click(function () {
        if (eggStep != 2) {
            eggStep = 0;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="${homePage}">.AI</a>`);
        }
        eggFeedback();
    });
}
$(document).ready(setup)