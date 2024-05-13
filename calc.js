let flag = 0;

function isNumber(char) {
    return /^\d$/.test(char);
}

document.getElementById("answer").readOnly = true;
let screen = document.getElementById("answer");
buttons = document.querySelectorAll("button");
let screenValue = "";
let lastScreenValue = "";
let maxItems = 6;
let isSign = true;

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
    // ... (same code as before)
});

window.onerror = function () {
    alert("PLEASE INPUT VALID EXPRESSION");
    screenValue = "";
    screen.value = screenValue;
    screen.classList.remove("negative"); // Remove negative class
    console.clear();
};

// ... (same code as before)

function checkForBracketMulti() {
    // ... (same code as before)

    if (eval(screenValue) !== undefined) {
        screen.value = eval(screenValue);
        lastScreenValue = screenValue;
        screenValue = screen.value;
        if (parseFloat(screen.value) < 0) {
            screen.classList.add("negative");
        } else {
            screen.classList.remove("negative");
        }
        // ... (same code as before)
    }
    flag = 1;
}
