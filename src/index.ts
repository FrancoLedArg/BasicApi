import express from "express";

const app = express();

const PORT = 3000;

const something = "something";

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
