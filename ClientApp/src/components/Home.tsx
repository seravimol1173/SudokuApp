import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (

  <div className="site-content">
    <div className="game-flex-wrapper">
      <img  src="/Images/sudoku.jpg" className="img-style" alt="Play Sudoku Now!!"></img>
    </div>
    <form >
    <div className="game-flex-wrapper">
      <div className="game-controls-wrapper">
        
      </div>
      <div className="game-controls-wrapper">
        <button type="submit" formAction="/Sudoku" className="button play-game-button">Play</button>
      </div>     
      <div className="game-controls-wrapper">
        
      </div>     
    </div>
    
    </form>
    <div className="horizontal-placeholder">
         <p>&copy; Avimol Consulting  Copyright 2020 </p>
    </div>
  </div>
);

export default connect()(Home);
