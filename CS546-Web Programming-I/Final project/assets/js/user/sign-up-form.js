/**
 * Validates the form fields
 */
function validateSignUpForm() {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const username = document.getElementsByName("username")[0].value;
    const email = document.getElementsByName("email")[0].value;
    const password = document.getElementsByName("password")[0].value;
    const cPassword = document.getElementsByName("confirm-password")[0].value;
    
    // Validation
    var isFormValid = false;
    if (username.length < 1 || username.length > 10) showAlert(false, "Invalid username! Username could have maximum 10 letters.!");
    else if (email.length < 0) showAlert(false, "Please provide an email id.");
    else if (!regex.test(email)) showAlert(false, "Invalid email address!");
    else if (password.length < 1 || password.length > 8) showAlert(false, "Please provide a password!");
    else if (cPassword.length < 1 || cPassword.length > 8) showAlert(false, "Please provide a confirmation password!");
    else if (password !== cPassword) showAlert(false, "Passwords does not match.");
    else {
        const formData = {
            username: username,
            email: email,
            password: password
        };
        submitSignUpForm(formData);
    }
}

/**
 * Shows alert
 * @param {Boolean} isSuccess Success flag
 * @param {String} message An alert message
 */
function showAlert(isSuccess, message) {
    const alertBox = document.getElementById("alert");
    const alertClass = (isSuccess) ? "alert-success" : "alert-danger";
    alertBox.classList.add(alertClass);
    alertBox.textContent = message;
}

/**
 * Submits the form
 * @param {Object} formData Data to be passed in the database
 */
function submitSignUpForm(formData) {
    $.ajax({
        url: "/user/sign-up",
        type: "POST",
        data: JSON.stringify(formData),
        success: function(data) {
            console.log(data)

            showAlert(true, "Account successfully created");
            setTimeout(() => {
                window.location.href = '/user/profile'
            }, 600);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            if(xhr.status === 400) { // receiving 404 status code
                showAlert(false, thrownError);
            }
        },
        dataType: "json",
        contentType: "application/json"
    });
}