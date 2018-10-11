/**
 * Validates the form fields
 */
function validateWorkspaceReviewForm(id) {
    const comment = document.getElementsByName("comment")[0].value;
    const rating =  document.getElementsByName("rating")[0].value.toString();

    // Validation
    var isFormValid = false;
    if (comment.length < 1) showAlert(false, "Please enter a comment!");
    else if (rating.length < 1) showAlert(false, "Please provide a rating.");
    else {
        const formData = {
            comment: comment,
            rating: rating
        };
        submitWorkspaceReviewForm(formData, id);
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
function submitWorkspaceReviewForm(formData, id) {
    $.ajax({
        url: `/user/workspace-review/${id}`,
        type: "POST",
        data: JSON.stringify(formData),
        success: function(data) {
            showAlert(true, "Review has been added successfully!");
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