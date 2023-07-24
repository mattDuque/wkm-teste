class CreateFeriasColaboradors < ActiveRecord::Migration[7.0]
  def change
    create_table :ferias_colaboradors do |t|
      t.datetime :data_inicio
      t.datetime :data_fim
      t.integer :periodo
      t.references :colaborador, null: false, foreign_key: true

      t.timestamps
    end

    add_index :ferias_colaboradors, :data_inicio
    add_index :ferias_colaboradors, :data_fim
  end
end