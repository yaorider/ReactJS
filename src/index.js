import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Calculator extends React.Component {
	render() {
		return (
			<div className="cal">
				<div className="cal-board">
					<Board />
				</div>
			</div>
		);
	}
}

class Board extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			total: 0,
			arrayHistory: [],
			arrayNumber: [],
			preNumber: 0,
			operator: '',
			tmpTotalNumber: 0,
		};
	}
        
	handleClick(value) {
		const {total, arrayHistory, arrayNumber, preNumber, operator, tmpTotalNumber} = this.state;

		var tmpTotla = total;
		var tmpArrayHistory = arrayHistory;
		var tmpArrayNumber = arrayNumber;
		var tmpPreNumber = preNumber;
		var tmpOperator = operator;
		var tmpTmpTotalNumber = tmpTotalNumber;

		var tmpNumber = tmpArrayNumber.toString().replace(/,/g, '');
		switch (value) {
			case "AC" :
				tmpTotla = 0;
				tmpOperator = "AC";
				tmpArrayHistory = [];
				tmpArrayNumber = [];
				tmpPreNumber = 0;
				tmpNumber = 0;
				break;
			case "+/-" :
				tmpOperator = "+/-";
				if (tmpNumber !== 0) {
					tmpNumber = tmpNumber * -1;
				}
				if (tmpNumber < 0) {
					tmpArrayNumber.unshift("-");
				} else if (tmpNumber > 0) {
					tmpArrayNumber.shift();
				}
				tmpArrayHistory.push("+/-");
				break;
			case "÷" :
				tmpOperator = "÷";
				tmpArrayHistory.push("÷");
				break;
			case "×" :
				tmpOperator = "×";
				tmpArrayHistory.push("×");
				break;
			case "－" :
				tmpOperator = "－";
				tmpArrayHistory.push("－");
				break;
			case "＋" :
				tmpOperator = "＋";
				tmpArrayHistory.push("＋");
				break;
			case "％" :
				tmpOperator = "％";
				tmpArrayHistory.push("％");
				tmpNumber = parseInt(tmpNumber) / 100;
				tmpTotla = tmpNumber;
				break;
			case "．" :
				var check = tmpArrayNumber.indexOf(".");
				if ((check < 0) && (tmpArrayNumber.length > 0)) {
					tmpArrayNumber.push(".");
				}
				tmpArrayHistory.push(".");
				break;
			case "＝" :
				tmpTotla = tmpTmpTotalNumber;
				break;
			case "Ｃ" :
				if (tmpArrayHistory.lenght > 0 ) {
					tmpArrayHistory = tmpArrayHistory.pop();
					tmpArrayNumber = tmpArrayNumber.pop();
				}
				break;
			default :
				tmpArrayHistory.push(value);
				switch (tmpOperator) {
					case "＋" :
						tmpNumber = parseInt(tmpNumber) + parseInt(value);
						tmpTmpTotalNumber = tmpNumber;
						break;
					case "－" :
						tmpNumber = parseInt(tmpNumber) - parseInt(value);
						tmpTmpTotalNumber = tmpNumber;
						break;
					case "×" :
						tmpNumber = parseInt(tmpNumber) * parseInt(value);
						tmpTmpTotalNumber = tmpNumber;
						break;
					case "÷" :
						tmpNumber = parseInt(tmpNumber) / parseInt(value);
						tmpTmpTotalNumber = tmpNumber;
						break;
					default :
						break;
				}
				tmpArrayNumber.push(value);
				break;
				
		}
		this.setState({total: tmpTotla});
		this.setState({arrayHistory: tmpArrayHistory});
		this.setState({arrayNumber: tmpArrayNumber});
		this.setState({preNumber: tmpPreNumber});
		this.setState({operator: tmpOperator});
		this.setState({tmpTotalNumber: tmpTmpTotalNumber});
		
	}

	renderButton(value) {
		return <Button 
			value={value}
			onClick={() => this.handleClick(value)}
		/>;
	}

	render() {
		const status = 'Value:';

		return (
			<div>
				<div className="status">{status}{this.state.total}</div>
				<div className="status">History:{this.state.arrayHistory}</div>
				<div className="board-row">
					{this.renderButton('AC')}
					{this.renderButton('+/-')}
					{this.renderButton('％')}
					{this.renderButton('÷')}
				</div>
				<div className="board-row">
					{this.renderButton(7)}
					{this.renderButton(8)}
					{this.renderButton(9)}
					{this.renderButton('×')}
				</div>
				<div className="board-row">
					{this.renderButton(4)}
					{this.renderButton(5)}
					{this.renderButton(6)}
					{this.renderButton('－')}
				</div>
				<div className="board-row">
					{this.renderButton(1)}
					{this.renderButton(2)}
					{this.renderButton(3)}
					{this.renderButton('＋')}
				</div>
				<div className="board-row">
					{this.renderButton(0)}
					{this.renderButton('．')}
					{this.renderButton('＝')}
					{this.renderButton('Ｃ')}
				</div>
			</div>
		);
	}
}

class Button extends React.Component {
	render() {
		return (
			<button 
				className="square"
				onClick={() => this.props.onClick()}
			>
				{this.props.value}
			</button>
		);
	}
}
      
// ========================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
