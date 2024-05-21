-- Up
CREATE TABLE Names (id INTEGER PRIMARY KEY, FirstName TEXT, LastName TEXT);
CREATE TABLE Addresses (id INTEGER PRIMARY KEY, Street TEXT, Town TEXT, Zip INTEGER);
CREATE TABLE Contacts (id INTEGER PRIMARY KEY, Email TEXT UNIQUE, Phone TEXT);
CREATE TABLE Customers (id INTEGER PRIMARY KEY, NamesId INTEGER, AddressesId INTEGER, ContactsId INTEGER,
    FOREIGN KEY(NamesId) REFERENCES Names(id) ON DELETE CASCADE,
    FOREIGN KEY(ContactsId) REFERENCES Contacts(id) ON DELETE CASCADE,
    FOREIGN KEY(AddressesId) REFERENCES Addresses(id) ON DELETE CASCADE);
CREATE TABLE ShippingAddresses (id INTEGER PRIMARY KEY, AddressesId INTEGER, ContactsId INTEGER,
    FOREIGN KEY(ContactsId) REFERENCES Contacts(id) ON DELETE CASCADE,
    FOREIGN KEY(AddressesId) REFERENCES Addresses(id) ON DELETE CASCADE);

INSERT INTO Names ( FirstName, LastName ) 
    VALUES ( 'Alex', 'Hinton' );
INSERT INTO Addresses ( Street, Town, Zip )
    VALUES ( '4301 Yuma St NW', 'Washington, DC', 20016 );
INSERT INTO Contacts ( Email, Phone )
    VALUES ( 'alex@me.com', '555-5555' );
INSERT INTO Customers ( NamesId, AddressesId, ContactsId )
    VALUES ( 1, 1, 1 );


-- Down
DROP TABLE Names;
DROP TABLE Addresses;
DROP TABLE Contacts;
DROP TABLE Customers;
DROP TABLE ShippingAddresses;
