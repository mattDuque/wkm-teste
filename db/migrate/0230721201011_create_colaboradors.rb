class CreateColaboradors < ActiveRecord::Migration[7.0]
  def change
    create_table :colaboradors do |t|
      t.string :nome
      t.string :foto, default: nil
      t.string :cargo
      t.datetime :data_contratacao
      t.boolean :em_ferias, default: false
      t.integer :saldo_ferias, default: 0
      t.boolean :vencimento_iminente, default: false

      t.timestamps
    end

    add_index :colaboradors, :data_contratacao

    # Definir o valor do atributo saldo_ferias_inicial para os registros existentes
    Colaborador.find_each do |colaborador|
      colaborador.update(saldo_ferias_inicial: colaborador.saldo_ferias)
    end
  end
end