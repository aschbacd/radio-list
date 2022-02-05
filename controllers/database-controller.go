package controllers

import "database/sql"

type DatabaseController struct {
	DB *sql.DB
}
