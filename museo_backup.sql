--
-- PostgreSQL database dump
--

\restrict xfJNlyqAh8eGYjtwreeaHYfhRrGfhS9QvACok8sCCXEkDDCNnWBGgAiaF1OTwdw

-- Dumped from database version 17.11 (Debian 17.11-0+deb13u1)
-- Dumped by pg_dump version 17.11 (Debian 17.11-0+deb13u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: jersey_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jersey_images (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    id_jersey uuid NOT NULL,
    title text NOT NULL,
    url text NOT NULL,
    file_id character varying,
    is_primary boolean DEFAULT false
);


ALTER TABLE public.jersey_images OWNER TO postgres;

--
-- Name: jerseys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jerseys (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    description text,
    is_public boolean DEFAULT true,
    price integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    CONSTRAINT jerseys_price_check CHECK ((price > 0))
);


ALTER TABLE public.jerseys OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying NOT NULL,
    password_hash character varying(100) NOT NULL,
    username character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: jersey_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jersey_images (id, id_jersey, title, url, file_id, is_primary) FROM stdin;
7aad221a-ed53-4840-ae8a-71e37d661597	e1cd6343-67a0-4134-9b83-4ab1260332f5	trezeguet-1	https://ik.imagekit.io/nyainanathan/products/_DSC2170_2-01_Vzfr0CeeHG.jpeg	6a96f0265c7cd75eb84496ae	t
05b45de4-16bb-4fe0-a2d4-4724e7faa351	dbf0ee5c-1f60-4f48-97de-06120cdc9754	st-pauli	https://ik.imagekit.io/nyainanathan/products/st-pauli_9rpLrH1eo.jpeg	6a96f06f5c7cd75eb845eb52	t
0c9b0d34-33f7-414f-9557-8c174cdde3a7	6bccb097-9ddb-4b4a-96f7-815a737f7698	_DSC2106~2-02	https://ik.imagekit.io/nyainanathan/products/_DSC2106_2-02_osOtBtBTl.jpeg	6a96f0c55c7cd75eb847afb1	f
ad6c864f-cda1-4825-b9e3-ebd61e5a7b0b	60125bff-25c6-42e4-86f9-6e7afef8e992	_DSC0022~2-02	https://ik.imagekit.io/nyainanathan/products/_DSC0022_2-02_2NT5MiVjH.jpeg	6a96f0e45c7cd75eb8483dd6	f
c595f1f3-a871-48ef-918a-c20b0d420668	4e8c0226-64ca-4f07-8714-5b3607a0c273	_DSC2147~2-01	https://ik.imagekit.io/nyainanathan/products/_DSC2147_2-01_4D3zUumsYf.jpeg	6a96f1045c7cd75eb848e3c4	f
748433ca-4ecf-4604-b651-be0285bb376b	4c99ca9e-3174-4095-8e7c-b909e81837c0	_DSC2117~2-01	https://ik.imagekit.io/nyainanathan/products/_DSC2117_2-01_Ea-hmKG9pX.jpeg	6a96f1155c7cd75eb8495afe	f
abac03e7-5a59-421e-8e25-9509618ce94f	417a4198-4f69-4779-a0ae-6c5155577c61	_DSC0064~2-06	https://ik.imagekit.io/nyainanathan/products/_DSC0064_2-06_zDMMUERy6.jpeg	6a96f1365c7cd75eb849d415	f
a02e7fa2-a9dc-42bf-b8cc-a49d770ca885	11de732e-f796-4ffb-a916-c8a0609e99cb	_DSC1763~2-01	https://ik.imagekit.io/nyainanathan/products/_DSC1763_2-01_Vr9CiJ6xVz.jpeg	6a96f14c5c7cd75eb84a4ae0	f
4c9be31f-9ff4-4a79-92cd-afb9b9fd0f35	8badd118-4a1b-4d28-af53-33eeb778f63c	_DSC1642~2-01	https://ik.imagekit.io/nyainanathan/products/_DSC1642_2-01_Cv27QYSk2.jpeg	6a96f0945c7cd75eb846c850	t
\.


--
-- Data for Name: jerseys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jerseys (id, name, description, is_public, price, created_at, updated_at) FROM stdin;
e1cd6343-67a0-4134-9b83-4ab1260332f5	Juventus, 17, Trezeguet	Known as "Trezegol", David Trezeguet spent a decade at Juventus (2000–2010), cementing himself as the highest-scoring foreign player in the club's history with 171 goals across 320 total appearances. He formed a deadly partnership with Alessandro Del Piero, winning two official Serie A titles and capturing the Capocannoniere top scorer award in 2001–02. His loyalty reached legendary status when he stayed with I Bianconeri in Serie B following the 2006 Calciopoli scandal to shoot them straight back into the top flight.	t	120000	2026-09-01 15:14:10.531+03	\N
60125bff-25c6-42e4-86f9-6e7afef8e992	Dortmund, 94-95	Driven by manager Ottmar Hitzfeld's tactical mastery and the heroics of stars like Matthias Sammer and Michael Zorc, Borussia Dortmund’s historic 1994–95 campaign saw the club break a agonizing 32-year league title drought by dramatically leapfrogging Werder Bremen on the final day of the season to claim their first modern Bundesliga championship. This landmark victory not only cemented BVB's ascension as a dominant modern powerhouse in German football—setting the stage for back-to-back league titles and a Champions League triumph shortly after—but it also immortalized their iconic neon Nike jersey as an enduring symbol of mid-'90s football culture and street style.	t	125000	2026-09-01 15:14:50.791+03	\N
6bccb097-9ddb-4b4a-96f7-815a737f7698	Inter Milan, 10, Adriano	Exploding onto the world stage at San Siro in the mid-2000s, Adriano earned his title as "L'Imperatore" by blending raw physical dominance with a devastating left foot, spearheading Inter Milan to four Serie A titles and consecutive Coppa Italia victories. Wearing the legendary ADRIANO #10 Nike kit adorned with the classic Pirelli sponsor, his peak years remain immortalized as one of the most unstoppable individual primes in modern football culture.	t	130000	2026-09-01 15:15:26.536+03	\N
4e8c0226-64ca-4f07-8714-5b3607a0c273	Arsenal, 7	Arsenal Football Club is a North London giant renowned for its record 14 FA Cups, 13 league titles, and the legendary 2003–04 "Invincibles" season under manager Arsène Wenger. Their rich history—from the classic Highbury era to the modern Emirates Stadium—has produced some of football's most iconic jerseys, including the famous "Bruised Banana" and redcurrant farewell kits.	t	140000	2026-09-01 15:15:53.439+03	2026-09-01 15:16:01.986+03
dbf0ee5c-1f60-4f48-97de-06120cdc9754	St Pauli, 98-99	Navigating a mid-table 2. Bundesliga campaign under the lights of the Millerntor-Stadion, FC St. Pauli’s 1998–99 season was defined less by silverware and more by the club's uncompromising, punk-rock identity. The classic Puma kit—boldly stamped with the iconic Jack Daniel's logo across the chest—has since elevated this specific season into an immortal Grail of football fashion, blending raw street culture with retro kit design.	t	145000	2026-09-01 15:16:43.219+03	\N
4c99ca9e-3174-4095-8e7c-b909e81837c0	Brazil, 7, Adriano	Adriano's journey with the *Seleção* was defined by a meteoric peak where he swept both the Golden Boot and MVP awards at the 2004 Copa América and 2005 Confederations Cup, establishing himself as Brazil's focal point. Wearing the iconic **#7** shirt—most famously as part of the star-studded "Magic Quartet" at the 2006 World Cup—his international career remains a beloved symbol of mid-2000s Brazilian dominance and nostalgia.	t	145000	2026-09-01 15:17:06.631+03	\N
11de732e-f796-4ffb-a916-c8a0609e99cb	Manchester United, 11, Giggs	Breaking into Manchester United's first team as a teenager in 1991, Ryan Giggs spent an unprecedented 24 seasons at Old Trafford, transforming from a blistering, left-wing phenom into a veteran midfield playmaker while setting unbreakable appearance records and winning a record 13 Premier League titles. His legacy is forever tied to the iconic #11 shirt, making his named kits from the 1998–99 Treble season and the early-'90s Umbro era premier collectors' items in football fashion.	t	150000	2026-09-01 15:17:38.189+03	\N
417a4198-4f69-4779-a0ae-6c5155577c61	Parma, 9, Crispo	Arriving from River Plate in 1996, Hernán Crespo spearheaded Parma's legendary Seven Sisters era, cementing his legacy as the club's all-time top scorer with 94 goals in all competitions. Wearing the iconic CRESPO #9 Champion jersey, he scored in the 1999 UEFA Cup and Coppa Italia finals to seal a historic cup double before transferring to Lazio for a then-world-record £35.5 million fee.	t	155000	2026-09-01 15:18:05.355+03	\N
8badd118-4a1b-4d28-af53-33eeb778f63c	PSG, 32, Beckham	Joining Paris Saint-Germain on a five-month contract in early 2013, David Beckham capped off his legendary playing career by donating his entire salary to a local children's charity and helping PSG secure their first Ligue 1 title in 19 years. By doing so, he became the first English player to win top-flight league championships in four different countries, turning his iconic BECKHAM #32 Nike kit into an immortal crossover piece of modern football fashion.	t	160000	2026-09-01 15:18:24.421+03	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password_hash, username, created_at, updated_at) FROM stdin;
6a529d64-5ef2-4cf1-b87a-d686489795f3	nyaina.nathan.2@gmail.com	$2b$10$dZ1u1KZ5R.SjYuFTRqom2uydgx4f/9ZluRgfiz3RmEL0a6SmvHSmi	nyaina-nathan	2026-08-30 11:20:57.024+03	\N
8080d7cc-0268-46ee-ad7c-2a9ace112fab	kiady@gmail.com	$2b$10$8EVHPQe/O7/val4.n4I2uuHrs8kLovi3i8JLHxrkq//IT8x5Rp5YW	kiki	2026-09-02 11:24:09.312+03	\N
\.


--
-- Name: jersey_images jersey_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jersey_images
    ADD CONSTRAINT jersey_images_pkey PRIMARY KEY (id);


--
-- Name: jerseys jerseys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jerseys
    ADD CONSTRAINT jerseys_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: jersey_images jersey_images_id_jersey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jersey_images
    ADD CONSTRAINT jersey_images_id_jersey_fkey FOREIGN KEY (id_jersey) REFERENCES public.jerseys(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict xfJNlyqAh8eGYjtwreeaHYfhRrGfhS9QvACok8sCCXEkDDCNnWBGgAiaF1OTwdw

