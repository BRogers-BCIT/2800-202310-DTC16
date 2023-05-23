function setup() {
    console.log("analysis.js loaded");
    setTimeout(() => {
        $(`main`).slideDown(1000);
    }, 1000)
}

$(document).ready(setup);