CREATE OR REPLACE FUNCTION getUsers()
    RETURNS setof public."Users" as
$$
BEGIN
    return query select * from public."Users";
END;
$$ LANGUAGE 'plpgsql';
