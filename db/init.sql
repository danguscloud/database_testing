CREATE TABLE public.numerics (
    Number NUMERIC(20,0) NOT NULL
);

ALTER TABLE public.numerics OWNER TO postgres;

INSERT INTO public.numerics (Number)
VALUES (1234567);