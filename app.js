const express = require("express");

const app = express();

app.get('/', (req, res, next) => {
  res.send('Hello world');
})

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
