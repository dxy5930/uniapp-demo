
export const download = ({ url, onProgress, onSuccess, onFail }) => {
  const task = uni.downloadFile({
    url,
    success(res) {
      if (res.statusCode === 200) {
        onSuccess && onSuccess(res.tempFilePath);
      }
    },
    fail() {
      onFail && onFail();
    }
  });
  task.onProgressUpdate(res => {
    onProgress && onProgress(res.progress);
  });
};

export const install = (filePath, restart = false) => {
  plus.runtime.install(filePath, {
    force: true
  }, () => {
    console.log('install success...');
    if (restart) {
      plus.runtime.restart();
    }
  }, (e) => {
    console.error('install fail...', e);
  });
};