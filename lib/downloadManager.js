// downloadManager.js
import { downloadPlayCanvasProject } from './playcanvasCli.js';
import { exec } from 'child_process';
import { config } from 'dotenv';

// .env 파일을 로드하여 환경 변수 설정
config();

const DEPLOY_SCRIPT = process.env.DEPLOY_SCRIPT || 'npm run deploy';

// PlayCanvas 프로젝트 다운로드 및 배포 관리
export async function manageDownloadAndDeploy() {
  console.log('Starting PlayCanvas project download...');

  await downloadPlayCanvasProject();

  console.log('Download complete. Starting deployment...');

  exec(DEPLOY_SCRIPT, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during deployment: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Deployment stderr: ${stderr}`);
      return;
    }
    console.log(`Deployment stdout: ${stdout}`);
  });
}
