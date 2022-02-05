package models

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/aschbacd/radio-list/pkg/logger"
)

type YouTubeResponse struct {
	Items []struct {
		ID   struct {
			VideoID string `json:"videoId"`
		} `json:"id"`
	} `json:"items"`
}

// GetYouTubeLink returns a link for the first video found
func GetYouTubeLink(search string) (string, error) {
	resp, err := http.Get("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=" + search + "&maxResults=1&key=" + os.Getenv("GOOGLE_API_KEY"))
	if err != nil {
		logger.Error(err.Error())
		return "", fmt.Errorf("error getting youtube link")
	}

	if resp.StatusCode != http.StatusOK {
		logger.Error(fmt.Sprintf("youtube returned http response code %d", resp.StatusCode))
		return "", fmt.Errorf("error getting youtube link")
	}

	defer resp.Body.Close()
	var youtubeResponse YouTubeResponse
	if err = json.NewDecoder(resp.Body).Decode(&youtubeResponse); err != nil {
		logger.Error(err.Error())
		return "", fmt.Errorf("error decoding youtube response")
	}

	youtubeBaseURL := "https://www.youtube.com/watch?v="
	videoId := "za4y549Ian0"
	if len(youtubeResponse.Items) > 0 {
		videoId = youtubeResponse.Items[0].ID.VideoID
	}

	return youtubeBaseURL + videoId, nil
}
