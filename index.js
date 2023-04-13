const { google } = require('googleapis');
const { spawn } = require('child_process');

exports.runScript = async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });

  const authClient = await auth.getClient();

  const env = {
    ...process.env,
    GOOGLE_APPLICATION_CREDENTIALS: '/path/to/service-account-key.json'
  };

  const subprocess = spawn('./main.sh', [], { env });

  subprocess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  subprocess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  subprocess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send(`Script exited with code ${code}`);
  });
};
