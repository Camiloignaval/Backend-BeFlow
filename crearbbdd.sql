--
-- PostgreSQL database dump
--




CREATE TABLE public.contpeticiones (
    numero integer
);


ALTER TABLE public.contpeticiones OWNER TO postgres;


CREATE TABLE public.payment (
    id character varying NOT NULL,
    object character varying NOT NULL,
    description character varying,
    billed_hours numeric NOT NULL,
    billed_at character varying NOT NULL,
    billing_currency character varying NOT NULL,
    billed_amount numeric NOT NULL,
    need_exchange boolean NOT NULL,
    exchange_currency character varying NOT NULL,
    original_amount numeric,
    currency character varying,
    exchange_rate numeric,
    created_at character varying,
    updated_at character varying
);


ALTER TABLE public.payment OWNER TO postgres;

--
-- TOC entry 2795 (class 0 OID 27352)
-- Dependencies: 197
-- Data for Name: contpeticiones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contpeticiones (numero) FROM stdin;
0
\.


