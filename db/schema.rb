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

ActiveRecord::Schema.define(version: 20170426192415) do

  create_table "courses", force: :cascade do |t|
    t.string   "name"
    t.string   "codeDept"
    t.string   "codeNum"
    t.integer  "credits"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "plans", force: :cascade do |t|
    t.string   "name"
    t.integer  "currSemester"
    t.integer  "catalogYear"
    t.string   "majorName"
    t.integer  "currYear"
    t.integer  "user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["user_id"], name: "index_plans_on_user_id"
  end

  create_table "requirement_categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "requirements", force: :cascade do |t|
    t.integer  "course_id"
    t.integer  "requirementcategory_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["course_id"], name: "index_requirements_on_course_id"
    t.index ["requirementcategory_id"], name: "index_requirements_on_requirementcategory_id"
  end

  create_table "semester_courses", force: :cascade do |t|
    t.integer  "semester_id"
    t.integer  "course_id"
    t.integer  "plan_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["course_id"], name: "index_semester_courses_on_course_id"
    t.index ["plan_id"], name: "index_semester_courses_on_plan_id"
    t.index ["semester_id"], name: "index_semester_courses_on_semester_id"
  end

  create_table "semesters", force: :cascade do |t|
    t.integer "term"
    t.integer "year_id"
    t.integer "plan_id"
    t.index ["plan_id"], name: "index_semesters_on_plan_id"
    t.index ["year_id"], name: "index_semesters_on_year_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "role"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.string   "name"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "login"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["login"], name: "index_users_on_login", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "years", force: :cascade do |t|
    t.integer  "year"
    t.integer  "plan_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id"], name: "index_years_on_plan_id"
  end

end
