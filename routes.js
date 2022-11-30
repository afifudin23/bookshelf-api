const {
    addNewBook,
    getBooksFromLib,
    getBookById,
    updateBook,
    deleteBook,
} = require('./handler');

module.exports = [
    // Add New Book
    {
        method: 'POST',
        path: '/books',
        handler: addNewBook,
    },
    // Get All Books
    {
        method: 'GET',
        path: '/books',
        handler: getBooksFromLib,
    },
    // Get Book By Id
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookById,
    },
    // Update Book
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBook,
    },
    // Delete Book 
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook,
    },
];
