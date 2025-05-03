#!/usr/bin/env -S just --justfile
# ^ A shebang isn't required, but allows a justfile to be executed
#   like a script, with `./justfile test`, for example.

set dotenv-required := false
set dotenv-load := true
set dotenv-path := ".env"
set export :=  true

[private]
app_identifier := "phoenix_lit"

[private]
app_version := "0.0.0"

[private]
app_image := "ghcr.io/riipandi/lit-on-phoenix"

[private]
default:
  @just --list --unsorted --list-heading $'Available tasks:\n'

#----- Development and Build tasks --------------------------------------------

[doc('Prepare the environment')]
setup:
  @mix setup

[doc('Start development')]
[no-exit-message]
dev *args:
  @mix phx.server {{args}}

[doc('Build the application')]
[no-exit-message]
build +MIX_ENV='prod':
  @echo "Building the application in {{MIX_ENV}} mode..."
  @mix local.hex --force
  @mix local.rebar --force
  @mix deps.get --only {{MIX_ENV}}
  @mix deps.compile
  @mix assets.deploy
  @mix compile --force
  @mix release --force --overwrite --quiet

[doc('Start the application from build')]
[no-exit-message]
start +MIX_ENV='prod':
  @echo "Starting the application in {{MIX_ENV}} mode..."
  @_build/{{MIX_ENV}}/rel/{{app_identifier}}/bin/server

[doc('Tests the application')]
test *args:
  @mix test {{args}}

[doc('Format the code')]
format *args:
  @mix format {{args}}

[doc('Check the code')]
check *args:
  @mix credo {{args}}

#----- Docker related tasks ---------------------------------------------------

[doc('Start the development environment')]
compose-up:
  @docker compose -f compose.yaml up --detach --remove-orphans

[doc('Stop the development environment')]
compose-down:
  @docker compose -f compose.yaml down --remove-orphans

[doc('Cleanup the development environment')]
compose-cleanup:
  @docker compose -f compose.yaml down --remove-orphans --volumes

[doc('Build the Docker image')]
docker-build *args:
  @docker build -f Dockerfile . -t {{app_image}}:{{app_version}} {{args}}
  @docker image list --filter reference={{app_image}}:*

[doc('Run the Docker image')]
[no-exit-message]
docker-run *args:
  @docker run --network=host --rm -it {{app_image}}:{{app_version}} {{args}}

[doc('Run the Docker image')]
[no-exit-message]
docker-shell *args:
  @docker run --network=host --rm -it --entrypoint /bin/sh {{app_image}}:{{app_version}} {{args}}

[doc('Get Docker image list')]
docker-images:
  @docker image list --filter reference={{app_image}}:*

[doc('Push the Docker image')]
docker-push:
  @docker push {{app_image}}:{{app_version}}
