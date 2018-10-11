/**
 * Validates the form fields
 */
function validateLoginForm() {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = document.getElementsByName("email")[0].value;
    const password = document.getElementsByName("password")[0].value;
    
    // Validation
    var isFormValid = false;
    if (email.length < 0) showAlert(false, "Please provide an email id.");
    else if (!regex.test(email)) showAlert(false, "Invalid email address!");
    else if (password.length < 1 || password.length > 8) showAlert(false, "Please provide a password!");
    else {
        const formData = {
            email: email,
            password: password
        };
        submitLoginForm(formData);
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
function submitLoginForm(formData) {
    $.ajax({
        url: "/user/login",
        type: "POST",
        data: JSON.stringify(formData),
        success: function(data) {
            showAlert(true, "User logged in successfully!");
            setTimeout(() => {
                window.location.href = '/user/profile'
            }, 600);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            if(xhr.status === 400) { // receiving 404 status code
                showAlert(false, thrownError.message);
            }
        },
        dataType: "json",
        contentType: "application/json"
    });
}

