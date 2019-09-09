import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

//material-ui
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

class App extends Component {
  constructor(props) {
    super(props);
    this.setSearch = this.setSearch.bind(this);
  }

  state = {
    searchTerm: '',
    typing: false,
    typingTimeout: 0,
    rating: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    }
  };

  getMovies = event => {
    if (this.state.searchTerm !== '') {
      this.props.dispatch({
        type: 'FETCH_SEARCH',
        payload: this.state.searchTerm
      });
    } else {
      this.props.dispatch({
        type: 'CLEAR_SEARCH',
        payload: this.state.searchTerm
      });
    }
  };

  setSearch = event => {
    const self = this;

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    self.setState({
      searchTerm: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function() {
        self.getMovies(self.state.searchTerm);
      }, 200)
    });
  };

  setRating = (i, event) => {
    console.log(this.state.rating);
    console.log(event.target.value);
    
    console.log(i);
    this.setState({
      rating: {
        ...this.state.rating,
        [i]: event.target.value
      }
    });
  };

  render() {
    let searchList = this.props.movies.slice(0, 5).map((movie, i) => {
      return (
        <div key={i}>
          <img
            className="Poster"
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
          />
          <br />
          <Rating
            onChange={(event) => this.setRating(i, event)}
            name="half-rating"
            value={this.state.rating[i]}
            precision={0.5}
            size="small" 
          />
        </div>
      );
    });

    return (
      <div className="App">
        <div className="App-title">
          <h1>Spike Example</h1>
        </div>
        <div className="Search">
          <TextField
            onChange={this.setSearch}
            id="standard-search"
            label="Search movies..."
            value={this.state.searchTerm}
            type="search"
            margin="normal"
          />
        </div>
        <div className="Movies">{searchList}</div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    movies: store.movies
  };
};

export default connect(mapStateToProps)(App);
