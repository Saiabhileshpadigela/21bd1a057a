const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

async function getAuthToken() {
    try {
        const res = await fetch('http://20.244.56.144/test/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "companyName": "goMart",
                "clientID": "62a52540-a418-4cad-9986-9e3a5ba4e940",
                "clientSecret": "rrDicPLmVYtXAUII",
                "ownerName": "Abhilesh",
                "ownerEmail": "saiabhileshpadigela@gmail.com",
                "rollNo": "21bd1a057a"
            })
        });

        const data = await res.json();
        console.log(data)

        return data.access_token;
    } catch (error) {
        console.error('Error fetching authentication token:', error);
        throw error;
    }
}

app.get('/api/products', async (req, res) => {

    try {
        const authToken = await getAuthToken();
        console.log(authToken);

        const res = await fetch('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&req.query.min=1&req.query.max=18000', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        const data = await res.json();
        console.log(data)
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/products", async (req, res) => {
    const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

    const products = [];

    try {
        const authToken = await getAuthToken();
        console.log(authToken);

        for (const company of companies) {
            for (const category of categories) {
                const url = `http://20.244.56.144/companies/${company}/categories/${category}/products?top=${req.query.limit || 10}&minPrice=${req.query.min || 1}&maxPrice=${req.query.max || 10000}`;
                console.log(url);

                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                const data = await res.json();
                console.log(JSON.stringify(data));

                data.forEach((product) => {
                    product.company = company;
                    product.category = category;
                    products.push(product);
                });

            }
        }

        res.json({ status: 0, products: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
