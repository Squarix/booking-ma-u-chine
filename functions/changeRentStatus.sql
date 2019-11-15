CREATE OR REPLACE PROCEDURE changeRentStatus(var_user_id int, var_rent_id int, new_status varchar(255))
AS
$$
BEGIN
    if exists(select 1 from "Bookings" B inner join "Rooms" R on B.room_id = R.id where R.user_id = var_user_id and B.id = var_rent_id) then
        Update "Bookings" set status = new_status where id = var_rent_id;
    else
        Raise exception 'User do not have Rent with such id';
    end if;
END
$$ LANGUAGE 'plpgsql';
