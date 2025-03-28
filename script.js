const display = document.getElementById('display');
const selectedNamesArea = document.getElementById('names_warp');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const speedInput = document.getElementById('speed');
const countInput = document.getElementById('count');

let names =[
    "保骅祖","刘子涵","田泽凯","李泽瑾","杜梦承","董骐先","欧阳自修","葛淑雯","牟书宏","洪梦泽","张凌菲",
    "刘诗涵","逯浩宇","薛景元","常书可","高绍轩","郭婧媛","郭毅青","侯俊泽","王奕澄","石语晞","钱崇平",
    "孙宇泽","路浩伟","贾博文","贾一凡","李可斐","陈泽瑾","王浩杰","史云帆","邵雨馨","马欣悦","徐艺丹",
    "郭紫嫣","马敏嘉","何怡冉","李欣怡","马欣","张译筠","张馨","杨梓婧","王博","李佑祺","王境铭","王境锡",
    "王煜文","杨依垚","马嘉蔓","汪妍","王婷玉","王雨菲","杨欣怡","张汀","王梓煊"
];
let intervalId;
let isRunning = false;
let selectedNames = [];
// 生成随机渐变色
function getRandomGradient() {
    const color1 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const color2 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return `linear-gradient(45deg, ${color1}, ${color2})`;
}
// 随机抽取姓名
function getRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

// 开始或暂停滚动
function toggleRoll() {
    
    startButton.disabled  = false;
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        startButton.textContent = '开始抽问';
        const currentName = display.textContent;
        
        if (!selectedNames.includes(currentName)) {
            selectedNames.push(currentName);
            let span = document.createElement('div');
            span.textContent = currentName;
            span.style.padding = '4px';
            // span.id = "selectName";
            selectedNamesArea.appendChild(span);
            // 获取selectedNamesArea下的所有div元素，并为最后一个设置id为'selectName'
            const childDivs = selectedNamesArea.getElementsByTagName('div');
            for (let i = 0; i < childDivs.length; i++) {
                childDivs[i].id = '';
            }
            childDivs[childDivs.length - 1].id = 'selectName';
            fancyAnimation()
            // selectedNamesArea.textContent = `抽中姓名：${selectedNames.join(', ')}`;
            
        }else{
            alert("该姓名已被抽取，请重新选择！");
        }
        if (selectedNames.length >= countInput.value) {
            // alert(`抽取完成！\n${selectedNames.join(', ')}`);
            startButton.disabled  = true;
            startButton.style.backgroundColor  = '#aaa';
            // reset();

        }
    } else {
        if (selectedNames.length >= countInput.value) {
            reset();
        }
        isRunning = true;
        startButton.textContent = '暂停抽问';
        intervalId = setInterval(() => {
            display.textContent = getRandomName();
        }, speedInput.value);
    }
}

// 重置系统
function reset() {
    clearInterval(intervalId);
    isRunning = false;
    startButton.textContent = '开始抽问';
    display.textContent = '点击开始';
    selectedNames = [];
    selectedNamesArea.textContent = '';
    startButton.disabled  = false;
    startButton.style.backgroundColor  = '#ff6f61';
}

// 事件监听
startButton.addEventListener('click', toggleRoll);
resetButton.addEventListener('click', reset);
function fancyAnimation() {
    gsap.from("#selectName", {
      duration: 0.5,
      scale: 0,
      ease: "elastic.out(1, 0.5)",
      rotation: 360
    });

    // 创建粒子效果
    for(let i=0; i<20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      document.body.appendChild(particle);
      
      gsap.to(particle, {
        x: Math.random() * 240 - 100,
        y: Math.random() * 240 - 100,
        opacity: 0,
        duration: 1.5,
        onComplete: () => particle.remove()
      });
    }
  }
