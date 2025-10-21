import path from 'path';
import fs from 'fs';

const source = fs.readFileSync(path.resolve(import.meta.dirname, '..', 'dist', 'assets', 'index.js')).toString('utf-8');

const sourceMapMatch = /\/\/# sourceMappingURL=(.*)(?=\n|$)/.exec(source);

if (!sourceMapMatch) {
    console.error('未找到sourcemap');
    process.exit(1);
}

const sourceMapURL = sourceMapMatch[1]; // 得到形如 data:application/json;charset=utf-8;base64,xxxxx 的URL

// 解析 data URL，提取 base64 编码的内容
const base64Match = /^data:application\/json;charset=utf-8;base64,(.*)$/.exec(sourceMapURL);
if (!base64Match) {
    console.error('无效的sourcemap URL格式');
    process.exit(1);
}

// 解码 base64 得到 JSON 文本
const base64Data = base64Match[1];
const jsonText = Buffer.from(base64Data, 'base64').toString('utf-8');

// 解析 JSON 对象
let sourceMapJson;
try {
    sourceMapJson = JSON.parse(jsonText);
} catch (error) {
    console.error('解析sourcemap JSON失败:', error);
    process.exit(1);
}

// 修改 sources 数组
if (sourceMapJson.sources && Array.isArray(sourceMapJson.sources)) {
    sourceMapJson.sources = sourceMapJson.sources.map((source) => {
        if (source.startsWith('../../src')) {
            return source.replace('../../src', 'source://src');
        }
        return source;
    });
}

// 重新编码为 base64
const modifiedJsonText = JSON.stringify(sourceMapJson);
const modifiedBase64 = Buffer.from(modifiedJsonText, 'utf-8').toString('base64');
const newSourceMapURL = `data:application/json;charset=utf-8;base64,${modifiedBase64}`;

// 替换原文件中的 sourcemap URL
const modifiedSource = source.replace(sourceMapURL, newSourceMapURL);

// 写回文件
const outputPath = path.resolve(import.meta.dirname, '..', 'dist', 'assets', 'index.js');
fs.writeFileSync(outputPath, modifiedSource, 'utf-8');

console.log('Sourcemap 修改完成');
