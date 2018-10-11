function searchBar() {
	var search = document.getElementsByName("searchInput")[0].value;
	let formData = {
		inp: search
	}
	getSearchResults(formData, 'searchbar');
}

function filter() {
	let techList = [];

	var javaInput = document.getElementById("java");    
	var pythonInput = document.getElementById("python");
	var htmlInput = document.getElementById("html");

	if(javaInput.checked == false) techList.pop("Java");
	if(pythonInput.checked == false) techList.pop("Python");
	if(htmlInput.checked == false) techList.pop("HTML");

	if(javaInput.checked == true) techList.push("Java");
	if(pythonInput.checked == true) techList.push("Python");
	if(htmlInput.checked == true) techList.push("HTML");
	
	let formData = {
		inp: techList
	}
	getSearchResults(formData, 'filter');
}

function getSearchResults(formData, param) 
{
    $.ajax({
        url: `/info/job/${param}`,
        type: "POST",
        data: JSON.stringify(formData),
        success: function(data) {
			console.log(data.data);
            getHTML(data.data);
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

function getHTML(data) {
    var str = '';
    for (let i = 0; i < data.length; i++) {
        str += '<li><article class="company">' +
				'<h2>' + 
					'<a href="/info/companyDetails/' + data[i]._id + '">' + data[i].name + '</a>' + ' - ' + 
				'</h2>'
                getList(data[i].projects) +
                '</article></li>';
    }
    document.getElementById("companyList").innerHTML = str;
}

function getList(projects) {
    var str = '';
    for (var i = 0; i < projects.length; i++) {
        str += '<div><h3><a href="/info/jobDetails/' + projects[i]._id +'>'+ projects[i].position + '</a></h3><div>';
    }
    return str;
}