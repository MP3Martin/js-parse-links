// -- Setup variables -- \\
let par_url = ""
let par_placeholder = ""
let par_type = ""
let error_missing_pars = "There are missing required parameters: "
let errored = 0
let placeholders = {}


function getPar(name, url) {
     if (!url) url = window.location.href;
     name = name.replace(/[\[\]]/g, "\\$&");
     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
         results = regex.exec(url);
     if (!results) return '';
     if (!results[2]) return '';
     return decodeURIComponent(results[2].replace(/\+/g, " "));
 }

$(document).ready(function() {
    $("#error_text").hide()
    $("#test_text").text('The "a" parameter is ' + getPar("a").length + ' characters long (' + getPar("a") + ')');

    // -- Get parameters -- \\
    par_url = getPar("url");
    par_placeholder = getPar("placeholder");
    par_type = getPar("type");

    required_placeholders = [par_url]

    if (par_url == '') {
        error_missing_pars += "<code>" + "url" + "</code>" + ", "
        errored = errored + 1
    }

    if (errored > 0) {
        $("#error_text").show()
        // $("#test_text").hide()
        $("#error_text").html(error_missing_pars.slice(0, -2) + "<br>")
    }
    var placeholders_list = par_placeholder.split(";")
    for(var placeholder1 of placeholders_list) {
        temp1 = placeholder1.split(",")
        one1 = temp1[0]
        two1 = temp1[1]
        placeholders[one1] = two1
    }
    alert(JSON.stringify(placeholders))
});
