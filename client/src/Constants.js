const production = {
    url: 'https://get-sorted.herokuapp.com/'
  };
  const development = {
    url: 'http://localhost:5050'
  };
  export const config = process.env.NODE_ENV === 'development' ? development : production;