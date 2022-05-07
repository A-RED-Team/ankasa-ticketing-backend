toc.dat                                                                                             0000600 0004000 0002000 00000021634 14235226704 0014452 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       #                    z         	   db_ankasa    14.2    14.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                    0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                    0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                    1262    16590 	   db_ankasa    DATABASE     i   CREATE DATABASE db_ankasa WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Indonesia.1252';
    DROP DATABASE db_ankasa;
                postgres    false         �            1259    16591    airlines    TABLE     e  CREATE TABLE public.airlines (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);
    DROP TABLE public.airlines;
       public         heap    postgres    false         �            1259    16597    bookings    TABLE     U  CREATE TABLE public.bookings (
    id character varying(255) NOT NULL,
    user_id character varying(255),
    flight_id character varying(255),
    title character varying(20),
    full_name character varying(255),
    nationality character varying(255),
    travel_insurance character varying(10),
    terminal character(3),
    gate character(3),
    total_payment integer,
    is_active integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone,
    payment_status integer
);
    DROP TABLE public.bookings;
       public         heap    postgres    false         �            1259    16603    cities    TABLE     �  CREATE TABLE public.cities (
    id character varying(255) NOT NULL,
    country_id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone[]
);
    DROP TABLE public.cities;
       public         heap    postgres    false         �            1259    16609 	   countries    TABLE     a  CREATE TABLE public.countries (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    alias character varying(5) NOT NULL,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp with time zone
);
    DROP TABLE public.countries;
       public         heap    postgres    false         �            1259    16615    flights    TABLE     k  CREATE TABLE public.flights (
    id character varying(255) NOT NULL,
    airline_id character varying(255),
    departure_city character varying(255),
    arrival_city character varying(255),
    departure_time time without time zone,
    arrival_time time without time zone,
    code character varying(10),
    class integer,
    type integer,
    departure_date date,
    adult integer,
    child integer,
    direct integer,
    transit integer,
    more_transit integer,
    luggage integer,
    meal integer,
    wifi integer,
    price integer,
    stock integer,
    rating integer,
    total_reviewed integer,
    id_pic character varying(255),
    is_active integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone,
    total_insurance integer
);
    DROP TABLE public.flights;
       public         heap    postgres    false         �            1259    16621    pic    TABLE     h  CREATE TABLE public.pic (
    id character varying(255) NOT NULL,
    name character varying(255),
    email character varying(255),
    phone_number character varying(20),
    is_active integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at time without time zone
);
    DROP TABLE public.pic;
       public         heap    postgres    false         �            1259    16627    users    TABLE     �  CREATE TABLE public.users (
    id character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255),
    phone_number character varying(20),
    city character varying(255),
    address character varying(255),
    post_code character varying(20),
    photo character varying(255),
    verify_token character varying(255),
    is_verified integer,
    is_active integer,
    level integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false                   0    16591    airlines 
   TABLE DATA           b   COPY public.airlines (id, name, image, is_active, created_at, updated_at, deleted_at) FROM stdin;
    public          postgres    false    209       3343.dat           0    16597    bookings 
   TABLE DATA           �   COPY public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status) FROM stdin;
    public          postgres    false    210       3344.dat           0    16603    cities 
   TABLE DATA           l   COPY public.cities (id, country_id, name, image, is_active, created_at, updated_at, deleted_at) FROM stdin;
    public          postgres    false    211       3345.dat           0    16609 	   countries 
   TABLE DATA           c   COPY public.countries (id, name, alias, is_active, created_at, updated_at, deleted_at) FROM stdin;
    public          postgres    false    212       3346.dat           0    16615    flights 
   TABLE DATA           @  COPY public.flights (id, airline_id, departure_city, arrival_city, departure_time, arrival_time, code, class, type, departure_date, adult, child, direct, transit, more_transit, luggage, meal, wifi, price, stock, rating, total_reviewed, id_pic, is_active, created_at, updated_at, deleted_at, total_insurance) FROM stdin;
    public          postgres    false    213       3347.dat           0    16621    pic 
   TABLE DATA           k   COPY public.pic (id, name, email, phone_number, is_active, created_at, updated_at, deleted_at) FROM stdin;
    public          postgres    false    214       3348.dat           0    16627    users 
   TABLE DATA           �   COPY public.users (id, username, email, password, name, phone_number, city, address, post_code, photo, verify_token, is_verified, is_active, level, created_at, updated_at, deleted_at) FROM stdin;
    public          postgres    false    215       3349.dat {           2606    16634    bookings bookings_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_pkey;
       public            postgres    false    210         }           2606    16636    cities cities_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.cities DROP CONSTRAINT cities_pkey;
       public            postgres    false    211                    2606    16638    countries countries_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.countries DROP CONSTRAINT countries_pkey;
       public            postgres    false    212         �           2606    16640    flights flights_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.flights DROP CONSTRAINT flights_pkey;
       public            postgres    false    213         �           2606    16642    pic pic_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.pic
    ADD CONSTRAINT pic_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.pic DROP CONSTRAINT pic_pkey;
       public            postgres    false    214                                                                                                            3343.dat                                                                                            0000600 0004000 0002000 00000000074 14235226704 0014254 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Garuda	garuda.jpg	1	2022-05-06 10:37:12.337934	\N	\N
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                    3344.dat                                                                                            0000600 0004000 0002000 00000001603 14235226704 0014254 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        663ff1f2-872d-4b8c-b516-28eec834e2fb	a242117f-bbde-4b40-ba30-3263ac0be3fe	1	Mr.	paiji	Malaysia	1	AB 	121	10002	1	2022-05-06 17:31:45.277387	\N	\N	0
298a4edd-2d02-4bf6-8f18-ac9443c3b120	a242117f-bbde-4b40-ba30-3263ac0be3fe	1	Mr.	paiji	indonesia	0	AB 	121	10000	1	2022-05-06 17:31:58.376402	\N	\N	0
e01fc9fc-308e-451c-86c1-789fb4dba054	a242117f-bbde-4b40-ba30-3263ac0be3fe	1	Mr.	paijo	indonesia	0	AB 	121	10000	1	2022-05-06 17:32:04.605907	\N	\N	0
fdf67493-4070-4cab-9c90-bfe0849c69be	a242117f-bbde-4b40-ba30-3263ac0be3fe	1	Mrs	Tono	indonesia	1	AB 	121	10002	1	2022-05-06 19:56:37.679037	\N	\N	0
56e596a5-f5e9-4015-815f-569ace0963e7	a242117f-bbde-4b40-ba30-3263ac0be3fe	1	Mrs	Ton1	indonesia	0	AB 	121	10000	1	2022-05-06 19:56:51.003677	\N	\N	0
a25250ce-79b2-4f24-8ce6-68732f00f3ef	a242117f-bbde-4b40-ba30-3263ac0be3fe	1	Mrs	charlote	indonesia	0	AB 	121	10000	1	2022-05-06 19:57:27.515549	\N	\N	0
\.


                                                                                                                             3345.dat                                                                                            0000600 0004000 0002000 00000000176 14235226704 0014261 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	Jakarta	imageCity.jpg	1	2022-05-06 09:27:57.220609	\N	\N
