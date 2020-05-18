import React from 'react';
import { connect } from 'react-redux';


let level = "Easy";
var matrixsize = 0;

class FlipCards extends React.Component{
    constructor(props:any){
        super(props);

        this._onSelect = this._onSelect.bind(this);
        
        
    }
    
    state = {
        loading: false,
        matrixsizeS: 0
    }
    _onSelect(event: any) {
        // this.setxState({level: event.target.value})
        
        level = event.target.value;
       // let matrixsize = 0;
        switch(level){
            case "Easy": matrixsize = 4;
            break;
            case "Medium": matrixsize = 6;
            break;
            case "Hard": matrixsize = 8;
            break;
            case "Expert": matrixsize = 10;
            break;
            case "Insane": matrixsize = 14;
            break;
        }
        this.setState({matrixsizeS: matrixsize});
    }

    renderboard(){

        var gameboard = [[0],[0]];
        var i = 0;
        var j = 0;
        for(i=0;i<matrixsize;i++){
            if(!gameboard[i]) gameboard[i] = [];
            for(j=0;j<matrixsize;j++){
                gameboard[i][j] = i;
            }
        }
        console.log('perrin',i,j);
        return(

            <div className="game-flip-wrapper">
                <table className="game-table">
                    <tbody>
                        {gameboard.map((rows,i) => 
                        
                        
                        <tr key={i} className="game-row">
                            {rows.map((cols,j) =>
                          
                            <td key={Math.floor(Math.random() * 10000 / Math.random())} className="game-cell-group-row">
                                <div className="game-info-wrapper">
                                     <img  src="/Images/mulan_memo.jpg" className="img-style" alt="Play Sudoku Now!!"></img>
                                </div>
                            </td>
                            )}
                        </tr>
                            
                        )}
                    </tbody>
                </table>
            </div>
        )

    }

    render(){
      return(
          <React.Fragment>
               <div className="game-flex-wrapper">
               <div className="difficulty-wrap">
                                <div className="difficulty-text">
                                    Difficulty:
                                </div>
                                <div className="difficulty-label">
                                    <fieldset>
                                        <select id="selLevel" onChange={this._onSelect}>
                                            <option value="Select a Difficulty Level...">Select a Difficulty Level...</option>
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hard">Hard</option>
                                            <option value="Insane">Insane</option>
                                        </select>
                                    </fieldset>
                                </div>
 
                            </div>
                {this.renderboard()}
                        
            </div>
        </React.Fragment>
      )  
    }
}

export default connect() (FlipCards as any)