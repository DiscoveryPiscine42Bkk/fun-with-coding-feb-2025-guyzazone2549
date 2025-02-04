$(document).ready(function() {
    function calculate() {
        let left = $("#left").val();
        let right = $("#right").val();
        let operator = $("#operator").val();
        left = Number(left);
        right = Number(right);

        if (isNaN(left) || isNaN(right) || left < 0 || right < 0 || !Number.isInteger(left) || !Number.isInteger(right)) {
            alert("Error :(");
            return;
        }

        if ((operator === "/" || operator === "%") && right === 0) {
            alert("It’s over 9000!");
            return;
        }

        let result;
        switch (operator) {
            case "+":
                result = left + right;
                break;
            case "-":
                result = left - right;
                break;
            case "*":
                result = left * right;
                break;
            case "/":
                result = left / right;
                break;
            case "%":
                result = left % right;
                break;
            default:
                alert("Error :(");
                return;
        }

        alert("Result: " + result);
        console.log(result);
    }

    $("#calculateBtn").click(function() {
        calculate();
    });
    setInterval(function() {
        alert("Please, use me...");
    }, 30000);
});
