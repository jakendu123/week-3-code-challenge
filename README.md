weekThreeCodeChallange
Start the JSON server:

json-server --watch db.json

Usage

Ensure the JSON server is running on http://localhost:3000.

Open the index.html file in your browser to view the application.

Core Features

1.Fetch and display a list of all movies. 2.Display the details of the first movie on page load. 3.Allow users to view details of any movie by clicking on the movie title. 4.Enable users to purchase tickets and update the number of available tickets.

JavaScript Code Explanation

1.The DOMContentLoaded event listener ensures that the DOM is fully loaded before executing the scripts. 2.fetchMovies() fetches the list of all movies and displays them in a list. 3.fetchMovieDetails(movieId) fetches and displays the details of a specific movie. 4.updateTicketsSold(movieId, ticketsSold) updates the number of tickets sold for a specific movie on the server and refreshes the movie details and list.
