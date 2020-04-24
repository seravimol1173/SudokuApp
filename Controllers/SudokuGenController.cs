using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SudokuApp.Models;
using Sudokuval;

namespace SudokuApp.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class SudokuGenController : ControllerBase
    {



        public SudokuGenController()
        {
            //_sudokMatrix = new SudokuStruct();

        }



        public SudokuStruct GenerateSudokuMatrix(string level)
        {
            SudokuCell[,] SudokuBaseCell = new SudokuCell[1, 9];
            SudokuCell[,] CurrentRow = new SudokuCell[1, 9];
            int IntCountrer = 1;
            int NUmShift = 2;

            SudokuStruct _sudokMatrix = new SudokuStruct();

            SudokuBaseCell = CreateBaseRow();
            Array.Copy(SudokuBaseCell, CurrentRow, SudokuBaseCell.Length);


            for (int NumRows = 0; NumRows < 9; NumRows++)
            {
                //Array.Copy(CurrentRow, 0, _sudokMatrix.SudokuCells, (NumRows * 9), 9);
                for (int NumCols = 0; NumCols < 9; NumCols++)
                {
                    _sudokMatrix.SudokuCells[NumRows, NumCols].SudokuNumber = CurrentRow[0, NumCols].SudokuNumber;
                }
                CurrentRow = ShiftSudokuCells(CurrentRow, 4);
                if (IntCountrer == 3)
                {
                    CurrentRow = ShiftSudokuCells(SudokuBaseCell, NUmShift);
                    NUmShift++;
                    IntCountrer = 1;
                }
                else IntCountrer++;
            }
            _sudokMatrix = SwapSudokuRows(_sudokMatrix);
            _sudokMatrix = SwapSudokuCols(_sudokMatrix);
            _sudokMatrix = SwapSudokuColsinBlock(_sudokMatrix);
            //switch (level)
            //{
            //    case "Easy":
            //        _sudokulevel = 1;
            //        break;
            //    case "Medium":
            //        _sudokulevel = 2;
            //        break;
            //    case "Hard":
            //        _sudokulevel = 3;
            //        break;
            //}

            _sudokMatrix = setSudokuLevel(_sudokMatrix, level);

            return _sudokMatrix;

        }

        public SudokuCell[,] ShiftSudokuCells(SudokuCell[,] OldRow, int NumShifts)
        {
            SudokuCell[,] TempRow = new SudokuCell[1, 9];
            Array.Copy(OldRow, NumShifts - 1, TempRow, 0, OldRow.Length - (NumShifts - 1));
            Array.Copy(OldRow, 0, TempRow, (OldRow.Length - (NumShifts - 1)), (NumShifts - 1));

            return TempRow;
        }

        public SudokuCell[,] CreateBaseRow()
        {
            int[] TempRowWorkIndexes = new int[9] { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
            //SudokuCell[] ResultRow = new SudokuCell[9];
            SudokuCell[,] ResultRow = new SudokuCell[1, 9]
                {
                {new SudokuCell(),
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

            Random RandomSeed = new Random();
            int ItemIndx;


            for (int Count = 0; Count < 9; Count++)
            {
                ItemIndx = RandomSeed.Next(0, TempRowWorkIndexes.Length - 1);
                ResultRow[0, Count].SudokuNumber = TempRowWorkIndexes[ItemIndx];
                //ResultRow[Count].IsVisible = true;
                TempRowWorkIndexes = UpdateIndxArray(TempRowWorkIndexes, ItemIndx);
            }


            return ResultRow;
        }

        public int[] UpdateIndxArray(int[] IndxArray, int ItemNum)
        {

            int[] result = new int[IndxArray.Length - 1];

            Array.Copy(IndxArray, 0, result, 0, ItemNum);
            Array.Copy(IndxArray, ItemNum + 1, result, ItemNum, IndxArray.Length - (ItemNum + 1));
            //Array.Resize<int>(ref IndxArray, IndxArray.Length - 1);

            return result;

        }

        public SudokuStruct SwapSudokuRows(SudokuStruct OldMatrix)
        {

            SudokuStruct NewMatrix = new SudokuStruct();
            int[] FixedIndex = new int[3] { 0, 1, 2 };
            Random RandomGen = new Random();
            int indx, ind1 = 0, ind2 = 1, ind3 = 2;
            int TotalRows = 0;

            for (int Block = 0; Block < 3; Block++)
            {
                int[] Indexes = FixedIndex;
                for (int Rows = 0; Rows < 3; Rows++)
                {
                    indx = RandomGen.Next(Indexes.Length);
                    int NumIndx = Indexes[indx];

                    Array.Copy(OldMatrix.SudokuCells, (NumIndx * 9), NewMatrix.SudokuCells, (9 * TotalRows), 9);
                    Indexes = UpdateIndxArray(Indexes, indx);
                    TotalRows++;
                }
                ind1 += 3;
                ind2 += 3;
                ind3 += 3;

                FixedIndex[0] = ind1;
                FixedIndex[1] = ind2;
                FixedIndex[2] = ind3;

            }

            return NewMatrix;
        }

        public SudokuStruct SwapSudokuCols(SudokuStruct OldMatrix)

        {
            SudokuStruct NewMatrix = new SudokuStruct();
            CustomArray<SudokuCell> myArray = new CustomArray<SudokuCell>();
            SudokuCell[] CurrCol = new SudokuCell[]
            {
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
            };

            int[] FixedIndex = new int[3] { 0, 1, 2 };
            Random RandomGen = new Random();
            //int[] Indexes = FixedIndex;
            int indx, ind1 = 0, ind2 = 1, ind3 = 2;
            int TotalCols = 0;

            for (int Block = 0; Block < 3; Block++)
            {
                int[] Indexes = FixedIndex;
                for (int Cols = 0; Cols < 3; Cols++)
                {
                    indx = RandomGen.Next(Indexes.Length);
                    int NumIndx = Indexes[indx];

                    CurrCol = myArray.GetColumn(OldMatrix.SudokuCells, NumIndx);
                    for (int WorkCol = 0; WorkCol < 9; WorkCol++)
                    {
                        NewMatrix.SudokuCells[TotalCols, WorkCol] = CurrCol[WorkCol];
                    }
                    //Array.Copy(OldMatrix, (NumIndx * 9), NewMatrix, (9 * TotalCols), 9);
                    Indexes = UpdateIndxArray(Indexes, indx);
                    TotalCols++;
                }
                ind1 += 3;
                ind2 += 3;
                ind3 += 3;

                FixedIndex[0] = ind1;
                FixedIndex[1] = ind2;
                FixedIndex[2] = ind3;

            }

            return NewMatrix;
        }

        public SudokuStruct SwapSudokuColsinBlock(SudokuStruct OldMatrix)
        {
            SudokuStruct NewMatrix = new SudokuStruct();

            int[] FixedIndex = new int[3] { 0, 1, 2 };
            Random RandomGen = new Random();
            int indx;


            int[] Indexes = FixedIndex;
            for (int Blocks = 0; Blocks < 3; Blocks++)
            {
                indx = RandomGen.Next(Indexes.Length);
                int NumIndx = Indexes[indx];
                int RowBlock = 0;
                Array.Copy(OldMatrix.SudokuCells, (RowBlock * 27) + (NumIndx * 3), NewMatrix.SudokuCells, (RowBlock * 27) + (Blocks * 3), 3);
                Array.Copy(OldMatrix.SudokuCells, (RowBlock * 27) + (NumIndx * 3) + 9, NewMatrix.SudokuCells, (RowBlock * 27) + ((Blocks * 3) + 9), 3);
                Array.Copy(OldMatrix.SudokuCells, (RowBlock * 27) + (NumIndx * 3) + 18, NewMatrix.SudokuCells, (RowBlock * 27) + ((Blocks * 3) + 18), 3);
                RowBlock++;
                Array.Copy(OldMatrix.SudokuCells, (RowBlock * 27) + (NumIndx * 3), NewMatrix.SudokuCells, (RowBlock * 27) + (Blocks * 3), 3);
                Array.Copy(OldMatrix.SudokuCells, (RowBlock * 27) + (NumIndx * 3) + 9, NewMatrix.SudokuCells, (RowBlock * 27) + ((Blocks * 3) + 9), 3);
                Array.Copy(OldMatrix.SudokuCells, (RowBlock * 27) + (NumIndx * 3) + 18, NewMatrix.SudokuCells, (RowBlock * 27) + ((Blocks * 3) + 18), 3);
                RowBlock++;
                Array.Copy(OldMatrix.SudokuCells, (RowBlock * 27) + (NumIndx * 3), NewMatrix.SudokuCells, (RowBlock * 27) + (Blocks * 3), 3);
                Array.Copy(OldMatrix.SudokuCells, (RowBlock * 27) + (NumIndx * 3) + 9, NewMatrix.SudokuCells, (RowBlock * 27) + ((Blocks * 3) + 9), 3);
                Array.Copy(OldMatrix.SudokuCells, (RowBlock * 27) + (NumIndx * 3) + 18, NewMatrix.SudokuCells, (RowBlock * 27) + ((Blocks * 3) + 18), 3);
                Indexes = UpdateIndxArray(Indexes, indx);

            }

            return NewMatrix;
        }

        public SudokuStruct setSudokuLevel(SudokuStruct oldMatrix, string level)
        {
            SudokuStruct NewMatrix = new SudokuStruct();

            //Array.Copy(oldMatrix,NewMatrix,9);
            int[] FixedIndex = new int[9] { 0, 1, 2, 3, 4, 5, 6, 7, 8 };

            Random RandomGen = new Random();
            int indx;
            int numofiterations = 0;
            for (int Rows = 0; Rows < 9; Rows++)
            {

                Array.Copy(oldMatrix.SudokuCells, (Rows * 9), NewMatrix.SudokuCells, (9 * Rows), 9);

            }
            switch (level)
            {
                case "Easy":
                    numofiterations = 2;
                    break;
                case "Medium":
                    numofiterations = 3;
                    break;
                case "Hard":
                    numofiterations = 4;
                    break;
                case "Insane":
                    numofiterations = 7;
                    break;

            }

            for (int row = 0; row < 9; row++)
            {
                int[] Indexes = new int[9];

                Array.Copy(FixedIndex, Indexes, 9);


                for (int hide = 0; hide <= numofiterations; hide++)
                {
                    indx = RandomGen.Next(Indexes.Length);
                    int NumIndx = Indexes[indx];
                    NewMatrix.SetVisibility(false, row, NumIndx);
                    //NewMatrix.SudokuCells[row, NumIndx].IsVisible = false;
                    Indexes = UpdateIndxArray(Indexes, indx);
                }

            }


            for (int col = 0; col < 9; col++)
            {
                int numhidden = 0;
                int[] Indexes = FixedIndex;
                for (int row = 0; row < 9; row++)
                {

                    if (!NewMatrix.SudokuCells[row, col].IsVisible)
                    {
                        Indexes[row] = -1;
                        numhidden++;
                    }

                }
                if (numhidden < numofiterations)
                {

                    for (int hide = numhidden; hide <= numofiterations; hide++)
                    {
                        indx = RandomGen.Next(Indexes.Length);
                        int NumIndx = Indexes[indx];
                        if (NumIndx > -1)
                        {
                            NewMatrix.SetVisibility(false, NumIndx, col);
                            //NewMatrix.SudokuCells[NumIndx, col].IsVisible = false;
                            Indexes = UpdateIndxArray(Indexes, indx);
                        }
                        else
                            Indexes = UpdateIndxArray(Indexes, indx);

                    }
                }
            }






            return NewMatrix;
        }
        [HttpGet("createsudoku/{level}")]
        // public IEnumerable<SudokuCell> Get()
        public SudokuCell[][] Get(string level)
        {
            SudokuStruct test;
            SudokuCell[][] test1 = new SudokuCell[9][];

            string _level = level;
            SudokuGenController mySudoku = new SudokuGenController();
            test = mySudoku.GenerateSudokuMatrix(level);
            SudokuCell[] myResult = new SudokuCell[9]{
                 new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),
                new SudokuCell(),

            };

            for (int i = 0; i < 9; i++)
            {
                test1[i] = new SudokuCell[9];
                for (int j = 0; j < 9; j++)
                {

                    test1[i][j] = test.SudokuCells[i, j];
                }


            }



            return test1;


            // return Enumerable.Range(1, 81).Select(index => new SudokuCell
            // {
            //     SudokuNumber = test.SudokuCells[((index - 1) / 9), ((index -1 ) % 9)].SudokuNumber,
            //     IsVisible = test.SudokuCells[((index - 1) / 9), ((index - 1) % 9) ].IsVisible

            // })
            // .ToArray();


        }
        [HttpGet("validatesudoku/{matrix}")]
        public string ValidateSudoku(string matrix)
        {
            return matrix;
        }
    }
}