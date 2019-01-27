import React from 'react';
import ReactDOM from 'react-dom';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            gameNumbers: this.initialData(),
            nextMovePosition:this.nextMovePosition,
            totalClicks: 0
        };
        this.maxBound = this.state.gameNumbers.length - 1; // boundary condition
        this.minBound = 0;								  // boundary condition
        this.isValidMoveIndex = false;
    }

    //Initail gameNumbers value
    initialData =()=> {
        var row =  2
        var col =  Math.floor(Math.random() * 4);

        var puzzleArray = [
            [2, 1, 6, 11],
            [9, 13, 5, 8],
            [4, 3,15],
            [10, 14, 12, 7]
        ];
        puzzleArray[row].splice([col],0,"");
        this.nextMovePosition = [row,col];
        return puzzleArray;
    };

    checkRowShift(row, col) {


        let {nextMovePosition, gameNumbers, totalClicks} = this.state;
        const i = nextMovePosition[0];
        const j = nextMovePosition[1];

        //Horizontal row shift
        if (row === i) {
            nextMovePosition = [row, col];
            gameNumbers[i].splice(j, 1);
            gameNumbers[row].splice(col, 0, "");
            this.setState({gameNumbers: gameNumbers, nextMovePosition: nextMovePosition, totalClicks: totalClicks + 1});
        }

        //Vertical row shift
        else if (col === j) {
            let tempArrForSwap = [];
            nextMovePosition = [row, col];
            let index = 0;
            while (index < gameNumbers.length) {
                tempArrForSwap[index] = gameNumbers[index][col];
                index++;
            }
            if (row < i) {
                tempArrForSwap.splice(row, 0, '');
                tempArrForSwap.splice(i + 1, 1);
            } else {
                tempArrForSwap.splice(row + 1, 0, '');
                tempArrForSwap.splice(i, 1);
            }
            index = 0;
            while (index < gameNumbers.length) {
                gameNumbers[index][col] = tempArrForSwap[index];
                index++;
            }
            this.setState({gameNumbers: gameNumbers, nextMovePosition: nextMovePosition, totalClicks: totalClicks + 1});
        }
    }


    //Get move positions for clicked element
    getMovePositions(row, col) {
        let movePositions = [];
        if (row - 1 >= this.minBound) {
            movePositions.push([row - 1, col]);
        }
        if ((row + 1 <= this.maxBound) || (row - 1 < this.minBound)) {
            movePositions.push([row + 1, col]);
        }

        if (col - 1 >= this.minBound) {
            movePositions.push([row, col - 1]);
        }

        if ((col + 1 <= this.maxBound) || (col - 1 < this.minBound)) {
            movePositions.push([row, col + 1]);
        }

        return movePositions;
    }

    //Reset game
    resetGame = ()=> {
         // const nextMovePosition = [2, 2];
        this.setState({
            gameNumbers: this.initialData(),
            nextMovePosition: this.nextMovePosition,
            totalClicks: 0,
            isGameWon: false
        })
    };

    //get move positions and  Move clicked number to next movable index
    calculateMove(rowNumber, colNumber, value) {
        if (!value) {
            return;
        }
        let {nextMovePosition, gameNumbers, totalClicks} = {...this.state};
        let movePositions = this.getMovePositions(rowNumber, colNumber);

        movePositions.forEach((rowPosition, i)=> {
            if (JSON.stringify(movePositions[i]) == JSON.stringify(nextMovePosition) && !this.isValidMoveIndex) {
                this.isValidMoveIndex = true;
            }
        });

        if (this.isValidMoveIndex) {
            gameNumbers[nextMovePosition[0]][nextMovePosition[1]] = gameNumbers[rowNumber][colNumber];
            gameNumbers[rowNumber][colNumber] = "";
            nextMovePosition = [rowNumber, colNumber];


            this.setState((state)=>{
                return{
                gameNumbers: gameNumbers,
                nextMovePosition: nextMovePosition,
                totalClicks: state.totalClicks}
            }, ()=> {
                this.checkRowShift(rowNumber, colNumber);
                this.isValidMoveIndex = false;
            })
        } else {
        }
    }

    render() {
        const {gameNumbers, totalClicks, nextMovePosition} =this.state;

        return (
            <div>
                <h1 style={{textAlign:'center'}}>15 Puzzle Game</h1>
                <div id="game-layout">
                    <div className="col">
                     Total Moves: <strong>{totalClicks}</strong>
                    </div>
                    <div className="row"/>
                    <table>
                        <tbody>
                        <tr>
                            {
                                gameNumbers.map((row, i)=> {
                                    return row.map((col, j)=> {
                                        return (
                                            <td className={col === "" ? "move-index" : ""}
                                                onClick={()=>this.calculateMove(i,j,col)} key={i+j}>
                                                <b>{col}</b>
                                            </td>
                                        )
                                    })
                                })
                            }
                        </tr>
                        </tbody>
                    </table>

                    <button style={{marginTop:30}} className=" repaly-btn btn btn-default" onClick={this.resetGame}>Start Again</button>

                </div>
                <div className="footer">
                <h5 style={{textAlign:'right'}}>Developed By: Ved Prakash</h5>
                <h5 style={{textAlign:'right'}}>Send Solved Screenshots : ved@augmate.com</h5>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Game/>,
    document.getElementById('container')
);


