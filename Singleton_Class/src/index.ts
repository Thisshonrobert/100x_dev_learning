import { GameManager } from "./store";
import { startLogger } from "./logger";

startLogger();

setInterval(() => {
    GameManager.getInstance().addGame({
        id: Math.random().toString(),
        whitePlayer: "kitty",
        blackPlayer: "thishi",
        moves: []
    })
}, 5000)
