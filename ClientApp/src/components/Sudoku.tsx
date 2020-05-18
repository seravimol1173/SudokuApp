import React from 'react'
import * as SudokuStructStore from '../store/SudokuStruct';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
//import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import './Sudoku.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'react-dropdown/style.css';

type SudokuStructProps =
    SudokuStructStore.SudokuStructState
    & typeof SudokuStructStore.actionCreators
    & RouteComponentProps<{ sudokulevel: string }>;
// const options = [
//     'Easy', 'Medium', 'Hard','Extreme'
// ]

//const defaultOption = options[0];


let counter = 0;

let values = {
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9]
};

let inputs = {
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9]
};

let picknumbers = {
    value: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
};
let level = "Easy";

let myvalue = 1;

let color =  ['White','White','White','White','White','White','White','White','White'];
class Sudoku extends React.Component<SudokuStructProps>{
    constructor(props: any) {
        super(props);

        this._onSelect = this._onSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.inpChange = this.inpChange.bind(this);
        this.ensureDataFetched = this.ensureDataFetched.bind(this);
        this.getNumber = this.getNumber.bind(this);
        this.setNumber = this.setNumber.bind(this);



    }

    state = {
        loading: false,
        readytovaliadate: false,
        change: false,

    }

    public shouldComponentUpdate(nextprop: any, nextstate: any) {
        return nextprop.isLoading === this.props.isLoading;
    }

    public componentDidMount() {

        this.renderSudoku();

    }


    //  public componentDidUpdate () {

    //          this.ensureDataFetched();
    //      }

    private ensureDataFetched = () => {


        // confirmAlert({
        //     title: 'Confirm to submit',
        //     message: 'Are you sure to do this.',
        //     buttons: [
        //       {
        //         label: 'Yes',
        //         onClick: () =>  {


        inputs.value = [];
        values.value = [];
        let i =0;
        for(i=0;i<9;i++){
            color[i] = 'White';
        }
        color[0] = '#5f9ea0';
        this.props.requestSudokuMatrix(level);
        this.setState({ loading: true, readytovaliadate: false });
        // this.props.sudokumatrix.map((rows: SudokuStructStore.SudokuCell[],j) =>
        //     rows.map((cols: SudokuStructStore.SudokuCell,k) => {                            
        //         if(!cols.isVisible){
        //         values.value[i] = parseInt(cols.sudokuNumber);
        //         i = i + 1;
        //         }
        //     })
        // )
        //        }
        //              } ,
        //       {
        //         label: 'No',
        //         onClick: () => {

        //       }
        //     ]
        //   });


        // this.props.requestSudokuMatrix();
    }

    private validatesudoku = () => {

        let success = true;

        if (this.state.readytovaliadate) {
            let i = 1;
            for (i = 1; i <= counter; i++) {
                if (inputs.value[i] !== values.value[i]) {
                    success = false;
                }

            }
        }
        else {
            window.alert('Sudoku is not completed!!!!!');
            // Alert('Sudoky is not completed!!!!!')
        }

        if (success) {
            window.alert('Congratulations!!!!!!!!!');
        }
        else {
            window.alert('Sorry :( Check and try again!! ');
        }


    }
    handleChange(e: any) {

        var aux = "sdfds";
        let index = 0;
        let complete = true;
        let thischange = this.state.change;
        aux = e.target.id;
        index = parseInt(aux.substring(5, (aux.length + 1)));
        inputs.value[index] = myvalue;
        
        let i = 1;
        for (i = 1; i <= counter; i++) {
            if (inputs.value[i] == null) {
                complete = false;
                break;
            }

        }


        if (complete && !this.state.readytovaliadate) {
            e.preventDefault();
            this.setState({ readytovaliadate: true });
        }

        thischange = ! thischange;
        e.preventDefault();
        this.setState({ changes: thischange });
    }

    // inpChange = (e:any) => {
    //     // var change = {};
    //     // change[name] = e.target.value;
    //     const {name, value} = e.target;
    //     this.setxState({[name]: value});
    //   //  this.setxState({ [e.target.id]: e.target.value })

    // }
    _onSelect(event: any) {
        // this.setxState({level: event.target.value})
        level = event.target.value;

    }

    getNumber(e:any){
        let thischange = this.state.change;
        myvalue = e.target.textContent;
        let i = 0;
        for(i=0;i<9;i++){
            color[i] = 'White';
        }

        color[myvalue-1] = '#5f9ea0';
        thischange = ! thischange;
        e.preventDefault();
        this.setState({ changes: thischange });
     }

    setNumber = (e:any) => {
        e.persist();
       
    }

    onResetForm(e: any) {
        e.target.onreset();
    }


    // cancelCourse = () => { 
    //     this.myFormRef.reset();
    //   }


