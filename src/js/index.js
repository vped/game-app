import React from 'react';
import ReactDOM from 'react-dom';

class Game extends React.Component {
	constructor(){
		super();
		this.state = {
			nextMovePosition:[2,2],
			gameNumbers:this.initialData()
		};
		this.maxBound = this.state.gameNumbers.length-1;
		this.minBound = 0;
		this.isValidMoveIndex = false;
	}

	 initialData(){
		return [
			[2,1,6,11],
			[9,13,5,8],
			[4,3,"",15],
			[10,14,12,7]
		]
	};

	getMovePositions(row,col) {
		let  movePositions = [];
		if(row-1 >= this.minBound){
			movePositions.push([row-1,col]);
		}
		if((row+1 <= this.maxBound) || (row-1<this.minBound)){
			movePositions.push([row+1,col]);
		}

		if(col-1 >= this.minBound){
			movePositions.push([row,col-1]);
		}

		if((col+1 <= this.maxBound) || (col-1 < this.minBound)){
			movePositions.push([row,col+1]);
		}
		return movePositions;
	}

	 resetGame =()=>{
		const nextMovePosition = [2,2];
		this.setState({gameNumbers: this.initialData(), nextMovePosition: nextMovePosition})
	};

	calculateMove(rowNumber,colNumber,value) {
		if(!value){
			return;
		}
		let {nextMovePosition,gameNumbers} = this.state;
		let movePositions = this.getMovePositions(rowNumber,colNumber);

		movePositions.forEach((rowPosition,i)=>{
				if(JSON.stringify(movePositions[i])==JSON.stringify(nextMovePosition) && !this.isValidMoveIndex){
					this.isValidMoveIndex = true;
				}
		});

		if(this.isValidMoveIndex){
			gameNumbers[nextMovePosition[0]][nextMovePosition[1]] = gameNumbers[rowNumber][colNumber];
			gameNumbers[rowNumber][colNumber] = "";
			nextMovePosition = [rowNumber,colNumber];

			this.setState({gameNumbers:gameNumbers,nextMovePosition:nextMovePosition},()=>{
				this.isValidMoveIndex = false;
			})
		}
	}

	render() {
		const {gameNumbers} =this.state;

		return (
			<div id="game-layout">
				<table>
					<tbody>
						<tr>
							{
								gameNumbers.map((row,i)=>{
									return row.map((col,j)=>{
										return (
											<td onClick={()=>this.calculateMove(i,j,col)} key={i+j}>
												<b>{col}</b>
											</td>
										)
									})
								})
							}
						</tr>
					</tbody>
				</table>

				<button className=" repaly-btn btn btn-default" onClick={this.resetGame}>Start Again</button>

			</div>
		);
	}
}


ReactDOM.render(
	<Game/>,
	document.getElementById('container')
);


