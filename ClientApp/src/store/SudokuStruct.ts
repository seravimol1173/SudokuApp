import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
// import { isNull } from 'util';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface SudokuStructState {
    isLoading: boolean;
    sudokulevel?: string;
    result?: string,
    sudokumatrix: SudokuCell[][];
}

export interface SudokuRow {
    //   sudokucols: [{
    //   sudokuNumber: number;
    //   isVisible: boolean;
    //   }]
    sudokucols: SudokuCell[];

}

export interface SudokuCell {
    isVisible: boolean;
    sudokuNumber: string;

}

export interface supportmat {
    value: number[][]
}


// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestSudokuMatrixAction {
    type: 'REQUEST_SUDOKU_MATRIX';
    sudokulevel: string;
}

interface ReceiveSudokuAction {
    type: 'RECEIVE_SUDOKU_MATRIX';
    sudokulevel: string;
    sudokumatrix: SudokuCell[][];
}

interface ValidateSudokuAction {
    type: 'VALIDATE_SUDOKU_MATRIX';
    result?: string;
    request: string;
}

interface ReceiveValidation {
    type: 'RECEIVE_VALIDATION';
    result: string;
    request?: string;
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestSudokuMatrixAction | ReceiveSudokuAction | ValidateSudokuAction | ReceiveValidation ;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestSudokuMatrix: (sudokulevel: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        const requestOptions = {
            method: 'GET',
            sudokulevel: sudokulevel

        };
        //console.log("store", appState, 'value 2: ', appState.sudokumatrix)
        if (appState && appState.sudokumatrix) {

            fetch(`sudokugen/createsudoku/${sudokulevel}`, requestOptions)
                .then(response => response.json() as Promise<SudokuCell[][]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_SUDOKU_MATRIX', sudokulevel: sudokulevel, sudokumatrix: data });
                });

            // dispatch({ type: 'REQUEST_SUDOKU_MATRIX', sudokulevel: sudokulevel });
        }
    },
    validateSudokuMatrix: (request: string, result: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const requestOptions = {
            method: 'GET'

        };
        if (appState && appState.sudokumatrix) {
            fetch(`sudokugen/validatesudoku/${request}`, requestOptions)
                .then(response => response.json() as Promise<string>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_VALIDATION', request: request, result: data });
                });

            dispatch({ type: 'VALIDATE_SUDOKU_MATRIX', request: request, result: result });
        }
    },

    
    
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.


const unloadedState: SudokuStructState = { sudokumatrix: [], isLoading: false };


export const reducer: Reducer<SudokuStructState> = (state: SudokuStructState | undefined, incomingAction: Action): SudokuStructState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_SUDOKU_MATRIX':
            // console.log("request")
            return {
                sudokulevel: state.sudokulevel,
                sudokumatrix: state.sudokumatrix,
                isLoading: true
            };

        case 'RECEIVE_SUDOKU_MATRIX':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            // console.log("receive")
            if (action.type === 'RECEIVE_SUDOKU_MATRIX') {
                return {
                    sudokulevel: action.sudokulevel,
                    sudokumatrix: action.sudokumatrix,
                    isLoading: false
                }

            }
            break;
        case 'VALIDATE_SUDOKU_MATRIX':

            return {
                sudokulevel: state.sudokulevel,
                sudokumatrix: state.sudokumatrix,
                result: state.result,
                isLoading: true
            };

        case 'RECEIVE_VALIDATION':
            if (action.type === 'RECEIVE_VALIDATION') {


                return {
                    sudokumatrix: [],
                    result: action.result,
                    isLoading: true
                }
            }
            break;
 
    }

    return state;
};

