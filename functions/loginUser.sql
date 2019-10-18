CREATE OR REPLACE FUNCTION loginUser(var_email varchar(255), var_password varchar(255))
    RETURNS public."Users" AS
$$
DECLARE
    result_user public."Users";
BEGIN
    SELECT * from public."Users" u where u.email=var_email and u.password = var_password into result_user;
    return result_user;
END;
$$ LANGUAGE 'plpgsql';
