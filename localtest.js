const http = require("http");
const axios = require('axios');

const getUser = async () => {

  console.log("calling getUser")
  const USER_URL = 'https://c5hn9pagt5.execute-api.us-west-2.amazonaws.com/prod/user';
  const sessionId = localStorage.getItem('sessionId');

 
  try {
      const headers = {
          headers: {
              "Authorization": `Bearer ${sessionId}`
          }
      };

      const response = await axios.get(USER_URL, headers);

      if (response.status === 200) {
        console.log(response.data);
        return

          // const users = response.data.items.map((item: { email: string, role: string }, index: number) => ({
          //     _id: index,
          //     email: item.email,
          //     role: item.role,
          // }));

          // return users;
      }

      return null;

  } catch (_err) {
      console.error("Error in getUser:", _err);
      return null;
  }
};


const server = http.createServer((req, res) => {
  if (req.url === '/adminPortal') {
    getUser();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Admin Portal is called');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server listening on ${PORT}`))