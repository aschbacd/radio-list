package controllers

import (
	"net/http"
	"net/url"
	"strconv"

	"github.com/aschbacd/radio-list/models"
	"github.com/gin-gonic/gin"
)

// GetSongs returns all songs for a radio station (using pagination)
func (dc *DatabaseController) GetSongs(c *gin.Context) {
	// Get radio station
	radioStation, err := getRadioStation(c)
	if err != nil {
		return
	}

	// Get songs from db
	songs, err := radioStation.GetSongs(dc.DB, getPageNumber(c))
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{
			Error: &models.Error{
				Code:    http.StatusInternalServerError,
				Message: err.Error(),
			},
		})
		return
	}

	c.JSON(http.StatusOK, models.Response{Success: true, Data: songs})
}

// FindSongs returns all songs where title or artist contains search string (using pagination)
func (dc *DatabaseController) FindSongs(c *gin.Context) {
	// Get radio station
	radioStation, err := getRadioStation(c)
	if err != nil {
		return
	}

	// Get songs from db
	songs, err := radioStation.FindSongs(dc.DB, c.Query("search"), getPageNumber(c))
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{
			Error: &models.Error{
				Code:    http.StatusInternalServerError,
				Message: err.Error(),
			},
		})
		return
	}

	c.JSON(http.StatusOK, models.Response{Success: true, Data: songs})
}

// GetYouTubeLink redirects to YouTube or shows an error
func GetYouTubeLink(c *gin.Context) {
	link, err := models.GetYouTubeLink(url.QueryEscape(c.Query("search")))
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	c.Redirect(http.StatusFound, link)
}

// getRadioStation returns the selected radio station or an error
func getRadioStation(c *gin.Context) (models.RadioStation, error) {
	radioStationId, err := strconv.Atoi(c.Param("radio-station"))
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{
			Error: &models.Error{
				Code:    http.StatusBadRequest,
				Message: "invalid radio-station id",
			},
		})
	}
	return models.RadioStation{Id: radioStationId}, err
}

// getPageNumber returns the selected page number (default 1)
func getPageNumber(c *gin.Context) int {
	pageNumber, err := strconv.Atoi(c.Query("page"))
	if err != nil {
		pageNumber = 1
	}
	return pageNumber
}
