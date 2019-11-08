CREATE OR REPLACE FUNCTION getUserBookings(var_user_id bigint, var_offset int)
    RETURNS TABLE(room_id int, city varchar(255), address varchar(255), guestsAmount int, status varchar(255), arriveDate timestamp with time zone, endDate timestamp with time zone, price int) AS
$$
BEGIN
  Return query SELECT R.id as roomId, C.name as cityName, R.address, R."guestsAmount" as guestsAmount, B.status , B."arriveDate" as arriveDate, B."endDate" as endDate, B.price from "Bookings" B
      inner join "Rooms" R on B.room_id = R.id
      inner join "Cities" C on R.city_id = C.id
      where B.user_id = var_user_id
      ORDER BY B."arriveDate" DESC LIMIT 20 OFFSET var_offset;
END;
$$ LANGUAGE 'plpgsql';
