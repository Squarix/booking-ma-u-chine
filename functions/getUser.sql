create or replace function getuser(var_id bigint) returns "Users"
    language plpgsql
as
$$
DECLARE
    result "Users";
BEGIN
    SELECT * from "Users" where id = var_id into result;
    return result;
END;
$$;

alter function getuser(bigint) owner to cp;
