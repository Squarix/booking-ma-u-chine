CREATE OR REPLACE FUNCTION createRoom(guestAmount int, size int, address varchar(255), cityId bigint, description text, user_id bigint, todayPrice int)
    RETURNS int AS
$$
BEGIN
    Insert into "Rooms"("guestsAmount", "size", "address", "city_id", "description", "user_id", "todayPrice")
     values (guestAmount, size, address, cityId, description, user_id, todayPrice);
END
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION assignFilters(room_id bigint, params bigint[])
    RETURNS int AS
$$
BEGIN
    FOR i IN 1 .. array_upper(params, 1)
    LOOP
        RAISE NOTICE '%', params[i];
    end loop;
END;
$$ LANGUAGE 'plpgsql';

SELECT * FROM assignFilters(15, ARRAY [1,2,4,15,23,56])
