const { WebClient } = require('@slack/web-api');
const axios = require('axios').default;
const images = []
images.push(
  "https://imgur.com/RPfmS7J.jpg",
  "https://imgur.com/xhZ6Vzd.jpg",
  "https://imgur.com/xjx9LQu.jpg",
  "https://imgur.com/CIoJmk1.jpg",
  "https://imgur.com/RBFytxD.jpg",
  "https://imgur.com/Tb3GkMs.jpg",
  "https://imgur.com/RwSvwy6.jpg",
  "https://imgur.com/hkQEiU0.jpg",
  "https://imgur.com/7kGNkSz.jpg")

mod = function (m, n) {
  return ((m % n) + n) % n
}

async function setPFP() {
  var startDay = 17
  var day = new Date().getDate() - startDay
  var index = mod(day, images.length)
  // console.log(images[index])

  let image
  image = await axios.get(images[index], {
    responseType: "arraybuffer",
  });
  
  const client = new WebClient();
  const slackRequest = await client.users.setPhoto({
    image: image.data,
    token: process.env['SLACK_TOKEN']
  });
}

export default async (req, res) => {
  await setPFP()
  res.send("Started changing your PFP!")
}