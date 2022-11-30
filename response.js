module.exports = {

    // Response Adding New Book
    addBookFail: {
        missingName: (h) => h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400),

        readMoreThanPageCount: (h) => h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400),
    },
    addBookSuccess: (id, h) => h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    }).code(201),
    
    // Response Get Book By Id
    getBookByIdFail: (h) => h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    }).code(404),
    getBookByIdSuccess: (book, h) => h.response({
        status: 'success',
        data: book,
    }).code(200),
    
    // Response Update Book By Id
    updateBookFail: {
        missingName: (h) => h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400),
        readMoreThanPageCount: (h) => h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400),
        bookNotFound: (h) => h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404),
    },
    updateBookSuccess: (h) => h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    }).code(200),
    
    // Response Delete Book By Id
    deleteBookFail: (h) => h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404),
    deleteBookSuccess: (h) => h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    }).code(200),
};
