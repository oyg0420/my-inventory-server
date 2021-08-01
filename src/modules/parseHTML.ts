import cheerio from 'cheerio';
import { getHtml } from '../api/API';

type ParserHTMLOption = {
  query: string;
  url: string;
  selector: string;
};

const parserHTML = async (option: ParserHTMLOption) => {
  const { query, url, selector } = option;
  const result = [];
  const html = await getHtml(url, { query });
  const $ = cheerio.load(html);
  const $bodyList = $(selector);
  $bodyList.each(function () {
    result.push(cheerio.text($(this)));
  });

  return result;
};

export default parserHTML;
