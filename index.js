const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");

/////////////////////////////////////////////
//========= Check node.js version =========//
/////////////////////////////////////////////

// const nodeVersion = semver.parse(process.version);
// if (nodeVersion.major < 13) {
//     logger(`Your Node.js ${process.version} is not supported, it required Node.js 13 to run bot!`, "error");
//     return process.exit(0);
// };

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/utils/index.html'));
});

app.listen(port);

logger("Bot đang kết nối tới Main...", "[ Bắt đầu ]");

/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(message) {
    (message) ? logger(message, "[ Bắt đầu ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            startBot("Restarting...");
            global.countRestart += 1;
            return;
        } else return;
    });

    child.on("error", function (error) {
        logger("Đã xảy ra lỗi: " + JSON.stringify(error), "[ Bắt đầu ]");
    });
};
////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////
const { Chess } = require("chess.js");
const { createCanvas, loadImage, registerFont } = require("canvas");
const cors = require("cors");
const fs = require("fs");
const domain = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.set("json spaces", 4);
app.use(express.urlencoded({limit: '10mb', extended: true }));
app.use(express.static(__dirname + "/chess/chess/"));
const path2 = __dirname + "/chess/game_state.json";
const chess = new Chess();
const canvasWidth = 700;
const canvasHeight = 700;
const squareSize = canvasWidth / 8;

registerFont(__dirname + "/chess/font/Montserrat-Bold.ttf", { family: "font" });

const pieces = {
  wk: "white-king.png",
  wq: "white-queen.png",
  wr: "white-rook.png",
  wb: "white-bishop.png",
  wn: "white-knight.png",
  wp: "white-pawn.png",
  bk: "black-king.png",
  bq: "black-queen.png",
  br: "black-rook.png",
  bb: "black-bishop.png",
  bn: "black-knight.png",
  bp: "black-pawn.png",
};

const lightColor = "#edeed1";
const darkColor = "#779952";
const specialLetters = ["a", "c", "e", "g"];

// Vẽ bàn cờ từ trạng thái FEN
async function drawChessBoard(fen) {
  const chesss = new Chess(fen);
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");


  // Vẽ các ô trên bàn cờ
  const board = chesss.board();
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const x = col * squareSize;
      const y = row * squareSize;

      const color = (row + col) % 2 === 0 ? lightColor : darkColor;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, squareSize, squareSize);

        // Vẽ số ở cột đầu tiên bên trái
        if (col === 0) {
          ctx.font = "18px font";
          ctx.fillStyle = color === lightColor ? darkColor : lightColor;

          const number = 8 - row;
          const numberX = x + 2;
          const numberY = y + 15;
          ctx.fillText(number.toString(), numberX, numberY);
        }

        // Vẽ chữ cái ở hàng cuối cùng
        if (row === 7) {
          ctx.font = "18px font";
          const letter = String.fromCharCode(97 + col);
          const textColorToUse = specialLetters.includes(letter)
            ? lightColor
            : darkColor;
          ctx.fillStyle = textColorToUse;

          const letterX = x + squareSize - 13;
          const letterY = canvasHeight - 3;
          ctx.fillText(letter, letterX, letterY);
        }

      const piece = board[row][col];
      if (piece !== null) {
        const pieceImg = await loadImage(
          __dirname + `/chess/image/${pieces[piece.color + piece.type]}`
        );
         ctx.drawImage(
          pieceImg,
          x,
          y,
          squareSize,
          squareSize
        );
      }
    }
  }
  return canvas;
}

async function drawChessBoardBlack(fen) {
  const chess = new Chess(fen);
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  const board = chess.board();
  for (let row = 7; row >= 0; row--) {
    for (let col = 7; col >= 0; col--) {
      const x = (7 - col) * squareSize; // Đảo ngược vị trí cột
      const y = (7 - row) * squareSize; // Đảo ngược vị trí hàng

      const color = (row + col) % 2 === 0 ? lightColor : darkColor;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, squareSize, squareSize);

      if (col === 7) {
      ctx.font = "18px font";
      ctx.fillStyle = color === lightColor ? darkColor : lightColor;

      const number = 8 - row;
      const numberX = x + 2;
      const numberY = y + 15;
      ctx.fillText(9-number.toString(), numberX, numberY);
    }

    if (row === 0) {
      ctx.font = "18px font";
      const letter = String.fromCharCode(97 + (7 - col)); 
      const textColorToUse = specialLetters.includes(letter)
        ? lightColor
        : darkColor;
      ctx.fillStyle = textColorToUse;

      const letterX = x + squareSize - 12;
      const letterY = y + squareSize - 3 ; 
      ctx.fillText(letter, letterX, letterY);
    }

      const piece = board[row][col];
      if (piece !== null) {
        const pieceImg = await loadImage(
          __dirname + `/chess/image/${pieces[piece.color + piece.type]}`
        );
        ctx.drawImage(pieceImg, x, y, squareSize, squareSize);
      }
    }
  }
  return canvas;
}

