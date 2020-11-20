class OauthLinkedinController < ApplicationController
  skip_before_action :verify_authenticity_token
  def get_access_token
    require 'net/http'
    require 'json'
    require 'uri'

    uri = URI('https://www.linkedin.com/oauth/v2/accessToken')
    puts params,"hellowww"
    res = Net::HTTP.post_form(uri, 'grant_type' => 'authorization_code', 'code' => params[:code], 
      'redirect_uri' => 'https://obscure-depths-02795.herokuapp.com/','client_id'=>ENV['CLIENT_ID'],'client_secret'=>ENV['CLIENT_SECRET']
    )
    puts res.body
    res_token = JSON.parse(res.body)
    puts res_token
    puts res_token.class
    token = res_token["access_token"]
    puts token

    uri_profile = URI('https://api.linkedin.com/v2/me')
    req_profile = Net::HTTP::Get.new(uri_profile)
    req_profile['Authorization'] = "Bearer #{token}"
    
    res_profile = Net::HTTP.start(uri_profile.hostname, uri_profile.port,:use_ssl => true) {|http|
      http.request(req_profile)
    }
    puts res_profile.body
    res_profile_json = JSON.parse(res_profile.body)
    puts res_profile_json


    uri_email = URI('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))')
    req_email = Net::HTTP::Get.new(uri_email)
    req_email['Authorization'] = "Bearer #{token}"
    
    res_email = Net::HTTP.start(uri_email.hostname, uri_email.port,:use_ssl => true) {|http|
      http.request(req_email)
    }
    puts res_email.body
    res_email_json = JSON.parse(res_email.body)
    puts res_email_json

    user_params = Hash.new
    user_params['email'] = res_email_json['elements'][0]['handle~']['emailAddress']
    user_params['name'] = res_profile_json['localizedFirstName'] + " " + res_profile_json['localizedLastName']
    user_params['password'] = 'Abcdefghijkl'
    user_params['oauth'] = 'LinkedIn'

    find_user = User.find_by_oauth(user_params['email'])

    @user = find_user ? find_user : User.new(user_params)

    if @user.save
        log_in!(@user)
        render 'oauth_linkedin/index.json.jbuilder'
    else
        render json: @user.errors.full_messages, status: 422
    end

    #render json: {"valid"=>"test"}
    
  end
end
