const express = require('express');
const app = express();

app.use(express.json());

app.post('/average', (req, res) => {
  const { numbers } = req.body;

  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Please provide an array of numbers in the "numbers" field.' });
  }
  
  for (let num of numbers) {
    if (typeof num !== 'number') {
      return res.status(400).json({ error: 'Array must contain numbers only.' });
    }
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;

  return res.json({ average });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Average Calculator API is running on port ${PORT}`);
});