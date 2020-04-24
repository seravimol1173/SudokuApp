using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SudokuApp.Models
{
    public class SudokuStruct
    {
        public SudokuCell[,] SudokuCells;


        //public SudokuCell this[int row, int column]
        //{
        //    get { return SudokuCells[row, column]; }
        //    set { SudokuCells[row, column] = value; }
        //}

        public SudokuStruct()
        {
            SudokuCells = new SudokuCell[,]
            {

                { new SudokuCell(),                    
                  new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell()
                 },
                { new SudokuCell(),
                    new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell()
                 },
                { new SudokuCell(),
                    new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell()
                 },
                { new SudokuCell(),
                    new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell()
                 },
                { new SudokuCell(),
                    new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell()
                 },
                { new SudokuCell(),
                    new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell()
                 },
                { new SudokuCell(),
                    new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell()
                 },
                { new SudokuCell(),
                    new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell()
                 },
                { new SudokuCell(),
                    new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell()
                 }

            };
        }
        public void SetVisibility(bool state, int row, int col)
        {
            SudokuCells[row, col].IsVisible = state;
        }

    }

        
    //public SudokuStruct(int NumRows, int NumCols)
    //    {
    //         SudokuCell[,] SudokuCells = new SudokuCell();

    //        public SudokuCell this[int row, int column] 
    //        {
    //    }

    ////        SudokuCell[,] SudokuCells = { get; set; }
    ////        for(int _rows = 0; _rows < NumRows; _rows++)
    ////        {
    ////            for (int _cols = 0; _cols < NumRows; _cols++)
    ////            {
    ////                SudokuCells[_rows, _cols] = new SudokuCell();
    ////            }
    ////        }
                

    ////    }
            
    //}


}
