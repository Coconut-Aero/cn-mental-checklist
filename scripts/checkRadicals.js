const fs = require('fs');
const path = require('path');
const readline = require('readline');

let hasRadical = false; // 顶层的标志，必须是let才能改！

// 检测一行文本中有没有部首污染（Unicode 2F00-2FDF）
function detectRadical(text) {
  const radicalRegex = /[\u2F00-\u2FDF]/g;
  return text.match(radicalRegex) || [];
}

// 扫描单个文件
async function scanFile(filePath) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  });

  let lineNumber = 0;
  let foundRadical = false; // 这里局部变量
  for await (const line of rl) {
    lineNumber++;
    const radicals = detectRadical(line);
    if (radicals.length > 0) {
      foundRadical = true; // 局部标记
      console.warn(`🚨 检测到污染字符在 ${filePath}:${lineNumber}`);
      console.warn(`污染字符: ${radicals.join(' ')} | 内容: ${line.trim()}`);
    }
  }
  return foundRadical; // 返回这个文件有没有污染
}

// 递归扫描所有文件
async function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (entry.isFile() && /\.(vue|js|ts|json|md|txt|html|css)$/.test(entry.name)) {
      console.log(`📄 正在扫描文件: ${fullPath}`);
      const found = await scanFile(fullPath);
      if (found) {
        hasRadical = true; // 一旦任何文件有污染，顶层标志置true
      }
    }
  }
}

// 主函数
async function main() {
  const scanDirs = ['src', 'public', 'scripts']; // 要扫描的目录列表
  for (const dir of scanDirs) {
    const fullPath = path.resolve(__dirname, '..', dir);
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ 目录不存在，跳过扫描：${fullPath}`);
      continue;
    }
    console.log(`\n🔍 正在扫描目录: ${fullPath}\n`);
    await scanDirectory(fullPath);
  }

  if (hasRadical) {
    console.error(`\n🚨 检测到部首污染！\n`);
    process.exit(1); // 🚨 可选，直接退出，防止污染内容被打包
  } else {
    console.log(`\n✅ 所有目录扫描完毕，没有检测到部首污染。\n`);
  }
}

main();
