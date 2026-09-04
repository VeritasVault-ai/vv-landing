CREATE TABLE IF NOT EXISTS scheduled_sync_leases (
  lease_name TEXT PRIMARY KEY,
  holder_id UUID NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE scheduled_sync_leases ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE scheduled_sync_leases FROM anon, authenticated;

CREATE OR REPLACE FUNCTION acquire_scheduled_sync_lease(
  p_lease_name TEXT,
  p_holder_id UUID,
  p_ttl_seconds INTEGER
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_ttl_seconds < 1 OR p_ttl_seconds > 3600 THEN
    RAISE EXCEPTION 'Lease TTL must be between 1 and 3600 seconds';
  END IF;

  INSERT INTO scheduled_sync_leases (lease_name, holder_id, expires_at, updated_at)
  VALUES (
    p_lease_name,
    p_holder_id,
    NOW() + make_interval(secs => p_ttl_seconds),
    NOW()
  )
  ON CONFLICT (lease_name) DO UPDATE
  SET holder_id = EXCLUDED.holder_id,
      expires_at = EXCLUDED.expires_at,
      updated_at = NOW()
  WHERE scheduled_sync_leases.expires_at <= NOW();

  RETURN FOUND;
END;
$$;

CREATE OR REPLACE FUNCTION release_scheduled_sync_lease(
  p_lease_name TEXT,
  p_holder_id UUID
)
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM scheduled_sync_leases
  WHERE lease_name = p_lease_name AND holder_id = p_holder_id;
$$;

REVOKE ALL ON FUNCTION acquire_scheduled_sync_lease(TEXT, UUID, INTEGER) FROM PUBLIC;
REVOKE ALL ON FUNCTION release_scheduled_sync_lease(TEXT, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION acquire_scheduled_sync_lease(TEXT, UUID, INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION release_scheduled_sync_lease(TEXT, UUID) TO service_role;
