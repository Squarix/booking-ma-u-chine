CREATE OR REPLACE PROCEDURE createFilters(filters varchar(255)[], categories_id bigint[])
AS
$$
BEGIN
    FOR i IN 1 .. array_upper(filters, 1)
    LOOP
        IF not exists(SELECT 1 FROM "Filters" f where f."name" = filters[i] and f."category_id" = categories_id[i]) THEN
            Insert into "Filters"(name, category_id) values (filters[i], categories_id[i]);
        END IF;
    end loop;
END
$$ LANGUAGE 'plpgsql';
