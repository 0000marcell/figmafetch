#!/usr/bin/env node

const fetch = require('node-fetch');
const headers = new fetch.Headers();
const program = require('commander');

const baseUrl = 'https://api.figma.com';

async function fetchProject(baseUrl, projectId, token) {
  headers.set('X-Figma-Token', token);
  let resp = await fetch(`${baseUrl}/v1/files/${projectId}`, 
    {headers});
  let data = await resp.json();
  data['headers'] = headers;
  return data;
}

program
  .description('fetch figma project')
  .option('-u, --url <url>', 'figma api url')
  .option('-i, --id <id>', 'project id')
  .option('-t, --token <token>', 'user token')
  .action(async function (cmd) {
    console.log(cmd['url'], 
      cmd['id'], cmd['token']);
    data = await fetchProject(cmd['url'], 
      cmd['id'], cmd['token']);
    data = data.document;
    console.log(data);
  });

program.parse(process.argv);
