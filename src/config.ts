const dev = {
  API_URL: "https://jsonplaceholder.typicode.com"
};

const prod = {
  API_URL: "https://jsonplaceholder.typicode.com"
};

const config = process.env.NODE_ENV === "production" ? prod : dev;

export default {
  ...config
};
