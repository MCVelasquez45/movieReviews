const path = 'https://image.tmdb.org/t/p/w500/'

// Fetch movie data from backend
fetch('http://localhost:3500/movies')
  .then(res => res.json())
  .then(data => {
    dataFound(data);
    updateCarousel(data);
  })
  .catch(error => console.error('Error fetching movies:', error));

  function dataFound(getData) {
    console.log(getData);
    $('#displayMovies').empty(); // Clears previous results

    getData.forEach(item => {
        $('#displayMovies').append(`
            <div class='col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center'>
                <div class="card">
                    <img src="${path}${item.poster_path}" class="card-img-top" alt="${item.original_title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.original_title}</h5>
                        <p class="card-text">${item.overview}</p>
                        <p class="card-text"><strong>Release Date:</strong> ${item.release_date}</p>
                        <p class="card-text"><strong>Rating:</strong> ⭐ ${item.vote_average} / 10</p>
                    </div>
                </div>
            </div>
        `);
    });
}

// Dynamically Update Carousel
function updateCarousel(movies) {
    let carouselInner = $('#filmstripCarousel .carousel-inner');
    carouselInner.empty(); // Clear previous slides

    movies.forEach((movie, index) => {
        let activeClass = index === 0 ? "active" : "";
        let slide = `
            <div class="carousel-item ${activeClass}">
                <img class="d-block w-100" src="${path}${movie.backdrop_path}" alt="${movie.original_title}">
            </div>
        `;
        carouselInner.append(slide);
    });
}

// Append Static Jumbotron and Carousel
$('#carousel').append(`
    <div class="jumbotron jumbotron-fluid bg-dark">
        <div class="container">
            <h1 class="display-4 text-white text-center">Movie Reviews</h1>
            <p class="lead text-white text-center">Keep up to date with the latest movie reviews and gossip</p>
            <div id="filmstripCarousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <!-- Dynamically inserted slides -->
                </div>
                <a class="carousel-control-prev" href="#filmstripCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#filmstripCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    </div>
`);