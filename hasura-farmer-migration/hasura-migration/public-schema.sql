--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2 (Ubuntu 11.2-1.pgdg16.04+1)
-- Dumped by pg_dump version 11.2 (Ubuntu 11.2-1.pgdg16.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Session" (
    start text NOT NULL,
    user_id text,
    id integer NOT NULL
);


--
-- Name: flowers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.flowers (
    name text,
    id integer NOT NULL
);


--
-- Name: Addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Addresses" (
    area text,
    line_1 text,
    line_2 text,
    line_3 text,
    postal_code text,
    id text NOT NULL,
    province text
);


--
-- Name: Crops; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Crops" (
    category text,
    name text,
    description text,
    user_id text NOT NULL,
    id integer NOT NULL,
    start_date text,
    end_date text
);


--
-- Name: FarmerActivities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."FarmerActivities" (
    cultivation_approach text,
    details text,
    scale text,
    selling_what text,
    id text NOT NULL
);


--
-- Name: Farms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Farms" (
    name text,
    arable_land integer,
    cultivated_land integer,
    location jsonb,
    id text NOT NULL,
    farmers_associations text,
    share_location boolean DEFAULT true
);


--
-- Name: Products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Products" (
    name text,
    description text,
    unit text,
    stock_level integer,
    price numeric,
    image_src text,
    image_name text,
    id integer NOT NULL,
    user_id text NOT NULL
);


--
-- Name: Users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Users" (
    first_name text NOT NULL,
    last_name text,
    cell text,
    sa_identity text,
    address_id text,
    auth0_id text NOT NULL,
    email text,
    picture_src text,
    activities_id text,
    last_login timestamp with time zone DEFAULT now() NOT NULL,
    landline text,
    farm_id text,
    crop_id integer
);


--
-- Name: _Produce_Options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_Produce_Options" (
    name text,
    type text,
    spacing integer,
    plants_per_meter numeric,
    id integer NOT NULL
);


--
-- Name: Crops_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Crops_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Crops_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Crops_id_seq" OWNED BY public."Crops".id;


--
-- Name: Products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Products_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Products_id_seq" OWNED BY public."Products".id;


--
-- Name: Session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Session_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Session_id_seq" OWNED BY public."Session".id;


--
-- Name: _Produce; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_Produce" (
    spacing numeric,
    id integer NOT NULL,
    name text,
    type text,
    plants_per_meter numeric
);


--
-- Name: _Produce_Options_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."_Produce_Options_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _Produce_Options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."_Produce_Options_id_seq" OWNED BY public."_Produce_Options".id;


--
-- Name: _Produce_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."_Produce_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _Produce_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."_Produce_id_seq" OWNED BY public."_Produce".id;


--
-- Name: author; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.author (
    id integer NOT NULL,
    name text
);


--
-- Name: author_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.author_id_seq OWNED BY public.author.id;


--
-- Name: flowers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.flowers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: flowers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.flowers_id_seq OWNED BY public.flowers.id;


--
-- Name: Crops id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Crops" ALTER COLUMN id SET DEFAULT nextval('public."Crops_id_seq"'::regclass);


--
-- Name: Products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Products" ALTER COLUMN id SET DEFAULT nextval('public."Products_id_seq"'::regclass);


--
-- Name: Session id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session" ALTER COLUMN id SET DEFAULT nextval('public."Session_id_seq"'::regclass);


--
-- Name: _Produce id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_Produce" ALTER COLUMN id SET DEFAULT nextval('public."_Produce_id_seq"'::regclass);


--
-- Name: _Produce_Options id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_Produce_Options" ALTER COLUMN id SET DEFAULT nextval('public."_Produce_Options_id_seq"'::regclass);


--
-- Name: author id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author ALTER COLUMN id SET DEFAULT nextval('public.author_id_seq'::regclass);


--
-- Name: flowers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flowers ALTER COLUMN id SET DEFAULT nextval('public.flowers_id_seq'::regclass);


--
-- Name: Addresses Addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Addresses"
    ADD CONSTRAINT "Addresses_pkey" PRIMARY KEY (id);


--
-- Name: Crops Crops_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Crops"
    ADD CONSTRAINT "Crops_pkey" PRIMARY KEY (id);


--
-- Name: FarmerActivities Farmer_Activities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FarmerActivities"
    ADD CONSTRAINT "Farmer_Activities_pkey" PRIMARY KEY (id);


--
-- Name: Farms Farms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Farms"
    ADD CONSTRAINT "Farms_pkey" PRIMARY KEY (id);


--
-- Name: Products Products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_start_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_start_key" UNIQUE (start);


--
-- Name: Users Users_address_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_address_id_key" UNIQUE (address_id);


--
-- Name: Users Users_farm_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_farm_id_key" UNIQUE (farm_id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (auth0_id);


--
-- Name: _Produce_Options _Produce_Options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_Produce_Options"
    ADD CONSTRAINT "_Produce_Options_pkey" PRIMARY KEY (id);


--
-- Name: _Produce _Produce_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_Produce"
    ADD CONSTRAINT "_Produce_pkey" PRIMARY KEY (id);


--
-- Name: author author_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (id);


--
-- Name: flowers flowers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flowers
    ADD CONSTRAINT flowers_pkey PRIMARY KEY (id);


--
-- Name: Addresses Addresses_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Addresses"
    ADD CONSTRAINT "Addresses_id_fkey" FOREIGN KEY (id) REFERENCES public."Users"(auth0_id);


--
-- Name: Crops Crops_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Crops"
    ADD CONSTRAINT "Crops_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(auth0_id);


--
-- Name: FarmerActivities Farmer_Activities_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FarmerActivities"
    ADD CONSTRAINT "Farmer_Activities_id_fkey" FOREIGN KEY (id) REFERENCES public."Users"(auth0_id);


--
-- Name: Farms Farms_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Farms"
    ADD CONSTRAINT "Farms_id_fkey" FOREIGN KEY (id) REFERENCES public."Users"(auth0_id);


--
-- Name: Products Products_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(auth0_id);


--
-- Name: Users Users_activities_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_activities_id_fkey" FOREIGN KEY (activities_id) REFERENCES public."FarmerActivities"(id);


--
-- Name: Users Users_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_address_id_fkey" FOREIGN KEY (address_id) REFERENCES public."Addresses"(id);


--
-- Name: Users Users_crop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_crop_id_fkey" FOREIGN KEY (crop_id) REFERENCES public."Crops"(id);


--
-- Name: Users Users_farm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_farm_id_fkey" FOREIGN KEY (farm_id) REFERENCES public."Farms"(id);


--
-- PostgreSQL database dump complete
--

