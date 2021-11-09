import getUrls from "get-urls";
import fetch from "node-fetch";
import cheerio from "cheerio";

const scrapeData = (text) => {
  const urls = Array.from(getUrls(text));

  const requests = urls.map(async (url) => {
    const res = await fetch(url);

    const html = await res.text();
    const $ = cheerio.load(html);

    const getMetaTag = (name) => {
      return (
        $(`meta[name=${name}]`).attr("content") ||
        $(`meta[propety="twitter${name}"]`).attr("content") ||
        $(`meta[property="og:${name}"]`).attr("content")
      );
    };

    const data = {
      url,
      title: $("title").first().text(),
      favicon: $('link[rel="shortcut icon"]').attr("href"),
      description: getMetaTag("description"),
      image: getMetaTag("image"),
      author: getMetaTag("author"),
    };

    return data;
  });

  return Promise.all(requests);
};

export default scrapeData;
