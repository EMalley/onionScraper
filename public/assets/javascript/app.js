// Onclick for scrape button
$(document).on("click", "#scrapeBtn", function () {
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function (res, req) {
    alert("Scraped Data");
    res.redirect("/")
  });
});


// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  // console.log(data)
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + '<a href= ' + data[i].link + '>' + '</a>' + "</p>");
    // console.log(data[i])
  }
});


// Whenever someone clicks
$(document).on("click", "#showNotes", function (event) {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (data) {
      var noteDiv = $("<div>")
      noteDiv.append("<h4>" + $(this.data.title) + "</h4>");
      noteDiv.append("<input id='titleInput' name='title' >");
      noteDiv.append("<textarea id='bodyInput' name='body'></textarea>");
      noteDiv.append("<button data-id='" + data._id + "' id='saveNote'>Save Note</button>");
      $("#notes").append(noteDiv);

      if (data.note) {
        $("#titleInput").val(data.note.title);
        $("#bodyInput").val(data.note.body);
      }
    });
});

  $(document).on("click", "#saveNote", function() {
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        console.log(data);
        $("#notes").empty();
      });

    $("#titleinput").val("");
    $("#bodyinput").val("");
  });