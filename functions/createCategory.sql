CREATE OR REPLACE PROCEDURE createCategory(name varchar(255))
AS
$$
BEGIN
    IF NOT exists(SELECT 1 FROM "Categories" c where c.name=name) THEN
        INSERT into "Categories" (name) values (name);
    ELSE
        RAISE EXCEPTION 'Category already exists';
    END IF;
END
$$ LANGUAGE 'plpgsql';
