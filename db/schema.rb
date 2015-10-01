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

ActiveRecord::Schema.define(version: 20150930230353) do

  create_table "categories", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.string   "title_slug", limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "categories_posts", id: false, force: :cascade do |t|
    t.integer "category_id", limit: 4
    t.integer "post_id",     limit: 4
  end

  add_index "categories_posts", ["category_id"], name: "index_categories_posts_on_category_id", using: :btree
  add_index "categories_posts", ["post_id"], name: "index_categories_posts_on_post_id", using: :btree

  create_table "categories_projects", id: false, force: :cascade do |t|
    t.integer "categorie_id", limit: 4
    t.integer "project_id",   limit: 4
  end

  add_index "categories_projects", ["categorie_id"], name: "index_categories_projects_on_categorie_id", using: :btree
  add_index "categories_projects", ["project_id"], name: "index_categories_projects_on_project_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "path",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "images_projects", id: false, force: :cascade do |t|
    t.integer "image_id",   limit: 4
    t.integer "project_id", limit: 4
  end

  add_index "images_projects", ["image_id"], name: "index_images_projects_on_image_id", using: :btree
  add_index "images_projects", ["project_id"], name: "index_images_projects_on_project_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "title",           limit: 255
    t.string   "title_slug",      limit: 255
    t.datetime "published_at"
    t.text     "content",         limit: 65535
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "series_id",       limit: 4
    t.integer  "series_position", limit: 4
  end

  add_index "posts", ["series_id"], name: "index_posts_on_series_id", using: :btree

  create_table "projects", force: :cascade do |t|
    t.string   "title",       limit: 255
    t.string   "title_slug",  limit: 255
    t.string   "link",        limit: 255
    t.text     "description", limit: 65535
    t.string   "skills",      limit: 255
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "series", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.string   "title_slug", limit: 255
    t.text     "about",      limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",               limit: 255
    t.string   "email",              limit: 255
    t.string   "encrypted_password", limit: 255
    t.string   "salt",               limit: 255
    t.boolean  "is_admin"
    t.boolean  "is_subscriber"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  add_foreign_key "posts", "series"
end
