const API_KEY = "27389960";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", searchMovie);


searchInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchMovie();
  }
});

async function searchMovie() {
  const title = searchInput.value.trim();

  if (title === "") {
    resultDiv.innerHTML = "<p>Введіть назву фільму!</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Завантаження...</p>";

  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === "False") {
      resultDiv.innerHTML = `<p>Нічого не знайдено 😕</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <h2>${data.Title} (${data.Year})</h2>
      <img src="${data.Poster}" alt="${data.Title}" style="max-width:200px;">
      <p><strong>Рейтинг IMDb:</strong> ${data.imdbRating}</p>
      <p><strong>Жанр:</strong> ${data.Genre}</p>
      <p><strong>Режисер:</strong> ${data.Director}</p>
      <p><strong>Опис:</strong> ${data.Plot}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>Сталася помилка. Спробуй ще раз.</p>";
    console.error(error);
  }
}