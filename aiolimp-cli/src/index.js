#!/usr/bin/env node
import { program } from 'commander'
import fs from 'node:fs'
import inquirer from 'inquirer'
import { checkPath, downloadTemp } from './util.js'

let json = fs.readFileSync('./package.json')
json = JSON.parse(json)

program.version(json.version)
program.command('create <projectName>').alias('ctr').description('create a new project').action((project) => {
  inquirer.prompt([{
    type: 'input', // 输入
    name: 'projectName', // 返回值的key
    message: 'project name', // 描述
    default: project // 默认值
  },
  {
    type: 'confirm',
    name: 'isTs',
    message: '是否支持typeScript',
  }
  ]).then(res => {
    if (checkPath(res.projectName))
    {
      console.log('文件夹已存在');
      return
    }

    if (res.isTs)
    {
      downloadTemp('ts', res.projectName)
    } else
    {
      downloadTemp('js', res.projectName)
    }

  })
})



program.parse(process.argv)