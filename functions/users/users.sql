GRANT EXECUTE ON FUNCTION loginUser(var_email varchar(255), var_password varchar(255)) TO role_user;
GRANT EXECUTE ON FUNCTION publicRooms(var_limit int, var_offset int, orderBy varchar(255)) TO role_user;
GRANT EXECUTE ON PROCEDURE createbooking(bigint, bigint, timestamp, timestamp) to role_user;
GRANT EXECUTE ON FUNCTION createfilters(var_filter character varying, var_category_id bigint) to role_user;
GRANT EXECUTE ON FUNCTION findorcreatecity(var_city character varying, var_country character varying) to role_user;
GRANT EXECUTE ON PROCEDURE changerentstatus(var_user_id integer, var_rent_id integer, new_status character varying) to role_user
GRANT EXECUTE ON PROCEDURE assignfilters_images(var_room_id bigint, filters bigint[], images character varying[], mainimage integer) to role_user
GRANT EXECUTE ON PROCEDURE updateuserprofile(userid bigint, var_firstname character varying, var_lastname character varying, var_phonenumber character varying) to role_user


GRANT SELECT ON categories_view TO role_user;
GRANT SELECT ON countries_view TO role_user;
GRANT SELECT ON get_room_view TO role_user;
GRANT SELECT ON user_view TO role_user;
GRANT SELECT ON get_room_booking_view TO role_user;

