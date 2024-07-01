CREATE VIEW recommended_product_view AS 
SELECT rp.rp_code, rp.rp_name, rp_url, rpt.rp_type_title 
FROM ai_server.recommended_product AS rp 
	JOIN ai_server.recommended_product_type AS rpt 
	ON rp.rp_type = rpt.rp_type_code;