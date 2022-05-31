// -- Setup variables -- \\
let par_url = ""
let par_placeholder = ""
let par_type = ""
let final_url = ""
let error_missing_pars = "There are missing required parameters: "
let error_invalid_url = "The url is invalid: "
let misc_error = ""
let errored = 0
let placeholders = {}
let urls = {}
let pinged_urls = []
let done_urls_not_filtered = {}
let done_urls = {}
let i_56625525252 = 0
let i_56625298252 = 0


function getPar(name, url) {
     if (!url) url = window.location.href;
     name = name.replace(/[\[\]]/g, "\\$&");
     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
         results = regex.exec(url);
     if (!results) return '';
     if (!results[2]) return '';
     return decodeURIComponent(results[2].replace(/\+/g, " "));
 }

const isUrl = string => {
    try { return Boolean(new URL(string)); }
    catch(e){ return false; }
}

$(document).ready(function() {
    $("#error_text").hide()
    // $("#test_text").text('The "a" parameter is ' + getPar("a").length + ' characters long (' + getPar("a") + ')');

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
        $("#loading").hide()
        $("#error_text").show()
        // $("#test_text").hide()
        $("#error_text").html(error_missing_pars.slice(0, -2) + "<br>")
    } else {
        var placeholders_list = par_placeholder.split(";")
        for(var placeholder1 of placeholders_list) {
            temp1 = placeholder1.split(",")
            one1 = temp1[0] // placeholder name
            two1 = temp1[1] // placeholder value
            
            // If placeholder value is url
            try {
                if (isUrl(two1.split("|")[0])) {
                    // console.log(two1 + " is an url")
    
                    temp8928 = two1 + ""
    
                    urls[two1.split("|")[0]] = temp8928.split("|").slice(1).join("|")
                }
            } catch (e) {
                // nothing
            }
             
            placeholders[one1] = two1
        }

        // console.log(urls)
        
        
        
        final_url = par_url

        $("#error_text").show()
        misc_error += "Connecting to: "
        for (i of Object.keys(urls)) {
            misc_error += "<code>" + i + "</code>" + ", "
        }
        $("#error_text").html("<br>" + misc_error.slice(0, -2) + "<br>")

        Promise.all(Object.keys(urls).map(url => fetch(url.replaceAll("??", "&"))))
        .then(resp => Promise.all( resp.map(r => r.json()) ))
        .then(result => {
            pinged_urls = result;
            
            $("#error_text").hide()

            // create * done_urls_not_filtered *
            for (const [key, value] of Object.entries(urls)) {
                done_urls_not_filtered[Object.keys(urls)[i_56625525252]+"|"+Object.values(urls)[i_56625525252]] = pinged_urls[i_56625525252]
                i_56625525252++
            }
            
            // create * done_urls *
            for (const [key, value] of Object.entries(urls)) {
                filtered_resp = done_urls_not_filtered[Object.keys(urls)[i_56625298252]+"|"+Object.values(urls)[i_56625298252]]
                if (Object.values(urls)[i_56625298252] === "") {
                    add566512 = "";
                } else {
                    add566512 = "|"+Object.values(urls)[i_56625298252]
                }
                
                obj_separators = Object.keys(urls)[i_56625298252]+add566512
                obj_separators = obj_separators.split("|").slice(1)
                
                obj_separators.forEach(function (item, index) {
                    try {
                        filtered_resp = filtered_resp[item]
                    } catch (e) {
                        let filtered_resp = e
                    }
                });
                
                console.log(filtered_resp)
        
                done_urls[Object.keys(urls)[i_56625298252]+add566512] = filtered_resp
                i_56625298252++
            }
            
            // replace placeholders with pinged urls
            for (let [key, value] of Object.entries(done_urls)) {
                // escape double quotes
                value = value.replaceAll("\"", "\"")
                // console.log("Key is " + key + " and value is " + value)
                placeholders = JSON.stringify(placeholders)
                placeholders = placeholders.replace(key, value)
                placeholders = placeholders.replaceAll("[object Object]", "!ERR!")
                // console.log("Placeholders: " + placeholders)
                placeholders = JSON.parse(placeholders)
            }

            for (const [placeholder2, value] of Object.entries(placeholders)) {
                // var value = placeholders[placeholder2];
                
                final_url = final_url.replace("{" + placeholder2 + "}", value)
            }
    
            // replace special cahrs
            final_url = final_url.replaceAll("'semi'", ";")
            final_url = final_url.replaceAll("'comma'", ",")
            final_url = final_url.replaceAll("'amp'", "&")
             
            if (isUrl(final_url)) {
                    // '? works as & in url parameters
                    final_url = final_url
                    if (par_type === "" || par_type === "redirect") {
                         window.location.replace(final_url)
                    } else if (par_type === "display") {
                         $("#loading").hide()
                         $("#error_text").show()
                         misc_error = ""
                         misc_error += final_url
                         $("#error_text").html(misc_error + "<br>")
                    }
                    
                } else {
                    errored = errored + 1
                    $("#loading").hide()
                    $("#error_text").show()
                    error_invalid_url += "<code>" + final_url + "</code>"
                    $("#error_text").html(error_invalid_url + "<br>")
                    // alert(final_url)

                    if (par_type === "display") {
                         $("#loading").hide()
                         $("#error_text").show()
                         misc_error = ""
                         misc_error += final_url
                         $("#error_text").html(misc_error + "<br>")
                    }
                }
        })
        .catch((error) => {
            $("#error_text").hide()
            console.error(error);
            errored = errored + 1
            $("#loading").hide()
            $("#error_text").show()
            misc_error = ""
            misc_error += "<code>" + error + "</code>" + "<br><br>" + "The browser likely can't reach one of the servers or the url is incorrectly formatted."
            $("#error_text").html(misc_error + "<br>")
        });
        
    }
    
});
