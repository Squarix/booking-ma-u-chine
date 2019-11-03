CREATE OR REPLACE FUNCTION findOrCreateCity(var_city varchar(255), var_country_id bigint)
    RETURNS bigint AS
$$
DECLARE
    result bigint;
BEGIN
    SELECT id from "Cities" where country_id = var_country_id AND name = var_city into result;
    IF result IS NULL THEN
        Insert Into "Cities"(name, country_id) values (var_city, var_country_id) returning id into result;
    END IF;
    return result;
END;
$$ LANGUAGE 'plpgsql';
