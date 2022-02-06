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

## Development

### Prerequisites

- [Go Version Manager](https://github.com/moovweb/gvm) (optional but recommended)
- [Go](https://go.dev) go1.17.6
- [Node Version Manager](https://github.com/nvm-sh/nvm#install--update-script) (optional but
  recommended)
- [Node.js](https://nodejs.org) v17.3.1
- [Visual Studio Code](https://code.visualstudio.com)

### Installation

1. Clone repository

   ```
   git clone git@github.com:aschbacd/radio-list.git
   cd radio-list
   ```

1. Install dependencies

   ```bash
   # node modules
   npm install

   # go packages
   go get ./...
   ```

1. Open project in Visual Studio Code and install recommended extensions. There will be a popup in
   the lower right corner of your IDE.

1. Start development servers

   ```bash
   # frontend
   npm start

   # backend
   go run .
   ```
