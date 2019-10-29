CREATE OR REPLACE PROCEDURE createRoom(var_guestAmount int, var_size int, var_address varchar(255), var_cityId bigint, var_description text, var_user_id bigint, var_todayPrice int)
AS
$$
BEGIN
    IF var_guestAmount < 0 THEN
        RAISE EXCEPTION 'Guests amount incorrect';
    end if;

    IF var_size < 0 THEN
        RAISE EXCEPTION 'Room size is incorrect';
    end if;

    IF var_address='' THEN
        RAISE EXCEPTION 'Address is not set';
    end if;

    IF var_todayPrice < 0 THEN
        RAISE EXCEPTION 'Price is incorrect';
    end if;

    Insert into "Rooms"("guestsAmount", "size", "address", "city_id", "description", "user_id", "todayPrice")
     values (var_guestAmount, var_size, var_address, var_cityId, var_description, var_user_id, var_todayPrice);
END
$$ LANGUAGE 'plpgsql';
