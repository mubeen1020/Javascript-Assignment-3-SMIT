
async function fetchMoviesData() {
    try {
      const response = await fetch("./movies.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch movies data:", error);
    }
  }
 
 
  async function getRecommendations() {
   
    const moviesData = await fetchMoviesData();
    
 
    const genreInput = document.getElementById("genre").value;
    const ratingInput = document.getElementById("rating").value;
    const releaseYearInput = document.getElementById("releaseYear").value;
    const language = document.getElementById('language').value
  
 
    const filteredMovies = moviesData.filter(movie => {
      const genres = movie.genres;
      const ratings=[movie.vote_average]
      const years = [movie.release_date]
      const languages =movie.original_language
      console.log(years)
      if (genres !== null && genres !== undefined && Array.isArray(genres)) {
        return genres.includes(genreInput)  && ratings >= ratingInput || ratings.includes(ratingInput)
        && years.includes(releaseYearInput) && languages.includes(language)
      } else {
        return false;
      }
    });
  
 
    const recommendationsList = document.getElementById("recommendationsList");
    recommendationsList.innerHTML = "";
    if (filteredMovies.length > 0) {
      filteredMovies.forEach(movie => {
        const p = document.createElement("p");
        p.textContent = movie.title;
        recommendationsList.appendChild(p);
      });
    } else {
      const p = document.createElement("p");
      p.textContent = "No recommendations found.";
      recommendationsList.appendChild(p);
    }

    const recommendationsrank = document.getElementById("recommendationsrank");
    recommendationsrank.innerHTML = "";
    if (filteredMovies.length > 0) {
      filteredMovies.forEach(movie => {
        const p = document.createElement("p");
        const img = document.createElement("img");
        p.textContent = movie.id;
        img.src = movie.poster_path; 
        img.alt = movie.title; 
        img.width = 100; 
        img.height = 150;
        recommendationsrank.appendChild(p);
        // recommendationsrank.appendChild(img);
      });
    } else {
      const p = document.createElement("p");
      p.textContent = "No recommendations found.";
      recommendationsrank.appendChild(p);
    }
    
    const recommendationsyear = document.getElementById("recommendationsyear");
    recommendationsyear.innerHTML = "";
    if (filteredMovies.length > 0) {
      filteredMovies.forEach(movie => {
        const p = document.createElement("p");
        const year = movie.release_date.substring(0, 4); 
        p.textContent = year;
        recommendationsyear.appendChild(p);
      });
    } else {
      const p = document.createElement("p");
      p.textContent = "No recommendations found.";
      recommendationsyear.appendChild(p);
    }
    
  }
  

  
  
  