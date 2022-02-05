package models

type Song struct {
	Id     int    `json:"id"`
	Title  string `json:"title"`
	Artist string `json:"artist"`
	Count  int    `json:"count"`
}

