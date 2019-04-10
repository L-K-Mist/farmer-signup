--
-- SQL edited by https://hasura-edit-pg-dump.now.sh
--

CREATE SCHEMA public;

COMMENT ON SCHEMA public IS 'standard public schema';

CREATE TABLE public."Session" (
    start text NOT NULL,
    user_id text,
    id integer NOT NULL
);

CREATE TABLE public.flowers (
    name text,
    id integer NOT NULL
);

CREATE TABLE public."Addresses" (
    area text,
    line_1 text,
    line_2 text,
    line_3 text,
    postal_code text,
    id text NOT NULL,
    province text
);

CREATE TABLE public."Crops" (
    category text,
    name text,
    description text,
    user_id text NOT NULL,
    id integer NOT NULL,
    start_date text,
    end_date text
);

CREATE TABLE public."FarmerActivities" (
    cultivation_approach text,
    details text,
    scale text,
    selling_what text,
    id text NOT NULL
);

CREATE TABLE public."Farms" (
    name text,
    arable_land integer,
    cultivated_land integer,
    location jsonb,
    id text NOT NULL,
    farmers_associations text,
    share_location boolean DEFAULT true
);

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

CREATE TABLE public."_Produce_Options" (
    name text,
    type text,
    spacing integer,
    plants_per_meter numeric,
    id integer NOT NULL
);

CREATE SEQUENCE public."Crops_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."Crops_id_seq" OWNED BY public."Crops".id;

CREATE SEQUENCE public."Products_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."Products_id_seq" OWNED BY public."Products".id;

CREATE SEQUENCE public."Session_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."Session_id_seq" OWNED BY public."Session".id;

CREATE TABLE public."_Produce" (
    spacing numeric,
    id integer NOT NULL,
    name text,
    type text,
    plants_per_meter numeric
);

CREATE SEQUENCE public."_Produce_Options_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."_Produce_Options_id_seq" OWNED BY public."_Produce_Options".id;

CREATE SEQUENCE public."_Produce_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."_Produce_id_seq" OWNED BY public."_Produce".id;

CREATE TABLE public.author (
    id integer NOT NULL,
    name text
);

CREATE SEQUENCE public.author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.author_id_seq OWNED BY public.author.id;

CREATE SEQUENCE public.flowers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.flowers_id_seq OWNED BY public.flowers.id;

ALTER TABLE ONLY public."Crops" ALTER COLUMN id SET DEFAULT nextval('public."Crops_id_seq"'::regclass);

ALTER TABLE ONLY public."Products" ALTER COLUMN id SET DEFAULT nextval('public."Products_id_seq"'::regclass);

ALTER TABLE ONLY public."Session" ALTER COLUMN id SET DEFAULT nextval('public."Session_id_seq"'::regclass);

ALTER TABLE ONLY public."_Produce" ALTER COLUMN id SET DEFAULT nextval('public."_Produce_id_seq"'::regclass);

ALTER TABLE ONLY public."_Produce_Options" ALTER COLUMN id SET DEFAULT nextval('public."_Produce_Options_id_seq"'::regclass);

ALTER TABLE ONLY public.author ALTER COLUMN id SET DEFAULT nextval('public.author_id_seq'::regclass);

ALTER TABLE ONLY public.flowers ALTER COLUMN id SET DEFAULT nextval('public.flowers_id_seq'::regclass);

ALTER TABLE ONLY public."Addresses"
    ADD CONSTRAINT "Addresses_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Crops"
    ADD CONSTRAINT "Crops_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."FarmerActivities"
    ADD CONSTRAINT "Farmer_Activities_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Farms"
    ADD CONSTRAINT "Farms_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_start_key" UNIQUE (start);

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_address_id_key" UNIQUE (address_id);

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_farm_id_key" UNIQUE (farm_id);

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (auth0_id);

ALTER TABLE ONLY public."_Produce_Options"
    ADD CONSTRAINT "_Produce_Options_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."_Produce"
    ADD CONSTRAINT "_Produce_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.flowers
    ADD CONSTRAINT flowers_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public."Addresses"
    ADD CONSTRAINT "Addresses_id_fkey" FOREIGN KEY (id) REFERENCES public."Users"(auth0_id);

ALTER TABLE ONLY public."Crops"
    ADD CONSTRAINT "Crops_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(auth0_id);

ALTER TABLE ONLY public."FarmerActivities"
    ADD CONSTRAINT "Farmer_Activities_id_fkey" FOREIGN KEY (id) REFERENCES public."Users"(auth0_id);

ALTER TABLE ONLY public."Farms"
    ADD CONSTRAINT "Farms_id_fkey" FOREIGN KEY (id) REFERENCES public."Users"(auth0_id);

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(auth0_id);

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_activities_id_fkey" FOREIGN KEY (activities_id) REFERENCES public."FarmerActivities"(id);

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_address_id_fkey" FOREIGN KEY (address_id) REFERENCES public."Addresses"(id);

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_crop_id_fkey" FOREIGN KEY (crop_id) REFERENCES public."Crops"(id);

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_farm_id_fkey" FOREIGN KEY (farm_id) REFERENCES public."Farms"(id);

