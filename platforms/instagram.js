import inquirer from "inquirer"
import questions from "../questions.js"
import instagram from '@sasmeee/igdl'
import { join, dirname } from 'path'
import chalk from "chalk"
import { fileURLToPath } from 'url'
import axios from "axios"
import { createWriteStream } from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async () => {
  let link
  while (!link) {
    const { link: tempLink } = await inquirer.prompt(questions.link)

    if (tempLink) {
      link = tempLink
    } else {
      const value = await clipboard.read()
      if (value) {
        link = value
      } else {
        console.error("Can't found values in your clipboard.")
      }
    }
  }

  const data = await instagram(link);
  const { linkOrDownload } = await inquirer.prompt(questions.insta.linkOrDownload)

  if (linkOrDownload === "link") {
    console.info(`Thumbnail Link: ${data[0].thumbnail_link}\n`)
    console.info(`Download Link: ${data[0].download_link}`)
  } else {
    const { path, videoOrMedia } = await inquirer.prompt([
      questions.path, 
      questions.insta.videoOrMedia
    ])

    await downloadVideo(data[0].download_link, path, videoOrMedia === "video")
    console.info(`${chalk.bold(chalk.whiteBright("!!!"))} Downloaded completed`)
  }
}

async function downloadVideo(videoURL, path, video) {
  try {
    const response = await axios.get(videoURL, { responseType: 'stream' });
    const writer = createWriteStream(join(__dirname, '../', path, `${generateRandomString(6)}.${video ? "mp4" : "mp3"}`));

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function generateRandomString(length) {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