// Kiểm tra và thực hiện phong tốt nếu cần
// Hàm kiểm tra vị trí đích của tốt
function isPawnPromotionSquare(from, to, ches) {
  if (ches.get(from).type === "P" && to[1] === "8") {
    return true;
  }

  if (ches.get(from).type === "p" && to[1] === "1") {
    return true;
  }

  if (ches.get(from).type === "p" && to[1] === "8") {
    return true;
  }

  if (ches.get(from).type === "P" && to[1] === "1") {
    return true;
  }
  return false;
}

async function handlePlayerMove(id, from, to, promotion, res) {
  const data = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const foundIndex = data.findIndex((item) => item.id === id);
  const imagePath = __dirname + `/chess/chess/${id}.png`;
  const fen = data[foundIndex].fen;

  const chess = new Chess(fen);

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  if (chess.turn() === "w" && chess.get(from).color === "b")
    return res.status(200).json({ status: false, message: "Lượt này bên trắng đi!" });
  if (chess.turn() === "b" && chess.get(from).color === "w")
    return res.status(200).json({ status: false, message: "Lượt này bên đen đi!" });
  if (chess.isGameOver()) {
    return res.status(200).json({
      status: false,
      game: "end",
      win: chess.turn(),
      message: chess.isCheckmate() ? "Chiếu hậu!" : "Hòa!",
    });
  }

  const form = { from: from, to: to };
  if (isPawnPromotionSquare(from, to, chess)) {
    if (!promotion) return res.status(200).json({ status: false, message: `Vui lòng phong tốt để được đi tiếp\n\n"q": Hậu (Queen) \n"r": Xe (Rook) \n"n": Ngựa (Knight) \n"b": Tượng (Bishop)\n\nVí dụ: a7 a8 q (phong hậu cho tốt)` });
    form.promotion = promotion;
  }

  const moveResult = chess.move(form);

  if (moveResult !== null) {
    const fen_new = chess.fen();
    const board = chess.board();

    if(chess.turn() === "b"){
      for (let row = 7; row >= 0; row--) {
    for (let col = 7; col >= 0; col--) {
      const x = (7 - col) * squareSize; // Đảo ngược vị trí cột
      const y = (7 - row) * squareSize; // Đảo ngược vị trí hàng

      const color = (row + col) % 2 === 0 ? lightColor : darkColor;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, squareSize, squareSize);

      if (col === 7) {
      ctx.font = "18px font";
      ctx.fillStyle = color === lightColor ? darkColor : lightColor;

      const number = 8 - row;
      const numberX = x + 2;
      const numberY = y + 15;
      ctx.fillText(9-number.toString(), numberX, numberY);
    }

    if (row === 0) {
      ctx.font = "18px font";
      const letter = String.fromCharCode(97 + (7 - col)); 
      const textColorToUse = specialLetters.includes(letter)
        ? lightColor
        : darkColor;
      ctx.fillStyle = textColorToUse;

      const letterX = x + squareSize - 12;
      const letterY = y + squareSize - 3 ; 
      ctx.fillText(letter, letterX, letterY);
    }

      const piece = board[row][col];
      if (piece !== null) {
        const pieceImg = await loadImage(
          __dirname + `/chess/image/${pieces[piece.color + piece.type]}`
        );
        ctx.drawImage(pieceImg, x, y, squareSize, squareSize);
      }
    }
  }
    }else if(chess.turn() === "w"){
    for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const x = col * squareSize;
      const y = row * squareSize;

      const color = (row + col) % 2 === 0 ? lightColor : darkColor;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, squareSize, squareSize);

        // Vẽ số ở cột đầu tiên bên trái
        if (col === 0) {
          ctx.font = "18px font";
          ctx.fillStyle = color === lightColor ? darkColor : lightColor;

          const number = 8 - row;
          const numberX = x + 2;
          const numberY = y + 15;
          ctx.fillText(number.toString(), numberX, numberY);
        }

        // Vẽ chữ cái ở hàng cuối cùng
        if (row === 7) {
          ctx.font = "18px font";
          const letter = String.fromCharCode(97 + col);
          const textColorToUse = specialLetters.includes(letter)
            ? lightColor
            : darkColor;
          ctx.fillStyle = textColorToUse;

          const letterX = x + squareSize - 13;
          const letterY = canvasHeight - 3;
          ctx.fillText(letter, letterX, letterY);
        }

      const piece = board[row][col];
      if (piece !== null) {
        const pieceImg = await loadImage(
          __dirname + `/chess/image/${pieces[piece.color + piece.type]}`
        );
         ctx.drawImage(
          pieceImg,
          x,
          y,
          squareSize,
          squareSize
        );
      }
    }
  }
}
    const out = fs.createWriteStream(imagePath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', async () => {
    await saveGameState(id, fen_new);
    res.json({
      status: true,
      play: chess.turn(),
      url: domain + `/${id}.png` 
    });
  });
  } else {
    return res.status(200).json({
      status: false,
      message: "Nước đi không hợp lệ! Vui lòng thử lại.",
    });
  }
}

