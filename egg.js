
setup = function () {
    let firstStep = false;
    let secondStep = false;
    let thirdStep = false;

    $("#firstStep").click(function () {
        firstStep = true;
        secondStep = false;
        $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="#">.AI</a>`);
        console.log(firstStep);
    });
    $("#secondStep").click(function () {
        if (firstStep == true && secondStep == false) {
            secondStep = true;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="../egg.html">.AI</a>`);
        } else {
            firstStep = false;
            secondStep = false;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="#">.AI</a>`);
        }
        console.log(secondStep);
    });
    $("#thirdStep").click(function () {
        if (firstStep != true || secondStep != true) {
            firstStep = false;
            secondStep = false;
            $("#thirdStep").html(`<a id="thirdStep" class="navbar-brand" href="#">.AI</a>`);
        }
        console
    });
}
$(document).ready(setup)