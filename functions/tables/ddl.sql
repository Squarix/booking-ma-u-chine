create table "SequelizeMeta"
(
	name varchar(255) not null,
	constraint "SequelizeMeta_pkey"
		primary key (name)
);

alter table "SequelizeMeta" owner to cp;

create table "Users"
(
	id serial not null,
	email varchar(255) not null,
	first_name varchar(255),
	last_name varchar(255),
	"phoneNumber" varchar(255),
	password varchar(255) not null,
	"createdAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	"updatedAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	type "enum_Users_type" default 'user'::"enum_Users_type" not null,
	constraint "Users_pkey"
		primary key (id)
);

alter table "Users" owner to cp;

create table "Types"
(
	id serial not null,
	name varchar(255) not null,
	"createdAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	"updatedAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	constraint "Types_pkey"
		primary key (id)
);

alter table "Types" owner to cp;

create table "Countries"
(
	id serial not null,
	name varchar(255) not null,
	"createdAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	"updatedAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	code varchar(2),
	constraint "Countries_pkey"
		primary key (id)
);

alter table "Countries" owner to cp;

create table "Cities"
(
	id serial not null,
	name varchar(255) not null,
	country_id integer,
	"createdAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	"updatedAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	constraint "Cities_pkey"
		primary key (id),
	constraint "Cities_country_id_fkey"
		foreign key (country_id) references "Countries"
);

alter table "Cities" owner to cp;

create table "Categories"
(
	id bigserial not null,
	name varchar(255),
	"createdAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	"updatedAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	constraint "Categories_pkey"
		primary key (id)
);

alter table "Categories" owner to cp;

create table "Filters"
(
	id serial not null,
	name varchar(255),
	category_id integer,
	"createdAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	"updatedAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	constraint "Filters_pkey"
		primary key (id),
	constraint "Filters_category_id_fkey"
		foreign key (category_id) references "Categories"
);

alter table "Filters" owner to cp;

create table "Rooms"
(
	id serial not null,
	"guestsAmount" integer not null,
	size integer,
	address varchar(255) not null,
	city_id bigint not null,
	description text,
	user_id bigint not null,
	"todayPrice" integer not null,
	"createdAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	"updatedAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	status varchar(255) default 'pending'::character varying,
	constraint "Rooms_pkey"
		primary key (id),
	constraint "Rooms_city_id_fkey"
		foreign key (city_id) references "Cities",
	constraint "Rooms_user_id_fkey"
		foreign key (user_id) references "Users"
);

alter table "Rooms" owner to cp;

create table "RoomsFilters"
(
	id serial not null,
	room_id bigint not null,
	filter_id bigint not null,
	"createdAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	"updatedAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	constraint "RoomsFilters_pkey"
		primary key (id),
	constraint "RoomsFilters_room_id_fkey"
		foreign key (room_id) references "Rooms",
	constraint "RoomsFilters_filter_id_fkey"
		foreign key (filter_id) references "Filters"
);

alter table "RoomsFilters" owner to cp;

create table "Rates"
(
	id serial not null,
	room_id bigint not null,
	user_id bigint not null,
	stars integer not null,
	comment text,
	"createdAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	"updatedAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	constraint "Rates_pkey"
		primary key (id),
	constraint "Rates_user_id_fkey"
		foreign key (user_id) references "Users"
);

alter table "Rates" owner to cp;

create table "Bookings"
(
	id serial not null,
	room_id bigint not null,
	user_id bigint not null,
	status varchar(255) default 'approving'::character varying not null,
	"arriveDate" timestamp with time zone not null,
	"endDate" timestamp with time zone not null,
	price integer not null,
	"createdAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	"updatedAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	constraint "Bookings_pkey"
		primary key (id),
	constraint "Bookings_room_id_fkey"
		foreign key (room_id) references "Rooms",
	constraint "Bookings_user_id_fkey"
		foreign key (user_id) references "Users"
);

alter table "Bookings" owner to cp;

create table "Images"
(
	id serial not null,
	"roomId" bigint not null,
	"imagePath" varchar(255) not null,
	"isMain" boolean default false,
	"createdAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	"updatedAt" timestamp with time zone default CURRENT_TIMESTAMP not null,
	constraint "Images_pkey"
		primary key (id),
	constraint "Images_roomId_fkey"
		foreign key ("roomId") references "Rooms"
);

alter table "Images" owner to cp;

