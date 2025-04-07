-- change name if needed 
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'nodejs_starter_db') THEN
        PERFORM pg_catalog.create_database('nodejs_starter_db');
    END IF;
END
$$;