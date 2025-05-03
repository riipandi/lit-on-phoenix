# syntax=docker/dockerfile:1.7

# Arguments with default value (for build).
ARG PLATFORM=linux/amd64
ARG ELIXIR_VERSION=1.18.3
ARG OTP_VERSION=27

# -----------------------------------------------------------------------------
# Install system dependencies
# -----------------------------------------------------------------------------
FROM --platform=${PLATFORM} elixir:${ELIXIR_VERSION}-otp-${OTP_VERSION}-slim AS base
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 COREPACK_INTEGRITY_KEYS=0
ENV FNM_PATH=/usr/bin PNPM_HOME=/pnpm HOME=/root
ENV PATH="$HOME/.local/share/fnm:$PNPM_HOME:$PATH"
ARG NODE_VERSION=20.19.1

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN --mount=target=/var/lib/apt/lists,type=cache,sharing=locked \
    --mount=target=/var/cache/apt,type=cache,sharing=locked \
    rm -f /etc/apt/apt.conf.d/docker-clean && apt-get update -y \
    && apt-get -yqq --no-install-recommends install build-essential \
       curl inotify-tools git unzip ca-certificates tini

RUN echo -e "Installing Node.js $NODE_VERSION" && touch $HOME/.bashrc \
    && curl -fsSL https://fnm.vercel.app/install | bash -s -- --skip-shell --install-dir $FNM_PATH \
    && echo 'eval "$(fnm env --use-on-cd --shell bash)"' >> $HOME/.bashrc \
    && . $HOME/.bashrc \
    && fnm install ${NODE_VERSION} --corepack-enabled \
    && fnm default ${NODE_VERSION} --corepack-enabled \
    && corepack prepare pnpm@latest-10 --activate \
    && node -v && npm -v && pnpm -v

WORKDIR /app

# -----------------------------------------------------------------------------
# Build the application
# -----------------------------------------------------------------------------
FROM base AS builder
ENV MIX_CACHE_DIR=/var/cache/mix MIX_DEBUG=1

# Install hex + rebar
RUN mkdir -p config $MIX_CACHE_DIR && chmod -R 0775 $MIX_CACHE_DIR
RUN --mount=type=cache,mode=0755,target=/var/cache/mix,sharing=locked \
    mix local.hex --force && mix local.rebar --force

# Set build ENV
ARG MIX_ENV="prod"
ENV MIX_ENV="${MIX_ENV}"

# Install mix dependencies
COPY mix.exs mix.lock ./
RUN --mount=type=cache,mode=0755,target=/var/cache/mix,sharing=locked mix deps.get

# Copy compile-time config files before we compile dependencies to ensure.
# Any relevant config change will trigger the dependencies to be re-compiled.
# Changes to config/runtime.exs don't require recompiling the code.
COPY config/config.exs config/runtime.exs config/${MIX_ENV}.exs config/
RUN --mount=type=cache,mode=0755,target=/var/cache/mix,sharing=locked mix deps.get --only $MIX_ENV
# RUN --mount=type=cache,mode=0755,target=/var/cache/mix,sharing=locked mix deps.compile

COPY priv priv
COPY lib lib
COPY assets assets
COPY rel rel

# # Compile assets and the release
# RUN mix assets.deploy
# RUN mix compile
# RUN mix release --overwrite --quiet

# # -----------------------------------------------------------------------------
# # Production image, copy build output files and run the application.
# # -----------------------------------------------------------------------------
# # FROM --platform=${PLATFORM} gcr.io/distroless/cc-debian12:nonroot
# FROM --platform=${PLATFORM} debian:bookworm-slim

# RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
# RUN --mount=target=/var/lib/apt/lists,type=cache,sharing=locked \
#     --mount=target=/var/cache/apt,type=cache,sharing=locked \
#     rm -f /etc/apt/apt.conf.d/docker-clean && apt-get update -y \
#     && apt-get -yqq --no-install-recommends install ca-certificates \
#        libstdc++6 openssl libncurses5 locales \
#     && apt clean && rm -f /var/lib/apt/lists/*_*

# # Set the locale
# RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen

# ENV LANG="en_US.UTF-8"
# ENV LANGUAGE="en_US:en"
# ENV LC_ALL="en_US.UTF-8"

# WORKDIR /app
# RUN chown -R nobody:nogroup /app

# # set runner ENV
# ARG MIX_ENV="prod"
# ENV MIX_ENV="${MIX_ENV}"

# # Only copy the final release from the build stage
# COPY --from=builder --chown=nobody:root /app/_build/${MIX_ENV}/rel/phoenix_lit ./
# COPY --from=base /usr/bin/tini /usr/bin/tini

# # Register Tini as a process subreaper.
# ENV TINI_SUBREAPER=true
# USER nobody:nogroup

# # Using tini to handle zombie processes.
# ENTRYPOINT ["/usr/bin/tini", "--"]
# CMD ["/app/bin/server"]
