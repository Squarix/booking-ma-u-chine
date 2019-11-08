CREATE OR REPLACE FUNCTION getRents(var_user_id :bigint, startDate timestamp with time zone = null, endDate timestamp with time zone = null)
    RETURNS int AS
$$
BEGIN
    IF startDate is null or endDate is null then

    else

    end if;
END;
$$ LANGUAGE 'plpgsql';