// Lưu trạng thái của trò chơi vào file JSON
function saveGameState(id, fen) {
  const gameState = { id, fen };
  const data = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const foundIndex = data.findIndex((item) => item.id === id);

  if (foundIndex !== -1) {
    data[foundIndex].fen = fen;
  } else {
    data.push(gameState);
  }
  fs.writeFileSync(path2, JSON.stringify(data, null, 4));
}

function randomColor() {
  return Math.random() < 0.5 ? 'white' : 'black';
}

app.post("/api/key/:type",(req, res) => {
  const { type } = req.params;
  const { name, key } = req.query
  const data = JSON.parse(fs.readFileSync(pathKey, 'utf8'));
  if (type === 'create') {
    var new_Key = {
      key: createKey(6),
      name: name.toUpperCase()
    }
    data.push(new_Key)
    res.json({
      status: true,
      message: 'Tạo Key Thành Công!'
    })
  } else if (type === 'remove') {
    var check = data.find((item) => item.key === key);
    if (!check) {
      return res.json({
        status: false,
        message: 'Không tìm thấy key cần xóa!'
      })
    }
    var new_data = data.filter((item) => item.key !== key);
    data.push(new_data)
    res.json({
      status: true,
      message: 'Tạo Key Thành Công!'
    })
  } else if (type === 'check') {
    var check = data.find((item) => item.key === key);
    var status = check ? true : false
    return res.json({
      status
    })
  }
  fs.writeFileSync(pathKey, JSON.stringify(data, null, 4));
});

// API endpoint để di chuyển quân cờ
app.post("/api/move/:id",(req, res) => {
  const { id } = req.params;
  const { from, to, promotion } = req.query;

  var promo = !promotion ? false : promotion;

  handlePlayerMove(id, from, to, promo, res);
});

app.get("/api/move/test/:id", (req, res) => {
  const { id } = req.params;
  const { from, to, promotion } = req.query;

  var promo = !promotion ? false : promotion;

  handlePlayerMove(id, from, to, promo, res);
});

app.get("/api/player/:id", (req, res) => {
  const { id } = req.params;
  const { player } = req.query

  const data = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const foundIndex = data.find((item) => item.id === id);

  const bufferData = Buffer.from(player, 'base64');

  const jsonString = bufferData.toString('utf8');

  const jsonData = JSON.parse(jsonString);
  jsonData[0].color = randomColor();
  jsonData[1].color = jsonData[0].color === 'white' ? 'black' : 'white';

  const fen = foundIndex ? foundIndex.fen : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

  var msg = 'Bên White đi trước'
  const ches = new Chess(fen);
  const lastChar = ches.turn()
  if(foundIndex){
  if (lastChar === "w") {
  msg = "White được phép di chuyển trong lượt tới";
} else if (lastChar === "b") {
  msg = "Black được phép di chuyển trong lượt tới";
}
  }
  res.json({
    status: true,
    message: msg,
    start: lastChar,
    resul: jsonData
  })
});

