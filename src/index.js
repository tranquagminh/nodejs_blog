const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

const route = require('./routes')   // Tự động nạp file index

app.use(express.static(path.join(__dirname,'public')));
 
app.use(express.urlencoded({
    extended: true
}))              // Middleware xử lý từ form data, khi req.query thì sẽ có middleware xử lý ở giữa nên ta có thể lấy được dữ liệu còn lại từ form data thì không có nên ta cần urlendcoded 
app.use(express.json())

app.use(morgan('combined'))

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'resources/views'))


// Routes init
route(app)


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))