
import Pocetna from "pages/Pocetna.vue";
import konverter from "pages/konverter.vue";
import PostaviAukciju from "pages/PostaviAukciju.vue";
import PrikazAukcije from "pages/PrikazAukcije.vue";
import PrikazPredmetaKategorije from "pages/PrikazPredmetaKategorije.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        redirect: "/pocetna",
      },
      {
        path: "pocetna",
        component: Pocetna,
      },
      {
        path: "postavi",
        component: PostaviAukciju,
      },
      {
        path: "prikaz",
        component: PrikazAukcije,
      },
      {
        path: "kategorija",
        component: PrikazPredmetaKategorije,
      },
      {
        path: "konverter",
        component: konverter,
      },
      {
        path: "prijava",
        component: () => import("pages/Prijava_m.vue"),
      },
      {
        path: "registracija",
        component: () => import("pages/Registracija_m.vue"),
      },
       {
        path: "Moj_profil",
       component: () => import("pages/Moj_profil.vue"),
      }

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
