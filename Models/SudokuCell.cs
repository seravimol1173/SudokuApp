using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SudokuApp.Models
{
    public class SudokuCell
    {
        //public int SudokuNumber
        //{
        //    get { return SudokuNumber; }
        //    set { SudokuNumber = new int(); }
        //}
        //public bool IsVisible {
        //    get { return IsVisible; }
        //    set { IsVisible = true; }
        //}
        //public int SudokuNumber { get; set; }
        //public bool IsVisible { get; set; }

        private int sudokunumber;
        
        public int SudokuNumber {
            get { return sudokunumber; }
            set { sudokunumber = value; }
        }
        public bool IsVisible { set; get; }

        public SudokuCell()
        {
            SudokuNumber = new int();
            IsVisible = new bool();
            SudokuNumber = 0; 
            IsVisible =  true;
        }

    }
}
