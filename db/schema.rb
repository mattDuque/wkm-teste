# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_21_251244) do
  create_table "colaboradors", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "nome"
    t.string "foto"
    t.string "cargo"
    t.datetime "data_contratacao"
    t.boolean "em_ferias", default: false
    t.integer "saldo_ferias", default: 0
    t.boolean "vencimento_iminente", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["data_contratacao"], name: "index_colaboradors_on_data_contratacao"
  end

  create_table "ferias_colaboradors", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "data_inicio"
    t.datetime "data_fim"
    t.integer "periodo"
    t.bigint "colaborador_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["colaborador_id"], name: "index_ferias_colaboradors_on_colaborador_id"
    t.index ["data_fim"], name: "index_ferias_colaboradors_on_data_fim"
    t.index ["data_inicio"], name: "index_ferias_colaboradors_on_data_inicio"
  end

  add_foreign_key "ferias_colaboradors", "colaboradors"
end
