
const express = require('express');
const axios = require('axios');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3500;

const API_KEY = 'bff15977809fce3e9f34d7362de621c4'; // Your TMDb API Key


app.use(express.static(path.join(__dirname,'../client/public')))
app.get('/movies', async (req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            
            params: {
                api_key: API_KEY,
                // You can add more parameters for filtering or sorting movies
               
            }
        });
        console.log(response.data.results);
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Error fetching movies' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

