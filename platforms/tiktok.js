import questions from '../questions.js'
import chalk from 'chalk'
import inquirer from 'inquirer'

import { v1 } from 'node-tiklydown'
import { writeFile } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

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

  try { 
    console.debug(`\n${chalk.bold(chalk.whiteBright('??'))} Analyzing...`)
    const response = await v1(link)
    console.info(
      `${chalk.whiteBright(chalk.bold('!'))} Video Found!\n`
    )

    const { infoOrDownload: answer, path } = await inquirer.prompt([questions.tiktok.infoOrDownload, questions.path])
    if (answer === 'save') {
      writeFile(join(__dirname, path, `${response.id}.json`), JSON.stringify(response), (err) => {
        if (err) throw err
        console.info(`\n\n${chalk.whiteBright(chalk.bold('!!!'))} Saved completed.`)

        process.exit(0)
      })
    } else {
      const { withWatermark } = await inquirer.prompt(questions.tiktok.withWatermark)

      if(withWatermark) {
        await downloadVideo(response.video.watermark)
      } else {
        await downloadVideo(response.video.noWatermark)
      }
      
      console.info(`${chalk.bold(chalk.whiteBright("!!!"))} Downloaded completed`)
    } 
  } catch (e) {
    console.error('Fatal error crashes your request.')
    throw e
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