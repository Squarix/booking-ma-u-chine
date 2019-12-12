CREATE PROCEDURE import_user(path_xml character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
   insert into "Users"
       SELECT
           (xpath('//id/text()', x))[1]::text::bigint AS id
            ,(xpath('//first_name/text()', x))[1]::varchar AS first_name
            ,(xpath('//last_name/text()', x))[1]::varchar AS last_name
            ,(xpath('//phoneNumber/text()', x))[1]::text::integer AS phoneNumber
            ,(xpath('//password/text()', x))[1]::text::integer AS password
            ,(xpath('//type/text()', x))[1]::text::integer AS type
       FROM unnest(xpath('//record', pg_read_file(path_xml)::xml)) x;
END;
$$;
