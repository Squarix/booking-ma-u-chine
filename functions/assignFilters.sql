create or replace procedure assignfilters(var_room_id bigint, params bigint[])
    language plpgsql
as
$$
BEGIN
    IF(exists(SELECT 1 FROM "Rooms" where id = var_room_id)) THEN
        FOR i IN 1 .. array_upper(params, 1)
        LOOP
            IF exists(SELECT 1 FROM "Filters" where id = params[i]) THEN
                Insert into "RoomsFilters"(room_id, filter_id) values (var_room_id, params[i]);
            END IF;
        end loop;
    ELSE
        raise exception 'Room does not exists';
    END IF;
END
$$;

alter procedure assignfilters(bigint, bigint[]) owner to cp;
