create or replace function viewuser(var_id bigint) returns "Users"
    language plpgsql
as
$$
DECLARE
    result "Users";
BEGIN
    SELECT null, email, first_name, last_name, "phoneNumber", null, "createdAt", null from "Users" u where u."id" = var_id into result;
    return result;
END;
$$;

alter function viewuser(bigint) owner to cp;

