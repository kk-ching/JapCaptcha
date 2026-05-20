const hiraganaList = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'];
const katakanaList = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン'];
let selectedChars = [];
const charMap = {};

const translations = {
    en: {
        title: 'Japanese CAPTCHA Solver',
        instruction: 'Don\'t understand Japanese? No problem! Click the characters you see:',
        selectedLabel: 'Result:',
        placeholder: 'あいうえお',
        copy: 'Copy',
        clear: 'Clear'
    },
    zh: {
        title: '日文 CAPTCHA 產生器',
        instruction: '不懂日文？沒關係！點擊你看到的字符：',
        selectedLabel: '結果:',
        placeholder: 'あいうえお',
        copy: '複製',
        clear: '清空'
    }
};

let currentLang = 'en';

hiraganaList.forEach((char, index) => {
    charMap[char] = index;
});

katakanaList.forEach((char, index) => {
    charMap[char] = index;
});

document.addEventListener('DOMContentLoaded', () => {
    renderAllCharacters();
    setupEventListeners();
    setupLanguageSelector();
});

function setupLanguageSelector() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLang = btn.dataset.lang;
            console.log('Language changed to:', currentLang);
            if (currentLang === 'ja') {
                displayWhy();
            } else {
                displayNormal();
            }
            updateLanguage();
        });
    });
}

function updateLanguage() {
    const t = translations[currentLang];
    
    document.querySelector('.header h1').textContent = t.title;
    document.querySelector('.instruction').textContent = t.instruction;
    document.querySelector('label[for="romajiOutput"]').textContent = t.selectedLabel;
    document.getElementById('romajiOutput').placeholder = t.placeholder;
    document.getElementById('copyBtn').textContent = t.copy;
    document.getElementById('clearBtn').textContent = t.clear;
}

function renderAllCharacters() {
    const grid = document.getElementById('charGrid');
    grid.innerHTML = '';
    
    hiraganaList.forEach((char) => {
        const btn = document.createElement('button');
        btn.className = 'char-btn';
        btn.textContent = char;
        btn.dataset.char = char;
        btn.addEventListener('click', (e) => toggleCharacter(char, btn));
        grid.appendChild(btn);
    });
}

function toggleCharacter(char, btn) {
    selectedChars.push(char);
    updateOutput();
}

function updateOutput() {
    const output = selectedChars.join('');
    document.getElementById('romajiOutput').value = output;
}

function setupEventListeners() {
    document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
    document.getElementById('clearBtn').addEventListener('click', clearSelection);
}

function copyToClipboard() {
    const output = document.getElementById('romajiOutput');
    output.select();
    document.execCommand('copy');
    
    const btn = document.getElementById('copyBtn');
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => {
        btn.textContent = originalText;
    }, 2000);
}

function clearSelection() {
    selectedChars = [];
    document.querySelectorAll('.char-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    updateOutput();
}

function displayWhy() {
    let solver = document.getElementsByClassName('solver-box')[0];
    let why = document.getElementsByClassName('why-box')[0];
    solver.setAttribute('style', 'display: none;');
    why.setAttribute('style', 'display: block;');
}

function displayNormal() {
    let solver = document.getElementsByClassName('solver-box')[0];
    let why = document.getElementsByClassName('why-box')[0];
    solver.setAttribute('style', 'display: block;');
    why.setAttribute('style', 'display: none;');
}