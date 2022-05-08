--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-05-08 17:18:38

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
-- TOC entry 211 (class 1259 OID 43853)
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
-- TOC entry 212 (class 1259 OID 43862)
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
    payment_status integer,
    total_payment integer,
    is_active integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 43837)
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
-- TOC entry 210 (class 1259 OID 43845)
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
-- TOC entry 213 (class 1259 OID 43879)
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
    deleted_at timestamp without time zone
);


ALTER TABLE public.flights OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 43886)
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
-- TOC entry 215 (class 1259 OID 43893)
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
-- TOC entry 3349 (class 0 OID 43853)
-- Dependencies: 211
-- Data for Name: airlines; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.airlines (id, name, image, is_active, created_at, updated_at, deleted_at) VALUES ('c57ecfda-0c00-4ff7-a430-3ac62294558e', 'new era', '1651714757252.png', 0, '2022-05-05 08:37:46.846513', '2022-05-05 01:39:17.505', '2022-05-05 01:44:53.935');
INSERT INTO public.airlines (id, name, image, is_active, created_at, updated_at, deleted_at) VALUES ('26a6bfc5-7a19-4a43-9a22-3965684b0a55', 'tester', '1651715377510.png', 1, '2022-05-05 08:49:38.000802', NULL, NULL);


--
-- TOC entry 3350 (class 0 OID 43862)
-- Dependencies: 212
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3347 (class 0 OID 43837)
-- Dependencies: 209
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3348 (class 0 OID 43845)
-- Dependencies: 210
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3351 (class 0 OID 43879)
-- Dependencies: 213
-- Data for Name: flights; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3352 (class 0 OID 43886)
-- Dependencies: 214
-- Data for Name: pic; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3353 (class 0 OID 43893)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, username, email, password, name, phone_number, city, address, post_code, photo, verify_token, is_verified, is_active, level, created_at, updated_at, deleted_at) VALUES ('c39c53c6-ee87-447b-8c5f-9d11ce007ceb', 'Master Programmer', 'masterprogrammer123@gmail.com', '$2b$10$qGutdwxWCYMKhYidnZDjPO/3e7glh4ptB1ZbqUM4bkM2sq1ZwD92K', NULL, NULL, NULL, NULL, NULL, '1651749321000.png', NULL, 1, 1, 0, '2022-05-03 11:45:24.934934', '2022-05-05 18:15:21.673757', NULL);


--
-- TOC entry 3199 (class 2606 OID 44011)
-- Name: airlines airlines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT airlines_pkey PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 43868)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- TOC entry 3195 (class 2606 OID 43844)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 43852)
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 43885)
-- Name: flights flights_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_pkey PRIMARY KEY (id);


--
-- TOC entry 3205 (class 2606 OID 43892)
-- Name: pic pic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pic
    ADD CONSTRAINT pic_pkey PRIMARY KEY (id);


--
-- TOC entry 3207 (class 2606 OID 44013)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2022-05-08 17:18:41

--
-- PostgreSQL database dump complete
--

