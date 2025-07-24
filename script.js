document.addEventListener('DOMContentLoaded', () => {
    const accessScreen = document.getElementById('access-screen');
    const accessCodeInput = document.getElementById('access-code-input');
    const submitAccessCodeBtn = document.getElementById('submit-access-code');
    const accessMessage = document.getElementById('access-message');
    const mainContent = document.getElementById('main-content'); // O contêiner do calendário

    const currentMonthYearEl = document.getElementById('current-month-year');
    const calendarGridEl = document.getElementById('calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const memoryDetailsSection = document.getElementById('memory-details');
    const memoryDateDisplayEl = document.getElementById('memory-date-display');
    const memoriesForDayContainerEl = document.getElementById('memories-for-day-container');
    const closeDetailsBtn = document.getElementById('close-details');

    // Elemento para os corações
    const heartContainer = document.getElementById('heart-container');

    const CORRECT_ACCESS_CODE = '251224'; // O código secreto!

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // -------------------------------------------------------------
    // ******* GARANTIR ESTADOS INICIAIS CORRETOS *******
    // -------------------------------------------------------------
    accessScreen.classList.remove('hidden');
    mainContent.classList.add('hidden');

    // -------------------------------------------------------------
    // BASE DE MEMÓRIAS FIXAS
    // -------------------------------------------------------------
    const fixedMemories = [
        { 
            data: "2024-12-02", 
            titulo: "QUANDO NOS CONHECEMOS HEHE", 
            conteudo: "Foi tao magico sua voz ficamos horas se divertindo foi tao bom e sla senti algo q nunca senti por ninguem em horas minha rainha eu te amo tanto", 
            autor: "Eu" 
        },
        { 
            data: "2024-12-25", 
            titulo: "O DIA QUE TUDO COMEÇOU", 
            conteudo: "O DIA QUE NOS COMEÇOU NAMORAR HEHEHEHEHEHEHEHEHEHHE EU TE AMO DEMAIS MINHA RAINHAAAAAAAAAAAAAAAAAA VOXE É MUTO ESPECIAL PARA MIM SABIAAAAAAAAA EU TE AMO DEMAISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS", 
            autor: "Seu Amor" 
        }
    ];

    // -------------------------------------------------------------
    // LÓGICA DO CÓDIGO DE ACESSO
    // -------------------------------------------------------------
    submitAccessCodeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const enteredCode = accessCodeInput.value;
        if (enteredCode === CORRECT_ACCESS_CODE) {
            accessScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            renderCalendar();
        } else {
            accessMessage.textContent = 'Codigo incorreto Tente novamente!';
            accessCodeInput.value = '';
        }
    });

    accessCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitAccessCodeBtn.click();
        }
    });

    // -------------------------------------------------------------
    // FUNÇÃO PARA GERAR MEMÓRIAS DINÂMICAS (Dia 25 dos meses)
    // -------------------------------------------------------------
    function generateProgressiveMemories() {
        const progressiveMemories = [];
        const startDate = new Date(2025, 0, 25); // Inicia em 25 de Janeiro de 2025 (mês 0 é Janeiro)
        const today = new Date();
        today.setHours(0,0,0,0);

        let monthCount = 1;

        while (monthCount <= 600) { 
            const current25th = new Date(startDate.getFullYear(), startDate.getMonth() + (monthCount - 1), 25);
            current25th.setHours(0,0,0,0);

            if (current25th.getFullYear() > today.getFullYear() + 50) {
                break;
            }

            const dataString = `${current25th.getFullYear()}-${String(current25th.getMonth() + 1).padStart(2, '0')}-${String(current25th.getDate()).padStart(2, '0')}`;

            let titulo = '';
            if (monthCount === 1) {
                titulo = "NOSSO 1º MÊS JUNTINHOSSS"; 
            } else if (monthCount === 2) {
                titulo = "NOSSO 2º MÊS JUNTINHOSSS"; 
            } else if (monthCount === 3) {
                titulo = "NOSSO 3º MÊS JUNTINHOSSS"; 
            } else {
                titulo = `NOSSO ${monthCount}º MÊS JUNTINHOSSS`; 
            }

            // MENSAGEM PADRÃO PARA TODOS OS MESES
            let conteudo = "O PRESENTE QUE SEU NENEMZINHO TE DEU NESSE MES FOI:";
            
            // Adiciona a mensagem detalhada e o pedido de noivado para o 1º mês (Janeiro)
            if (monthCount === 1) {
                conteudo += `
                    <br>OI MINHA PRINCESINHA LINDAAAAAAAAAAAAAAAAAAAAA HOJE NOS FAZ NOSSO PRIMEIRO MÊS DE NAMORO HOJEEEEEEE💅🏻💅🏻😍😍😍😍😍😍😍 HEHEHEHEHE FOI INCRIVEL ESSE MES JUNTOS MINHA TOTOSINHA ATE ENT SÓ SUBINDO MEU AMOR POR VOXE E VAI CONTINUAR ASSIM PARA TODA ETERNIDADE MINHA COELHINHAAAA ❤🐰<br>
                    OBRIGADO POR SER A NAMORADO MAIS INCRIVEL DO MUNDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO<br>
                    EU TE AMOOOOOOO MAIS QUE TUDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO<br>
                    ESPERO Q EU ESTEJA TE TRATANDO COMO VOXE MERECE IGUAL A PRINCESA Q VC É MINHA TOTOSINHA LINDA VOCE É TÃOOOOOOOOOOOOOOOOOOO LINDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA<br>
                    ESPERO QUE NOS CRESÇA JUNTINHOS BEM FOFINHOS E NUNCA SAIA DE PERTO UM DO OUTRO 🥺❤ MINHA LINDESA PERFEITAAAAAAAAAA MINHA URSINHAAA LINDAAAAAA ❤🥺❤❤❤❤❤❤❤❤<br>
                    HEHEHEHEH MINHA PINCESINHA TOTOSA LINDA PERFEITAAA MINHA COELHONA LINDA 👉🏻👈🏻 VOXE SABE QUE EU N SEI FAZE TEXTOS MAS EU TO TENTANDO POR VOXE MINHA TOTOSA VOXE É MUUUUUUUITOOOOO ESPECIAL PRA MIMMMMMM SABIAAAAAAAAAAAAAAA E PODE RELAXAR MINHA PRINCESA Q NUNCAAAAAA VOU SUMIR NUNCAAAAAA<br>
                    ENTENDEUUUUUUUUUUUUU MINHA PRINCESONAAAAAAAAAAAAAAA LIIIIINDAAAAAAAAAAAAAA 👉🏻👈🏻<br>
                    EU TE AMO MINHA GAROTINHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤ MINHA LINDONA PERFEITA GOSTOSONA AMO ESTAR COM VC E OUVIR VC E VER VOCE E JOGAR COM VC E TUDO VC É TUDO PRA MIM MINHA PSICOPATA LOUCA Q EU AMO DEMAIS ❤❤<br>
                    MESMO Q AS VEZES ME DEIXE MUUUUUITO MAS MUITO MESMO MUITO ESTRESSADO E BRAVO SÓ UM BEJU JA RESOLVE COMO SEMPRE E NUNCA VOU TE LARGAR OU SUMIR NENEMZINHA DSCP N CONSIGO FAZER MT MAIOR NENEM E LEMBRA Q TENHO MUITO ORGULHO EM VOXE E Q VC É MUITO IMPORTANTE PRA MIMMMMM ENTENDEUUUUUU TOTOSONA LINDA PERFEITA MINHA DEUSA GREGA<br>
                    EU TE AMO MAIS QUE TUDOOOOOOOO MINHA TOTOSINHA MINHA GULOSA MINHA COELHINHA MINHA TUDINHO<br><br>
                    <strong>Bonus:</strong> "Nenem voce é a mulher mais linda e mais perfeita q ja vi na minha vida por dentro e por fora então eu queria perguntar se voxe quer virar minha noiva 👉🏻👈🏻🥺"
                `;
            }
            // Adiciona a mensagem detalhada para o 2º mês (Fevereiro)
            else if (monthCount === 2) {
                conteudo += `
                    ____________________________<br>
                    OIIIIIIIIIIIIIII MINHAAAAAAAA PRINCESINHAAAAAAAAAAAAAAAAA<br>
                    acho q voxe esqueceu mas é dia 25 👉🏻👈🏻 significa que nos faz 2 messss claro q n é tão importante como 1 mes ou 6 mes ou 1 ano mas eu prefiro celebrar todos mesmo que seja com apenas um textozinho minha nenemzinha linda ❤😌 EU TE AMOOOOOOOOOOO MUITAAAAAAAOOOOOOOOOOOOOOO MINHA COELHINHAAAAA FOFAAAAAAAAAAAAA<br>
                    VOXE É PERFEITA NENEMZINHA<br>
                    VOCE É MAIS QUE SUFICIENTE NUNCA ESQUECE ISSO MINHA URSINHA FOFA ❤❤❤❤❤❤❤❤❤❤❤❤❤ e lembra nenem mesmo que nos se chateie e fique irritados as vezes um com o outro é normal e ta tudo bem nos sempre resolve e sempre da bejinhos de cura depois 😌😌😌❤❤❤❤❤❤❤❤❤❤ lembra q seu nenemzinho ta sempre aqui pra voxe minha princesa SEMPREEEEEE<br>
                    EU TE AMOOOOOOOOOOOOOOO MINHAAAAAAAA GAROTINHAAAAAAAAAAAAAAA LINDAAAAAAAAAAAAAAAAAAAAAAAAAA<br>
                    VOXE É PERFEITA NENEM NUNCA PENSA O CONTRARIO HEHEHEHEHEHEHE<br>
                    Voxe me faz tão felizzzzzzzzzzz e é tao fofa cmggggggggggggggggg<br>
                    Ai modeus eu amo tanto voxe minha princesinha<br>
                    👉🏻👈🏻<br>
                    Não esquece que voxe é minha garotinha tabom? Pode contar sempre comigo minha princesa linda perfeita totosa lindona VOXE É TÃO LINDA MDSSSSSSA AI N CONSIGO 😭😍<br>
                    Não sei mais oq escrever nenemzinha dicupa seu nenem 🥺<br>
                    É ISSO BEBEZINHAAAAAAAAA BEJU GRANDAO DO SEU NENEMZINHA<br>
                    ---------------------------------
                `;
            }
            // Adiciona a imagem no conteúdo se for o 3º mês
            else if (monthCount === 3) {
                // *** CORRIGIDO: O caminho da imagem agora é apenas "3mes.jpg" ***
                conteudo = `
                    <p>${conteudo}</p>
                    <img src="3mes.jpg" alt="Nossa foto de 3 meses" style="max-width: 100%; height: auto; display: block; margin: 15px auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                `;
            }
            // Adiciona o link para o 4º mês (Abril)
            else if (monthCount === 4) {
                const linkUrl = "https://david25manu.github.io/Chuva-de-amor-hehe/";
                conteudo = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${conteudo}</a>`;
            }
            // Adiciona o link ao conteúdo se for o 5º mês
            else if (monthCount === 5) {
                const linkUrl = "https://david25manu.github.io/amor-crescente/";
                conteudo = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${conteudo}</a>`;
            } 
            // Adiciona o link ao conteúdo se for o 6º mês
            else if (monthCount === 6) {
                const linkUrl = "https://david25manu.github.io/7meses/";
                conteudo = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${conteudo}</a>`;
            }
            // Adiciona a frase específica para o 7º mês (Julho)
            else if (monthCount === 7) {
                conteudo += " ESSE CALENDARIO LINDO AQUI COM TODAS AS MEMORIAS E TODOS PRESENTES HEHEHEHE";
            }

            progressiveMemories.push({
                data: dataString,
                titulo: titulo,
                conteudo: conteudo, // Usa o conteúdo que pode conter a imagem, o link ou a mensagem detalhada
                autor: "Nos"
            });

            monthCount++;
        }
        return progressiveMemories;
    }

    // -------------------------------------------------------------
    // COMBINAÇÃO DE TODAS AS MEMÓRIAS
    // -------------------------------------------------------------
    let allMemories = []; 

    // -------------------------------------------------------------
    // FUNÇÃO PARA RENDERIZAR O CALENDÁRIO
    // -------------------------------------------------------------
    function renderCalendar() {
        allMemories = [...fixedMemories, ...generateProgressiveMemories()];

        calendarGridEl.innerHTML = `
            <div class="day-name">Dom</div>
            <div class="day-name">Seg</div>
            <div class="day-name">Ter</div>
            <div class="day-name">Qua</div>
            <div class="day-name">Qui</div>
            <div class="day-name">Sex</div>
            <div class="day-name">Sab</div>
        `;

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const startDayOfWeek = firstDayOfMonth.getDay();

        currentMonthYearEl.textContent = new Date(currentYear, currentMonth).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

        for (let i = 0; i < startDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarGridEl.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day');
            dayEl.innerHTML = `<span class="day-number">${day}</span>`;
            dayEl.dataset.date = dateString;

            const memoriesOnThisDay = allMemories.filter(memoria => memoria.data === dateString);
            if (memoriesOnThisDay.length > 0) {
                dayEl.classList.add('has-memory');
                dayEl.addEventListener('click', () => showMemoryDetails(dateString, memoriesOnThisDay));
            } else {
                dayEl.addEventListener('click', () => showMemoryDetails(dateString, []));
            }

            calendarGridEl.appendChild(dayEl);
        }
    }

    // -------------------------------------------------------------
    // FUNÇÃO PARA MOSTRAR OS DETALHES DA MEMÓRIA
    // -------------------------------------------------------------
    function showMemoryDetails(dateString, memories) {
        const selectedDate = new Date(dateString + 'T00:00:00');
        memoryDateDisplayEl.textContent = selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        memoriesForDayContainerEl.innerHTML = '';

        if (memories.length > 0) {
            memories.forEach(memoria => {
                const memoryCard = document.createElement('div');
                memoryCard.classList.add('memory-card-detail');
                // IMPORTANTE: Usar innerHTML para renderizar a imagem ou o link no conteúdo
                // Certifique-se de que o conteúdo de 'memoria.conteudo' é confiável
                memoryCard.innerHTML = `
                    <h4>${memoria.titulo}</h4>
                    <p>${memoria.conteudo}</p>
                    <span>- ${memoria.autor}</span>
                `;
                memoriesForDayContainerEl.appendChild(memoryCard);
            });
        } else {
            memoriesForDayContainerEl.innerHTML = '<p style="text-align: center; color: #777;">Nao ha memorias registradas para este dia</p>';
        }

        document.getElementById('calendar-grid').classList.add('hidden');
        document.getElementById('calendar-navigation').classList.add('hidden');
        memoryDetailsSection.classList.remove('hidden');
    }

    // -------------------------------------------------------------
    // EVENT LISTENERS PARA NAVEGAÇÃO E FECHAR DETALHES
    // -------------------------------------------------------------
    prevMonthBtn.addEventListener('click', (event) => {
        event.preventDefault();
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', (event) => {
        event.preventDefault();
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    closeDetailsBtn.addEventListener('click', (event) => {
        event.preventDefault();
        memoryDetailsSection.classList.add('hidden');
        document.getElementById('calendar-grid').classList.remove('hidden');
        document.getElementById('calendar-navigation').classList.remove('hidden');
    });

    // -------------------------------------------------------------
    // Lógica para gerar corações caindo com limite e suavidade
    // -------------------------------------------------------------
    const MAX_HEARTS = 15;
    let currentHeartCount = 0;

    function createFallingHeart() {
        if (currentHeartCount >= MAX_HEARTS) {
            return;
        }

        const heart = document.createElement('div');
        heart.classList.add('falling-heart');

        const hearts = ['💙', '💜'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left = `${Math.random() * 100}vw`;

        const size = Math.random() * (3 - 1.5) + 1.5;
        heart.style.fontSize = `${size}em`;

        const duration = Math.random() * (12 - 6) + 6;
        heart.style.animationDuration = `${duration}s`;

        const delay = Math.random() * 5;
        heart.style.animationDelay = `${delay}s`;

        heartContainer.appendChild(heart);
        currentHeartCount++;

        heart.addEventListener('animationend', () => {
            heart.remove();
            currentHeartCount--;
        });
    }

    setInterval(createFallingHeart, 1200);

    for (let i = 0; i < 8; i++) {
        createFallingHeart();
    }
});
