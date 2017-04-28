# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  create_table "activities", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "activity_logs", force: :cascade do |t|
    t.integer  "baby_id",      limit: 4
    t.integer  "assistant_id", limit: 4
    t.integer  "activity_id",  limit: 4
    t.datetime "start_time"
    t.datetime "stop_time"
    t.integer  "duration",     limit: 4
    t.text     "comments",     limit: 65535
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "activity_logs", ["activity_id"], name: "index_activity_logs_on_activity_id", using: :btree
  add_index "activity_logs", ["assistant_id"], name: "index_activity_logs_on_assistant_id", using: :btree
  add_index "activity_logs", ["baby_id"], name: "index_activity_logs_on_baby_id", using: :btree

  create_table "assistants", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "group",      limit: 255
    t.string   "address",    limit: 255
    t.string   "phone",      limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "babies", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.date     "birthday"
    t.string   "mother_name", limit: 255
    t.string   "father_name", limit: 255
    t.string   "address",     limit: 255
    t.string   "phone",       limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_foreign_key "activity_logs", "activities"
  add_foreign_key "activity_logs", "assistants"
  add_foreign_key "activity_logs", "babies"
end
