create function getcategories()
    returns TABLE(id bigint, name character varying)
    language plpgsql
as
$$
BEGIN
        Return query SELECT cat."id", cat."name" from "Categories" cat;
    END;
$$;

alter function getcategories() owner to cp;

