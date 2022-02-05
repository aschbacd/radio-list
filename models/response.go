package models

type Error struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type Response struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Error   *Error      `json:"error,omitempty"`
}
