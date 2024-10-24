const TMDB_API_KEY = "839ae1e9d19093dbd59c75697bc8a0cc";
const movieContainer = document.getElementById("movie-container");
async function getMovieData(page = 50) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=ko&page=50`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}

let allMovies = [];

async function displayMovies() {
  const hansol = await getMovieData();
  hansol.results.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
            <div id="card">
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path
                }" alt="${movie.title}" class="poster">
                <h3 class="title">${movie.title}</h3>
                <p class="movie-rating">  ${movie.vote_average.toFixed(1)}</p>
            </div>
        `;
    movieContainer.appendChild(movieElement);
  });
}

displayMovies();

