const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'icon.png'),
    title: 'LifeHub',
    backgroundColor: '#f9fafb',
    show: false // 준비될 때까지 숨김
  });

  // 윈도우가 준비되면 표시
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 개발 모드와 프로덕션 모드 URL 분기
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // 개발자 도구 (개발 모드에서만)
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // 메뉴 설정
  const menuTemplate = [
    {
      label: '파일',
      submenu: [
        {
          label: '종료',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: '편집',
      submenu: [
        { label: '실행 취소', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: '다시 실행', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { label: '잘라내기', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: '복사', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: '붙여넣기', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: '모두 선택', accelerator: 'CmdOrCtrl+A', role: 'selectAll' }
      ]
    },
    {
      label: '보기',
      submenu: [
        { label: '새로고침', accelerator: 'CmdOrCtrl+R', role: 'reload' },
        { label: '강제 새로고침', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
        { type: 'separator' },
        { label: '확대', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
        { label: '축소', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
        { label: '원래 크기', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
        { type: 'separator' },
        { label: '전체 화면', accelerator: 'F11', role: 'togglefullscreen' }
      ]
    },
    {
      label: '도움말',
      submenu: [
        {
          label: 'LifeHub 정보',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'LifeHub 정보',
              message: 'LifeHub v1.0.0',
              detail: '생산성 향상을 위한 올인원 대시보드\n\n할 일 관리, 습관 트래킹, 일정 관리, 메모 작성 기능을 제공합니다.',
              buttons: ['확인']
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 앱이 준비되면 윈도우 생성
app.on('ready', createWindow);

// 모든 윈도우가 닫히면 앱 종료 (Mac 제외)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Mac에서 독 아이콘 클릭시 윈도우 재생성
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// 앱 이름 설정
app.setName('LifeHub');
