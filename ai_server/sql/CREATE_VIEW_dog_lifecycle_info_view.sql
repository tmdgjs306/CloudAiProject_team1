CREATE VIEW dog_lifecycle_info_view AS

SELECT dog_code, dog_breed, dli.dog_lifecycle_stages_code AS dog_lifecycle_stage_code, dog_lifecycle_stages_title, health_info
FROM ai_server.dog_lifecycle_info AS dli
INNER JOIN ai_server.dog AS d 
	ON dli.dog_breed_code = d.dog_code
INNER JOIN ai_server.dog_lifecycle_stages AS dls 
	ON dli.dog_lifecycle_stages_code = dls.dog_lifecycle_stages_code