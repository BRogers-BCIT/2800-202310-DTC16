
setup = function () {
    let eggStep = 0;

    $("#firstStep").click(function () {
        eggStep = 1;
        $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="#">.AI</a>`);
        console.log(eggStep);
    });
    $("#secondStep").click(function () {
        if (eggStep == 1) {
            eggStep = 2;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="../egg.html">.AI</a>`);
        } else {
            eggStep = 0;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="#">.AI</a>`);
        }
        console.log(eggStep);
    });
    $("#thirdStep").click(function () {
        if (eggStep != 2) {
            eggStep = 0;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="#">.AI</a>`);
        }
        console.log(eggStep);
    });
}
$(document).ready(setup)