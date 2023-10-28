import chalk from 'chalk'
import clipboard from 'clipboardy'

const platform = {
  type: 'list',
  name: 'platform',
  message: chalk.reset('What platform you want to use?'),
  prefix: chalk.whiteBright(chalk.bold('?')),
  choices: [
    {
      name: 'YouTube',
      value: 'youtube'
    },
    {
      name: 'Instagram',
      value: 'instagram'
    },
    {
      name: 'TikTok',
      value: 'tiktok'
    }
  ]
}

const link = {
  type: 'input',
  name: 'link',
  message: chalk.reset('What\'s the link of the video?'),
  prefix: chalk.whiteBright(chalk.bold('?')),
  default: await clipboard.read() || null
}

const ytInfoOrDownload = {
  type: 'list',
  name: 'infoOrDownload',
  message: chalk.reset('What you want to do with the video?'),
  prefix: chalk.whiteBright(chalk.bold('?')),
  choices: [
    {
      name: 'Download the Video',
      value: 'download'
    },
    {
      name: 'Save the Information',
      value: 'save'
    }
  ]
}

const ytSaveAs = {
  type: 'list',
  name: 'videoOrAudio',
  message: chalk.reset('You want the file as?'),
  prefix: chalk.whiteBright(chalk.bold('?')),
  choices: [
    {
      name: 'Video (.mp4)',
      value: 'mp4'
    },
    {
      name: 'Audio (.mp3)',
      value: 'mp3'
    }
  ]
}

const path = {
  type: 'input',
  name: 'path',
  message: chalk.reset('Where you want to save the file?'),
  prefix: chalk.whiteBright(chalk.bold('?'))
}

export default {
  platform,
  link,
  path,
  yt: {
    infoOrDownload: ytInfoOrDownload,
    saveAs: ytSaveAs
  },

  insta: {
    linkOrDownload: {
      name: 'linkOrDownload',
      type: 'list',
      message: chalk.reset('You want your instagram post/reel to?'),
      prefix: chalk.whiteBright(chalk.bold('?')),
      choices: [
        {
          name: 'Download the video',
          value: 'download'
        },
        {
          name: 'Get the link of the video (not instagram link, but video\'s)',
          value: 'link'
        }
      ]
    },
    videoOrMedia: {
      name: 'videoOrMedia',
      type: 'list',
      message: chalk.reset('Is your link is an?'),
      prefix: chalk.whiteBright(chalk.bold('?')),
      choices: [
        {
          name: 'Video/Reel',
          value: 'video'
        },
        {
          name: 'Picture/Post',
          value: 'media'
        }
      ]
    }
  },

  tiktok: {
    infoOrDownload: {
      type: 'list',
      name: 'infoOrDownload',
      message: chalk.reset('What you want to do with your tiktok link?'),
      prefix: chalk.whiteBright(chalk.bold('?')),
      choices: [
        {
          name: 'Download It',
          value: 'download'
        },
        {
          name: 'Save the Information Of the given video',
          value: 'save'
        }
      ]
    },

    withWatermark: {
      type: 'confirm',
      name: 'withWatermark',
      message: chalk.reset('The video should be with watermark?'),
      prefix: chalk.whiteBright(chalk.bold('?')),
    }
  }
}
