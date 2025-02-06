$(document).ready(function() {
    function getNewColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    $("#changeColor").click(function() {
        $("body").css("background-color", getNewColor());
    });
});
