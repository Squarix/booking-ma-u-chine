create or replace function findpublicroom(roomid bigint, userid bigint)
    returns TABLE
            (
                guestsamount integer,
                size         integer,
                address      character varying,
                description  text,
                useremail    character varying,
                todayprice   integer,
                city         character varying,
                filters      character varying[],
                images       character varying[],
                image        character varying
            )
    language plpgsql
as
$$
BEGIN
    return query Select e."guestsAmount",
                        e.size,
                        e.address,
                        e.description,
                        e.email,
                        e."todayPrice",
                        e.name,
                        e.filters,
                        array_agg(I."imagePath"),
                        I2."imagePath"
                 from (
                          Select R."guestsAmount",
                                 R.size,
                                 R.address,
                                 R.description,
                                 U.email,
                                 R."todayPrice",
                                 C.name,
                                 array_agg(F.name) as filters
                          from "Rooms" R
                                   inner join "Cities" C on R.city_id = C.id
                                   inner join "RoomsFilters" RF on R.id = RF.room_id
                                   inner join "Users" U on R.user_id = U.id
                                   inner join "Filters" F on RF.filter_id = F.id
                          where R.id = roomid
                          GROUP BY R.id, u.email, C.name) e
                          left join "Images" I2 on roomid = I2."roomId" and I2."isMain" = true
                          left join "Images" I on I."roomId" = roomid
                 GROUP BY e."guestsAmount", e.size, e.address, e.description, e.email, e."todayPrice", e.name,
                          e.filters, I2."imagePath";
END;
$$;

alter function findpublicroom(bigint, bigint) owner to cp;
