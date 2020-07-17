const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let rawbooks = fs.readFileSync('books.json') // leitura arquivo 
let books = JSON.parse(rawbooks) // converte para JSON - todos meus livros


app.get('/', (req, res) => {
    res.send('hellow word')
})

// listar os livros
app.get('/book', (req, res) => {
    res.json(books)
})

// cadastrar livros
app.post('/book', (req, res) => {
    const book = req.body

    if( Array.isArray(book)) {
        // se tiver mais de um livro
        for(item of book){
            books.push(item) // add no final do meu arr
        }
    }else {
        books.push(book)
    }

    // gravacao do arquivo
    let jsonList = JSON.stringify(books)
    fs.writeFileSync('books.json', jsonList, 'utf-8', ()=>{} )
    res.send('Livro cadastrado com sucesso.')

} )

app.get('/book/:isbn', (req, res) => {
    const { isbn } = req.params // captura pela URL

    for(book of books){
        if( books.isbn == isbn ){
            res.json(book)
            return
        }
    }
    res.status(404).send('Livro nO encontrado')   
})


app.listen(3000)