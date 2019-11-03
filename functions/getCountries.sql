create or replace function getcountries() returns TABLE(id int, name varchar(255), code varchar(2))
as
$$
    BEGIN
        RETURN QUERY SELECT c."id", c."name", c."code" from "Countries" c ORDER BY c."name";
    END;
$$ language 'plpgsql';

alter function getcountries() owner to cp;
