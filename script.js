// ==================== المتغيرات ====================
let currentNews = [];
let sudokuGame = null;

// ==================== التاريخ والوقت ====================
function updateDateTime() {
    const now = new Date();
    
    const timeString = now.toLocaleTimeString('ar-SA', { hour12: false });
    const clockElement = document.getElementById('liveClock');
    if (clockElement) clockElement.textContent = timeString;
    
    const gregorian = now.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const gregorianElement = document.getElementById('gregorianDate');
    if (gregorianElement) gregorianElement.textContent = gregorian;
    
    const hijriYear = Math.floor((now.getFullYear() - 622) * 0.97);
    const hijriElement = document.getElementById('hijriDate');
    if (hijriElement) hijriElement.innerHTML = `<i class="fas fa-moon ml-1"></i> ${hijriYear} هـ`;
    
    const startDate = new Date(2024, 0, 1);
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const issueElement = document.getElementById('issueNumber');
    const yearElement = document.getElementById('yearNumber');
    if (issueElement) issueElement.textContent = diffDays + 1;
    if (yearElement) yearElement.textContent = now.getFullYear();
}

setInterval(updateDateTime, 1000);
updateDateTime();

// ==================== الأخبار التجريبية ====================
function loadMockNews() {
    const mockArticles = [
        {
            title: "السعودية تطلق مبادرة السعودية الخضراء لزراعة 10 ملايين شجرة",
            description: "أعلنت الهيئة الملكية لمدينة الرياض عن إطلاق مبادرة ضخمة لزراعة الأشجار في العاصمة ضمن رؤية 2030.",
            urlToImage: "https://images.unsplash.com/photo-1542272201-b1ca555f8505?w=800",
            url: "#",
            author: "واس - الرياض",
            publishedAt: new Date().toISOString()
        },
        {
            title: "الاقتصاد السعودي يسجل نمواً قياسياً بدعم من الرؤية",
            description: "أظهرت البيانات نمو الناتج المحلي الإجمالي للمملكة مع ازدهار القطاعات غير النفطية.",
            urlToImage: "https://images.unsplash.com/photo-1584466977731-b17a0de2d2a3?w=800",
            url: "#",
            author: "الاقتصادية",
            publishedAt: new Date().toISOString()
        },
        {
            title: "نيوم توقع اتفاقيات شراكة جديدة لتطوير السياحة",
            description: "وقعت شركة نيوم اتفاقيات مع كبرى الشركات العالمية لتطوير مشاريع السياحة الفاخرة.",
            urlToImage: "https://images.unsplash.com/photo-1542051841852-5f4ad17e2b6d?w=800",
            url: "#",
            author: "بلومبيرغ",
            publishedAt: new Date().toISOString()
        },
        {
            title: "الهلال يتوج بلقب دوري روشن للمرة الثالثة",
            description: "حقق فريق الهلال فوزاً كبيراً ليحسم اللقب وسط احتفالات جماهيرية كبيرة.",
            urlToImage: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800",
            url: "#",
            author: "الرياضية",
            publishedAt: new Date().toISOString()
        },
        {
            title: "الإمارات تستضيف مؤتمر المناخ بمشاركة 150 دولة",
            description: "تنطلق في أبوظبي أعمال قمة المناخ لمناقشة التحديات البيئية وسبل التمويل.",
            urlToImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
            url: "#",
            author: "وام",
            publishedAt: new Date().toISOString()
        },
        {
            title: "مصر توقع اتفاقية لإنشاء مدينة تكنولوجية جديدة",
            description: "وقعت الحكومة المصرية مذكرة تفاهم لإنشاء مدينة تكنولوجية متكاملة.",
            urlToImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
            url: "#",
            author: "الأهرام",
            publishedAt: new Date().toISOString()
        },
        {
            title: "قطر تعلن زيادة إنتاج الغاز الطبيعي المسال",
            description: "أعلنت قطر للطاقة عن خطط توسعية لزيادة إنتاج الغاز للمساعدة في أمن الطاقة العالمي.",
            urlToImage: "https://images.unsplash.com/photo-1542903660-eedba2cda473?w=800",
            url: "#",
            author: "الجزيرة",
            publishedAt: new Date().toISOString()
        },
        {
            title: "الكويت تكتشف احتياطيات نفطية جديدة",
            description: "أعلنت مؤسسة البترول الكويتية عن اكتشاف احتياطيات نفطية جديدة تعزز مكانتها في السوق.",
            urlToImage: "https://images.unsplash.com/photo-1548705085-1011769c9b1c?w=800",
            url: "#",
            author: "كونا",
            publishedAt: new Date().toISOString()
        },
        {
            title: "الأردن يستضيف مؤتمراً لدعم الاقتصاد الفلسطيني",
            description: "انطلقت في عمان أعمال المؤتمر الدولي لدعم الاقتصاد الفلسطيني.",
            urlToImage: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=800",
            url: "#",
            author: "بترا",
            publishedAt: new Date().toISOString()
        },
        {
            title: "عمان تطلق أول محطة لتحلية المياه بالطاقة الشمسية",
            description: "دشنت سلطنة عمان أول محطة متكاملة لتحلية المياه باستخدام الطاقة الشمسية.",
            urlToImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
            url: "#",
            author: "العمانية",
            publishedAt: new Date().toISOString()
        },
        {
            title: "البحرين تحتضن معرض تكنولوجيا المعلومات",
            description: "انطلق في المنامة معرض تكنولوجيا المعلومات بمشاركة 500 شركة عالمية.",
            urlToImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
            url: "#",
            author: "بنا",
            publishedAt: new Date().toISOString()
        },
        {
            title: "العراق يوقع عقداً لاستيراد الغاز الإيراني",
            description: "أعلنت وزارة الكهرباء العراقية عن توقيع عقد جديد لاستيراد الغاز الطبيعي.",
            urlToImage: "https://images.unsplash.com/photo-1569154941061-e231b4725ef6?w=800",
            url: "#",
            author: "العراقية",
            publishedAt: new Date().toISOString()
        }
    ];
    
    currentNews = mockArticles;
    displayNews(currentNews);
    updateBreakingNews(currentNews);
}

