const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();

router.get('/:searchTerm', (req, res) => {
  searchTerm = req.params.searchTerm;
  console.log('THIS THE SEARCH TERM SERVER SIDE', searchTerm);

  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&page=1`
      //`https://api.themoviedb.org/3/movie/76341?api_key=${process.env.API_KEY}`
      //`https://api.themoviedb.org/3/find/{external_id}?api_key=${process.env.API_KEY}&language=en-US&external_source=imdb_id`
      //`https://api.themoviedb.org/3/movie/550?api_key=${process.env.API_KEY}`
      //`https://api.themoviedb.org/3/discover/movie?/api_key=${process.env.API_KEY}&sort_by=popularity.desc&include_adult=false&page=1`
    )
    .then(response => {
      console.log(response.data.results);
      res.send(response.data.results);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
