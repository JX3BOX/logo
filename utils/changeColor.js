const fs = require('fs-extra');
const path = require('path');
const theme = require("../theme.json");

// 读取目标文件夹
const directoryPath = path.join(__dirname, '..', 'logo');

// 更精确的正则表达式，只匹配 cls-1 类的 fill 属性
const FILL_REGEX_CLS1 = /\.cls-1\s*{\s*fill:\s*(#[0-9a-fA-F]{3,6});\s*}/g;
const FILL_REGEX_CLS2 = /\.cls-2\s*{\s*fill:\s*(#[0-9a-fA-F]{3,6});\s*}/g;

/**
 * 修改颜色并生成新的文件
 * @param {Array} colors 颜色数组，包含两个颜色值，分别对应 cls-1 和 cls-2
 * @param {String} targetPath 目标路径
 */
const changeColor = async (colors, targetPath) => {
    try {
        const files = await fs.readdir(directoryPath);
        const svgFiles = files.filter(file => path.extname(file) === '.svg');

        await Promise.all(svgFiles.map(async (file) => {
            const filePath = path.join(directoryPath, file);
            const data = await fs.readFile(filePath, 'utf8');
            console.log(`处理文件: ${filePath}`);
            let result = data.replace(FILL_REGEX_CLS1, `.cls-1{fill:${colors[0]};}`);
            result = result.replace(FILL_REGEX_CLS2, `.cls-2{fill:${colors[1]};}`);
            const newFilePath = path.join(targetPath, file);
            await fs.outputFile(newFilePath, result, 'utf8');
            console.log(`已生成文件: ${newFilePath}`);
        }));
    } catch (err) {
        console.error('操作失败: ' + err);
    }
}

const init = async () => {
    await Promise.all(Object.keys(theme).map(async (key) => {
        const targetPath = path.join(__dirname, '..', `logo-${key}`);
        await fs.ensureDir(targetPath); // 确保目标目录存在，不存在则创建
        console.log(`正在生成 ${key} 主题的图标...`);
        await changeColor(theme[key], targetPath);
        console.log(`生成 ${key} 主题的图标完成！`);
    }));
}

module.exports = init;