function displayNews(articles) {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    if (!articles || articles.length === 0) {
        newsGrid.innerHTML = `
            <div class="col-span-full text-center py-10">
                <i class="fas fa-newspaper text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">لا توجد أخبار حالياً</p>
            </div>
        `;
        return;
    }
    
    newsGrid.innerHTML = articles.map(article => `
        <article class="news-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all">
            <img src="${article.urlToImage || 'https://via.placeholder.com/800x400?text=جريدة+الرياض'}" 
                 alt="${article.title}" 
                 class="w-full h-48 object-cover"
                 onerror="this.src='https://via.placeholder.com/800x400?text=جريدة+الرياض'">
            <div class="p-4">
                <div class="text-xs text-riyadh-green mb-2">
                    <i class="far fa-clock ml-1"></i> ${new Date(article.publishedAt).toLocaleDateString('ar-SA')}
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2">${article.title}</h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-3">${article.description || 'تابع التفاصيل الكاملة على جريدة الرياض...'}</p>
                <div class="flex justify-between items-center border-t pt-3">
                    <span class="text-xs text-gray-500"><i class="fas fa-user ml-1"></i> ${article.author || 'جريدة الرياض'}</span>
                    <a href="${article.url}" target="_blank" class="text-riyadh-green hover:text-riyadh-dark text-sm font-bold">اقرأ المزيد <i class="fas fa-arrow-left mr-1"></i></a>
                </div>
            </div>
        </article>
    `).join('');
}

function updateBreakingNews(articles) {
    const breakingDiv = document.getElementById('breakingNews');
    if (!breakingDiv) return;
    const topNews = articles.slice(0, 5).map(a => a.title).join(' • ');
    breakingDiv.innerHTML = `<p class="animate-marquee whitespace-nowrap">⚡ ${topNews} ⚡</p>`;
}

