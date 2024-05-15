class MockMongoClient {
    data = require('./data/hotels.json');

    async connect() {
        return this;
    }

    async fetchAll () {
        return this.data;
    }

    async fetchOneBy(property, value) {
        return this.data.find(hotel => hotel[property] === value);
    }
}

module.exports = MockMongoClient;