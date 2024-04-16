module.exports.version = '2.0.0';
module.exports.version = '2.0.0';
// Phiên bản của file config, nếu khác thì phải xóa file gameConfig.js
// Một file gameConfig.js sẽ đc tạo lại sau khi run lại bot
module.exports.ready = 'meplay';

//  ____  _____ _____ _   _ ____  ____
// / ___|| ____|_   _| | | |  _ \/ ___|
// \___ \|  _|   | | | | | | |_) \___ \
//  ___) | |___  | | | |_| |  __/ ___) |
// |____/|_____| |_|  \___/|_|   |____/
module.exports.setups = [
	{
		name: '[🔮]→ Làng của tiên tri',
		roles: {
			Apprentice: 1,
			Bodyguard: 0,
			Cupid: 1,
			Evilseer: 0,
			Fruitbrute: 0,
			Goodseer: 1,
			Hunter: 0,
			Investigator: 0,
			Lycan: 0,
			Oldman: 0,
			Tanner: 0,
			Villager: 2,
			Werewolf: 2,
			Witch: 0
		}
	},
	{
		name: '[💀]→ Làng của cái chết',
		roles: {
			Goodseer: 1,
			Witch: 1,
			Werewolf: 2,
			Villager: 5
		}
	},
	{
		name: '[🎭]→ Làng của sự lưỡng lự',
		roles: {
			Evilseer: 1,
			Goodseer: 1,
			Hunter: 1,
			Lycan: 1,
			Werewolf: 1,
			Villager: 5
		}
	},
	{
		name: '[🙇]→ Làng của sự đền tội',
		roles: {
			Evilseer: 1,
			Goodseer: 1,
			Fruitbrute: 1,
			Witch: 1,
			Werewolf: 1,
			Villager: 6
		}
	},
	{
		name: '[🤫]→ Làng nhỏ - Bí mật lớn',
		roles: {
			Apprentice: 1,
			Cupid: 1,
			Evilseer: 1,
			Goodseer: 1,
			Investigator: 1,
			Lycan: 1,
			Tanner: 1,
			Werewolf: 2,
			Villager: 4
		}
	},
	{
		name: '[🐺]→ Làng sói điển hình',
		roles: {
			Evilseer: 1,
			Goodseer: 1,
			Hunter: 1,
			Cupid: 1,
			Witch: 1,
			Werewolf: 3,
			Villager: 8
		}
	}
];

//  _____ ___ __  __ _____ ___  _   _ _____
// |_   _|_ _|  \/  | ____/ _ \| | | |_   _|
//   | |  | || |\/| |  _|| | | | | | | | |
//   | |  | || |  | | |__| |_| | |_| | | |
//   |_| |___|_|  |_|_____\___/ \___/  |_|
module.exports.timeout = {
	DELAY_STARTGAME: 10000,
	DISCUSS: 45000,
	Bite: 30000,
	Investigator: 40000,
	Kill: 30000,
	Pair: 40000,
	Protect: 30000,
	RoleReveal: 30000,
	Seer: 30000,
	VoteLynch: 30000
};


//abbabbababa