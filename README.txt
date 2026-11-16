OTULIM – panel zamówień z synchronizacją na Vercel
==================================================
Zawartość: index.html (panel) + api/db.js (zapis bazy w chmurze Vercel).

1. Wgraj oba pliki (z folderem api) do repozytorium na GitHubie.
2. Vercel → Add New → Project → wybierz to repozytorium → Deploy.
3. W projekcie: Storage → Create Database → Upstash (Redis), plan darmowy → Connect to Project.
   (Vercel sam doda zmienne KV_REST_API_URL i KV_REST_API_TOKEN.)
4. Settings → Environment Variables → dodaj APP_PASSWORD = wybrane hasło do panelu.
5. Deployments → Redeploy.
6. Otwórz stronę, w oknie ☁ wpisz to samo hasło. Na każdym urządzeniu wpisujesz je raz.
