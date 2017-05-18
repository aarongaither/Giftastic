//Listeners galore----------------------------------

//add mouse over effect to gifBtns
$('#buttonRow').on('mouseenter', '.gifBtn', function(){
            $(this).addClass('animated pulse');
        }).on('mouseleave', '.gifBtn', function(){
            $(this).removeClass('animated pulse');
        });

//mouse over effect to animate gif
$('#gifRow').on('mouseenter', '.gifImage', function(){
            $(this).attr('src', $(this).attr('data-anim'));
        }).on('mouseleave', '.gifImage', function(){
            $(this).attr('src', $(this).attr('data-still'));
        });

//click handler for player buttons
$('#buttonRow').on('click', '.gifBtn', function(){
    //make API call, pass in player name as search term, clear gifs, add gifs
    fetchGifs($(this).attr('data-player'))
    //manage animations: remove entry classes, remove active classes, add active and animation classes
    $('.lightSpeedIn').removeClass('lightSpeedIn');
    $('.active').removeClass('active animated rubberBand');
    $(this).addClass('active animated rubberBand');
});

//click handler for player input form submit
$('#add-player').on('click', function(){
    //prevent form submition bologna
    event.preventDefault();
    //get user input
    let playerName = $('#player-input').val().trim();
    //if input is not blank and not already in the list (currently case sensitive)
    if (playerName !== '' && players.indexOf(playerName) === -1){
        players.push(playerName);
        $('#buttonRow').append($('<button>').addClass('gifBtn animated lightSpeedIn').attr('data-player', playerName).text(playerName));
    }
    $('#player-input').val('');

})


//globals--------------------------------------------
//get gif, triggered on btn click
function fetchGifs (player) {
    //player argument is a simple string as search item
    //get form values for API string
    let limit = $('#records').val();
    let rating = $('#rating').val();
    //make API string
    let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
      player + '&api_key=dc6zaTOxFJmzC&limit=' +
      limit +'&rating=' + rating;
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
        //clear any gifs on page
        $('#gifRow').empty();
        //for each item in the data array, get rating, get image urls, make page elements
        response.data.forEach(function(value){
            //alias url vars cause they're hella long
            let rating = value.rating;
            let still = value.images.fixed_height_still.url
            let anim = value.images.fixed_height.url
            //create elements, assign attributes
            let gifDiv = $('<div>').addClass('gifDiv animated flipInX');
            let ratingElem = $('<p>').addClass('rating').text('Rating: ' + rating);
            let gifElem = $('<img>').addClass('gifImage').attr('src', still )
            gifElem.attr('data-anim', anim).attr('data-still', still).attr('data-state', 'still');
            //attach elements to page
            $('#gifRow').append(gifDiv);
            gifDiv.append(gifElem).append(ratingElem);
        })
    })
}

//list to store starting gifBtns, ask how to not make this global
let players = ['Kawhi Leonard', 'James Harden', 'Russell Westbrook', 'Lebron James', 'Stephen Curry', 'Kevin Durant', 'Kyrie Irving',
                'Paul George', 'Damian Lillard', 'John Wall', 'Isaiah Thomas', 'Chris Paul'];


//init--------------------------------------------------
//loop through list, add buttons to page
players.forEach(function (value) {
    $('#buttonRow').append($('<button>').addClass('gifBtn').attr('data-player', value).text(value));
})


//I left fetchGifs func in global so i could call it from console for easy testing, just my rationale
//left player list in global since I push to it and check against it from a listener