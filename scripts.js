// 桌面图标双击事件处理
document.addEventListener("DOMContentLoaded", function () {
  // 为所有桌面图标添加双击事件
  const icons = document.querySelectorAll(".desktop-icon");
  icons.forEach((icon) => {
    icon.addEventListener("dblclick", function () {
      const iconName = this.querySelector(".icon-text").textContent;
      openAppWindow(iconName);
    });

    // 单击选择效果
    icon.addEventListener("click", function () {
      icons.forEach((i) => i.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  // 添加关闭按钮事件委托
  document.body.addEventListener("click", function (e) {
    if (e.target.closest(".window-control.close")) {
      e.preventDefault();
      e.stopPropagation();
      const closeButton = e.target.closest(".window-control.close");
      const onclick = closeButton.getAttribute("onclick");
      if (onclick) {
        // 提取appName从onclick属性
        const match = onclick.match(/closeAppWindow\('([^']+)'\)/);
        if (match && match[1]) {
          closeAppWindow(match[1]);
        }
      }
    }
  });

  // 添加窗口管理 - 点击空白处关闭所有窗口（可选功能）
  document.body.addEventListener("click", function (e) {
    // 如果点击的是空白处（不是图标，不是窗口内部）
    if (
      !e.target.closest(".desktop-icon") &&
      !e.target.closest(".app-window")
    ) {
      // 可以在这里添加点击空白处关闭所有窗口的功能
      // closeAllAppWindows();
    }
  });

  // 点击空白处取消选择
  document.body.addEventListener("click", function (e) {
    if (!e.target.closest(".desktop-icon")) {
      document
        .querySelectorAll(".desktop-icon")
        .forEach((i) => i.classList.remove("selected"));
    }
  });
});

// 打开应用窗口
function openAppWindow(appName) {
  // 关闭所有已存在的窗口
  closeAllAppWindows();

  // 创建新窗口
  const windowDiv = document.createElement("div");
  windowDiv.className = "app-window active";
  windowDiv.id = appName.toLowerCase() + "-window";

  let windowContent;

  // 根据应用类型创建不同的内容
  if (appName === "ARTIST") {
    windowContent = `
            <div class="artist-window">
                <div class="window-close-control">
                    <div class="window-control close" onclick="closeAppWindow('${appName}')"></div>
                </div>
                <div class="window-content">
                    <div class="navigation-arrows">
                        <button class="nav-arrow left" onclick="previousView()">◀</button>
                        <button class="nav-arrow right" onclick="nextView()">▶</button>
                    </div>
                    <div class="views-container">
                        <div class="view active" id="view-0">
                            <div class="artist-content">
                                <div class="artist-info">
                                    <h2>DRAGONHEART</h2>
                                    <p>GENRE: CLOUD, SOUHT</p>
                                </div>
                                <div class="artist-image">
                                    <img src="image/DG.jpg" alt="DRAGONHEART">
                                </div>
                            </div>
                        </div>
                        <div class="view" id="view-1">
                            <div class="artist-content">
                                <div class="artist-info">
                                    <h2>CASHNEEDER</h2>
                                    <p>夜晚我用呼吸</p>
                                    <p>点亮星辰</p>
                                </div>
                                <div class="artist-image">
                                    <img src="image/CS.jpg" alt="CASHNEEDER">
                                </div>
                            </div>
                        </div>
                        <div class="view" id="view-2">
                            <div class="artist-content">
                                <div class="artist-info">
                                    <h2>MOSHPIT</h2>
                                    <p>SUFFERINGTILLMORNING</p>
                                </div>
                                <div class="artist-image">
                                    <img src="image/MP.jpg" alt="MOSHPIT">
                                </div>
                            </div>
                        </div>
                        <div class="view" id="view-3">
                            <div class="artist-content">
                                <div class="artist-info">
                                    <h2>RISKY V</h2>
                                    <p>V RISKY V</p>
                                </div>
                                <div class="artist-image">
                                    <img src="image/ALBUM3.jpg" alt="NEW ARTIST">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  } else if (appName === "MUSIC") {
    windowContent = `
            <div class="artist-window">
                <div class="window-close-control">
                    <div class="window-control close" onclick="closeAppWindow('${appName}')"></div>
                </div>
                <div class="window-content">
                    <div class="navigation-arrows">
                        <button class="nav-arrow left" onclick="previousView()">◀</button>
                        <button class="nav-arrow right" onclick="nextView()">▶</button>
                    </div>
                    <div class="views-container">
                        <div class="view active" id="view-0">
                            <div class="artist-content">
                                <div class="artist-info">
                                    <h2>WHAT IN DRAGON'S HEART</h2>
                                    <p>GENRE: CLOUD</p>
                                    <a href="https://music.163.com/album?id=251533665&uct2=U2FsdGVkX1+8Wcss9g6zilD2bBGf5a0ZQFFkmf+aJes=" target="_blank" class="listen-button">点击试听</a>
                                </div>
                                <div class="artist-image">
                                    <img src="image/DG.jpg" alt="音乐作品1">
                                </div>
                            </div>
                        </div>
                        <div class="view" id="view-1">
                            <div class="artist-content">
                                <div class="artist-info">
                                    <h2>帕拉梅拉的忧郁</h2>
                                    <p>GENRE: ABSTRACT RAP</p>
                                     <a href="https://music.163.com/album?id=256837661&uct2=U2FsdGVkX194PdGQR98Eb7siIO4h5LozG3jw61gDnXA=" target="_blank" class="listen-button">点击试听</a>
                                    
                                </div>
                                <div class="artist-image">
                                    <img src="image/ALBUM2.jpg" alt="音乐作品2">
                                </div>
                            </div>
                        </div>
                        <div class="view" id="view-2">
                            <div class="artist-content">
                                <div class="artist-info">
                                    <h2>独V无二</h2>
                                    <p>GENRE: RISKY V </p>
                                    <a href="https://music.163.com/album?id=259087645&uct2=U2FsdGVkX19MVjhAdKDB7Pi4ftYtbOo9vXVvSvFIgno=" target="_blank" class="listen-button">点击试听</a>
                                </div>
                                <div class="artist-image">
                                    <img src="image/ALBUM3.jpg" alt="音乐作品3">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  } else {
    // 处理其他应用类型（如VIDEO）
    windowContent = `
            <div class="app-window-content">
                <div class="window-close-control">
                    <div class="window-control close" onclick="closeAppWindow('${appName}')"></div>
                </div>
                <div class="window-content">
                    <h2>${appName}</h2>
                    <p>内容开发中...</p>
                </div>
            </div>
        `;
  }

  windowDiv.innerHTML = windowContent;
  document.body.appendChild(windowDiv);

  // 如果是ARTIST或MUSIC应用，初始化视图切换
  if (appName === "ARTIST" || appName === "MUSIC") {
    window.currentView = 0;
    window.totalViews = appName === "ARTIST" ? 4 : 3; // ARTIST有4页，MUSIC保持3页
    window.currentApp = appName; // 记录当前应用

    // 初始化时显示第一个视图
    setTimeout(() => {
      console.log("初始化" + appName + "视图");
      switchView(0);
    }, 100);
  } else {
    window.currentApp = appName; // 记录当前应用
  }
}

// 关闭应用窗口
function closeAppWindow(appName) {
  console.log("尝试关闭窗口:", appName);
  const windowId = appName.toLowerCase() + "-window";
  const window = document.getElementById(windowId);
  if (window) {
    console.log("找到窗口，正在关闭:", windowId);
    window.remove(); // 使用remove()比parentNode.removeChild()更现代

    // 如果关闭的是当前应用窗口，清理状态
    if (window.currentApp === appName) {
      window.currentView = null;
      window.totalViews = null;
      window.currentApp = null;
    }
  } else {
    console.log("未找到窗口:", windowId);
  }
}

// 关闭所有应用窗口
function closeAllAppWindows() {
  console.log("关闭所有应用窗口");
  const allWindows = document.querySelectorAll(".app-window");
  allWindows.forEach((window) => {
    console.log("关闭窗口:", window.id);
    window.remove();
  });
  // 清理窗口状态
  window.currentView = null;
  window.totalViews = null;
  window.currentApp = null;
}

// 视图切换函数
function switchView(viewIndex) {
  console.log("切换到视图:", viewIndex);

  // 获取视图容器
  const viewsContainer = document.querySelector(".views-container");
  const currentActiveView = document.querySelector(".view.active");
  const targetView = document.getElementById("view-" + viewIndex);

  if (!targetView || currentActiveView === targetView) {
    return; // 如果目标视图不存在或已经是当前视图，不执行切换
  }

  // 先将整个容器瞬间变成血红色（无动画）
  viewsContainer.style.transition = "none";
  viewsContainer.style.backgroundColor = "#ff0000ff";

  // 立即隐藏当前视图并显示新视图
  if (currentActiveView) {
    currentActiveView.classList.remove("active");
  }
  setTimeout(() => {
    targetView.classList.add("active");
  }, 550);

  // 短暂延迟后瞬间恢复背景
  setTimeout(() => {
    viewsContainer.style.backgroundColor = "";

    // 更新按钮状态
    document.querySelectorAll(".view-btn").forEach((btn, index) => {
      btn.classList.toggle("active", index === viewIndex);
    });

    // 更新当前视图索引
    window.currentView = viewIndex;
  }, 550); // 很短的延迟，让红色闪烁一下
}

// 上一个视图
function previousView() {
  const newView =
    (window.currentView - 1 + window.totalViews) % window.totalViews;
  switchView(newView);
}

// 下一个视图
function nextView() {
  const newView = (window.currentView + 1) % window.totalViews;
  switchView(newView);
}