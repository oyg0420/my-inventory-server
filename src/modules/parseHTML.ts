import cheerio, { Cheerio } from 'cheerio';
import { getHtml } from '../api/API';
import jsdom from 'jsdom';
import { runBrowserWithPuppeteer } from './puppeteer';

type ParserHTMLOption = {
  query: string;
  url: string;
  selectors: { key: string; value: string; type?: 'image' | 'text' }[];
};

const parserHTML = async (option: ParserHTMLOption) => {
  const { query, url, selectors } = option;
  let html = '';
  const result: { [x: string]: string[] } = {};
  await runBrowserWithPuppeteer({
    action: 'scroll',
    url: `${url}?${query}`,
    getContent: content => {
      html = content;
    },
  });
  const $ = cheerio.load(html);
  selectors.map(selector => {
    const $bodyList = $(selector.value);
    $bodyList.each(function () {
      if (selector.type === 'image') {
        if (result[selector.key]) {
          result[selector.key].push($(this).attr('src'));
        } else {
          result[selector.key] = [$(this).attr('src')];
        }
      } else {
        if (result[selector.key]) {
          result[selector.key].push(cheerio.text($(this)));
        } else {
          result[selector.key] = [cheerio.text($(this))];
        }
      }
    });
  });
  return result;
};

export default parserHTML;
