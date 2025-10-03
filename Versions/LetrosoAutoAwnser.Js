console.clear();
console.log("By rbnwonknui");

// Função playAudio corrigida
function playAudio(url) {
  const audio = new Audio(url);
  audio.play().catch(e => console.log('Audio play failed:', e));
}

playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');

// Script para encontrar a palavra do dia no Letreco
(async function() {
    const hoje = new Date().toISOString().split('T')[0]; // Formato: YYYY-MM-DD
    
    // Remove existing notification
    const existingNotification = document.getElementById('wordle-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Add notification styles
    const styles = `
        #wordle-notification {
            position: fixed;
            top: -150px;
            right: 20px;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(51, 65, 85, 0.6);
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            width: 280px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #f8fafc;
        }

        #wordle-notification.show {
            top: 20px;
            animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideIn {
            0% {
                transform: translateX(320px) scale(0.9);
                opacity: 0;
            }
            100% {
                transform: translateX(0) scale(1);
                opacity: 1;
            }
        }

        .notification-header {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
        }

        .notification-icon {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            font-size: 18px;
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .notification-content {
            flex: 1;
        }

        .notification-title {
            font-size: 14px;
            font-weight: 600;
            color: #f8fafc;
            margin: 0 0 2px 0;
        }

        .notification-subtitle {
            font-size: 12px;
            color: #94a3b8;
            margin: 0;
        }

        .solution-container {
            background: rgba(30, 41, 59, 0.8);
            border-radius: 8px;
            padding: 12px;
            text-align: center;
            margin-top: 12px;
            border: 1px solid rgba(51, 65, 85, 0.4);
        }

        .solution-label {
            font-size: 11px;
            color: #94a3b8;
            margin-bottom: 6px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .solution-word {
            font-size: 24px;
            font-weight: 700;
            color: #f8fafc;
            letter-spacing: 3px;
            text-transform: uppercase;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
        }

        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            color: #8b5cf6;
            font-size: 12px;
        }

        .spinner {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(139, 92, 246, 0.2);
            border-top: 2px solid #8b5cf6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .error {
            color: #ef4444;
            font-size: 12px;
            text-align: center;
            padding: 8px;
            background: rgba(239, 68, 68, 0.1);
            border-radius: 6px;
            border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .close-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            font-size: 16px;
            color: #64748b;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .close-btn:hover {
            background: rgba(51, 65, 85, 0.5);
            color: #f8fafc;
        }

        .progress-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            background: linear-gradient(90deg, #8b5cf6, #7c3aed);
            border-radius: 0 0 12px 12px;
            animation: progress 8s linear;
        }

        @keyframes progress {
            from { width: 100%; }
            to { width: 0%; }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'wordle-notification';
    notification.innerHTML = `
        <button class="close-btn" onclick="this.parentElement.remove()">×</button>
        
        <div class="notification-header">
            <div class="notification-icon">🔍</div>
            <div class="notification-content">
                <div class="notification-title">Letreco Solution</div>
                <div class="notification-subtitle">Procurando palavra do dia: ${hoje}</div>
            </div>
        </div>

        <div class="solution-container">
            <div class="loading">
                <div class="spinner"></div>
                <span>Carregando...</span>
            </div>
        </div>

        <div class="progress-bar"></div>
    `;

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
    }, 50);

    // Add modal dialog with help information
    const modal = document.createElement('dialog');
    modal.className = 'Modal-module_modalOverlay__cdZDa Modal-module_paddingTop__xhWdR';
    modal.setAttribute('data-testid', 'modal-overlay');
    modal.setAttribute('aria-label', 'help Modal');
    modal.setAttribute('aria-modal', 'true');
    modal.id = 'help-dialog';
    modal.open = true;
    
    modal.innerHTML = `
        <div class="Modal-module_content__TrPIX Modal-module_testExtraWidth__Dptic Modal-module_extraPadding__XGzkT">
            <div class="Modal-module_topWrapper__MvEd5 Modal-module_newHeading__Ah45w">
                <button class="Modal-module_closeIcon__TcEKb" type="button" aria-label="Close" onclick="this.closest('dialog').remove()">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" class="game-icon" data-testid="icon-close">
                        <path fill="var(--color-tone-1)" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </button>
                <section class="Help-module_help__fbOXF">
                    <div class="Help-module_examples__W3VXL">
                        <h3 class="Help-module_bold__D2T7o">
                            Welcome to Letreco Auto Answer, an automation created by rbnwonknui. 
                            I created this automation for some famous browser games for personal use and wanted everyone to be able to use these tools. 
                            Sometimes the words are very difficult and you waste time searching on alternative sites - I honestly find this very annoying, 
                            so I created this automation to make it easier.
                        </h3>
                        <div aria-label="wordy" class="Help-module_example__gldBI" role="group" aria-roledescription="Example">
                            <div data-testid="wordy-letter" class="Help-module_tileContainer__vGHuc">
                                <div class="Tile-module_tile__UWEHN Tile-module_small__dKW39" role="img" aria-roledescription="tile" aria-label="1st letter, C, correct" data-state="correct" data-animation="idle" data-testid="tile" aria-live="off">C</div>
                            </div>
                            <div data-testid="wordy-letter" class="Help-module_tileContainer__vGHuc">
                                <div class="Tile-module_tile__UWEHN Tile-module_small__dKW39" role="img" aria-roledescription="tile" aria-label="2nd letter, O, correct" data-state="correct" data-animation="idle" data-testid="tile" aria-live="off">O</div>
                            </div>
                            <div data-testid="wordy-letter" class="Help-module_tileContainer__vGHuc">
                                <div class="Tile-module_tile__UWEHN Tile-module_small__dKW39" role="img" aria-roledescription="tile" aria-label="3rd letter, R, correct" data-state="correct" data-animation="idle" data-testid="tile" aria-live="off">R</div>
                            </div>
                            <div data-testid="wordy-letter" class="Help-module_tileContainer__vGHuc">
                                <div class="Tile-module_tile__UWEHN Tile-module_small__dKW39" role="img" aria-roledescription="tile" aria-label="4th letter, R, correct" data-state="correct" data-animation="idle" data-testid="tile" aria-live="off">R</div>
                            </div>
                            <div data-testid="wordy-letter" class="Help-module_tileContainer__vGHuc">
                                <div class="Tile-module_tile__UWEHN Tile-module_small__dKW39" role="img" aria-roledescription="tile" aria-label="5th letter, E, correct" data-state="correct" data-animation="idle" data-testid="tile" aria-live="off">E</div>
                            </div>
                            <div data-testid="wordy-letter" class="Help-module_tileContainer__vGHuc">
                                <div class="Tile-module_tile__UWEHN Tile-module_small__dKW39" role="img" aria-roledescription="tile" aria-label="6th letter, C, correct" data-state="correct" data-animation="idle" data-testid="tile" aria-live="off">C</div>
                            </div>
                            <div data-testid="wordy-letter" class="Help-module_tileContainer__vGHuc">
                                <div class="Tile-module_tile__UWEHN Tile-module_small__dKW39" role="img" aria-roledescription="tile" aria-label="7th letter, T, correct" data-state="correct" data-animation="idle" data-testid="tile" aria-live="off">T</div>
                            </div>
                            <p><strong>All letters</strong> are in the correct positions - CORRECT solution found!</p>
                        </div>
                    </div>
                    <div class="Help-module_statsLogin__HkQec">
                        <div class="Help-module_statsIcon__gZPRN">
                            <img alt="" style="content: var(--wordle-stats-mini-check);">
                        </div>
                        <div class="Help-module_loginText__lhtLY">
                            <a class="" href="https://github.com/rbnwonknui" target="_blank" rel="noopener">My GitHub</a> - 
                            Please give me a star on my repository to support the project!
                        </div>
                    </div>
                    <div class="Help-module_reminderSignUp__oQ42D"></div>
                </section>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    try {
        // Tenta buscar todos os scripts da página
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        const mainScript = scripts.find(s => s.src.includes('main.') && s.src.includes('.js'));
        
        if (!mainScript) {
            const solutionContainer = notification.querySelector('.solution-container');
            const subtitle = notification.querySelector('.notification-subtitle');
            
            subtitle.textContent = 'Erro ao buscar';
            solutionContainer.innerHTML = `
                <div class="error">
                    Arquivo main.*.js não encontrado
                </div>
            `;
            return;
        }
        
        const subtitle = notification.querySelector('.notification-subtitle');
        subtitle.textContent = `Encontrado: ${mainScript.src}`;
        
        // Faz fetch do conteúdo do script
        const response = await fetch(mainScript.src);
        const scriptContent = await response.text();
        
        // Procura pelo padrão da data de hoje
        const regex = new RegExp(`"${hoje}":\\s*{[^}]+}`, 'g');
        const match = scriptContent.match(regex);
        
        if (match) {
            // Extrai os dados estruturados
            const dataMatch = match[0].match(/"(\d{4}-\d{2}-\d{2})":\s*{[^}]+}/);
            if (dataMatch) {
                // Extrai edition, date e word
                const editionMatch = match[0].match(/edition:\s*"(\d+)"/);
                const wordMatch = match[0].match(/word:\s*"([^"]+)"/);
                
                const solutionContainer = notification.querySelector('.solution-container');
                const subtitle = notification.querySelector('.notification-subtitle');
                
                subtitle.textContent = 'Palavra encontrada!';
                solutionContainer.innerHTML = `
                    <div class="solution-label">Palavra do dia</div>
                    <div class="solution-word">${wordMatch ? wordMatch[1] : 'N/A'}</div>
                `;
                
                // Auto-hide after 8 seconds
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.style.opacity = '0';
                        notification.style.transform = 'translateX(320px) scale(0.9)';
                        setTimeout(() => notification.remove(), 400);
                    }
                }, 8000);
            }
        } else {
            const solutionContainer = notification.querySelector('.solution-container');
            const subtitle = notification.querySelector('.notification-subtitle');
            
            subtitle.textContent = 'Nenhuma entrada encontrada';
            solutionContainer.innerHTML = `
                <div class="error">
                    Nenhuma entrada encontrada para a data ${hoje}<br>
                    Verifique se a data está correta ou se o jogo já foi atualizado
                </div>
            `;
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.style.opacity = '0';
                    notification.style.transform = 'translateX(320px) scale(0.9)';
                    setTimeout(() => notification.remove(), 400);
                }
            }, 5000);
        }
        
    } catch (error) {
        const solutionContainer = notification.querySelector('.solution-container');
        const subtitle = notification.querySelector('.notification-subtitle');
        
        subtitle.textContent = 'Erro ao processar';
        solutionContainer.innerHTML = `
            <div class="error">
                ${error.message}
            </div>
        `;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(320px) scale(0.9)';
                setTimeout(() => notification.remove(), 400);
            }
        }, 5000);
    }
})();