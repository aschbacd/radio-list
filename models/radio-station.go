package models

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/aschbacd/radio-list/pkg/logger"
)

type RadioStation struct {
	Id           int       `json:"id"`
	Abbreviation string    `json:"abbreviation"`
	Name         string    `json:"name"`
	MinDate      time.Time `json:"min_date"`
	MaxDate      time.Time `json:"max_date"`
}

// GetRadioStations fetches all radio stations from the db
func GetRadioStations(db *sql.DB) ([]RadioStation, error) {
	rows, err := db.Query("SELECT * FROM radio_stations")
	if err != nil {
		logger.Error(err.Error())
		return nil, fmt.Errorf("error getting radio stations")
	}

	radioStations := []RadioStation{}
	for rows.Next() {
		var radioStation RadioStation
		if err = rows.Scan(&radioStation.Id, &radioStation.Abbreviation, &radioStation.Name, &radioStation.MinDate, &radioStation.MaxDate); err != nil {
			logger.Error(err.Error())
			return nil, fmt.Errorf("error getting radio station")
		}
		radioStations = append(radioStations, radioStation)
	}

	return radioStations, nil
}

// GetSongs fetches all songs from the db (using pagination)
func (radioStation *RadioStation) GetSongs(db *sql.DB, page int) ([]Song, error) {
	rows, err := db.Query("SELECT id, title, artist, count FROM songs_per_radio_station WHERE radio_station_id = ? ORDER BY count DESC LIMIT 30 OFFSET ?", radioStation.Id, (page-1)*30)
	if err != nil {
		logger.Error(err.Error())
		return nil, fmt.Errorf("error getting songs")
	}

	return getSongsFromRows(rows)
}

// FindSong fetches all songs from the db containing the search string (using pagination)
func (radioStation *RadioStation) FindSongs(db *sql.DB, search string, page int) ([]Song, error) {
	searchQuery := fmt.Sprintf("%%%s%%", search)
	rows, err := db.Query("SELECT id, title, artist, count FROM songs_per_radio_station WHERE radio_station_id = ? AND (title like ? OR artist like ?) ORDER BY count DESC LIMIT 30 OFFSET ?", radioStation.Id, searchQuery, searchQuery, (page-1)*30)
	if err != nil {
		logger.Error(err.Error())
		return nil, fmt.Errorf("error getting songs")
	}

	return getSongsFromRows(rows)
}

// getSongsFromRows converts the sql rows to a list of songs
func getSongsFromRows(rows *sql.Rows) ([]Song, error) {
	songs := []Song{}
	for rows.Next() {
		var song Song
		if err := rows.Scan(&song.Id, &song.Title, &song.Artist, &song.Count); err != nil {
			logger.Error(err.Error())
			return nil, fmt.Errorf("error getting song")
		}
		songs = append(songs, song)
	}
	return songs, nil
}
