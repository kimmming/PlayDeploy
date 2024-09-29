// playcanvasCli.js
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

// .env 파일을 로드하여 환경 변수 설정
config();

const API_KEY = process.env.PLAYCANVAS_API_KEY;
const PROJECT_ID = process.env.PLAYCANVAS_PROJECT_ID;
const OUTPUT_DIR = process.env.OUTPUT_DIR || './playcanvas-project';

// PlayCanvas 프로젝트 다운로드 함수
export async function downloadPlayCanvasProject() {
  if (!API_KEY || !PROJECT_ID) {
    console.error('API Key and Project ID are required.');
    process.exit(1);
  }

  try {
    const response = await axios({
      url: `https://playcanvas.com/api/apps/download/${PROJECT_ID}`,
      method: 'GET',
      responseType: 'stream',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      }
    });

    const outputFilePath = path.resolve(OUTPUT_DIR, 'playcanvas.zip');
    const writer = fs.createWriteStream(outputFilePath);

    response.data.pipe(writer);

    writer.on('finish', () => {
      console.log('Project downloaded successfully to', outputFilePath);
    });

    writer.on('error', (err) => {
      console.error('Error downloading the project:', err);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}
