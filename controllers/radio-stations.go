package controllers

import (
	"net/http"

	"github.com/aschbacd/radio-list/models"
	"github.com/gin-gonic/gin"
)

// GetRadioStations returns all radio stations
func (dc *DatabaseController) GetRadioStations(c *gin.Context) {
	radioStations, err := models.GetRadioStations(dc.DB)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.Response{
			Error: &models.Error{
				Code:    http.StatusInternalServerError,
				Message: err.Error(),
			},
		})
		return
	}

	c.JSON(http.StatusOK, models.Response{Success: true, Data: radioStations})
}
