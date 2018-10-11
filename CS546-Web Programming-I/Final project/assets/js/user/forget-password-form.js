/**
 * Validates the form fields
 */
function validateForgetPasswordForm() {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = document.getElementsByName("email")[0].value;
        
    // Validation
    var isFormValid = false;
    if (email.length < 0) showAlert(false, "Please provide an email id.");
    else if (!regex.test(email)) showAlert(false, "Invalid email address!");
    else {
        const formData = {
            email: email
        };
        submitForgetPasswordForm(formData);
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
function submitForgetPasswordForm(formData) {
    $.ajax({
        url: "/user/forget-password",
        type: "POST",
        data: JSON.stringify(formData),
        success: function(data) {
            showAlert(true, "New password for '" + data.email + "' is " + data.password);
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