2	2	tokyo	imageCity2.jpg	1	2022-05-06 09:28:33.719979	\N	\N
\.


                                                                                                                                                                                                                                                                                                                                                                                                  3346.dat                                                                                            0000600 0004000 0002000 00000000147 14235226704 0014260 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Indonesia	IDN	1	2022-05-06 09:27:10.690835	\N	\N
2	Japan	JPN	1	2022-05-06 09:30:17.026507	\N	\N
\.


                                                                                                                                                                                                                                                                                                                                                                                                                         3347.dat                                                                                            0000600 0004000 0002000 00000000202 14235226704 0014251 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	1	2	20:07:05.6762	20:07:05.6762	AB-121	1	1	2022-05-05	1	1	1	1	1	1	1	1	10000	86	1	1	1	1	2022-05-05 20:07:05.6762	\N	\N	\N
\.


                                                                                                                                                                                                                                                                                                                                                                                              3348.dat                                                                                            0000600 0004000 0002000 00000000005 14235226704 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3349.dat                                                                                            0000600 0004000 0002000 00000000772 14235226704 0014267 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        a242117f-bbde-4b40-ba30-3263ac0be3fe	rifanhidayatulloh	rifanhidayatulloh@gmail.com	$2b$10$67o7NiiFxd0UeSvSKaScGOysbcZIqjaA8NrcqQxd6/8BOjpNyZGQK	\N	33333333333333	kota1	jalan1	111111	1651746855898.jpg	\N	1	1	0	2022-05-05 12:13:39.401184	2022-05-05 17:34:16.148427	2022-05-05 13:39:48.197932
