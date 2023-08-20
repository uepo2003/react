class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  before_action :authenticate_user!, except: [:welcome, :login, :sign_up]

  def create
    user = User.find_by_email(sign_in_params[:email])

    if user && user.valid_password?(sign_in_params[:password])
      sign_in "user", user
      render json: { token: current_token }
    else
      render json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
    end
  end

  def sign_up
    user = User.new(sign_up_params)
    if user.save
      sign_in "user", user # 修正された部分
      render json: { token: current_token, message: 'User was successfully created.' }
    else
      puts user.errors.full_messages 
      render json: { errors: user.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end


  def logout
    # JWTトークンを取得
    token = current_token

    # トークンが存在する場合、無効にします。
    if token
      Warden::JWTAuth::UserEncoder.new.revoke_jwt(token, :user)
      render json: { message: 'Logged out successfully' }
    else
      render json: { error: 'Invalid token' }, status: :unprocessable_entity
    end
  end

  private
  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def sign_in_params
    params.require(:user).permit(:email, :password) # 修正された部分
  end

  def current_token
    request.env['warden-jwt_auth.token']
  end
end
