--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-06-30 22:41:18

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
-- TOC entry 209 (class 1259 OID 16591)
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
-- TOC entry 210 (class 1259 OID 16597)
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
    payment_status integer,
    total_ticket integer,
    adult integer,
    child integer,
    email character varying(255),
    phone character varying(50),
    pax_name character varying(255)
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16603)
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
    deleted_at timestamp with time zone
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16609)
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
-- TOC entry 213 (class 1259 OID 16615)
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
-- TOC entry 214 (class 1259 OID 16621)
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
-- TOC entry 215 (class 1259 OID 16627)
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
-- TOC entry 3343 (class 0 OID 16591)
-- Dependencies: 209
-- Data for Name: airlines; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.airlines (id, name, image, is_active, created_at, updated_at, deleted_at) VALUES ('1', 'Garuda', 'garuda.jpg', 1, '2022-05-06 10:37:12.337934', NULL, NULL);


--
-- TOC entry 3344 (class 0 OID 16597)
-- Dependencies: 210
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('c438385c-7ed9-4277-9edb-8f0294d5acea', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr.', 'Baron', 'indonesia', '1', 'AB ', '121', 30006, 1, '2022-05-16 14:56:19.793846', NULL, NULL, 0, 3, 1, 2, 'aa@gmail.com', '111111111111', 'Mr. aa');
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('e5b9dbe3-601e-4791-90ca-f61a0e9392ae', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr.', 'Baron', 'indonesia', '1', 'AB ', '121', 30006, 1, '2022-05-16 15:03:08.171539', NULL, NULL, 0, 3, 1, 2, 'aa@gmail.com', '111111111111', 'Mr. aa');
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('05b74395-bf08-4220-bce2-12b034f75f11', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr.', 'Baron', 'indonesia', '1', 'AB ', '121', 30006, 0, '2022-05-16 15:05:36.417237', NULL, '2022-05-16 15:14:16.213609', 0, 0, 1, 2, 'aa@gmail.com', '111111111111', 'Mr. aa');
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('4ef85ade-97ed-4cbb-a368-eafab3578f62', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 10002, 1, '2022-05-08 14:18:47.259632', '2022-05-10 15:56:48.473857', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('a9114354-bc37-4c4d-9bc9-a0825bb84cb8', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 10002, 1, '2022-05-08 14:21:25.476514', '2022-05-08 14:21:44.975933', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('ffb7e18d-84cc-4ace-a77b-bb422963b323', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 10002, 1, '2022-05-08 14:23:18.43913', '2022-05-08 14:23:36.656553', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('c4411cea-cec0-4c03-aac1-881e7f30dbca', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 10002, 1, '2022-05-08 19:09:02.528624', '2022-05-08 19:12:25.077933', '2022-05-08 19:12:19.126014', 1, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('ac37d1b6-3e8e-43c7-9d60-fda561f61ac9', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 20004, 0, '2022-05-11 14:33:10.595523', NULL, '2022-05-11 15:35:39.179756', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('ba2a0c17-e3e3-4a31-9379-663e07c88116', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 20004, 1, '2022-05-12 09:36:54.677051', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('f2702d3b-6259-46e9-ad73-ccd2aff0e332', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 20004, 1, '2022-05-12 09:38:44.471116', '2022-05-12 09:39:02.912022', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('a7a42df8-304a-4182-9565-cff66e392049', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 20004, 1, '2022-05-12 09:43:41.200587', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('f2e64371-4afb-4a5d-a025-9ae5454b60d0', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 30006, 1, '2022-05-12 09:47:13.132876', NULL, NULL, 1, 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('dd117704-7d46-496b-add5-76c0adc48391', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 30006, 1, '2022-05-12 09:52:57.231037', NULL, NULL, 0, 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('da752bc5-7b8b-4ef5-9334-29153e2f90ac', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 10002, 1, '2022-05-12 19:06:38.264149', NULL, NULL, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('ce3c9a1f-42ce-435f-954f-5f64507e29dc', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 10002, 1, '2022-05-12 19:11:12.992739', NULL, NULL, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('166f1e2c-a945-43d1-b118-376b1023a40c', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 10002, 1, '2022-05-12 19:16:10.665218', NULL, NULL, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('8833c2ff-7180-4be5-8939-3fdb8a05538c', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 20004, 1, '2022-05-12 19:16:17.937332', NULL, NULL, 0, 2, 1, 1, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('5bf9f223-76bf-4254-aff1-27aa6218bf05', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 10002, 1, '2022-05-12 19:17:18.941456', NULL, NULL, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('ff834754-8871-4e86-a6c7-7c893c9b3850', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'james', 'indonesia', '1', 'AB ', '121', 30006, 1, '2022-05-12 19:17:30.907618', NULL, NULL, 0, 3, 1, 2, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('2eb27a26-84ab-478d-a91c-5404f692c781', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'Baron', 'indonesia', '1', 'AB ', '121', 10002, 1, '2022-05-12 19:21:50.956196', NULL, NULL, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('86d86f2e-6177-4145-8ea7-f83c6fc180a1', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr', 'Baron', 'indonesia', '1', 'AB ', '121', 30006, 1, '2022-05-12 19:22:14.223925', NULL, NULL, 0, 3, 1, 2, NULL, NULL, NULL);
INSERT INTO public.bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, created_at, updated_at, deleted_at, payment_status, total_ticket, adult, child, email, phone, pax_name) VALUES ('5a9078ce-f6b1-4f7f-b9d7-15775203d06c', 'a242117f-bbde-4b40-ba30-3263ac0be3fe', '1', 'Mr.', 'Baron', 'indonesia', '1', 'AB ', '121', 30006, 1, '2022-05-13 13:51:12.816966', NULL, NULL, 0, 3, 1, 2, 'aa@gmail.com', '111111111111', 'Mr. aa');


--
-- TOC entry 3345 (class 0 OID 16603)
-- Dependencies: 211
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.cities (id, country_id, name, image, is_active, created_at, updated_at, deleted_at) VALUES ('1', '1', 'Jakarta', 'imageCity.jpg', 1, '2022-05-06 09:27:57.220609', NULL, NULL);
INSERT INTO public.cities (id, country_id, name, image, is_active, created_at, updated_at, deleted_at) VALUES ('2', '2', 'tokyo', 'imageCity2.jpg', 1, '2022-05-06 09:28:33.719979', NULL, NULL);
INSERT INTO public.cities (id, country_id, name, image, is_active, created_at, updated_at, deleted_at) VALUES ('67043f00-1c84-4694-8546-56c561dc350c', '1', 'Bandung', '1651976406526.jpg', 1, '2022-05-08 09:20:06.717873', NULL, NULL);
INSERT INTO public.cities (id, country_id, name, image, is_active, created_at, updated_at, deleted_at) VALUES ('aef26193-8c19-4e87-8a94-12bce9992a4d', '1', 'Yogyakarta', '1652012481878.jpg', 1, '2022-05-08 19:21:22.000368', NULL, NULL);
INSERT INTO public.cities (id, country_id, name, image, is_active, created_at, updated_at, deleted_at) VALUES ('433456b6-4bef-49a2-ac49-e69b2c695a5a', '1', 'Bali', '1651978514001.jpg', 1, '2022-05-08 09:49:40.386149', '2022-05-08 19:23:56.802291', '2022-05-08 19:23:50.580316+07');


--
-- TOC entry 3346 (class 0 OID 16609)
-- Dependencies: 212
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.countries (id, name, alias, is_active, created_at, updated_at, deleted_at) VALUES ('1', 'Indonesia', 'IDN', 1, '2022-05-06 09:27:10.690835', NULL, NULL);
INSERT INTO public.countries (id, name, alias, is_active, created_at, updated_at, deleted_at) VALUES ('fb97f331-470f-4fc5-a9de-5f38662a6086', 'India', 'IND', 1, '2022-05-07 11:08:46.194588', NULL, NULL);
INSERT INTO public.countries (id, name, alias, is_active, created_at, updated_at, deleted_at) VALUES ('8f51c119-6357-4781-91ed-2f4b45246a1f', 'Belgia', 'BEL', 1, '2022-05-08 19:28:41.751128', NULL, NULL);
INSERT INTO public.countries (id, name, alias, is_active, created_at, updated_at, deleted_at) VALUES ('2', 'Japan', 'JPN', 1, '2022-05-06 09:30:17.026507', '2022-05-08 19:30:23.490688', '2022-05-08 19:30:09.589473+07');


--
-- TOC entry 3347 (class 0 OID 16615)
-- Dependencies: 213
-- Data for Name: flights; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.flights (id, airline_id, departure_city, arrival_city, departure_time, arrival_time, code, class, type, departure_date, adult, child, direct, transit, more_transit, luggage, meal, wifi, price, stock, rating, total_reviewed, id_pic, is_active, created_at, updated_at, deleted_at, total_insurance) VALUES ('1', '1', '1', '2', '20:07:05.6762', '20:07:05.6762', 'AB-121', 1, 1, '2022-05-05', 100, 100, 1, 1, 1, 1, 1, 1, 10000, 200, 1, 1, '1', 1, '2022-05-05 20:07:05.6762', NULL, NULL, NULL);


--
-- TOC entry 3348 (class 0 OID 16621)
-- Dependencies: 214
-- Data for Name: pic; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3349 (class 0 OID 16627)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, username, email, password, name, phone_number, city, address, post_code, photo, verify_token, is_verified, is_active, level, created_at, updated_at, deleted_at) VALUES ('a242117f-bbde-4b40-ba30-3263ac0be3fe', 'rifanhidayatulloh', 'rifanhidayatulloh@gmail.com', '$2b$10$67o7NiiFxd0UeSvSKaScGOysbcZIqjaA8NrcqQxd6/8BOjpNyZGQK', NULL, '121212121212', 'Lampung', 'Lampung, Indonesia', '111111', '1652011347319.jpg', NULL, 1, 1, 0, '2022-05-05 12:13:39.401184', '2022-05-09 20:43:19.670114', '2022-05-08 19:03:26.068585');
INSERT INTO public.users (id, username, email, password, name, phone_number, city, address, post_code, photo, verify_token, is_verified, is_active, level, created_at, updated_at, deleted_at) VALUES ('e43c01de-6847-4b32-9e0a-3113b2f5b075', 'rifan', 'rifanhidayatulloh96@gmail.com', '$2b$10$KIGi05F/2VW8353LF7GpCOXcP4SwRQ3RPft39w7Pm9TahtfB8YbO6', NULL, NULL, NULL, NULL, NULL, 'profile-default.png', NULL, 1, 1, 1, '2022-05-03 23:29:25.141228', NULL, NULL);


--
-- TOC entry 3195 (class 2606 OID 16634)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 16636)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- TOC entry 3199 (class 2606 OID 16638)
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 16640)
-- Name: flights flights_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_pkey PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 16642)
-- Name: pic pic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pic
    ADD CONSTRAINT pic_pkey PRIMARY KEY (id);


-- Completed on 2022-06-30 22:41:18

--
-- PostgreSQL database dump complete
--

