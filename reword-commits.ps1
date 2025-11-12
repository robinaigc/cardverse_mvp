# 修改提交信息的脚本
param($file)

$content = Get-Content $file -Raw
$content = $content -replace '^pick 7c663f0', 'reword 7c663f0'
$content = $content -replace '^pick 274d9e9', 'reword 274d9e9'
Set-Content $file $content -NoNewline

