#!/usr/bin/env node
const { spawn } = require('child_process');

const rawArgs = process.argv.slice(2);
const nextArgs = ['dev'];

let hasPort = false;
let hasHost = false;

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--host') {
    nextArgs.push('-H', rawArgs[i + 1] || '0.0.0.0');
    hasHost = true;
    i++;
  } else if (arg.startsWith('--host=')) {
    nextArgs.push('-H', arg.split('=')[1]);
    hasHost = true;
  } else if (arg === '-H' || arg === '--hostname') {
    nextArgs.push('-H', rawArgs[i + 1] || '0.0.0.0');
    hasHost = true;
    i++;
  } else if (arg === '--port' || arg === '-p') {
    nextArgs.push('-p', rawArgs[i + 1] || '3000');
    hasPort = true;
    i++;
  } else if (arg.startsWith('--port=')) {
    nextArgs.push('-p', arg.split('=')[1]);
    hasPort = true;
  } else {
    nextArgs.push(arg);
  }
}

if (!hasPort) {
  nextArgs.push('-p', process.env.PORT || '3000');
}
if (!hasHost) {
  nextArgs.push('-H', '0.0.0.0');
}

const child = spawn('npx', ['next', ...nextArgs], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (err) => {
  console.error('Failed to start Next dev server:', err);
  process.exit(1);
});
