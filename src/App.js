import React, { Component } from 'react';
import Movie from './components/Movie.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    fetch('/data/movies.json')
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.movies) {
          this.setState({ movies: data.movies });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    return (
      <div className="ui main container">
        <header className="ui dividing header">
          <div className="ui two column grid">
            <div className="column">
              <h1>Movie list</h1>
            </div>
            <div className="column">
              <button class="positive ui button right floated">Randomize ratings</button>
            </div>
          </div>
        </header>
        <main>
          <div className="ui three column grid">
            {this.state.movies.map((movie, idx) => <Movie key={idx} {...movie} />)}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
