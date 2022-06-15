import axios from "axios";
import { YT_KEY } from "./YoutubeKey";

const YTServer = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/search",
});

YTServer.interceptors.request.use(
  // called when request is made.
  async (config) => {
    config.headers.Accept = "application/json";

    return config;
  },
  (err) => {
    // called when error
    return Promise.reject(err);
  }
);

//Our helper function here is a long standing HTTP request so we mark it as async
export const getVideos = async (callback, videoQueryString) => {
  console.log(videoQueryString);

  // We need convert the string's spacing " " to "%20" for compatible youtube query searching
  // Using the string replace method, we can use regular expression of space w/ the global modifier "/ /g" and replace all with "%20"
  // someString.replace(/ /g,"%20")
  let formattedQueryString = videoQueryString.replace(/ /g, "%20");
  console.log(formattedQueryString);

  const response = await YTServer.get(
    // Have query key, q, start with "parenting" value
    // And any user keyword input into query

    `?channelType=any&maxResults=20&order=viewCount&q=parenting%20${formattedQueryString}&part=snippet&safeSearch=moderate&key=${YT_KEY}`
  );

  callback(response.data);
};

export default YTServer;
