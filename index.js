const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 4000,
    router = require('./routers'),
    cors = require('cors')

require('dotenv').config()

app.use(express.json({strict : false}))
app.use(cors())
// app.use('/api/v1',router)
app.set('views', './views')
app.set('view engine', 'ejs')
app.use('/auth',router)
//handle 404 
app.get('*', (req, res) => {
    return res.status(404).json({
        error: 'End point is not registered'
    })
})

app.listen(PORT,()=>{
    console.log(`server is running at PORT ${PORT}`)
})