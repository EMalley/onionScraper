// Onclick for scrape button
$(document).on("click", "#scrapeBtn", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(res, req){
      alert("Scraped Data")
        res.redirect("/")
    });
});

// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + '<a href= ' + data[i].link +'>' + '</a>' + "</p>");
      console.log(data[i])
    }
  });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", "h4", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    console.log(thisId)
      .then(function(data) {
        console.log(data);
        $("#notes").append("<h4>" + $(this.data.title) + "</h4>");
        console.log($(this))
        // $("#notes").append("<input id='titleinput' name='title' >");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // $(document).on("click", "#savenote", function() {
  //   var thisId = $(this).attr("data-id");
  
  //   // Run a POST request to change the note, using what's entered in the inputs
  //   $.ajax({
  //     method: "POST",
  //     url: "/articles/" + thisId,
  //     data: {
  //       title: $("#titleinput").val(),
  //       body: $("#bodyinput").val()
  //     }
  //   })
  //     .then(function(data) {
  //       console.log(data);
  //       $("#notes").empty();
  //     });
  
  //   $("#titleinput").val("");
  //   $("#bodyinput").val("");
  // });