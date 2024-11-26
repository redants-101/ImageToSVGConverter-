// 添加显示和隐藏加载动画的函数
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

document.getElementById('copyButton').addEventListener('click', function() {
    const svgCode = document.getElementById('svgCode').value;
    if (svgCode) {
        navigator.clipboard.writeText(svgCode).then(() => {
            const alertBox = document.createElement('div');
            alertBox.className = 'alert';
            alertBox.textContent = 'SVG源码已复制到剪贴板';
            document.body.appendChild(alertBox);
            
            setTimeout(() => {
                alertBox.remove();
            }, 2000);

        }).catch(err => {
            console.error('复制失败: ', err);
        });
    }
});

document.getElementById('imageInput').addEventListener('change', function() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');

    if (!file) {
        alert('请选择一个图像文件。');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            widthInput.value = img.width;
            heightInput.value = img.height;
        };
    };
    reader.readAsDataURL(file);
});

document.getElementById('convertButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');

    if (!file) {
        alert('请选择一个图像文件。');
        return;
    }

    showLoading(); // 显示加载动画
    // FileReader是一个用于读取文件内容的API
    // 创建一个新的FileReader实例,用于将图片文件读取为DataURL格式
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            const width = widthInput.value || img.width;
            const height = heightInput.value || img.height;

            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
                            <image href="${img.src}" width="${width}" height="${height}"/>
                         </svg>`;
            document.getElementById('svgPreview').innerHTML = svg;
            document.getElementById('svgCode').value = svg;
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const downloadLink = document.getElementById('downloadLink');
            const fileName = file.name.replace(/\.[^/.]+$/, "");
            downloadLink.href = url;
            downloadLink.download = `${fileName}.svg`;
            
            hideLoading(); // 隐藏加载动画
        };
    };
    reader.readAsDataURL(file);
}); 