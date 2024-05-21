const sqlite3 = require('sqlite3').verbose();


module.exports = {
    path: '',

    result: {},

    isEmpty : function(str) { return !str || 0 === str.length; },

    getDb: function() { this.db = new sqlite3.Database(this.path); },

    close: function() { 
        this.db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      })
      this.db = null;
    },

    select: function(select, table, clause, orderby) {
        this.getDb();
        let response = {};
        
        console.log('hi', this.db)
        let sql = `SELECT ${this.isEmpty(select) ? '*' : select} FROM ${table}`;
        if (!this.isEmpty(clause)) sql += ` WHERE ${clause}`;
        if (!this.isEmpty(orderby)) sql += ` ORDER BY ${orderby.value} ${orderby.order}`;

        this.db.all(sql, [], (err, rows) => {
            if (err) { console.log(err); }
            this.close();
            if (rows.length == 0) {
                response = {
                    status: false,
                    message: 'No, data'
                }
            }
            response = {
                status: false,
                data: rows
            }
            return response;
        });
    }
}
