package main

import (
	"database/sql"

	"github.com/aschbacd/radio-list/controllers"
	"github.com/aschbacd/radio-list/pkg/logger"
	"github.com/aschbacd/radio-list/pkg/utils"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	// Load .env file (if exists)
	if err := godotenv.Load(); err != nil {
		logger.Info(err.Error())
	}

	// Database
	db, err := sql.Open("sqlite3", utils.GetEnv("DB_PATH", "database/radio-list.db"))
	if err != nil {
		logger.Fatal(err.Error())
	}

	databaseController := controllers.DatabaseController{DB: db}

	// Enable Gin release mode
	if utils.GetEnv("ENV", "prod") == "prod" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Gin
	r := gin.Default()
	r.Use(static.ServeRoot("/", "./dist"))
	r.NoRoute(func(c *gin.Context) {
		c.File("./dist/index.html")
	})

	if utils.GetEnv("ENV", "prod") == "dev" {
		// Enable CORS for development
		config := cors.DefaultConfig()
		config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
		config.AllowOrigins = []string{"*"}
		r.Use(cors.New(config))
	}

	// Routes
	r.GET("/youtube-link", controllers.GetYouTubeLink)
	
	api := r.Group("/api")
	api.GET("/radio-stations", databaseController.GetRadioStations)
	api.GET("/songs/:radio-station", databaseController.GetSongs)
	api.GET("/songs/:radio-station/find", databaseController.FindSongs)

	if err := r.Run(utils.GetEnv("ADDRESS", "0.0.0.0") + ":" + utils.GetEnv("PORT", "8080")); err != nil {
		logger.Fatal(err.Error())
	}
}
