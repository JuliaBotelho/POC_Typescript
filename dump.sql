--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

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
-- Name: movies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    "userId" integer,
    movie text NOT NULL,
    note text,
    "availableOn" text NOT NULL,
    genre text,
    status boolean DEFAULT false,
    "createdAt" date DEFAULT now() NOT NULL
);


--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "userName" character varying(50) NOT NULL,
    password text NOT NULL,
    token text,
    "createdAt" date DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.movies VALUES (3, NULL, 'socorro deus', NULL, 'prime', 'suspense', false, '2023-01-23');
INSERT INTO public.movies VALUES (4, NULL, 'socorro', NULL, 'netflix', 'suspense', false, '2023-01-23');
INSERT INTO public.movies VALUES (5, NULL, 'tanajura', NULL, 'netflix', 'romance', false, '2023-01-23');
INSERT INTO public.movies VALUES (1, 3, 'memorias', 'filme top demais amei', 'netflix', 'romance', true, '2023-01-23');
INSERT INTO public.movies VALUES (2, 3, 'pararannn', 'que filme maneiroooo', 'prime', 'romance', true, '2023-01-23');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'pipo', 'pipo', '9c2698a6-c97e-4419-988b-0a1309073820', '2023-01-23');
INSERT INTO public.users VALUES (2, 'pipa', 'pipa', '78ed56ef-bcd6-4038-b2b6-20a1f71d2c33', '2023-01-23');
INSERT INTO public.users VALUES (3, 'pipe', 'pipe', 'ede32753-efc6-4b5a-9043-1ce8d523db40', '2023-01-23');


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.movies_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_userName_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_userName_key" UNIQUE ("userName");


--
-- Name: movies movies_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT "movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

