CREATE OR REPLACE PROCEDURE createBooking(var_user_id bigint, var_room_id bigint, var_startDate timestamp, var_endDate timestamp)

AS
$$
DECLARE
    var_price int;
BEGIN
    if exists(select 1 from "Bookings" where room_id = var_room_id and "arriveDate" between var_startDate and var_endDate or "endDate" between var_startDate and var_endDate) then
        RAISE EXCEPTION 'This dates already booked';
    end if;
    Select "Rooms"."todayPrice" from "Rooms" where id = var_room_id into var_price;
    Insert Into "Bookings" (room_id, user_id, "arriveDate", "endDate", price) values (var_room_id, var_user_id, var_startDate, var_endDate, var_price);
END
$$ LANGUAGE 'plpgsql';
