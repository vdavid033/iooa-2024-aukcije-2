const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { join } = require("path");
const path = require("path");

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
  database: "iooa-aukcije",
});

connection.connect();


app.get("/api/all-korisnik", (req, res) => {
  connection.query("SELECT * FROM korisnik", (error, results) => {
    if (error) throw error;

    res.send(results);
  });
});

app.post('/unosPredmeta', function (request, response) {
    const data = request.body;
    predmet = [[data.sifra_predmeta, data.naziv_predmeta,  data.opis_predmeta, data.slika, data.vrijeme_pocetka, data.vrijeme_zavrsetka, data.pocetna_cijena, data.svrha_donacije, data.id_korisnika, data.sifra_kategorije]]
    connection.query('INSERT INTO predmet (sifra_predmeta, naziv_predmeta,  opis_predmeta, slika, vrijeme_pocetka, vrijeme_zavrsetka, pocetna_cijena, svrha_donacije, id_korisnika, sifra_kategorije) VALUES ?',
    [predmet], function (error, results, fields) {
      if (error) throw error;
      console.log('data', data)
      return response.send({ error: false, data: results, message: 'Predmet je dodan.' });
    });
});

app.get("/api/all-predmet", (req, res) => {
  connection.query(
    "SELECT sifra_predmeta, naziv_predmeta, slika, pocetna_cijena, vrijeme_zavrsetka, TIME_FORMAT( SEC_TO_TIME(TIMESTAMPDIFF(SECOND, NOW(), vrijeme_zavrsetka)), '%H:%i:%s' ) AS preostalo_vrijeme FROM predmet WHERE vrijeme_zavrsetka > NOW() ORDER BY preostalo_vrijeme DESC",
    (error, results) => {
      if (error) throw error;

      res.send(results);
    }
  );
});

app.get("/api/get-predmet/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT p.naziv_predmeta, p.sifra_predmeta, p.slika, p.pocetna_cijena, p.vrijeme_pocetka, p.vrijeme_zavrsetka, TIME_FORMAT( SEC_TO_TIME(TIMESTAMPDIFF(SECOND, p.vrijeme_pocetka, p.vrijeme_zavrsetka)), '%H:%i:%s' ) AS preostalo_vrijeme, p.svrha_donacije, p.opis_predmeta, COALESCE(MAX(po.vrijednost_ponude), p.pocetna_cijena) AS vrijednost_ponude FROM predmet p LEFT JOIN ponuda po ON p.sifra_predmeta = po.sifra_predmeta WHERE p.sifra_predmeta = ?",
    [id],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});
app.get("/api/get-kategorija-predmet/:id", (req, res) => {
    const { id } = req.params;

    connection.query(
        "SELECT sifra_predmeta, naziv_predmeta, slika, pocetna_cijena, vrijeme_zavrsetka, TIME_FORMAT( SEC_TO_TIME(TIMESTAMPDIFF(SECOND, NOW(), vrijeme_zavrsetka)), '%H:%i:%s' ) AS preostalo_vrijeme, svrha_donacije, opis_predmeta FROM predmet WHERE sifra_kategorije = ?",
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
app.get('/api/all-korisnik', (req, res) => {

    connection.query('SELECT * FROM korisnik', (error, results) => {
        if (error) throw error;

        res.send(results)
    })
})

app.get('/api/get-predmet/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT sifra_predmeta, naziv_predmeta, slika, pocetna_cijena, vrijeme_pocetka, vrijeme_zavrsetka, TIME_FORMAT( SEC_TO_TIME(TIMESTAMPDIFF(SECOND, NOW(), vrijeme_zavrsetka)), \'%H:%i:%s\' ) AS preostalo_vrijeme FROM predmet WHERE sifra_predmeta = ?', [id], (error, results) => {
        if (error) throw error;
        res.send(results)
    });
});

  app.get('/api/get-ponuda/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT id_ponude, vrijednost_ponude, DATE_FORMAT(vrijeme_ponude, "%Y-%m-%d %H:%i:%s") as vrijeme_ponude, id_korisnika FROM ponuda WHERE sifra_predmeta = ?', [id], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});



app.post('/unostrenutnaponuda', function (request, response) {
  console.log('radi unos trenutna ponuda');
  const data = request.body;
  const ponuda = [[data.id_ponude, data.vrijednost_ponude, data.vrijeme_ponude, data.id_korisnika, data.sifra_predmeta]];
  connection.query('INSERT INTO ponuda (id_ponude, vrijednost_ponude, vrijeme_ponude, id_korisnika, sifra_predmeta) VALUES ?',
    [ponuda], function (error, results, fields) {
      if (error) throw error;
      return response.send({ error: false, data: results, message: 'Dodana je trenutna ponuda.' });
    });
});
app.post("/api/unos-slike", function (req, res) {
  const data = req.body;
  const slika = data.slika;

  connection.query(
    "INSERT INTO predmet (slika) VALUES (?)",
    [slika],
    function (error, results, fields) {
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
    }
  );
});
app.get('/api/all-korisnik', (req, res) => {

    connection.query('SELECT * FROM korisnik', (error, results) => {
        if (error) throw error;

        res.send(results)
    })
})

app.get("/api/all-predmet-with-current-price", (req, res) => {
  connection.query(
    "SELECT p.sifra_predmeta, p.naziv_predmeta, p.slika, p.pocetna_cijena, p.vrijeme_zavrsetka, TIME_FORMAT( SEC_TO_TIME(TIMESTAMPDIFF(SECOND, NOW(), p.vrijeme_zavrsetka)), '%H:%i:%s' ) AS preostalo_vrijeme, COALESCE(MAX(po.vrijednost_ponude), p.pocetna_cijena) AS trenutna_cijena FROM predmet p LEFT JOIN ponuda po ON p.sifra_predmeta = po.sifra_predmeta WHERE p.vrijeme_zavrsetka > NOW() GROUP BY p.sifra_predmeta ORDER BY preostalo_vrijeme DESC",
    (error, results) => {
      if (error) throw error;

      res.send(results);
    }
  );
});
app.get('/api/get-predmet-trenutna-cijena/:id', (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT p.sifra_predmeta, p.naziv_predmeta, p.opis_predmeta, p.svrha_donacije, p.slika, p.pocetna_cijena, p.vrijeme_pocetka, p.vrijeme_zavrsetka, TIME_FORMAT(SEC_TO_TIME(TIMESTAMPDIFF(SECOND, NOW(), p.vrijeme_zavrsetka)), '%H:%i:%s') AS preostalo_vrijeme, COALESCE(po.trenutna_cijena, p.pocetna_cijena) AS trenutna_cijena FROM predmet p LEFT JOIN (SELECT sifra_predmeta, MAX(vrijednost_ponude) AS trenutna_cijena FROM ponuda GROUP BY sifra_predmeta) po ON p.sifra_predmeta = po.sifra_predmeta WHERE p.sifra_predmeta = ?",
    [id],
    (error, results) => {
      if (error) throw error;

      res.send(results);
    }
  );
});

app.listen(port, () => {
  console.log('Server running at port: ' + port);
});
