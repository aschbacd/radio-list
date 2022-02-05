# radio-list

Radio-List is a web application that lists songs with their play count for
Austrian radio stations from 2007 to 2018.

## Configuration

The application can be configured using environment variables, either by using the file `.env` to
store key/value pairs or by directly exporting them in the applications environment. The following
variables can be used:

| Environment variable | Description                      | Default                  |
| -------------------- | -------------------------------- | ------------------------ |
| ADDRESS              | Address used to launch server    | `localhost`              |
| PORT                 | Port used to launch server       | `8080`                   |
| ENV                  | Application environment          | `prod`                   |
| DB_PATH              | Path to sqlite database          | `database/radio-list.db` |
| YOUTUBE_API_KEY      | API key to get YouTube video url | `-`                      |
