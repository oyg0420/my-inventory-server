import puppeteer from 'puppeteer';

type Props = {
  url: string;
  action?: 'scroll';
  getContent(content: string): void;
};

const runBrowserScroll = async (page: puppeteer.Page) => {
  let nextScrollHeight = 0;
  let scrollHeight = 0;
  do {
    scrollHeight = await page.evaluate('document.body.scrollHeight');
    await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
    nextScrollHeight = await page.evaluate('document.body.scrollHeight');
    await page.waitFor(500);
  } while (nextScrollHeight - scrollHeight > 0);
  return await page.content();
};

const runBrowserWithPuppeteer = async (params: Props) => {
  const { url, action, getContent } = params;
  let content = '';
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(url);

  if (action === 'scroll') {
    content = await runBrowserScroll(page);
  } else {
    content = await page.content();
  }
  getContent(content);
  await browser.close();
};

export { runBrowserWithPuppeteer };
