create or replace function createfilters(var_filter varchar(255), var_category_id bigint)
    returns bigint
as
$$
DECLARE
    result bigint;
BEGIN
    IF not exists(SELECT 1 FROM "Filters" f where f."name" = var_filter and f."category_id" = var_category_id) THEN
        Insert into "Filters"("name", "category_id") values (var_filter, var_category_id) RETURNING "id" into result;
    ELSE
        Select id from "Filters" f where f."name" = var_filter and f."category_id" = var_category_id into result;
    END IF;
    return result;
END
$$ language plpgsql;

alter function createfilters(character varying, bigint) owner to cp;

