// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

var password = document.getElementById("password");
var confirm_password = document.getElementById("confirm_password");

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function validatePassword() {
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Password don't match.");
    } else {
        confirm_password.setCustomValidity('');
    }
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;



