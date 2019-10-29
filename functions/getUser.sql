CREATE OR REPLACE FUNCTION getUser(var_id bigint)
    RETURNS "Rooms" AS
$$
DECLARE
    result "Rooms";
BEGIN
    SELECT * from "Users" where id = var_id into result;
    return result;
END;
$$ LANGUAGE 'plpgsql';
