const chalk = require('chalk');
const colors = ['red', 'yellow', 'blue', 'magenta', 'cyan'];
module.exports = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[ ❕ ] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[ ❕ ] » ') + data);
			break;
		default:
			console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`${option} » `) + chalk[colors[Math.floor(Math.random() * colors.length)]](data));
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[ Zeus Project ] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[ Lỗi rồi nhóc ] » ') + data);
			break;
		default:
			console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`[ Zeus Project ] » `) + chalk[colors[Math.floor(Math.random() * colors.length)]](data));
			break;
	}
}
