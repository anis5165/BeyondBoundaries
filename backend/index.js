const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const detailsRouter = require('./routers/detailsRouter');

// ✅ Corrected CORS middleware usage
app.use(cors({
    origin: 'http://localhost:3000'  // ✅ Corrected syntax
}));

app.use(express.json());
app.use('/details', detailsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
