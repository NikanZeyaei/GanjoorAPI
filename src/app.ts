import Express from 'express';
import { postFetcher } from './helpers/postFetcher';

const app = Express();

app.use(Express.json());

app.get('/api', async (req, res) => {
  const { url }: { url: string } = req.body;
  const result = await postFetcher(url);
  res.json(result);
});

app.use((req, res) => {
  res.send('Not found. Try /api');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Running');
});
