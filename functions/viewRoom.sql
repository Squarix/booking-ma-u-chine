create function viewroom(var_id bigint) returns "Rooms"
    language plpgsql
as
$$
DECLARE
    result "Rooms";
BEGIN
    SELECT * from "Rooms" where id = var_id into  result;
    return result;
END;
$$;
