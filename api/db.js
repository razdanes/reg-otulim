// Vercel Serverless Function: /api/db  (GET = pobierz bazę, POST = zapisz bazę)
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const pw = process.env.APP_PASSWORD;
  const U = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const T = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!pw || !U || !T) return res.status(500).json({ error: 'Brak APP_PASSWORD lub bazy Redis w ustawieniach Vercel' });
  if (req.headers['x-pw'] !== pw) return res.status(401).json({ error: 'Złe hasło' });
  const q = async (cmd) => {
    const r = await fetch(U, { method: 'POST', headers: { Authorization: 'Bearer ' + T }, body: JSON.stringify(cmd) });
    return r.json();
  };
  try {
    if (req.method === 'GET') {
      const r = await q(['GET', 'otulim:db']);
      return res.status(200).json({ db: r.result ? JSON.parse(r.result) : null });
    }
    if (req.method === 'POST') {
      const b = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!b || !b.db || !Array.isArray(b.db.orders)) return res.status(400).json({ error: 'Nieprawidłowe dane' });
      await q(['SET', 'otulim:db', JSON.stringify(b.db)]);
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Metoda niedozwolona' });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
