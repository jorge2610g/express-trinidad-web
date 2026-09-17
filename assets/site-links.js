/* site-links.js
   Carga los links activos desde Supabase y actualiza los elementos
   marcados con data-link-key="..." en la página.
*/
(function () {
  var SUPABASE_URL = "https://gulctljitzlwokqydigx.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bGN0bGppdHpsd29rcXlkaWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1Njk4MjAsImV4cCI6MjEwNTE0NTgyMH0._Ju6BZ6yMHzmpD4POXSwSNJC9kXRslX5yQHeBllBosU";

  if (!window.supabase) {
    console.warn("site-links.js: falta cargar el SDK de Supabase antes de este script.");
    return;
  }

  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  sb.from("site_links")
    .select("key,url,is_active")
    .eq("is_active", true)
    .then(function (res) {
      if (res.error) {
        console.warn("site-links.js:", res.error.message);
        return;
      }
      var byKey = {};
      res.data.forEach(function (row) { byKey[row.key] = row.url; });

      document.querySelectorAll("[data-link-key]").forEach(function (el) {
        var key = el.getAttribute("data-link-key");
        var url = byKey[key];
        if (!url) return;

        var waText = el.getAttribute("data-wa-text");
        if (waText && /wa\.me|whatsapp/i.test(url)) {
          var sep = url.includes("?") ? "&" : "?";
          url = url + sep + "text=" + encodeURIComponent(waText);
        }

        el.setAttribute("href", url);
      });
    });
})();