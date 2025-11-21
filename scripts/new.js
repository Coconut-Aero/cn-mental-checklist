// scripts/new.js
const fs = require('fs');
const path = require('path');

const name = process.argv[2];

if (!name) {
  console.error('❌  请输入名称，例如： npm run new MyComponent');
  process.exit(1);
}

// 路径
const jsonPath = path.join(__dirname, '..', 'public', 'json', `${name}.json`);
const vuePath = path.join(__dirname, '..', 'src', 'components', `${name}.vue`);

// JSON 模板内容
const jsonTemplate = JSON.stringify({
  "version": "NewScale",
  "title_name": "新建量表示例",
  "title": "NewScale",
  "desc": "这是一个新建的量表示例。请根据实际量表修改内容。",
  "refer_url": "",
  "full_mark": "100",
  "choices": [
    { "text": "从不" },
    { "text": "偶尔" },
    { "text": "经常" },
    { "text": "总是" }
  ],
  "warning": "⚠️ 本测试结果仅供参考，不能作为诊断依据。",
  "questions_header": "在过去一段时间内，您有多少时候出现以下情况？",
  "questions": [
    { "text": "示例问题 1" },
    { "text": "示例问题 2" },
    { "text": "示例问题 3" }
  ]
}
, null, 2);

// Vue 模板内容
const vueTemplate = `<script>

export function evaluate(answers) {
    return results;
}

</script>
`;

// 创建 JSON 文件
if (!fs.existsSync(jsonPath)) {
  fs.writeFileSync(jsonPath, jsonTemplate, 'utf8');
  console.log(`✅ 已创建: ${jsonPath}`);
} else {
  console.warn(`⚠️  ${jsonPath} 已存在，未覆盖。`);
}

// 创建 Vue 文件
if (!fs.existsSync(vuePath)) {
  fs.writeFileSync(vuePath, vueTemplate, 'utf8');
  console.log(`✅ 已创建: ${vuePath}`);
} else {
  console.warn(`⚠️  ${vuePath} 已存在，未覆盖。`);
}
