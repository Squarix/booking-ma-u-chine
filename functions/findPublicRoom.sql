create function findpublicroom(roomid bigint, userid bigint)
    returns TABLE(guestsamount integer, size integer, address character varying, description text, useremail character varying, todayprice integer, city character varying, filters character varying[])
    language plpgsql
as
$$
BEGIN
    return query Select R."guestsAmount", R.size, R.address, R.description, U.email, R."todayPrice", C.name, array_agg(F.name)
    from "Rooms" R
        inner join "Cities" C on R.city_id = C.id
        inner join "RoomsFilters" RF on R.id = RF.room_id
        inner join "Users" U on R.user_id = U.id
        inner join "Filters" F on RF.filter_id = F.id
    where R.id = roomId
    GROUP BY R.id, u.email, C.name;
END;
$$;

alter function findpublicroom(bigint, bigint) owner to cp;

