create view categories_view as
    select id, name from cp_development.public."Categories" c;

create view get_room_view as
        SELECT id, "guestsAmount", size, address, city_id, description, user_id, "todayPrice", status from "Rooms";

create view countries_view as
    SELECT c."id", c."name", c."code" from "Countries" c ORDER BY c."name"

create view user_view as
    SELECT u.id, u.email, u.first_name, u.last_name, u."phoneNumber", u.type  from "Users" u;

CREATE OR REPLACE VIEW get_room_booking_view AS
SELECT R.id as roomId, B."arriveDate" as startDate, B."endDate" as endDate
FROM "Bookings" B
         inner join "Rooms" R on B.room_id = R.id
where B."arriveDate" > CURRENT_TIMESTAMP
  and R.status = 'publicated'

create view get_user_bookings_view as
    SELECT R.id as room_id, C.name as city, R.address, R."guestsAmount" as guestsamount, B.status , B."arriveDate" as arrivedate, B."endDate" as enddate, B.price, B.user_id as userId from "Bookings" B
      inner join "Rooms" R on B.room_id = R.id
      inner join "Cities" C on R.city_id = C.id
      ORDER BY B."arriveDate" DESC LIMIT 20

create view get_admin_rooms as
    SELECT id, "guestsAmount", size, address, city_id as cityId, description, user_id as userId, "todayPrice" from "Rooms"
        where status='pending'
