const {
    addNewBook,
    getBooksFromLib,
    getBookById,
    updatedBook,
    deletedBook,
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
        handler: updatedBook,
    },
    // Delete Book 
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deletedBook,
    },
];
