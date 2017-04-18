class PlansController < ApplicationController
  before_action :authenticate_user!
  before_action :set_plan, only: [:show, :edit, :update, :destroy]

  # GET /plans
  # GET /plans.json
  def index
    @plans = Plan.where(user_id: current_user.id)
  end

  # GET /plans/1
  # GET /plans/1.json
  def show
      # turn ruby database into json
      # route to the project 3 page with this json
      # id = 1
     
      @formattedPlan = {}
      @formattedPlan[:catalogYear] = @plan['catalogYear']
      @formattedPlan[:currYear] = @plan['currYear']
      @formattedPlan[:currSemester] = @plan['currSemester']
      @formattedPlan[:majorName] = @plan['majorName']
      @formattedPlan[:name] = @plan['name']
      @formattedPlan[:studentName] = current_user.login
      @formattedPlan[:years] = []


      years = Year.where(plan_id: @plan['id'])
      years.each { |year|
        
        semesters = Semester.where(plan_id: @plan['id'], year_id: year['id']).order(:term)  

        formattedYear = {}
        formattedYear[:name] = year['year']
        formattedYear[:terms] = []

        semesters.each { |semester|

            formattedSemester = {}
            formattedSemester[:term] = semester['term']
            formattedSemester[:year] = year['year']
            formattedSemester[:courses] = []

            sem_courses = SemesterCourse.where(semester_id: semester['id'])
            sem_courses.each { |sem_course|
                course = Course.where(id: sem_course['course_id'])

                formattedCourse = {}
                formattedCourse[:semester] = semester['term']
                formattedCourse[:year] = year['year']
                formattedCourse[:name] = course[0]['name']
                formattedCourse[:credits] = course[0]['credits']
                formattedCourse[:codeNum] = course[0]['codeNum']
                formattedCourse[:codeDept] = course[0]['codeDept']


                formattedSemester[:courses].push(formattedCourse)
            }

            formattedYear[:terms].push(formattedSemester)
        }
        



        @formattedPlan[:years].push(formattedYear)
      
      }

      
  end

  # GET /plans/new
  def new
    @plan = Plan.new
  end

  # GET /plans/1/edit
  def edit
  end

  # POST /plans
  # POST /plans.json
  def create
    @plan = Plan.new(plan_params)
    @plan.user_id = current_user.id
    respond_to do |format|
      if @plan.save
        format.html { redirect_to @plan, notice: 'Plan was successfully created.' }
        format.json { render :show, status: :created, location: @plan }
      else
        format.html { render :new }
        format.json { render json: @plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /plans/1
  # PATCH/PUT /plans/1.json
  def update
    respond_to do |format|
      if @plan.update(plan_params)
        format.html { redirect_to @plan, notice: 'Plan was successfully updated.' }
        format.json { render :show, status: :ok, location: @plan }
      else
        format.html { render :edit }
        format.json { render json: @plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /plans/1
  # DELETE /plans/1.json
  def destroy
    @plan.destroy
    respond_to do |format|
      format.html { redirect_to plans_url, notice: 'Plan was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_plan
      @plan = Plan.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def plan_params
      params.require(:plan).permit(:name, :user_id)
    end
end
