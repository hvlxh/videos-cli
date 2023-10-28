#!/usr/bin/env node

import inquirer from 'inquirer'
import questions from './questions.js'
import youtube from './platforms/youtube.js'
import instagram from './platforms/instagram.js'
import tiktok from './platforms/tiktok.js'

async function main () {
  const { platform } = await inquirer.prompt(questions.platform)

  eval(`${platform}()`)
}

main()
