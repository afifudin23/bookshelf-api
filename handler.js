const { nanoid } = require('nanoid');
const library = require('./library');
const {
    addBookFail,
    addBookSuccess,
    getBookByIdFail,
    getBookByIdSuccess,
    updateBookFail,
    updateBookSuccess,
    deleteBookFail,
    deleteBookSuccess,
} = require('./response');

module.exports = {
    // Add New Book
    addNewBook: (req, h) => {
        const {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        } = req.payload;
            
        const id = nanoid(16);
        const finished = pageCount === readPage;
        const insertedAt = new Date().toISOString();
        const updateAt = insertedAt;
            
        try {
            if (!name) return addBookFail.missingName(h);
            if (readPage > pageCount) return addBookFail.readMoreThanPageCount(h);
            
            library.push({
                id,
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                finished,
                reading,
                insertedAt,
                updateAt,
            });
            return addBookSuccess(id, h);
        } catch (err) {
            return h.response({
                status: 'Error',
                message: 'Buku gagal ditambahkan',
            }).code(500);
        }
    },
        
    // Get All Books
    getBooksFromLib: (req, h) => {
        const { name, reading, finished } = req.query;
        const result = [];
        if (name) {
            const books = library.filter((book) => book.name.toLowerCase() === name.toLowerCase());
            books.map((book) => result.push({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            }));
        } else if (reading) {
            if (reading == 1) {
                const books = library.filter((book) => book.reading == 1);
                books.map((book) => result.push({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                }));
            } else if (reading == 0) {
                const books = library.filter((book) => book.reading == 0);
                books.map((book) => result.push({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                }));
            }
        } else if (finished) {
            if (finished == 1) {
                const books = library.filter((book) => book.finished == 1);
                books.map((book) => result.push({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                }));
            } else if (finished == 0) {
                const books = library.filter((book) => book.finished == 0);
                books.map((book) => result.push({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                }));
            }
        } else {
            library.map((book) => result.push({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            }));
        }
        return h.response({
            status: 'success',
            data: {
                books: result,
            },
        }).code(200);
    },
        
    // Get Book By Id
    getBookById: (req, h) => {
        const { bookId } = req.params;
        const result = library.filter((book) => book.id === bookId);
        if (result.length === 0) return getBookByIdFail(h);
        return getBookByIdSuccess(result[0], h);
    },
        
    // Update Book By Id
    updateBook: (req, h) => {
        const { bookId } = req.params;
        const {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        } = req.payload;
        const i = library.findIndex((book) => book.id === bookId);
        if (!name) return updateBookFail.missingName(h);
        if (readPage > pageCount) return updateBookFail.readMoreThanPageCount(h);
        if (i < 0) return updateBookFail.bookNotFound(h);
        
        const updateAt = new Date().toISOString();
        
        const book = { ...library[i] };
        library[i] = {
            id: bookId,
            name: name ?? book.name,
            year: year ?? book.year,
            author: author ?? book.author,
            summary: summary ?? book.summary,
            publisher: publisher ?? book.publisher,
            pageCount: pageCount ?? book.pageCount,
            readPage: readPage ?? book.readPage,
            finished: pageCount === readPage,
            reading: reading ?? book.reading,
            insertedAt: book.insertedAt,
            updateAt,
        };
        return updateBookSuccess(h);
    },
    // Delete Book By Id
    deleteBook: (req, h) => {
        const { bookId } = req.params;
        const i = library.findIndex((book) => book.id === bookId);
        if (i < 0) return deleteBookFail(h);
        library.splice(i, 1);
        return deleteBookSuccess(h);
    },
};
