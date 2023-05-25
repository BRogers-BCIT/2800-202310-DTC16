// This function initiates the page with a slide down animation

function setup() {
    setTimeout(() => {
        $(`main`).slideDown(1000);
    }, 1000)
};

$(document).ready(setup);