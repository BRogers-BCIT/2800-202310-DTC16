// This function initiates the page with a slide down animation

function setup() {
    setTimeout(() => {
        $(`main`).slideDown(1000);
        // slide down animation for the main content
    }, 1000)
};

$(document).ready(setup); // when document is ready, run setup function