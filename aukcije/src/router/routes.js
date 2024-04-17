import Admin from "layouts/AdminLayout"

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
      { path: "Logout", component: () => import("pages/Logout.vue") },
      { path: "registracija", component: () => import("pages/Registracija_m.vue") },
      { path: "Moj_profil", component: () => import("pages/Moj_profil.vue") },
      { path: "admindash", component: () => import("pages/AdminDashboard.vue") },
      //admin layout -- spojen novi layout sa stranicom
      { path: "pregledkorisnika", component: () => import("pages/PregledKorisnika.vue") },
      
      


    ],
  },
  { path: "/admin/", component: () => import("layouts/AdminLayout.vue"), 
        children:[ 
          {path:"/", component: () => import("pages/AdminDashboard.vue")},
          {path:"kategorije", component: () => import("pages/Kategorije.vue")},
          {name:"kategorijadetalji", path:"kategorija/:id", component: () => import("pages/KategorijaDetalji.vue")},
          {path:"racuni", component: () => import("pages/Racuni.vue")},
          {name: "pregledkorisnika", path:"pregledkorisnika/", component: () => import("pages/PregledKorisnika.vue")},
          {name: "korisnikdetalji", path:"korisnikdetalji/:id", component: () => import("pages/KorisnikDetalji.vue") },
      ]},

  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
