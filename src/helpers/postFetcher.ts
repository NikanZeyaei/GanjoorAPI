import axios from 'axios';
import cheerio from 'cheerio';
import { beyt } from '../types/beyt';
import { post } from '../types/post';

export const postFetcher = async (url: string): Promise<post | string> => {
  try {
    const htmlResponse = await axios.get(url);
    const data = htmlResponse.data;
    const $ = cheerio.load(data);

    const title = $('#page-hierarchy > h2 > a').text().trim();
    const author = $('#page-hierarchy > a:nth-child(1)').text();

    const beytsArray: cheerio.Element[] = [];
    $('body > #fa > #maincnt > .poem > article > .b').each((_, element) => {
      beytsArray.push(element);
    });

    const beyts: beyt[] = [];

    beytsArray.map((element) => {
      const beyt: beyt = {
        m1: $(element).find('.m1').text(),
        m2: $(element).find('.m2').text(),
      };
      beyts.push(beyt);
    });

    const post: post = {
      title: title,
      author: author,
      abyat: beyts,
      url: url,
    };
    return post;
  } catch {
    return 'Error';
  }
};
