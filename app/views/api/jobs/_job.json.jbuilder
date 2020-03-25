json.set! job.id do 
    json.extract! job, :id, :owner_id, :company_id, :job_title, :description, :location, :job_type, :salary, :currency, :years_experience
    json.company_name job.company.company_name
    json.company_tagline job.company.tagline
end