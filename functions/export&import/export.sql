create or replace function export_cities() returns text
    language plpgsql
as
$$
BEGIN
    return query_to_xml('select * from "Cities"',TRUE,FALSE,'');
END;
$$;

create or replace function export_countries() returns text
    language plpgsql
as
$$
BEGIN
    return query_to_xml('select * from "Countries"',TRUE,FALSE,'');
END;
$$;

create or replace function export_rooms() returns text
    language plpgsql
as
$$
BEGIN
    return query_to_xml('select * from "Rooms"',TRUE,FALSE,'');
END;
$$;

create or replace function export_users() returns text
    language plpgsql
as
$$
BEGIN
    return query_to_xml('select * from "Users"',TRUE,FALSE,'');
END;
$$;

create or replace function export_bookings() returns text
    language plpgsql
as
$$
BEGIN
    return query_to_xml('select * from "Bookings"',TRUE,FALSE,'');
END;
$$;
