import clipboard from 'clipboardy'
import ytdl from 'ytdl-core'
import { createWriteStream, writeFile } from 'fs'
import chalk from 'chalk'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import inquirer from 'inquirer'
import questions from '../questions.js'

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

  console.debug(`\n${chalk.bold(chalk.whiteBright('??'))} Analyzing...`)
  const info = await ytdl.getInfo(link)
  console.info(
    `${chalk.whiteBright(chalk.bold('!'))} Video Found!\n`
  )

  const { infoOrDownload: answer, path } = await inquirer.prompt([questions.yt.infoOrDownload, questions.path])

  if (answer === 'save') {
    writeFile(join(__dirname, path, `${info.videoDetails.videoId}.json`), JSON.stringify(info.videoDetails), 'utf-8', (err) => {
      if (err) throw err
      console.info(`\n\n${chalk.whiteBright(chalk.bold('!!!'))} Saved completed.`)

      process.exit(0)
    })
  } else {
    const { videoOrAudio } = await inquirer.prompt(questions.yt.saveAs)

    if (videoOrAudio === 'mp3') {
      const outputStream = createWriteStream(join(__dirname, '../', path, `${info.videoDetails.videoId}.mp3`))
      const videoStream = ytdl.downloadFromInfo(info, {
        filter: 'audioonly'
      }).pipe(outputStream)

      videoStream.on('finish', () => {
        console.log(`\n\n${chalk.whiteBright(chalk.bold('!!!'))} Download completed.`)
        process.exit(0)
      })
    } else {
      const outputStream = createWriteStream(join(__dirname, '../', path, `${info.videoDetails.videoId}.mp4`))
      const videoStream = ytdl.downloadFromInfo(info, {
        filter: 'videoandaudio'
      }).pipe(outputStream)

      videoStream.on('finish', () => {
        console.log(`\n\n${chalk.whiteBright(chalk.bold('!!!'))} Download completed.`)
        process.exit(0)
      })
    }
  }
}
