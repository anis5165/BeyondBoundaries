const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const clientDetailsRouter = require('./routers/clientDetailRouter');
const businessDetailRouter = require('./routers/businessOwnerDetailRouter');

app.use(cors({
    origin: 'http://localhost:3000' 
}));

app.use(express.json());
app.use('/clientdetails', clientDetailsRouter);
app.use('/businessOwner', businessDetailRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
