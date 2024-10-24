// ⭐
const TMDB_API_KEY = "839ae1e9d19093dbd59c75697bc8a0cc";

const movieContainer = document.getElementById("movie-container");
const searchInput = document.querySelector("#query");

// 모달창 관련 변수
const modalWindow = document.querySelector(".modal");
const modalMovieTitle = document.querySelector(".modal_info_title");
const modalMovieComment = document.querySelector(".modal_info_comment");
const modalMovieDate = document.querySelector(".modal_info_date");
const modalMovieRating = document.querySelector(".modal_info_rating");
const modalMovieImgItem = document.querySelector(".modal_img_item");
const modalCloseBtn = document.querySelector(".close_btn");

// 모든 영화
let allMovies = [];

// API 호출
async function getMovieData() {
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
    allMovies = data.results;
    displayMovies(allMovies);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}

getMovieData();

// 영화 정보 렌더링
function displayMovies(movies) {
  movieContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
            <div id="card" data-id="${movie.id}">
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

// 검색기능
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchValue)
  );
  displayMovies(filteredMovies);
});

// 모달창 렌더링 함수
function modalRenderMovies(movie) {
  modalMovieTitle.innerHTML = movie.title;
  modalMovieTitle.setAttribute("data-id", movie.id);
  modalMovieComment.innerHTML = movie.overview;
  modalMovieDate.innerHTML = movie.release_date;
  modalMovieRating.innerHTML = movie.vote_average;
  modalMovieImgItem.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  scrollDisable();
}

// 영화정보 클릭
movieContainer.addEventListener("click", (e) => {
  const clickedCard = e.target.closest("#card");
  if (clickedCard) {
    // 클릭된 영화의 ID 가져오기
    const clickedMovieId = parseInt(clickedCard.getAttribute("data-id"));
    const selectedMovie = allMovies.find(
      (movie) => movie.id === clickedMovieId
    );
    if (selectedMovie) {
      modalRenderMovies(selectedMovie);
      modalWindow.style.display = "block";
    }
  }
});

// 모달창 닫기 버튼
modalCloseBtn.addEventListener("click", () => {
  modalWindow.style.display = "none";
  scrollAble();
});

// 외부 스크롤 막기
function scrollDisable() {
  document.querySelector("body").classList.add("scroll_disable");
}

// 외부 스크롤 재작동
function scrollAble() {
  document.querySelector("body").classList.remove("scroll_disable");
}



