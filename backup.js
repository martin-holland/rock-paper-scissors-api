const [liveGame, setLiveGame] = useState();
const [liveInfo, setLiveInfo] = useState();
const [toggle, setToggle] = useState(false);

useEffect(() => {
  const intervalID = setTimeout(() => {
    setToggle((toggle) => !toggle);
  }, 200);

  const ws = new WebSocket(wsUrl);
  ws.onmessage = function (event) {
    const gameInfo = event.data;
    setLiveGame(gameInfo);
    console.log(liveGame);
    try {
      const info = JSON.parse(liveGame);
      const infoParsed = JSON.parse(info);
      setLiveInfo(infoParsed);
      console.log(liveInfo);
    } catch (error) {
      console.log(error.message);
    }
  };

  return () => clearInterval(intervalID);
}, []);

setLiveInfo({
  type: "GAME_RESULT",
  gameId: "5fc837b57c7cfb3abaa9d1d",
  t: 1642934011193,
  playerA: {
    name: "Kokko Järvinen",
    played: "SCISSORS",
  },
  playerB: {
    name: "Aino Virtanen",
    played: "ROCK",
  },
});
