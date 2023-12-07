function windowAllClosed(app: any) {
  app.on('window-all-closed', async () => {
    if (process.platform === 'darwin') return;
    await app.quit();
  });
}

export default windowAllClosed;
