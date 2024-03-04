require("dotenv").config()
const express = require('express')
const db = require('./db')

const app = express()

app.use(express.json())

//ROUTES
app.get('/api/v1/restaurants',async(req,res)=>{
    try {
        const results = await db.query('select * from restaurants')
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
              restaurants: results.rows,
            },
          });
        } catch (error) {
            console.log(error);
        }
    })
    
    app.get('/api/v1/restaurants/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        console.log(id);
        const result = await db.query('select * from restaurants where id = $1',[id])
        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                restaurants: result.rows,
            },
        });
    } catch (error) {
        console.log(error);
    }
    
})

app.post('/api/v1/restaurants',async(req,res)=>{
    const {name,location,price_range} = req.body;
    try {
        const results = await db.query("INSERT INTO restaurants (name,location,price_range) values ($1,$2,$3) returning *",[name,location,price_range]);
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: results.rows,
            },
        });
    } catch (error) {
        console.log(error);
    }
    
})

app.put('/api/v1/restaurants/:id',async(req,res)=>{
    const {id} = req.params;
    const {name,location,price_range} = req.body;
    try {
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [name, location, price_range,id]
          );
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
})

app.delete('/api/v1/restaurants/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await db.query('DELETE FROM restaurants where id = $1',[id])
        res.status(200).json({
            status: "success",
        });
    } catch (error) {
        console.log(error);
    }


})




const port = process.env.PORT || 3001
app.listen(port,()=>{
    console.log(`Server Running on port ${port}`);
})