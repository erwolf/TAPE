class PlansController < ApplicationController
  before_action :authenticate_user!
  before_action :set_plan, only: [:show, :edit, :update, :destroy]

  # GET /plans
  # GET /plans.json
  def index
    if current_user.role == "admin" or current_user.role == "faculty" then
      @plans = Plan.all
    else
      @plans = Plan.where(user_id: current_user.id)
    end 
  end

  # GET /plans/1
  # GET /plans/1.json
  def show
      # turn ruby database into json
      # route to the project 3 page with this json
      # id = 1
  end

  # GET /plans/new
  def new
    @plan = Plan.new
  end

  # GET /plans/1/edit
  def edit
  end
  
  # POST /plans/1/remove
  def remove
	@id = params[:sem_course_id]

	if @id == nil then
		respond_to do |format|
			format.html {head :forbidden}
		end 
	else
	
		semestercourse = SemesterCourse.find(@id)

		if semestercourse == nil then
			respond_to do |format|
				format.html {head :forbidden}
			end 
		else
		
			semestercourse.destroy;
		
			respond_to do |format|
				format.html {head :ok}
			end 
		end
	end	 
  end
  
  # POST /plans/1/add
  def add
	@sem_id = params[:sem_id]
	@course_id = params[:course_id]
	@plan_id = params[:plan_id]

	if @sem_id == nil or @course_id == nil then
		respond_to do |format|
			format.html {head :forbidden}
		end 
	else
	
		course = Course.where(:id=>@course_id)
		semester = Semester.where(:id=>@sem_id)

		if course.length != 1 or semester.length != 1 then
			respond_to do |format|
				format.html {head :forbidden}
			end 
		else
		
			c = SemesterCourse.create(semester_id:@sem_id,course_id:@course_id,plan_id:@plan_id)
			
			respond_to do |format|
				format.html {render :json =>c['id']}
			end 
		end
	end	 
  end
  
  # POST /plans/1/requirements
  def requirements
  
	plan_id = params[:plan_id]
  
	completePackage = {}
	
	completePackage[:formattedRequirements] = []	
	completePackage[:neededCourses] = []

	requirementCategoryNames = RequirementCategory.all
	requirementCategoryNames.each { |rc|
				
		formattedSection = {}	
		
		formattedSection[:name] = rc['name']
		formattedSection[:courses] = []
		
		required_courses = Requirement.where(:requirementcategory_id=>rc['id'])
		
		required_courses.each { |course|
				
				newCourse = {}
				
				actualCourse = Course.find(course['course_id'])
				
				newCourse[:id] = course['course_id']
				newCourse[:name] = actualCourse['name']
				newCourse[:planned] = true
				
				if 	SemesterCourse.where(:plan_id=>	plan_id, :course_id=>actualCourse['id']).length < 1 then
					completePackage[:neededCourses].push(actualCourse)
					newCourse[:planned] = false
				end
				
				formattedSection[:courses].push(newCourse)
		}
		
		completePackage[:formattedRequirements].push(formattedSection)
		
	}

	respond_to do |format|
		format.json {render :json =>completePackage}
	end 

  end
    
  
  
  # POST /plans
  # POST /plans.json
  def create
  
	puts "I AM HERE, LOVE ME 1"
  
    @plan = Plan.new(plan_params)
    @plan.user_id = current_user.id
	
	puts "I AM HERE, LOVE ME 2"
	
	currYear = Time.now.year
	
	puts "I AM HERE, LOVE ME 3"
	puts currYear

	year1 = Year.new(year:currYear,plan_id:@plan.id)
	year2 = Year.new(year:currYear+1,plan_id:@plan.id)
	year3 = Year.new(year:currYear+2,plan_id:@plan.id)
	year4 = Year.new(year:currYear+3,plan_id:@plan.id)
	
	puts "I AM HERE, LOVE ME 4"
	puts @plan.id

	Semester.new(term:0,year_id:year1.id,plan_id:@plan.id)
	Semester.new(term:1,year_id:year1.id,plan_id:@plan.id)
	Semester.new(term:2,year_id:year1.id,plan_id:@plan.id)
	Semester.new(term:0,year_id:year2.id,plan_id:@plan.id)
	Semester.new(term:1,year_id:year2.id,plan_id:@plan.id)
	Semester.new(term:2,year_id:year2.id,plan_id:@plan.id)
	Semester.new(term:0,year_id:year3.id,plan_id:@plan.id)
	Semester.new(term:1,year_id:year3.id,plan_id:@plan.id)
	Semester.new(term:2,year_id:year3.id,plan_id:@plan.id)
	Semester.new(term:0,year_id:year4.id,plan_id:@plan.id)
	Semester.new(term:1,year_id:year4.id,plan_id:@plan.id)
	Semester.new(term:2,year_id:year4.id,plan_id:@plan.id)
	
	puts "I AM HERE, LOVE ME 5"
	puts year4.id
	
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
      params.require(:plan).permit(:name, :user_id, :catalogYear, :majorName)
    end
end
