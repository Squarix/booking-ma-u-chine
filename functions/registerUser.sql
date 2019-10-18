CREATE OR REPLACE FUNCTION registerUser(var_email varchar(255), var_password varchar(255))
    RETURNS public."Users" AS
$$
DECLARE result_user public."Users";
BEGIN
    if exists(SELECT * from public."Users" u where u.email = var_email) then
        return null;
    else
        INSERT INTO public."Users"(email, password) values (var_email, var_password);
        SELECT * from public."Users" u where u.email = var_email into result_user;
        return result_user;
    end if;

END;
$$ LANGUAGE 'plpgsql';
