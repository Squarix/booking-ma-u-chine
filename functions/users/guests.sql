GRANT EXECUTE ON FUNCTION loginUser(var_email varchar(255), var_password varchar(255)) TO role_guest;
GRANT EXECUTE ON FUNCTION publicRooms(var_limit int, var_offset int, orderBy varchar(255)) TO role_guest;
GRANT EXECUTE ON FUNCTION registeruser(var_email character varying, var_password character varying) to role_guest

GRANT SELECT ON categories_view TO role_guest;
GRANT SELECT ON get_room_view TO role_guest;
GRANT SELECT ON user_view TO role_guest;
GRANT SELECT ON get_room_booking_view TO role_guest;


