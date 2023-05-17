let eggStep = 0;

function eggFeedback() {
    console.log(eggStep);
    if (eggStep >= 1) {
        $(`header`).removeClass(`bg-secondary`).addClass(`bg-primary`);
    } else {
        $(`header`).removeClass(`bg-primary`).addClass(`bg-secondary`);
    }
}


setup = function () {
    eggStep = 0;

    $("#firstStep").click(function () {
        eggStep = 1;
        $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="#">.AI</a>`);
        eggFeedback();
    });
    $("#secondStep").click(function () {
        if (eggStep == 1) {
            eggStep = 2;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="../egg.html">.AI</a>`);
        } else {
            eggStep = 0;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="#">.AI</a>`);
        }
        eggFeedback();
    });
    $("#thirdStep").click(function () {
        if (eggStep != 2) {
            eggStep = 0;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="#">.AI</a>`);
        }
        eggFeedback();
    });
}
$(document).ready(setup)