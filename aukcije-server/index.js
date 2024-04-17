const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { join } = require("path");
const path = require("path");
const multer = require('multer');
const upload = multer();

const app = express();
const port = 3000;

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

// Postavke direktorija za statičke datoteke
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "*" }));

const connection = mysql.createConnection({
  host: "student.veleri.hr",
  user: "iooa-aukcije",
  password: "11",
  database: "iooa-aukcije1",
});

//Cookie
app.use(session({
  name: 'sid',
  secret: 'secret key kljucic',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000*60*60*24
  }
}));

app.use(express.urlencoded({extended: true}));

connection.connect();


app.get("/api/korisnici", (req, res) => {
  connection.query("SELECT id_korisnika, ime_korisnika, prezime_korisnika, email_korisnika, adresa_korisnika FROM korisnik", (error, results) => {
    if (error) throw error;

    res.send(results);
  });
});

app.get("/getUnosPredmeta", function (request, response) {
  connection.query("SELECT * FROM korisnik", function (error, korisniciResults) {
    if (error) throw error;

    connection.query("SELECT * FROM kategorija", function (error, kategorijeResults) {
      if (error) throw error;

      response.send({
        korisnici: korisniciResults,
        kategorije: kategorijeResults,
      });
    });
  });
});

app.post("/unosPredmeta", upload.none(), function (request, response) {
  const data = request.body;
  const predmet = [[data.naziv_predmeta, data.opis_predmeta, data.vrijeme_pocetka, data.vrijeme_zavrsetka, data.pocetna_cijena, data.id_korisnika, data.id_kategorije]];

  connection.query("INSERT INTO predmet (naziv_predmeta, opis_predmeta, vrijeme_pocetka, vrijeme_zavrsetka, pocetna_cijena, id_korisnika, id_kategorije) VALUES ?", [predmet], function (error, results) {
    if (error) throw error;
    const insertedPredmetId = results.insertId;

    Object.keys(data).forEach(key => {
      if (key.startsWith('file')) {
        const base64String = data[key];
        connection.query("INSERT INTO slika (slika, id_predmeta) VALUES (?, ?)", [base64String, insertedPredmetId], function (error) {
          if (error) throw error;
        });
      }
    });

    return response.send({ error: false, message: "Predmet i slike su dodani." });
  });
});

app.get("/api/all-predmet", (req, res) => {
  connection.query("SELECT p.id_predmeta, p.opis_predmeta, p.naziv_predmeta, p.pocetna_cijena, p.vrijeme_pocetka, p.vrijeme_zavrsetka, CONCAT( FLOOR(TIMESTAMPDIFF(SECOND, NOW(), p.vrijeme_zavrsetka) / (24*3600)), ' dana, ', TIME_FORMAT(SEC_TO_TIME(TIMESTAMPDIFF(SECOND, NOW(), p.vrijeme_zavrsetka) % (24*3600)), '%H:%i:%s') ) AS preostalo_vrijeme, (SELECT slika FROM slika WHERE id_predmeta = p.id_predmeta LIMIT 1) AS slika FROM predmet p WHERE p.vrijeme_zavrsetka > NOW() ORDER BY preostalo_vrijeme DESC;", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/get-predmet/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    `SELECT p.naziv_predmeta, p.id_predmeta, p.pocetna_cijena, p.vrijeme_pocetka, p.vrijeme_zavrsetka, TIME_FORMAT( SEC_TO_TIME(TIMESTAMPDIFF(SECOND, p.vrijeme_pocetka, p.vrijeme_zavrsetka)), '%H:%i:%s' ) AS preostalo_vrijeme, p.opis_predmeta, COALESCE(MAX(po.vrijednost_ponude), p.pocetna_cijena) AS vrijednost_ponude, GROUP_CONCAT(s.slika SEPARATOR '|||') AS slike
    FROM predmet p 
    LEFT JOIN ponuda po ON p.id_predmeta = po.id_predmeta 
    LEFT JOIN slika s ON p.id_predmeta = s.id_predmeta 
    WHERE p.id_predmeta = ? 
    GROUP BY p.id_predmeta`,
    [id],
    (error, results) => {
      if (error) throw error;
      if (results.length > 0 && results[0].slike) {
        results[0].slike = results[0].slike.split('|||');
      }
      res.send(results);
    }
  );
});

