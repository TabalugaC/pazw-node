const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const app = express();

app.set('view engine', 'ejs');
// Używanie body-parser do przetwarzania danych
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'mariadb',  
    database: 'baza'     
});

// Obsługa formularza
app.post('/submit', (req, res) => {
    const { imie, email, nazwisko, wiek } = req.body;       //pobranie danych formularza

//wysyłanie danych do bazy
    connection.query('INSERT INTO doform VALUES("'+imie+'","'+nazwisko+'","'+email+'","'+wiek+'");', (error, results) => {
        if (error) {
            return console.error('Błąd przy dodawaniu rekordu: ' + error.message);
        }
        
        console.log('Wstawiono rekord o ID: ' + results.insertId);
        res.redirect('/submit');
    });
    
   
    


 //kończenie połączenia

   // res.send(`Imię: ${imie} <br> Nazwisko: ${nazwisko} <br> Email: ${email}   <br> Wiek: ${wiek}`);   //odesłanie danych
});

app.get('/submit', (req, res) => {
    const query = 'SELECT * FROM uzytkownicy';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Błąd podczas pobierania danych z bazy:', err);
            res.send('Wystąpił błąd podczas pobierania danych z bazy.');
        } else {
            let html = '<h1>Lista użytkowników</h1><ul>';
            results.forEach(uzytkownicy => {
                html += `<li>Imię: ${uzytkownicy.imie}, Nazwisko: ${uzytkownicy.nazwisko}, Email: ${uzytkownicy.email}, Wiek: ${uzytkownicy.wiek}</li>`;
            });
            html += '</ul><a href="/">Wróć do formularza</a>';
            res.send(html);
        }
    });
});



//ustawia ściężke dla pliku formularza
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Uruchomienie serwera

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
