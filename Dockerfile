# Backend
FROM golang:1.17.6-alpine3.15 AS base-go
RUN apk add alpine-sdk
COPY . /go/src/github.com/aschbacd/radio-list
WORKDIR /go/src/github.com/aschbacd/radio-list
RUN go build -a -tags netgo -ldflags '-w' -o /go/bin/radio-list /go/src/github.com/aschbacd/radio-list

# Frontend
FROM node:17.3.1-alpine3.15 AS base-node
COPY . /tmp/radio-list
WORKDIR /tmp/radio-list
RUN npm install
# Check for vulnerabilities
RUN npm audit --audit-level moderate
# Check for linting errors and build app
RUN npm run build

# Package
FROM alpine:3.15.4
RUN apk update && apk add ca-certificates

COPY --from=base-go /go/bin/radio-list /usr/share/radio-list/radio-list
COPY --from=base-node /tmp/radio-list/dist /usr/share/radio-list/dist
COPY ./database /usr/share/radio-list/database

WORKDIR /usr/share/radio-list
ENTRYPOINT ["./radio-list"]
