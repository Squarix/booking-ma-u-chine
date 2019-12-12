CREATE OR REPLACE PROCEDURE updateUserProfile(userId bigint, var_firstName varchar(255), var_lastName varchar(255), var_phoneNumber varchar(255) )
AS
$$
BEGIN
    if exists(select 1 from "Users" where id = userId) then
        Update "Users" set first_name = var_firstName, last_name = var_lastName, "phoneNumber" = var_phoneNumber where id = userId;
    else
        Raise exception 'User do not exists';
    end if;
END
$$ LANGUAGE 'plpgsql';