app.get("/api/get-kategorija-predmet/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    `
    SELECT 
      p.id_predmeta, 
      p.naziv_predmeta, 
      p.pocetna_cijena, 
      p.vrijeme_zavrsetka, 
      TIME_FORMAT( SEC_TO_TIME(TIMESTAMPDIFF(SECOND, NOW(), p.vrijeme_zavrsetka)), '%H:%i:%s' ) AS preostalo_vrijeme, 
      p.opis_predmeta,
      (SELECT slika FROM slika WHERE id_predmeta = p.id_predmeta LIMIT 1) AS slika
    FROM 
      predmet p 
    WHERE 
      p.id_kategorije = ? AND
      p.vrijeme_zavrsetka > NOW()
    ORDER BY 
      preostalo_vrijeme DESC;
  `,
    [id],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.get("/api/all-kategorija", (req, res) => {
  connection.query("SELECT * FROM kategorija", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/get-predmet/:id", (req, res) => {
  const { id } = req.params;

  connection.query("SELECT id_predmeta, naziv_predmeta,pocetna_cijena, vrijeme_pocetka, vrijeme_zavrsetka, TIME_FORMAT( SEC_TO_TIME(TIMESTAMPDIFF(SECOND, NOW(), vrijeme_zavrsetka)), '%H:%i:%s' ) AS preostalo_vrijeme FROM predmet WHERE id_predmeta = ?", [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/get-ponuda/:id", (req, res) => {
  const { id } = req.params;

  connection.query('SELECT id_ponude, vrijednost_ponude, DATE_FORMAT(vrijeme_ponude, "%Y-%m-%d %H:%i:%s") as vrijeme_ponude, id_korisnika FROM ponuda WHERE id_predmeta = ?', [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post("/unostrenutnaponuda", function (request, response) {
  console.log("radi unos trenutna ponuda");
  const data = request.body;
  const ponuda = [[data.id_ponude, data.vrijednost_ponude, data.vrijeme_ponude, data.id_korisnika, data.id_predmeta]];
  connection.query("INSERT INTO ponuda (id_ponude, vrijednost_ponude, vrijeme_ponude, id_korisnika, id_predmeta) VALUES ?", [ponuda], function (error, results, fields) {
    if (error) throw error;
    return response.send({ error: false, data: results, message: "Dodana je trenutna ponuda." });
  });
});
app.post("/api/unos-slike", function (req, res) {
  const data = req.body;
  const slika = data.slika;

  connection.query("INSERT INTO slika (slika) VALUES (?)", [slika], function (error, results, fields) {
    if (error) {
      console.error(error);
      return res.status(500).send({
        error: true,
        message: "Dogodila se greška prilikom dodavanja teksta.",
      });
    }
    return res.send({
      error: false,
      data: results,
      message: "Slika je dodana.",
    });
  });
});

app.get("/api/all-predmet-with-current-price", (req, res) => {
  connection.query("SELECT p.id_predmeta, p.naziv_predmeta,  p.opis_predmeta, p.pocetna_cijena, p.vrijeme_pocetka, p.vrijeme_zavrsetka, TIME_FORMAT( SEC_TO_TIME(TIMESTAMPDIFF(SECOND, NOW(), p.vrijeme_zavrsetka)), '%H:%i:%s' ) AS preostalo_vrijeme, COALESCE(MAX(po.vrijednost_ponude), p.pocetna_cijena) AS trenutna_cijena FROM predmet p LEFT JOIN ponuda po ON p.id_predmeta = po.id_predmeta WHERE p.vrijeme_zavrsetka > NOW() GROUP BY p.id_predmeta ORDER BY preostalo_vrijeme DESC", (error, results) => {
    if (error) throw error;

    res.send(results);
  });
});
app.get("/api/get-predmet-trenutna-cijena/:id", (req, res) => {
  const { id } = req.params;
  connection.query("SELECT p.id_predmeta, p.naziv_predmeta, p.opis_predmeta, p.pocetna_cijena, p.vrijeme_pocetka, p.vrijeme_zavrsetka, TIME_FORMAT(SEC_TO_TIME(TIMESTAMPDIFF(SECOND, NOW(), p.vrijeme_zavrsetka)), '%H:%i:%s') AS preostalo_vrijeme, COALESCE(po.trenutna_cijena, p.pocetna_cijena) AS trenutna_cijena FROM predmet p LEFT JOIN (SELECT id_predmeta, MAX(vrijednost_ponude) AS trenutna_cijena FROM ponuda GROUP BY id_predmeta) po ON p.id_predmeta = po.id_predmeta WHERE p.id_predmeta = ?", [id], (error, results) => {
    if (error) throw error;

    res.send(results);
  });
});

app.listen(port, () => {
  console.log("Server running at port: " + port);
});
app.post("/regaKorisnika", function (request, response) {
  const data = request.body;
  const saltRounds = 10;

  bcrypt.hash(data.lozinka, saltRounds, function (err, hash) {
    if (err) {
      console.error("Error hashing password:", err);
      return response.status(500).json({ error: true, message: "Error hashing password." });
    }

    const korisnik = [[data.ime, data.prezime, data.email, hash, data.adresa]];

    connection.query("INSERT INTO korisnik (ime_korisnika, prezime_korisnika, email_korisnika, lozinka_korisnika, adresa_korisnika) VALUES ?", [korisnik], function (error, results, fields) {
      if (error) {
        console.error("Registracija korisnika neuspješna.", error);
        return response.status(500).json({ error: true, message: "Registracija korisnika neuspješna." });
      }
      console.log("data", data);
      return response.send({ error: false, data: results, message: "Uspješna registracija!" });
    });
  });
});

app.post("/login", function (req, res) {
  console.log("SESIJA PRIJE LOGINA: "+req.session);

  const data = req.body;
  const email = data.email;
  const password = data.password;

  connection.query("SELECT * FROM korisnik WHERE email_korisnika = ?", [email], function (err, result) {
    if (err) {
      res.status(500).json({ success: false, message: "Internal server error" });
    } else if (result.length > 0) {
      // Usporedba lozinki
      bcrypt.compare(password, result[0].lozinka_korisnika, function (err, bcryptRes) {
        if (bcryptRes) {

          var userId = result[0].id_korisnika;
          req.session.userId = userId;
          

          console.log("Sesija nakon logina: "+req.session);
          console.log("UserId:"+ req.session.userId);


          res.status(200).json({ success: true, message: "Prijava uspješna!"+  req.session.userId });
        } else {
          res.status(401).json({ success: false, message: "Krivi email ili lozinka!" });
        }
      });
    } else {
      res.status(401).json({ success: false, message: "Krivi email ili lozinka!" });
    }
  });
});

app.get("/test", (req, res) => {
  console.log("POSLJE logina userid: " + req.session.userId);
});



app.get("/logout", (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(200).json({ message: "Logout successful" });
    }
  });
});

app.get("/api/korisnikinfo/:id", (req, res) => {
  const id = req.params.id;

  connection.query('SELECT ime_korisnika, prezime_korisnika, email_korisnika, adresa_korisnika, lozinka_korisnika FROM korisnik WHERE id_korisnika = ?', [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.put("/api/izmjenakorisnika/", (req, res) => {
  korisnik = req.body;
  connection.query('UPDATE korisnik SET ime_korisnika = ?, prezime_korisnika = ?, email_korisnika = ?, adresa_korisnika = ? WHERE id_korisnika = ?', 
  [korisnik.ime_korisnika, korisnik.prezime_korisnika, korisnik.email_korisnika, korisnik.adresa_korisnika, korisnik.id_korisnika], (error, results) => {
    if (error) throw error;
    res.send(results);
  })
});

app.get("/api/kategorijainfo/:id", (req,res)=>{
  const id = req.params.id;

  connection.query('SELECT naziv_kategorije FROM kategorija WHERE id_kategorije = ?',[id], (error, results)=>{
    if(error) throw error;
    res.send(results);
  })
});

app.put("/api/izmjenaKategorije", (req,res) => {
  kategorija= req.body;
  connection.query('UPDATE kategorija SET naziv_kategorije = ? WHERE id_kategorije= ?',[kategorija.naziv_kategorije, kategorija.id_kategorije], (error, results) => {
    if (error) throw error;
    res.send(results);
  })
});
