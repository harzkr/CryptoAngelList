json.companyCore do 
    json.set! @company.id do
        json.extract! @company, :id, :owner_id, :company_name, :website, :location, :headcount, :tagline, :overview, :culture, :amount_raised, :total_rounds, :valuation
        if @company.company_logo.attached?
            json.company_logo url_for(@company.company_logo)
        end
    end
end

json.companyEmployees do
    @company.employees.each do |employee|
        json.partial! '/api/company_employees/employee', employee: employee
    end
end

json.companyPerks do
    @company.perks.each do |perk|
        json.partial! '/api/company_perks/perk', perk: perk
    end
end

json.companyInvestors do
    @company.investors.each do |investor|
        json.partial! '/api/company_investors/investor', investor: investor
    end
end

json.user do
    json.partial! '/api/users/user', user: current_user
end