e43c01de-6847-4b32-9e0a-3113b2f5b075	rifan	rifanhidayatulloh96@gmail.com	$2b$10$KIGi05F/2VW8353LF7GpCOXcP4SwRQ3RPft39w7Pm9TahtfB8YbO6	\N	\N	\N	\N	\N	profile-default.png	\N	1	1	1	2022-05-03 23:29:25.141228	\N	\N
\.


      restore.sql                                                                                         0000600 0004000 0002000 00000022615 14235226704 0015377 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE db_ankasa;
--
-- Name: db_ankasa; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE db_ankasa WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Indonesia.1252';


ALTER DATABASE db_ankasa OWNER TO postgres;

\connect db_ankasa

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: airlines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.airlines (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.airlines OWNER TO postgres;

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id character varying(255) NOT NULL,
    user_id character varying(255),
    flight_id character varying(255),
    title character varying(20),
    full_name character varying(255),
    nationality character varying(255),
    travel_insurance character varying(10),
    terminal character(3),
    gate character(3),
    total_payment integer,
    is_active integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone,
    payment_status integer
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    id character varying(255) NOT NULL,
    country_id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone[]
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    alias character varying(5) NOT NULL,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: flights; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flights (
    id character varying(255) NOT NULL,
    airline_id character varying(255),
    departure_city character varying(255),
    arrival_city character varying(255),
    departure_time time without time zone,
    arrival_time time without time zone,
    code character varying(10),
    class integer,
    type integer,
    departure_date date,
    adult integer,
    child integer,
    direct integer,
    transit integer,
    more_transit integer,
    luggage integer,
    meal integer,
    wifi integer,
    price integer,
    stock integer,
    rating integer,
    total_reviewed integer,
    id_pic character varying(255),
    is_active integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone,
    total_insurance integer
);


ALTER TABLE public.flights OWNER TO postgres;

--
-- Name: pic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pic (
    id character varying(255) NOT NULL,
    name character varying(255),
    email character varying(255),
    phone_number character varying(20),
    is_active integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at time without time zone
);


ALTER TABLE public.pic OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255),
    phone_number character varying(20),
    city character varying(255),
    address character varying(255),
    post_code character varying(20),
    photo character varying(255),
    verify_token character varying(255),
    is_verified integer,
    is_active integer,
    level integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: airlines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.airlines (id, name, image, is_active, created_at, updated_at, deleted_at) FROM stdin;
\.
COPY public.airlines (id, name, image, is_active, created_at, updated_at, deleted_at) FROM '$$PATH$$/3343.dat';

--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status) FROM stdin;
\.
COPY public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status) FROM '$$PATH$$/3344.dat';

--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cities (id, country_id, name, image, is_active, created_at, updated_at, deleted_at) FROM stdin;
\.
COPY public.cities (id, country_id, name, image, is_active, created_at, updated_at, deleted_at) FROM '$$PATH$$/3345.dat';

--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, name, alias, is_active, created_at, updated_at, deleted_at) FROM stdin;
\.
COPY public.countries (id, name, alias, is_active, created_at, updated_at, deleted_at) FROM '$$PATH$$/3346.dat';

--
-- Data for Name: flights; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flights (id, airline_id, departure_city, arrival_city, departure_time, arrival_time, code, class, type, departure_date, adult, child, direct, transit, more_transit, luggage, meal, wifi, price, stock, rating, total_reviewed, id_pic, is_active, created_at, updated_at, deleted_at, total_insurance) FROM stdin;
\.
COPY public.flights (id, airline_id, departure_city, arrival_city, departure_time, arrival_time, code, class, type, departure_date, adult, child, direct, transit, more_transit, luggage, meal, wifi, price, stock, rating, total_reviewed, id_pic, is_active, created_at, updated_at, deleted_at, total_insurance) FROM '$$PATH$$/3347.dat';

--
-- Data for Name: pic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pic (id, name, email, phone_number, is_active, created_at, updated_at, deleted_at) FROM stdin;
\.
COPY public.pic (id, name, email, phone_number, is_active, created_at, updated_at, deleted_at) FROM '$$PATH$$/3348.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, name, phone_number, city, address, post_code, photo, verify_token, is_verified, is_active, level, created_at, updated_at, deleted_at) FROM stdin;
\.
COPY public.users (id, username, email, password, name, phone_number, city, address, post_code, photo, verify_token, is_verified, is_active, level, created_at, updated_at, deleted_at) FROM '$$PATH$$/3349.dat';

--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: flights flights_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_pkey PRIMARY KEY (id);


--
-- Name: pic pic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pic
    ADD CONSTRAINT pic_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   