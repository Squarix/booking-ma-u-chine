create function getrents(var_user_id bigint, var_limit integer DEFAULT 50, var_startdate timestamp with time zone DEFAULT NULL::timestamp with time zone, var_enddate timestamp with time zone DEFAULT NULL::timestamp with time zone)
    returns TABLE(roomId integer, userId integer, userEmail varchar(255), city character varying, address character varying, guestsamount integer, status character varying, arrivedate timestamp with time zone, enddate timestamp with time zone, price integer)
    language plpgsql
as
$$
BEGIN
    IF var_startDate is null or var_endDate is null then
        return query select R.id as roomId, U.id as userId, U.email as userEmail, C.name as cityName, R.address, R."guestsAmount" as guestsAmount, B.status , B."arriveDate" as arriveDate, B."endDate" as endDate, B.price
        from "Bookings" B
            inner join "Rooms" R on B.room_id = R.id
            inner join "Cities" C on R.city_id = C.id
            inner join "Users" U on B.user_id = U.id
        where R.user_id = var_user_id
        LIMIT var_limit;
    else
       return query select R.id as roomId, U.id as userId, U.email as userEmail, C.name as cityName, R.address, R."guestsAmount" as guestsAmount, B.status , B."arriveDate" as arriveDate, B."endDate" as endDate, B.price
       from "Bookings" B
           inner join "Rooms" R on B.room_id = R.id
            inner join "Cities" C on R.city_id = C.id
            inner join "Users" U on B.user_id = U.id
       where R.user_id = var_user_id and B."arriveDate" >= var_startDate and B."endDate" <= var_endDate
       LIMIT var_limit;
    end if;
END
$$;
