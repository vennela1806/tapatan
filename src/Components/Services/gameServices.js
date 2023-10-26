import http from "./httpService";
import helpers from "./cryptos";

const apiEndpoint = process.env.REACT_APP_API_URL;

export async function startGame(firstPlayer) {
  const Obj = { firstPlayer };
  const drreqpob = helpers.encryptobj(Obj);

  const data = await http.post(apiEndpoint + "/game/start", {
    enc: drreqpob,
  });

  if (data) {
    var dd = helpers.decryptobj(data.data);
    console.log(dd, "bot  ");
    return dd;
  }
}

export async function makeMove(gameId, player, member, position) {
  const Obj = { gameId, player, member, position };
  console.log(Obj);
  const drreqpob = helpers.encryptobj(Obj);

  const data = await http.post(apiEndpoint + "/game/make_move", {
    enc: drreqpob,
  });
  if (data) {
    var dd = helpers.decryptobj(data.data);
    console.log(dd, "user");
    return dd;
  }
}

export async function reset(gameId) {
  const Obj = { gameId };
  const drreqpob = helpers.encryptobj(Obj);
  const data = await http.post(apiEndpoint + "/game/reset", {
    enc: drreqpob,
  });
  if (data) {
    var dd = helpers.decryptobj(data.data);
    return dd;
  }
}

export default {
  startGame,
  makeMove,
  reset,
};
