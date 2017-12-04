const queryDB = require('../utils/DatabaseConnection');

class Image {
    constructor(idimage, idproduct, img_name) {
        this.idimage = idimage;
        this.idproduct = idproduct;
        this.img_name = img_name;
    }

    getImageByProductId() {
        let sql = 'select * from public."image" where idproduct=$1';
        return queryDB(sql, [this.idproduct])
            .then(results => results.rows);
    }

    getImageById() {
        let sql = 'select * from public."image" where idimage=$1';
        return queryDB(sql, [this.idimage])
            .then(results => results.rows);
    }
}

module.exports = Image;
