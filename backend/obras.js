const Pool = require("pg").Pool;
const config = require("./config.json");

const pool = new Pool(config.database);

const get = (request, response) => {
  pool.query(
    "select o.id,o.codigo,o.descricao,b.id as id_bem_publico,b.descricao as bem_publico, array[]::text[] as photos " +
      "from obr_obra o " +
      "join obr_obra_bem_publico obp on (obp.obr_obra = o.id) " +
      "join grl_bem_publico b on b.id = obp.grl_bem_publico " +
      "order by 1",
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);
      response.status(200).json(results.rows);
    }
  );
};

const getById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "select o.id,o.codigo,o.descricao,b.id as id_bem_publico,b.descricao as bem_publico " +
      "from obr_obra o " +
      "join obr_obra_bem_publico obp on (obp.obr_obra = o.id) " +
      "join grl_bem_publico b on b.id = obp.grl_bem_publico " +
      "where o.id = $1 " +
      "order by 1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const reciver = (request, response) => {
  dados = request.body;
  dados.toString("latin1");
  console.log(dados);
  dados = JSON.parse(dados.data);
  console.log(dados);
  //  for(var cada in dados){
  //      console.log(dados[cada])
  //  }

  response.status(200).send("Obras recebidas");
};

module.exports = {
  get,
  getById,
  reciver
};
