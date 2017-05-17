let players = ["Kawhi Leonard", "James Harden", "Russell Westbrook", "Lebron James", "Stephen Curry", "Kevin Durant", "Kyrie Irving"]

//function to add buttons to page
function makeBtns () {
    for (let i = 0; i < players.length; i++){
        $('#buttonRow').append($('<button>').addClass('gifBtn').attr('data-player', players[i]).text(players[i]));
    }
}


function checkPlayer (lastName) {
    let playerURL = "https://api.suredbits.com/nba/v0/players/";
    $.ajax({
      url: playerURL + lastName,
      method: "GET"
    }).done(function(response) {
        console.log("checkPlayer", response);
        return response;
    })

}

//click handler for player buttons
$(document).on("click", ".gifBtn", function(){
    //clear any gifs on page
    $('#gifRow').empty();
    fetchGifs($(this).attr('data-player'))
});

//click handler for player input form submit
$('#add-player').on("click", function(){
    event.preventDefault();
    let playerName = $('#player-input').val().trim();
    checkPlayer(playerName);
    if (playerName !== '' && players.indexOf(playerName) === -1){
        players.push(playerName);
        $('#buttonRow').append($('<button>').addClass('gifBtn').attr('data-player', playerName).text(playerName));
    }
    $('#player-input').val('');
})

//add mouse over effect to animate gif
$(document).on("mouseenter", ".gifImage", function(){
    $(this).attr('src', $(this).attr('data-anim'));
});

//on mouseleave return gif to still version
$(document).on("mouseleave", ".gifImage", function(){
    $(this).attr('src', $(this).attr('data-still'));
});

//get gif, triggered on btn click
function fetchGifs (player) {
    let limit = $('#records').val();
    let rating = $('#rating').val();
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      player + "&api_key=dc6zaTOxFJmzC&limit=" +
      limit +"&rating=" + rating;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        console.log(response);
        for (let i = 0; i < response.data.length; i++){
            //alias url vars cause they're hella long
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

//call the makeBtns func to populate the page
makeBtns();