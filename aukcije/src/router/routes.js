const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/Pocetna.vue") },
      { path: "pocetna", component: () => import("pages/Pocetna.vue") },
      { path: "postavi", component: () => import("pages/PostaviAukciju.vue") },
      { path: "prikaz", component: () => import("pages/PrikazAukcije.vue") },
      { path: "kategorija", component: () => import("pages/PrikazPredmetaKategorije.vue") },
      { path: "konverter", component: () => import("pages/konverter.vue") },
      { path: "prijava", component: () => import("pages/Prijava_m.vue") },
      { path: "registracija", component: () => import("pages/Registracija_m.vue") },
      { path: "Moj_profil", component: () => import("pages/Moj_profil.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
