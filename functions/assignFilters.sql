CREATE OR REPLACE PROCEDURE assignFilters(var_room_id bigint, params bigint[])
AS
$$
BEGIN
    IF(exists(SELECT 1 FROM "Rooms" where id = var_room_id)) THEN
        FOR i IN 1 .. array_upper(params, 1)
        LOOP
            IF exists(SELECT 1 FROM "Filters" where id = params[i]) THEN
                Insert into "RoomsFilters"(room_id, filter_id) values (var_room_id, params[i]);
            END IF;
        end loop;
    END IF;
END;
$$ LANGUAGE 'plpgsql';
