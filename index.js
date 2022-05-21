// -- Setup variables -- \\
let par_url = ""
let par_placeholder = ""
let par_type = ""
let error_missing_pars = "There are missing required parameters: "
let errored = 0


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

    for ( let placeholder of required_placeholders ) {

        if (placeholder == '') {
            error_missing_pars += "<code>" + placeholder + "</code>" + ", "
            errored = errored + 1
        }
    }

    if (errored > 0) {
        $("#error_text").show()
        // $("#test_text").hide()
        $("#error_text").text(error_missing_pars)
    }
});
