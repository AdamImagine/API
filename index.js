function getSearch(searchString) {
    const url = (`https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchString}`);

    fetch(url, { 
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "d0bef37f09msh8f118a1f879360bp18e86djsne61b48b49dbf",
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
	}
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        }
    })
    .then(responseJson => displayResults(responseJson.data))
    
.catch(err => {
	$("#errMsg").text(`Please try again ${err.message}`);
});

}

function displayResults(parkList) {
    console.log(parkList);
    $('#results').html("");
    parkList.forEach(item =>{
        $('#results').append(`<h3>Title: ${item.title}</h3>`)
        $('#results').append(`<h4>Artist: ${item.artist.name}</h4>`)
    })
}

function getLyrics(artist, title) {

    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResultsL(responseJson))
      .catch(err => {
        $("#js-error-message").text(`Something went wrong: ${err.message}`);
      });
  }
  
  
  function displayResultsL(responseJson) {
    $("#resultsL").empty();
    $("#resultsL").append(`${responseJson.lyrics}`)
    $("#resultsL").removeClass("hidden");
  
  }
  

function init() {
    console.log("init ran")
    $("form").submit(e => {
        e.preventDefault();
        const searchString = $("#searchString").val()
        getSearch(searchString)
    })
    $("#lyricSub").click(event => {
        event.preventDefault();
        const artist = $("#query-artist").val();
        const title = $("#query-title").val();
        getLyrics(artist,title);
      })
}


$(init)