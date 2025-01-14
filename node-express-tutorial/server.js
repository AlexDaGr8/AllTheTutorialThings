// server.js
import express from 'express';
import Reflection from './src/usingJSObject/controllers/Reflection';

const app = express();

app.use(express.json());

app.post('/api/v1/reflections', Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Reflection.getOne);
app.put('/api/v1/reflections/:id', Reflection.update);
app.delete('/api/v1/reflections/:id', Reflection.delete);

app.listen(3000);
console.log(`listening on port 3000`)