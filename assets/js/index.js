(function() {
    // ALERT CONFIGURATION
    const DEBUG_CONFIG = {
        ENABLE_ALERTS: false,  // MASTER SWITCH TO DISABLE ALL ALERTS
        VERBOSE: false         // Additional debug logging
    };

    // CUSTOM ALERT FUNCTION WITH CONFIGURATION
    function debugAlert(message, force = false) {
        // Only alert if explicitly forced or alerts are enabled
        if (force || DEBUG_CONFIG.ENABLE_ALERTS) {
            alert(message);
        }

        // Always log to console
        if (DEBUG_CONFIG.VERBOSE) {
            console.log(`[DEBUG] ${message}`);
        }
    }

    // USE LOCALSTORAGE FOR PERSISTENT FLAGS
    function setFlag(flagName, value) {
        try {
            localStorage.setItem(flagName, JSON.stringify(value));
            debugAlert(`🚩 FLAG SET: ${flagName} = ${value}`, false);
        } catch (error) {
            debugAlert(`🚨 ERROR SETTING FLAG: ${error.message}`, true);
        }
    }

    function getFlag(flagName) {
        try {
            const value = localStorage.getItem(flagName);
            return value ? JSON.parse(value) : false;
        } catch (error) {
            debugAlert(`🚨 ERROR GETTING FLAG: ${error.message}`, true);
            return false;
        }
    }

    function clearFlag(flagName) {
        try {
            localStorage.removeItem(flagName);
            debugAlert(`🧹 FLAG CLEARED: ${flagName}`, false);
        } catch (error) {
            debugAlert(`🚨 ERROR CLEARING FLAG: ${error.message}`, true);
        }
    }

    // CONTACT BUTTON SCROLL HANDLER
    function setupContactScroll() {
        const contactBtn = document.getElementById('contact-btn');
        
        if (!contactBtn) {
            debugAlert('🚨 CRITICAL ERROR: CONTACT BUTTON NOT FOUND!', true);
            return;
        }

        debugAlert('🎉 CONTACT BUTTON SUCCESSFULLY LOCATED!', false);

        contactBtn.addEventListener('click', function(event) {
            event.preventDefault();
            
            debugAlert('🚨 CONTACT BUTTON CLICKED! \n\nPREPARING FOR NAVIGATION!', false);
            
            // USE LOCALSTORAGE TO SET FLAGS
            setFlag('shouldShowAlert', true);
            setFlag('shouldScrollToBottom', true);
            
            // Navigate with alert
            const targetUrl = this.getAttribute('href') || 'about.html';
            debugAlert(`🚀 NAVIGATING TO: ${targetUrl}`, false);
            window.location.href = targetUrl;
        });
    }

    // PAGE LOAD BEHAVIOR
    function initPageBehavior() {
        debugAlert('🌟 PAGE BEHAVIOR INITIALIZATION STARTED!', false);
        
        // CHECK FLAGS USING LOCALSTORAGE
        const shouldShowAlert = getFlag('shouldShowAlert');
        const shouldScrollToBottom = getFlag('shouldScrollToBottom');

        // FLAG LOGGING
        debugAlert(`🚩 Global Flags:
        shouldShowAlert: ${shouldShowAlert}
        shouldScrollToBottom: ${shouldScrollToBottom}`, false);

        // CHECK AND PROCESS FLAGS
        if (shouldShowAlert) {
            debugAlert('🎈 WELCOME ALERT TRIGGERED!', false);
            clearFlag('shouldShowAlert');
        }

        if (shouldScrollToBottom) {
            debugAlert('📜 SCROLL TO BOTTOM INITIATED!', false);
            
            // Clear scroll flag
            clearFlag('shouldScrollToBottom');

            // Defer scroll action
            setTimeout(() => {
                debugAlert('⏰ DELAYED ACTION TRIGGERED!', false);
                
                // Scroll to bottom
                const scrollHeight = Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    window.innerHeight
                );

                debugAlert(`🔍 SCROLL DIAGNOSTICS:
                Total Page Height: ${scrollHeight}
                Window Inner Height: ${window.innerHeight}`, false);

                window.scrollTo({
                    top: scrollHeight,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }

    // INITIALIZATION 
    function init() {
        debugAlert('🎊 SCRIPT INITIALIZATION STARTED!', false);
        
        // Setup contact scroll
        setupContactScroll();

        // Add behavior listeners
        document.addEventListener('DOMContentLoaded', initPageBehavior);
        window.addEventListener('load', initPageBehavior);
        
        debugAlert('🚀 INITIALIZATION COMPLETE!', false);
    }

    // RUN INITIALIZATION
    init();

    // EXPOSE DEBUG FUNCTIONS AND CONFIGURATION
    window.DEBUG_CONFIG = DEBUG_CONFIG;
    window.setFlag = setFlag;
    window.getFlag = getFlag;
    window.clearFlag = clearFlag;

    // FINAL INITIALIZATION ALERT
    debugAlert('🌈 SCRIPT FULLY LOADED AND READY!', false);
})();