$(document).ready(function() {
    let colornum = 0;
    const colors = ["red", "green", "blue"];
    
    $("#balloon").click(function() {
        let sizepx = parseInt($("#balloon").css("width"));
        if (sizepx < 420) {
            $("#balloon").css({
                "width": (sizepx + 10) + "px",
                "height": (sizepx + 10) + "px"
            });
        } else {
            $("#balloon").css({
                "width": "200px",
                "height": "200px"
            });
        }
        $("#balloon").css("background-color", colors[colornum]);
        colornum = (colornum + 1) % colors.length;
    });

    $("#balloon").mouseleave(function() {
        let sizepx = parseInt($("#balloon").css("width"));
        if (sizepx > 200) {
            $("#balloon").css({
                "width": (sizepx - 5) + "px",
                "height": (sizepx - 5) + "px"
            });
        }
        colornum = (colornum - 1 + colors.length) % colors.length;
        $("#balloon").css("background-color", colors[colornum]);
    });
});