async function fetchNews() {
    try {
        if (!CONFIG.NEWS_API_KEY || CONFIG.NEWS_API_KEY === '') {
            loadMockNews();
            return;
        }
        
        const url = `${CONFIG.NEWS_API_URL}?country=${CONFIG.COUNTRY}&language=${CONFIG.LANGUAGE}&pageSize=${CONFIG.PAGE_SIZE}&apiKey=${CONFIG.NEWS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'ok' && data.articles && data.articles.length > 0) {
            currentNews = data.articles;
            displayNews(currentNews);
            updateBreakingNews(currentNews);
        } else {
            loadMockNews();
        }
    } catch (error) {
        console.error('خطأ:', error);
        loadMockNews();
    }
}

// ==================== لعبة سودوكو ====================
class SudokuGame {
    constructor(size = 9) {
        this.size = size;
        this.grid = [];
        this.solution = [];
        this.fixedCells = [];
        this.userInput = [];
        this.canvas = document.getElementById('sudokuCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        
        this.init();
        this.setupEvents();
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const maxSize = Math.min(container.clientWidth, 350);
        this.canvas.width = maxSize;
        this.canvas.height = maxSize;
        this.draw();
    }
    
    init() {
        this.generateSudoku();
        this.userInput = JSON.parse(JSON.stringify(this.grid));
        this.draw();
    }
    
    generateSudoku() {
        this.grid = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.solution = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.generateSolution(0, 0);
        
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.solution[i][j] = this.grid[i][j];
            }
        }
        
        this.fixedCells = [];
        const cellsToKeep = 32;
        let hidden = 0;
        
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (hidden < this.size * this.size - cellsToKeep && Math.random() > 0.65) {
                    this.grid[i][j] = 0;
                    hidden++;
                } else {
                    this.fixedCells.push([i, j]);
                }
            }
        }
    }
    
    generateSolution(row, col) {
        if (row === this.size) return true;
        if (col === this.size) return this.generateSolution(row + 1, 0);
        
        const numbers = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let num of numbers) {
            if (this.isValid(row, col, num)) {
                this.grid[row][col] = num;
                if (this.generateSolution(row, col + 1)) return true;
                this.grid[row][col] = 0;
            }
        }
        return false;
    }
    
    isValid(row, col, num) {
        for (let i = 0; i < this.size; i++) {
            if (this.grid[row][i] === num) return false;
            if (this.grid[i][col] === num) return false;
        }
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.grid[boxRow + i][boxCol + j] === num) return false;
            }
        }
        return true;
    }
    
    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    
    draw() {
        if (!this.ctx) return;
        const size = this.canvas.width;
        const cellSize = size / this.size;
        
        this.ctx.clearRect(0, 0, size, size);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, size, size);
        
        for (let i = 0; i <= this.size; i++) {
            const lineWidth = (i % 3 === 0) ? 2.5 : 1;
            this.ctx.beginPath();
            this.ctx.strokeStyle = (i % 3 === 0) ? '#000' : '#ccc';
            this.ctx.lineWidth = lineWidth;
            this.ctx.moveTo(i * cellSize, 0);
            this.ctx.lineTo(i * cellSize, size);
            this.ctx.stroke();
            this.ctx.moveTo(0, i * cellSize);
            this.ctx.lineTo(size, i * cellSize);
            this.ctx.stroke();
        }
        
        const fontSize = Math.min(cellSize * 0.45, 28);
        this.ctx.font = `${fontSize}px 'Amiri', monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const value = this.userInput[i][j];
                if (value !== 0) {
                    const isFixed = this.fixedCells.some(([x, y]) => x === i && y === j);
                    this.ctx.fillStyle = isFixed ? '#2c3e50' : '#007a3d';
                    this.ctx.fillText(value.toString(), j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);
                }
            }
        }
    }
    
    setupEvents() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;
            const cellSize = this.canvas.width / this.size;
            const col = Math.floor(x / cellSize);
            const row = Math.floor(y / cellSize);
            
            if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
                const isFixed = this.fixedCells.some(([fx, fy]) => fx === row && fy === col);
                if (!isFixed) {
                    const currentVal = this.userInput[row][col] || '';
                    const num = prompt(`أدخل رقم (1-9):`, currentVal);
                    if (num && num >= 1 && num <= 9) {
                        this.userInput[row][col] = parseInt(num);
                        this.draw();
                    } else if (num === '') {
                        this.userInput[row][col] = 0;
                        this.draw();
                    }
                } else {
                    const msgDiv = document.getElementById('sudokuMessage');
                    if (msgDiv) {
                        msgDiv.innerHTML = '<span class="text-yellow-600">🔒 خلية ثابتة</span>';
                        setTimeout(() => { msgDiv.innerHTML = ''; }, 1500);
                    }
                }
            }
        });
        
        const checkBtn = document.getElementById('checkSudoku');
        const resetBtn = document.getElementById('resetSudoku');
        
        if (checkBtn) checkBtn.onclick = () => this.checkSolution();
        if (resetBtn) resetBtn.onclick = () => this.reset();
    }
    
    checkSolution() {
        let correct = true;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.userInput[i][j] !== this.solution[i][j]) {
                    correct = false;
                    break;
                }
            }
        }
        const msgDiv = document.getElementById('sudokuMessage');
        if (msgDiv) {
            if (correct) {
                msgDiv.innerHTML = '<span class="text-green-600 font-bold">🎉 أحسنت! الحل صحيح! 🎉</span>';
            } else {
                msgDiv.innerHTML = '<span class="text-red-600 font-bold">❌ يوجد أخطاء، حاول مرة أخرى ❌</span>';
            }
            setTimeout(() => { msgDiv.innerHTML = ''; }, 3000);
        }
    }
    
    reset() {
        this.userInput = JSON.parse(JSON.stringify(this.grid));
        this.draw();
        const msgDiv = document.getElementById('sudokuMessage');
        if (msgDiv) msgDiv.innerHTML = '';
    }
}

// ==================== تشغيل الموقع ====================
document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    
    setTimeout(() => {
        sudokuGame = new SudokuGame();
    }, 200);
    
    // زر تحديث يدوي
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-sync-alt"></i>';
    btn.className = 'fixed bottom-4 left-4 bg-riyadh-green text-white p-3 rounded-full shadow-lg hover:bg-riyadh-dark transition z-50 w-12 h-12 flex items-center justify-center';
    btn.onclick = () => {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        fetchNews();
        setTimeout(() => { btn.innerHTML = '<i class="fas fa-sync-alt"></i>'; }, 2000);
    };
    document.body.appendChild(btn);
});