    private renderSudoku() {

        let myclass = "";
        counter = 0;
        // inputs.value = [];
        // values.value = [];
        return (
            <form id="sudokuform" onChange={this.handleChange} >
                <table className="game-table">

                    <tbody>

                        {this.props.sudokumatrix.map((sudokurows: SudokuStructStore.SudokuCell[], i) =>

                            <tr key={Math.floor(Math.random() * 10000 / Math.random())} className="game-row">
                                {/* </tr> <tr key={`row-${i}`} className="game-row"> */}


                                {sudokurows.map((cols: SudokuStructStore.SudokuCell, j) => {
                                    const catId = `name-${i}-${j}`;
                                    let inputname = ``;

                                    if (!cols.isVisible) {
                                        counter = counter + 1;
                                        inputname = `text-${counter}`;
                                        values.value[counter] = parseInt(cols.sudokuNumber, 10);
                                        //  if (!this.state.readytovaliadate) {
                                        //      inputs.value[counter] = 0;
                                        //  }

                                    }
                                    myclass = "game-cell"
                                    if ((i === 2 || i === 5)) {
                                        if ((j === 2 || j === 5)) {
                                            myclass = myclass + " game-cell-group-square";
                                        }
                                        else
                                            myclass = myclass + " game-cell-group-row"
                                    }
                                    else {
                                        if ((j === 2 || j === 5)) {
                                            myclass = myclass + " game-cell-group-col";
                                        }

                                    }
                                    if(cols.isVisible)
                                    {
                                        return(
                                            <td key={catId} className={myclass} >
                                                <p> {cols.sudokuNumber} </p>                                             
                                            </td>
                                        )
                                    }
                                    else
                                    {
                                        myclass = myclass + " game-cell-input"
                                        return(
                                            <td key={catId} className={myclass} >
                                               {inputs.value[counter] == null ? <label id={inputname} onClick={this.handleChange}>#</label> :
                                               <label  id={inputname} onClick={this.handleChange}>{inputs.value[counter]}</label>                                            
                                        }
                                            </td>

                                        )
                                    }
                                                                        
                                })}


                            </tr>

                        )}

                    </tbody>
                </table>
            </form>

        );


    }

    public render() {

        return (
            <React.Fragment>

                <div id="primary" className="site-content">
                    <div id="sudoku-wrapper" className="sudoku-wrapper">
                        <div className="game-info-wrapper">
                            <div className="difficulty-wrap">
                                <div className="difficulty-text">
                                    Difficulty:
                                </div>
                                <div className="difficulty-label">
                                    <fieldset>
                                        <select id="selLevel" onChange={this._onSelect}>
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hard">Hard</option>
                                            <option value="Insane">Insane</option>
                                        </select>
                                    </fieldset>
                                </div>
 
                            </div>
                            <div className="game-controls-wrapper">                               
                                    <div className="new-game-button-wrapper">
                                        <div className="button new-game-button" onClick={this.ensureDataFetched}>Create Sudoku</div>
                                        {this.state.readytovaliadate ? <div className="button validate-game-button" onClick={this.validatesudoku}>Validate Sudoku</div> : <p></p>}
                                    </div>
                            </div>
                        </div>
                        <div className="game-flex-wrapper">
                            <div className="game-wrapper">

                                {this.state.loading ? <div id="game" className="game">{this.renderSudoku()}</div> : <div className="game-flex-wrapper center"><p>Create a Sudoku</p></div>}

                            </div>
                            <div className="game-wrapper">

                               <table className="selection-table">
                                   <tbody>
                                   
                                       {picknumbers.value.map((row, index) =>(
                                           <tr key={`row-${index}`}>
                                               {row.map((col, indx) => (
                                                <td key={`value-${col}`} className=" game-num-selector" id={`value-${col}`} onClick={this.getNumber} style={{backgroundColor: color[col-1]}}>
                                                    <h1>{col}</h1>
                                                </td>
                                               ))}
                                           </tr>
   
                                       ))}
                                   
                                       {/* <tr >
                                           <td className=" game-num-selector" id="value_1" onClick={this.getNumber}>
                                               <h1>1</h1>
                                           </td>
                                           <td className="game-num-selector" id="value_2" onClick={this.getNumber}>
                                                <h1>2</h1>
                                           </td>
                                           <td className="game-num-selector" id="value_3" onClick={this.getNumber}>
                                                <h1>3</h1>
                                           </td>

                                       </tr>
                                       <tr>
                                           <td className="game-num-selector" id="value_4" onClick={this.getNumber}>
                                               <h1>4</h1>
                                           </td>
                                           <td className="game-num-selector" id="value_5" onClick={this.getNumber}>
                                                <h1>5</h1>
                                           </td >
                                           <td className="game-num-selector" id="value_6" onClick={this.getNumber}>
                                                <h1>6</h1>
                                           </td>

                                       </tr>
                                       <tr>
                                           <td className="game-num-selector" id="value_7" onClick={this.getNumber}>
                                               <h1>7</h1>
                                           </td>
                                           <td className="game-num-selector" id="value_8" onClick={this.getNumber}>
                                                <h1>8</h1 >
                                           </td>
                                           <td className="game-num-selector" id="value_9" onClick={this.getNumber}>
                                                <h1>9</h1>
                                           </td>

                                       </tr> */}
                                   </tbody>
                               </table>
                            </div>

                        </div>

                    </div>
                    <div className="horizontal-placeholder">
                        <p>&copy; Avimol Consulting  Copyright 2020 </p>
                    </div>
                    <div className="app-teaser-wrapper"></div>
                </div>

            </React.Fragment>
        )

    }
}


export default connect(
    (state: ApplicationState) => state.sudokumatrix, // Selects which state properties are merged into the component's props
    SudokuStructStore.actionCreators // Selects which action creators are merged into the component's props
)(Sudoku as any);
