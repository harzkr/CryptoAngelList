class Api::SessionsController < ApplicationController
    def create
        @user = nil
        
        if user_params[:oauth] == 'LinkedIn'
            @user = User.find_by_oauth(user_params[:email])
        else
            @user = User.find_by_credentials(user_params[:email], user_params[:password])
        end
        
        if @user
            log_in!(@user)
            render '/api/users/show.json.jbuilder'
        else
            render json: ['Incorrect email or password'], status: 401
        end
    end

    def destroy
        unless logged_in?
            render json: ['You are not logged in'], status: 422
        else
            log_out!
            render json: {}
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :password)
    end
end
