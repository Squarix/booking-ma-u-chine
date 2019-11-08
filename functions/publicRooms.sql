CREATE OR REPLACE FUNCTION publicRooms(var_limit int, var_offset int, orderBy varchar(255))
    RETURNS TABLE(guestsAmount int, size int, address varchar(255), city varchar(255)) AS
$$
BEGIN
    Return query select R."guestsAmount", R.size, R.address, C.name from "Rooms" R
        inner join "Cities" C on R.city_id = C.id where R.status = 'publicated'
    ORDER BY orderBy LIMIT var_offset OFFSET var_limit;
END;
$$ LANGUAGE 'plpgsql';
