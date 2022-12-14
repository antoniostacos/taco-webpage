# Test web app that returns the name of the host/pod/container servicing req
# Linux x64
FROM node:current-alpine

RUN apk add --no-cache postgresql-client

LABEL org.opencontainers.image.title="Antonio's Tacos" \
      org.opencontainers.image.description="demo webpage" \
      org.opencontainers.image.authors="glueOps"

# Create directory in container image for app code
RUN mkdir -p /usr/src/app

# Copy app code (.) to /usr/src/app in container image
COPY . /usr/src/app

# Set working directory context
WORKDIR /usr/src/app

# Install dependencies from packages.json
RUN npm ci

# Command for container to execute
CMD [ "node", "app.js" ]
