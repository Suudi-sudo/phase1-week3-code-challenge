

// your code here
document.addEventListener("DOMContentLoaded", () => { 
  let currentMovieId; // declaring variables
  let currentTicketsSold; 
  let currentCapacity; 
  function getMovieDetails() {
      fetch('http://localhost:3000/films/') 
          .then(response => response.json())
          .then(movie => {
              
              currentMovieId = movie.id; 
              currentTicketsSold = movie.tickets_sold; // sold tickets
              currentCapacity = movie.capacity; 
              updateMovieDetails(movie); /function to update movie details/ })
          
          .catch(error => console.error('Error fetching movie details:', error));}
  
  function updateMovieDetails(movie) {
      const availableTickets = movie.capacity - movie.tickets_sold;
      // overwriting the documents using the textContent
      document.getElementById('movie-title').textContent = movie.title;
      document.getElementById('movie-runtime').textContent = movie.runtime;
      
      document.getElementById('movie-showtime').textContent = movie.showtime;
      document.getElementById('movie-tickets').textContent = availableTickets;
      document.getElementById('film-info').textContent = movie.description;
      document.getElementById('movie-poster').src = movie.poster;
      
      const buyButton = document.getElementById("buy-ticket");
      buyButton.onclick = () => {
          // onclicking, the button
          if (availableTickets > 0) {
              updateTicketsSold(currentMovieId, currentTicketsSold + 1);
          } else {
              alert('No more tickets available for this movie.'); 
          }
      };}
      


  function getAllMovies() {
      fetch('http://localhost:3000/films') 
          .then(response => response.json())
          .then(movies => {
              const filmsList = document.getElementById('films');
              filmsList.innerHTML = '';
              // Loop on the movie data
              
              movies.forEach(movie => {
                  const li = document.createElement('li');
                  li.classList.add('film', 'item');
                  li.textContent = movie.title;
                  // clicking event will load when i clicked on
                  li.addEventListener('click', () => displayMovieDetails(movie));
                  filmsList.appendChild(li);
              });})
          .catch(error => console.error('Error fetching movies:', error));
  }
  function displayMovieDetails(movie) {

      currentMovieId = movie.id; // movie id
      currentTicketsSold = movie.tickets_sold; // ticket sold
      currentCapacity = movie.capacity; // capacity
      updateMovieDetails(movie); // function for movie details
  }
  
  function updateTicketsSold(movieId, newTicketsSold) {
      fetch(`http://localhost:3000/films/${movieId}`, { // Adding backticks around the URL
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              tickets_sold: newTicketsSold,
          }),})
      .then(response => response.json())
      .then(updatedMovie => {
          
          currentTicketsSold = updatedMovie.tickets_sold; // Updating current tickets sold
          const availableTickets = updatedMovie.capacity - updatedMovie.tickets_sold;
          document.getElementById('movie-tickets').textContent = availableTickets;
          // Disabling button if all movie tickets are sold
          document.getElementById('buy-ticket').disabled = availableTickets <= 0;
          
          if (availableTickets <= 0) {
              alert('Tickets sold out!');
          } else {
              alert('Ticket successfully bought!');}
      })
      .catch(error => console.error('Error updating tickets sold:', error));
  }
  
  getAllMovies();
  getMovieDetails();


      // Creating the delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      
      deleteButton.addEventListener('click', () => {
        // Removing film from the server
        fetch(`http://localhost:3000/films/${film.id}`, 
          {
          method: 'DELETE'
        }).then(() => {
          // Removing the film from the list
          filmItem.remove();
        });
      });
    
      filmItem.appendChild(deleteButton);
      filmList.appendChild(filmItem);
     
});