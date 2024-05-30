const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/products', async (req, res) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDc5MzI1LCJpYXQiOjE3MTcwNzkwMjUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYyYTUyNTQwLWE0MTgtNGNhZC05OTg2LTllM2E1YmE0ZTk0MCIsInN1YiI6InNhaWFiaGlsZXNocGFkaWdlbGFAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiI2MmE1MjU0MC1hNDE4LTRjYWQtOTk4Ni05ZTNhNWJhNGU5NDAiLCJjbGllbnRTZWNyZXQiOiJyckRpY1BMbVZZdFhBVUlJIiwib3duZXJOYW1lIjoiQWJoaWxlc2giLCJvd25lckVtYWlsIjoic2FpYWJoaWxlc2hwYWRpZ2VsYUBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMWJkMWEwNTdhIn0._NMYKV2kCjSJ8xmRPfhApDM3UeMPVY_GSCKBGFkVYto'

    try {
        const response = await fetch('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=18000', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data)
        res.json(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
