defmodule Mix.Tasks.Npm.Install do
  @moduledoc """
  Runs npm install command in the assets directory.

  ## Examples

      $ mix npm.install
      $ mix npm.install --prefix=path/to/assets

  ## Command line options

    * `--prefix` - specifies the directory where npm install should run (defaults to "assets")
  """
  use Mix.Task

  @shortdoc "Runs npm install in the assets directory"
  def run(args) do
    {opts, _, _} = OptionParser.parse(args, switches: [prefix: :string])
    prefix = opts[:prefix] || "assets"

    Mix.shell().info("Running npm install in #{prefix} directory...")

    # Ensure the directory exists
    unless File.dir?(prefix) do
      Mix.raise("Directory #{prefix} does not exist")
    end

    # Run npm install command
    System.cmd("npm", ["install", "--prefer-offline", "--no-audit", "--no-fund"],
      cd: prefix,
      into: IO.stream(:stdio, :line)
    )
    |> case do
      {_, 0} ->
        Mix.shell().info("npm install completed successfully")
        :ok

      {_, status} ->
        Mix.raise("npm install failed with status #{status}")
    end
  end
end

defmodule Mix.Tasks.Npm do
  @moduledoc """
  Parent task for npm-related mix tasks.

  ## Usage

      $ mix npm.install    # Runs npm install
  """
  use Mix.Task

  @shortdoc "Runs npm-related tasks"
  def run(_) do
    Mix.shell().info("""
    npm mix tasks:

    mix npm.install    # Runs npm install in the assets directory
    """)
  end
end
