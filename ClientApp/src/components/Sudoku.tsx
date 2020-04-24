import React from 'react'
import * as SudokuStructStore from '../store/SudokuStruct';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
//import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import './Sudoku.css';
//import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
//import { Alert } from 'reactstrap';
//import { DropDownList } from '@progress/kendo-react-dropdowns';


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

let level = "Easy";


class Sudoku extends React.Component<SudokuStructProps>{
    constructor(props: any) {
        super(props);

        this._onSelect = this._onSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.inpChange = this.inpChange.bind(this);
        this.ensureDataFetched = this.ensureDataFetched.bind(this);



    }

    state = {
        loading: false,
        readytovaliadate: false,

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
        aux = e.target.id;

        index = parseInt(aux.substring(5, (aux.length + 1)));
        inputs.value[index] = parseInt(e.target.value);
        //  console.log('perrin', inputs.value, 'value', values.value, aux);

        let i = 1;
        for (i = 1; i <= counter; i++) {
            if (inputs.value[i] === 0) {
                complete = false;
            }

        }


        if (complete && !this.state.readytovaliadate) {
            e.preventDefault();
            this.setState({ readytovaliadate: true });
        }


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

    onResetForm(e: any) {
        e.target.onreset();
    }


    // cancelCourse = () => { 
    //     this.myFormRef.reset();
    //   }


    private renderSudoku() {

        let myclass = "";
        counter = 0;
        inputs.value = [];
        values.value = [];
        return (
            <form id="sudokuform" onChange={this.handleChange}>
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
                                        if (!this.state.readytovaliadate) {
                                            inputs.value[counter] = 0;
                                        }

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


                                    return (

                                        <td key={catId} className={myclass}>
                                            {cols.isVisible ? <p> {cols.sudokuNumber} </p> :
                                                <input id={inputname} defaultValue={inputs.value[counter]}
                                                    type="number" min="1" max="9" ></input>}

                                        </td>
                                    )
                                    // }
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
                        </div>
                        <div className="game-flex-wrapper">
                            <div className="game-wrapper">

                                {this.state.loading ? <div id="game" className="game">{this.renderSudoku()}</div> : <div className="game-flex-wrapper center"><p>Create a Sudoku</p></div>}

                            </div>
                            <div className="game-controls-wrapper">
                                <nav>
                                    <div className="new-game-button-wrapper">
                                        <div className="button new-game-button" onClick={this.ensureDataFetched}>Create Sudoku</div>
                                        {this.state.readytovaliadate ? <div className="button validate-game-button" onClick={this.validatesudoku}>Validate Sudoku</div> : <p></p>}
                                    </div>
                                    <div className="new-game-menu" >
                                        <div className="tooltip-arrow"></div>
                                        <ul className="selec-difficulty">
                                            <li className="lost-progress-label">Nope</li>
                                        </ul>
                                    </div>
                                </nav>

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
