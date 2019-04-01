// Onclick for scrape button
$(document).on("click", "#scrapeBtn", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(res, req){
        window.location.reload(res.redirect("/"))
    });
});

