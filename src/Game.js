import React from 'react';
import Board from './Board';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
export default class Game extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            history:[{
                squares: Array(9).fill(null),
            }],
            stepNumber:0,
            xIsNext:true,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history:history.concat([{
              squares:squares
            }]),
            stepNumber:history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
        jumpTo(step){

        
        this.setState({
         
          stepNumber:step,
          xIsNext: (step%2) ===0,
        });
    }
      
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step,move)=>{

        let desc = move?
        'Go to move #'+move:
        'Go to start';
        return (
            <li key={move}>
        <Button className="m-1" onClick={()=>this.jumpTo(move)}>{desc}</Button>
        </li>);
        });
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
  
      return (
        <div className="game align-items-center justify-content-center">
          <div className="game-board">

          <Container className="p-3">
    <Container className="p-3 mb-4 mt-4 bg-light rounded-3">
      <h1 className="header">Welcome To Tic Tac Toe</h1>
      <Container className="d-flex">
      <Container className='d-inline-block p-5 mb-2 bg-light rounded-3'>
      <Board 
            squares={current.squares}
            onClick={(i)=>this.handleClick(i)}

            />
            </Container>
          <Container className="p-5 mb-2 bg-light rounded-3 score-card ">
          <div className="game-info">
            <div > 
              <h5 className='header'> {status}</h5>
             
              </div>
            <ol>{moves}</ol>
          </div>
          </Container>
          </Container>
    </Container>

  </Container>
           
          </div>
         
        </div>
      );
    }
  }
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  