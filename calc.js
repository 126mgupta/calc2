let flag = 0;

function isNumber(char) {
    return /^\d$/.test(char);
}

document.getElementById("answer").readOnly = true; //set this attribute in Html file
let screen = document.getElementById("answer");
buttons = document.querySelectorAll("button");
let screenValue = "";
let maxItems = 6;

for (item of buttons) {
    item.addEventListener("click", (e) => {
        buttonText = e.target.innerText;
        // multiply
        if (buttonText == "x" && !isSign) {
            if (flag == 1) {
                flag = 0;
            }
            buttonText = "*";
            isSign = true;
            screenValue += buttonText;
            screen.value = screenValue;
        // clear
        } else if (buttonText == "C") {
            if (flag == 1) {
                flag = 0;
            }
            screenValue = "";
            screen.value = screenValue;
            screen.classList.remove("negative"); // Remove negative class
            isSign = true;
        // backspace
        } else if (buttonText == "CE") {
            if (flag == 1) {
                flag = 0;
            }
            if (screenValue.length > 0) { // Check if screenValue is not empty
                screenValue = screenValue.slice(0, -1); // Remove the last character
            }
            screen.value = screenValue;
            screen.classList.remove("negative"); // Remove negative class
            isSign = true;
        // equals
        } else if (buttonText == "=") {
            checkForBracketMulti();
            if (parseFloat(screen.value) < 0) {
                screen.classList.add("negative");
            } else {
                screen.classList.remove("negative");
            }
        // divide
        } else if (buttonText == "÷" && !isSign) {
            if (flag == 1) {
                flag = 0;
            }
            buttonText = "/";
            isSign = true;
            screenValue += buttonText;
            screen.value = screenValue;
        // percent
        } else if (buttonText == "%" && !isSign) {
            const percentage = parseFloat(screenValue) / 100;
            screenValue = percentage.toString();
            screen.value = screenValue;
        // sqrt
        } else if (buttonText == "√" && !isSign) {
            const sqrt = Math.sqrt(parseFloat(screenValue));
            screenValue = sqrt.toString();
            screen.value = screenValue;
        // pi
        } else if (buttonText == "π") {
            screenValue += "3.14159265359";
            screen.value = screenValue;
        // parenthesis
        } else if(buttonText=="(" || buttonText==")") {
            if(flag==1){
                flag =0;
            }
            screenValue+=buttonText;
            screen.value=screenValue;
        // neg
        } else if (buttonText == "+/-") {
            if (screenValue !== "0") {
                if (screenValue[0] !== "-") {
                    screenValue = "-" + screenValue;
                } else {
                    screenValue = screenValue.slice(1);
                }
                screen.value = screenValue;
            }
        // exponent
        } else if (buttonText == "x²") {
            const currentNumber = parseFloat(screenValue);
            const exponent = prompt("Enter the exponent value:");
            const newNumber = Math.pow(currentNumber, exponent);
            screenValue = newNumber.toString();
            screen.value = screenValue;
        } else if (isNumber(buttonText)) {
            if (flag == 1) {
                screenValue = buttonText;
                flag = 0;
            } else {
                screenValue += buttonText;
            }
            screen.value = screenValue;
            isSign = false;
            screen.classList.remove("negative"); // Remove negative class
        } else {
            if (flag == 1) {
                flag = 0;
            }
            if (!isSign) {
                screenValue = screen.value + buttonText;
                screen.value = screenValue;
                isSign = true;
            }
            screen.classList.remove("negative"); // Remove negative class
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.shiftKey == 57) {
        event.key = "(";
    } else if (event.shiftKey == 48) {
        event.key = ")";
    } else if (event.shiftKey == 53) {
        event.key = "%";
    }
    if (event.keyCode == 88) {
        screenValue += "*";
        screen.value = screenValue;
    }
    if (
        event.key <= 9 ||
        event.key == "+" ||
        event.key == "-" ||
        event.key == "*" ||
        event.key == "." ||
        event.key == "/" ||
        event.key == "%" ||
        event.key == "(" ||
        event.key == ")"
    ) {
        screenValue += event.key;
        screen.value = screenValue;
    }
    if (event.keyCode == 13 || event.keyCode == 187) {
        checkForBracketMulti(); // automatically evaluates if no brackets
    } else if (event.keyCode == 46) {
        screenValue = "";
        screen.value = screenValue;
        console.clear();
    } else if (event.keyCode == 8) {
        screenValue = screenValue.slice(0, -1);
        screen.value = screenValue;
    } else if (event.keyCode == 67) {
        screenValue = "";
        screen.value = screenValue;
        console.clear();
    } else if (event.keyCode == 82) {
        location.reload();
    }
});

window.onerror = function () {
    screenValue = "";
    screen.value = screenValue;
    console.clear();
};

window.onBracketMultiplication = function () {
    screenValue = addStr(screen.value, screen.value.indexOf("("), "*");
    screen.value = eval(screenValue);
    let calcHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
    if(calcHistory.length >= maxItems){
        calcHistory.shift();
    }
    calcHistory.push({screenValue, result : screen.value});
    localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
};

function addStr(str, index, stringToAdd) {
    return (
        str.substring(0, index) + stringToAdd + str.substring(index, str.length)
    );
}

function checkForBracketMulti() {
    // Check if there's a number directly infront of a bracket
    if (
        screen.value.includes("(") &&
        !isNaN(screen.value.charAt(screen.value.indexOf("(") - 1))
    ) {
        window.onBracketMultiplication();
        return;
    } else {
        screen.value = eval(screenValue);
        let calcHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
        if(calcHistory.length >= maxItems){
            calcHistory.shift();
        }
        calcHistory.push({screenValue, result : screen.value});
        localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
    }
    flag = 1;
}