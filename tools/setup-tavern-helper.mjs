import { format } from 'prettier';
import fs from 'fs/promises';
import path from 'path';

async function setupTavernHelper() {
    try {
        console.log('正在获取TavernHelper类型定义...');

        // 获取GitHub上的类型定义文件
        const url = 'https://github.com/N0VI028/JS-Slash-Runner/blob/main/dist/%40types.txt';
        const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob', '');

        const response = await fetch(rawUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const typesContent = await response.text();
        console.log('类型定义获取成功');

        // 包裹在namespace声明中
        const wrappedContent = `declare namespace TavernHelper {\n${typesContent}\n}`;

        // 使用prettier格式化
        console.log('正在格式化代码...');
        const formattedContent = await format(wrappedContent, {
            parser: 'typescript',
            semi: true,
            singleQuote: true,
            tabWidth: 4,
            trailingComma: 'es5',
        });

        // 确保src目录存在
        const srcDir = path.join(import.meta.dirname, '..', 'src');
        await fs.mkdir(srcDir, { recursive: true });

        // 保存到指定文件
        const outputPath = path.join(srcDir, 'tavern-helper.d.ts');
        await fs.writeFile(outputPath, formattedContent, 'utf8');

        console.log(`类型定义已保存到: ${outputPath}`);
        console.log('TavernHelper设置完成！');
    } catch (error) {
        console.error('设置TavernHelper时出错:', error.message);
        process.exit(1);
    }
}

// 运行脚本
setupTavernHelper();
