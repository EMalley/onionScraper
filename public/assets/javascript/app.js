// get articles as a JSON
$.getJSON("/articles", function (data) {
    // console.log(data);
    for (var i = 0; i < data.length; i++) {
        $("#articles").appened("<p data-id='" + data[i]._id + "'>" + data[i]._title + "</p>")
    }
})

document.on("click", "p", function () {
    $("#notes").empty();
    var thisID = $(this).attr("data-id")

    $.ajax({
        method: "GET",
        url: "/articles/" + thisID
    }).then(function (data) {
        // console.log(data);
        $("#notes").appened("<h2>" + data.title + "</h2>")
        $("#notes").append("<input id='titleinput' name='title' >");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // If there is a note in the article
        if (data.note) {
            $("#titleinput").al(data.note.title);
            $("#bodyinput").al(data.note.body);
        }
    })
})


