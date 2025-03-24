document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();
  fetchMovieDetails(1);
});

function fetchMovies() {
  fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((movies) => {
      const filmsList = document.getElementById("films");
      filmsList.innerHTML = ""; // Clear any existing content
      movies.forEach((movie) => {
        const li = document.createElement("li");
        li.textContent = movie.title;
        li.className = "film item";
        li.addEventListener("click", () => {
          fetchMovieDetails(movie.id);
        });
        filmsList.appendChild(li);
      });
    });
}

function fetchMovieDetails(movieId) {
  fetch(`http://localhost:3000/films/${movieId}`)
    .then((response) => response.json())
    .then((movie) => {
      document.getElementById("poster").src = movie.poster;
      document.getElementById("title").textContent = movie.title;
      document.getElementById(
        "runtime"
      ).textContent = `Runtime: ${movie.runtime} minutes`;
      document.getElementById(
        "showtime"
      ).textContent = `Showtime: ${movie.showtime}`;
      const availableTickets = movie.capacity - movie.tickets_sold;
      document.getElementById(
        "available-tickets"
      ).textContent = `Available Tickets: ${availableTickets}`;

      const buyButton = document.getElementById("buy-ticket");
      buyButton.disabled = availableTickets === 0;
      buyButton.textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";

      buyButton.onclick = () => {
        if (availableTickets > 0) {
          updateTicketsSold(movieId, movie.tickets_sold + 1);
        }
      };
    });
}

function updateTicketsSold(movieId, ticketsSold) {
  fetch(`http://localhost:3000/films/${movieId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tickets_sold: ticketsSold }),
  })
    .then((response) => response.json())
    .then((movie) => {
      fetchMovieDetails(movieId); // Refresh movie details
      fetchMovies(); // Refresh movie list
    });
}
