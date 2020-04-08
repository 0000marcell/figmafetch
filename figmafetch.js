#!/usr/bin/env node

const fetch = require('node-fetch');
const headers = new fetch.Headers();
const pkg = require('./package.json')
const program = require('commander');
const fs = require('fs');

const baseUrl = 'https://api.figma.com';

async function fetchProject(projectId, token) {
  headers.set('X-Figma-Token', token);
  let resp = await fetch(`${baseUrl}/v1/files/${projectId}`, 
    {headers});
  let data = await resp.json();
  return data;
}

program.version(pkg.version)

program
  .description('fetch figma project')
  .option('-i, --id <id>', 'project id')
  .option('-t, --token <token>', 'user token')
  .action(async function (cmd) {
    let token = cmd['token'] || process.env['FIGMA_TOKEN'],
      id = cmd['id'] || fs.readFileSync('./figmaconfig', 'utf8')
                          .replace('\n', '');
    
    data = await fetchProject(id, token);
    data = data;
    data['headers'] = { token: token, id: id };
    console.log(JSON.stringify(data));
  });


program.parse(process.argv);
