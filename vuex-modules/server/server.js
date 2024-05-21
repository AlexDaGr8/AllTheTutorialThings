const express = require('express');
const Promise = require('bluebird');
const sqlite = require('sqlite');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
const port = process.env.PORT || 3000;


app.post('/customer', async (req, res) => {
    try {
        const db = await dbPromise;
        // // eslint-disable-next-line no-console
        // console.log('req.body', req.body);
        const promiseArr = [    
            db.run(`INSERT INTO Names (FirstName, LastName) VALUES (?, ?)`, [req.body.name.firstName, req.body.name.lastName]),
            db.run(`INSERT INTO Addresses (Street, Town, Zip) VALUES (?, ?, ?)`, [req.body.address.street, req.body.address.town, req.body.address.zip]),
        ];

        req.body.contacts.forEach(d => {
            promiseArr.push(    
                db.run(`INSERT INTO Contacts (email, phone) VALUES (?, ?)`, [d.email, d.phone]),
            )
        });

        const list = await Promise.all(promiseArr);
        list.forEach(d => {
            console.log(d.lastID);
        })
        db.run(`INSERT INTO Customers (NamesId, AddressesId, ContactsId) VALUES (?, ?, ?)`, [list[0].lastID, list[1].lastID, list[2].lastID]);
        res.status(200).send({
            message: list
          })
    } catch (err) {
        res.status(400).send({
          error: 'Something went wrong.',
          result: false,
          message: err
        })
    }
});

app.get('/getAllNames', async (req,res) => {
    try {
        const db = await dbPromise;
        // const names = db.run(`SELECT * FROM Names`, function(err, rows) {
        //     console.log('rows', rows)
        // });
        const [names] = await Promise.all([
          db.all(`SELECT * FROM Names`)
        ]);
        res.render('get', { names });
        // res.status(200).send({
        //     names: names
        // });
    } catch (err) {
        res.status(400).send({
            error: 'Something went wrong.',
            result: false,
            message: err
        });
    }
})

// app.get('/getCustomers', async (req, res) => {
//     try {
//         const db = await dbPromise;
//         const customers = db.all(`SELECT * FROM Customers`);
//         res.status(200).send({
//             message: [name, address]
//           })
//     } catch (err) {
//         res.status(400).send({
//           error: 'Something went wrong.',
//           result: false,
//           message: err
//         })
//     }
// })


const dbPromise = Promise.resolve()
    .then(() => sqlite.open('./database.sqlite', { Promise }))
    .then(db => db.migrate({ force: 'last' }))
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err.stack))
    // eslint-disable-next-line no-console
    .finally(() => app.listen(port, () => console.log(`Listening on port ${port}`)));