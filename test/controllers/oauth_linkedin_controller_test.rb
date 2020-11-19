require 'test_helper'

class OauthLinkedinControllerTest < ActionDispatch::IntegrationTest
  test "should get get_access_token" do
    get oauth_linkedin_get_access_token_url
    assert_response :success
  end

end
