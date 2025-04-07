const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const partnerDetailsRouter = require('./routers/partnerDetailRouter');
const businessDetailRouter = require('./routers/businessOwnerDetailRouter');
const userRouter = require('./routers/userRouter');

app.use(cors({
    origin: 'http://localhost:3000' 
}));

app.use(express.json());
app.use('/partner', partnerDetailsRouter);
app.use('/businessOwner', businessDetailRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
