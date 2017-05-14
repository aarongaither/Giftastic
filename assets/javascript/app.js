let players = ["Kawhi Leonard", "James Harden", "Russell Westbrook", "Lebron James", "Stephen Curry", "Kevin Durant", "Kyrie Irving"]

function makeBtns () {
    for (let i = 0; i < players.length; i++){
        $('#buttonRow').append($('<button>').addClass('gifBtn').attr('data-player', players[i]).text(players[i]));
    }
}

$(document).on("click", ".gifBtn", function(){
    //clear any gifs on page
    $('#gifRow').empty();
    fetchGifs($(this).attr('data-player'))
});


$(document).on("mouseenter", ".gifImage", function(){
    $(this).attr('src', $(this).attr('data-anim'));
    // .attr('data-state', 'animate');
});

$(document).on("mouseleave", ".gifImage", function(){
    $(this).attr('src', $(this).attr('data-still'));
    // .attr('data-state', 'still');
});

function fetchGifs (player) {
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      player + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        console.log(response);
        for (let i = 0; i < response.data.length; i++){
            //alias url vars
            let rating = response.data[i].rating;
            let still = response.data[i].images.fixed_height_still.url
            let anim = response.data[i].images.fixed_height.url
            //create elements, assign attributes
            let gifDiv = $('<div>').addClass('gifDiv');
            let ratingElem = $('<p>').addClass('rating').text("Rating: " + rating);
            let gifElem = $('<img>').addClass('gifImage').attr('src', still )
            gifElem.attr('data-anim', anim).attr('data-still', still).attr('data-state', 'still');
            //attach elements to page
            $('#gifRow').append(gifDiv);
            gifDiv.append(gifElem).append(ratingElem);
        }
    })
}

makeBtns();