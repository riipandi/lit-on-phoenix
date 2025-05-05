defmodule PhoenixLitWeb.PageControllerTest do
  use PhoenixLitWeb.ConnCase

  describe "Home page with web components" do
    test "GET / returns 200 status and renders home-element component", %{conn: conn} do
      conn = get(conn, ~p"/")
      html_response = html_response(conn, 200)

      # Test that the web component is present in the response
      assert html_response =~ "<home-element"
      assert html_response =~ "id=\"home-page\""

      # Test that required attributes are passed to the component
      assert html_response =~ "phoenix-version="

      # Verify flash data is properly encoded and passed
      assert html_response =~ ~r/flash=["']?\{.*\}["']?/

      # Test that the component is properly closed
      assert html_response =~ "</home-element>"
    end

    test "Phoenix version is correctly passed to the component", %{conn: conn} do
      conn = get(conn, ~p"/")
      html_response = html_response(conn, 200)

      # Get the Phoenix version from the application
      phoenix_version = Application.spec(:phoenix, :vsn)

      # Verify the version is passed to the component
      assert html_response =~ "phoenix-version=\"#{phoenix_version}\""
    end
  end
end
