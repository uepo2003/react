class CompaniesController < ApplicationController
  before_action :set_company, only: [:show, :update, :destroy]

  # GET /companies
  def index
    if params[:query]
      @companies = Company.where('company_name LIKE ?', "%#{params[:query]}%")
    else
      @companies = Company.all
    end
    render json: @companies
  end

  # GET /companies/1
  def show
    @company = Company.includes(:earnings).find(params[:id])
    render json: @company.as_json(include: :earnings)
  end
  

  # POST /companies
  def create
    @company = Company.new(company_params)
    if @company.save
      render json: { company: @company, message: 'Company was successfully created.' }, status: :created
    else
      render json: { errors: @company.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /companies/1
  def update
    if @company.update(company_params)
      render json: @company
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  # DELETE /companies/1
  def destroy
    @company.destroy
  end

  private

  def set_company
    @company = Company.find(params[:id])
  end

  def company_params
    params.require(:company).permit(:company_code, :listing_status, :company_name, :company_name_kana, :mail_address, :address, :representative, :representative_kana, :phone_number)
  end
end

