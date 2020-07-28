
exports.up = function(knex) {
  knex.schema.createTable('Hist_Galgo', function(table){
      table.increment();
      table.string('nomeGalgo').notNullable();
      table.string('numGalgo').notNullable();
      table.date('dataCorrida').notNullable();
      table.string('track').notNullable();
      table.string('dis');
      table.string('trp');
      table.string('split');
      table.string('bends');
      table.string('fin');
      table.string('win/');
      table.string('split');
      table.string('split');

    })
};

exports.down = function(knex) {
  
};