// API endpoint để hiển thị trạng thái bàn cờ dựa trên trạng thái FEN
app.post("/api/board/:id",async (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const foundIndex = data.find((item) => item.id === id);
  const imagePath = __dirname + `/chess/chess/${id}.png`;
  var fen;
  if (!foundIndex) {
    fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; //chess.fen();
    saveGameState(id, fen);
  } else fen = foundIndex.fen
  try {
    const ches = new Chess(fen)
    if(ches.turn() === 'b'){
    const chessBoardImageB = await drawChessBoardBlack(fen);
     const outB = fs.createWriteStream(imagePath);
  const streamB = chessBoardImageB.createPNGStream();
  streamB.pipe(outB);
  outB.on('finish', async () => {
    return res.json({
      status: true,
      play: ches.turn(),
      url: domain + `/${id}.png` 
    });
  });
      return;
    }
    const chessBoardImage = await drawChessBoard(fen);
     const out = fs.createWriteStream(imagePath);
  const stream = chessBoardImage.createPNGStream();
  stream.pipe(out);
  out.on('finish', async () => {
    res.json({
      status: true,
      play: ches.turn(),
      url: domain + `/${id}.png` 
    });
  });
  } catch (e) {
    console.log(e)
    res.json({
      status: false,
      message: 'Đã xảy ra lỗi khi tạo bàn cờ!'
    })
  }
});
///////--------------TEST
app.get("/api/board/:id", async (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const foundIndex = data.find((item) => item.id === id);
  const imagePath = __dirname + `/chess/chess/${id}.png`;
  var fen;
  if (!foundIndex) {
    fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; //chess.fen();
    saveGameState(id, fen);
  } else fen = foundIndex.fen
  try {
    const ches = new Chess(fen)
    if(ches.turn() === 'b'){
    const chessBoardImageB = await drawChessBoardBlack(fen);
     const outB = fs.createWriteStream(imagePath);
  const streamB = chessBoardImageB.createPNGStream();
  streamB.pipe(outB);
  outB.on('finish', async () => {
    return res.json({
      status: true,
      play: ches.turn(),
      url: domain + `/${id}.png` 
    });
  });
      return;
    }
    const chessBoardImage = await drawChessBoard(fen);
     const out = fs.createWriteStream(imagePath);
  const stream = chessBoardImage.createPNGStream();
  stream.pipe(out);
  out.on('finish', async () => {
    res.json({
      status: true,
      play: ches.turn(),
      url: domain + `/${id}.png` 
    });
  });
  } catch (e) {
    console.log(e)
    res.json({
      status: false,
      message: 'Đã xảy ra lỗi khi tạo bàn cờ!'
    })
  }
});

////////////------------------ END
app.delete("/api/board/remove/:id", async (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(path2, 'utf8'));
  var datas = data.find((item) => item.id === id);
  if(datas){
  var new_data = data.filter((item) => item.id !== id);
  fs.writeFileSync(path2, JSON.stringify(new_data, null, 4));
    return res.json({
      status: true,
      message: 'Đã xóa bàn cờ thành công!'
    })
  }else return res.json({
      status: false,
      message: 'Không có bàn cờ để xóa!'
    })
});


axios.get("https://raw.githubusercontent.com/bantuankhanh200/ZEUS-MAIN/Main/package.json").then((res) => {
    logger(res['data']['name'], "[ NAME ]");
    logger("Version: " + res['data']['version'], "[ VERSION ]");
    logger(res['data']['description'], "[ DESCRIPTION ]");
});
startBot();
/*axios.get("https://raw.githubusercontent.com/d-jukie/miraiv2_fix/main/package.json").then((res) => {
    const local = JSON.parse(readFileSync('./package.json'));
    if (semver['lt'](local.version, res['data']['version'])) {
        if (local.autoUpdate == !![]) {
            logger('A new update is available, start update processing...', '[ UPDATE ]');
            const updateBot = {};
            updateBot.cwd = __dirname
            updateBot.stdio = 'inherit' 
            updateBot.shell = !![];
            const child = spawn('node', ['update.js'], updateBot);
            child.on('exit', function () {
                return process.exit(0);
            })
            child.on('error', function (error) {
                logger('Unable to update:' + JSON.stringify(error), '[ CHECK UPDATE ]');
            });
        } else logger('A new update is available! Open terminal/cmd and type "node update" to update!', '[ UPDATE ]'), 
        startBot();
    } else logger('You are using the latest version!', '[ CHECK UPDATE ]'), startBot();
}).catch(err => logger("Unable to check update.", "[ CHECK UPDATE ]"));*/
// THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯
