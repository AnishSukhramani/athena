import { supabase } from '@jobportalscout/db';

/**
 * Find or create practice by domain (preferred) or normalized name.
 * Returns the practice row.
 */
export async function ensurePractice({ name, domain, locations, npiIds }) {
  const n = (name || 'Unknown').slice(0, 500);

  if (domain) {
    const { data: existing } = await supabase
      .from('practices_athena')
      .select('*')
      .eq('domain', domain)
      .maybeSingle();

    if (existing) {
      const { data } = await supabase
        .from('practices_athena')
        .update({
          name: n,
          ...(locations ? { locations } : {}),
          ...(npiIds ? { npi_ids: npiIds } : {}),
        })
        .eq('id', existing.id)
        .select()
        .single();
      return data;
    }

    const { data } = await supabase
      .from('practices_athena')
      .insert({
        name: n,
        domain,
        locations: locations ?? [],
        npi_ids: npiIds ?? [],
      })
      .select()
      .single();
    return data;
  }

  const { data: existing } = await supabase
    .from('practices_athena')
    .select('*')
    .is('domain', null)
    .ilike('name', n)
    .maybeSingle();

  if (existing) {
    const { data } = await supabase
      .from('practices_athena')
      .update({
        ...(locations ? { locations } : {}),
        ...(npiIds ? { npi_ids: npiIds } : {}),
      })
      .eq('id', existing.id)
      .select()
      .single();
    return data;
  }

  const { data } = await supabase
    .from('practices_athena')
    .insert({
      name: n,
      domain: null,
      locations: locations ?? [],
      npi_ids: npiIds ?? [],
    })
    .select()
    .single();
  return data;
}
