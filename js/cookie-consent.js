/**
 * Cookie Consent Manager for YBSRewards Website
 * This script handles the cookie consent banner and settings functionality
 */

// Cookie Consent Manager
class CookieConsentManager {
    constructor() {
        this.cookieConsentName = 'ybsrewards_cookie_consent';
        this.cookieConsentBanner = null;
        this.cookieSettingsModal = null;
        this.cookieOptions = {
            necessary: true, // Always required
            analytics: false,
            marketing: false,
            preferences: false
        };
        
        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => this.init());
    }
    
    init() {
        // Check if consent has already been given
        const savedConsent = this.getCookieConsent();
        
        if (savedConsent) {
            // User has already made a choice, apply those settings
            this.cookieOptions = savedConsent;
            this.applyConsentSettings();
        } else {
            // User hasn't made a choice yet, show the banner
            this.createConsentBanner();
            this.createSettingsModal();
            this.showConsentBanner();
        }
    }
    
    createConsentBanner() {
        // Create the banner element
        const banner = document.createElement('div');
        banner.className = 'cookie-consent';
        banner.innerHTML = `
            <div class="cookie-text">
                We use cookies to enhance your experience on our website. By continuing to browse, you agree to our 
                <a href="privacy-policy.html">Privacy Policy</a>. You can manage your preferences in Cookie Settings.
            </div>
            <div class="cookie-buttons">
                <button class="cookie-btn cookie-btn-settings">Cookie Settings</button>
                <button class="cookie-btn cookie-btn-accept">Accept All</button>
            </div>
        `;
        
        // Add event listeners
        banner.querySelector('.cookie-btn-accept').addEventListener('click', () => {
            this.acceptAllCookies();
        });
        
        banner.querySelector('.cookie-btn-settings').addEventListener('click', () => {
            this.showSettingsModal();
        });
        
        // Add to the DOM
        document.body.appendChild(banner);
        this.cookieConsentBanner = banner;
    }
    
    createSettingsModal() {
        // Create the modal element
        const modal = document.createElement('div');
        modal.className = 'cookie-settings-modal';
        modal.innerHTML = `
            <div class="cookie-settings-content">
                <div class="cookie-settings-header">
                    <h3>Cookie Settings</h3>
                    <button class="cookie-settings-close">&times;</button>
                </div>
                <div class="cookie-settings-options">
                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <span class="cookie-option-title">Necessary Cookies</span>
                            <label class="cookie-toggle">
                                <input type="checkbox" checked disabled>
                                <span class="cookie-toggle-slider"></span>
                            </label>
                        </div>
                        <p class="cookie-option-description">
                            These cookies are essential for the website to function properly and cannot be disabled.
                        </p>
                    </div>
                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <span class="cookie-option-title">Analytics Cookies</span>
                            <label class="cookie-toggle">
                                <input type="checkbox" name="analytics">
                                <span class="cookie-toggle-slider"></span>
                            </label>
                        </div>
                        <p class="cookie-option-description">
                            These cookies help us understand how visitors interact with our website, helping us improve our services.
                        </p>
                    </div>
                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <span class="cookie-option-title">Marketing Cookies</span>
                            <label class="cookie-toggle">
                                <input type="checkbox" name="marketing">
                                <span class="cookie-toggle-slider"></span>
                            </label>
                        </div>
                        <p class="cookie-option-description">
                            These cookies are used to track visitors across websites to display relevant advertisements.
                        </p>
                    </div>
                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <span class="cookie-option-title">Preference Cookies</span>
                            <label class="cookie-toggle">
                                <input type="checkbox" name="preferences">
                                <span class="cookie-toggle-slider"></span>
                            </label>
                        </div>
                        <p class="cookie-option-description">
                            These cookies enable personalized features and remember your preferences on our website.
                        </p>
                    </div>
                </div>
                <div class="cookie-settings-actions">
                    <button class="cookie-btn cookie-btn-settings">Reject All</button>
                    <button class="cookie-btn cookie-btn-accept">Save Preferences</button>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.cookie-settings-close').addEventListener('click', () => {
            this.hideSettingsModal();
        });
        
        modal.querySelector('.cookie-settings-actions .cookie-btn-settings').addEventListener('click', () => {
            this.rejectAllCookies();
        });
        
        modal.querySelector('.cookie-settings-actions .cookie-btn-accept').addEventListener('click', () => {
            this.savePreferences();
        });
        
        // Set initial toggle states based on current options
        const toggles = modal.querySelectorAll('.cookie-toggle input[type="checkbox"]:not([disabled])');
        toggles.forEach(toggle => {
            const name = toggle.getAttribute('name');
            if (name && this.cookieOptions[name] !== undefined) {
                toggle.checked = this.cookieOptions[name];
            }
        });
        
        // Add to the DOM
        document.body.appendChild(modal);
        this.cookieSettingsModal = modal;
    }
    
    showConsentBanner() {
        // Small delay to ensure smooth animation
        setTimeout(() => {
            this.cookieConsentBanner.classList.add('show');
        }, 300);
    }
    
    hideConsentBanner() {
        this.cookieConsentBanner.classList.remove('show');
        // Remove from DOM after animation completes
        setTimeout(() => {
            this.cookieConsentBanner.remove();
        }, 300);
    }
    
    showSettingsModal() {
        this.cookieSettingsModal.classList.add('show');
    }
    
    hideSettingsModal() {
        this.cookieSettingsModal.classList.remove('show');
    }
    
    acceptAllCookies() {
        // Set all cookie options to true
        Object.keys(this.cookieOptions).forEach(key => {
            this.cookieOptions[key] = true;
        });
        
        // Save the consent
        this.saveConsentToCookie();
        this.applyConsentSettings();
        this.hideConsentBanner();
    }
    
    rejectAllCookies() {
        // Set all optional cookie options to false
        Object.keys(this.cookieOptions).forEach(key => {
            if (key !== 'necessary') { // Necessary cookies are always required
                this.cookieOptions[key] = false;
            }
        });
        
        // Save the consent
        this.saveConsentToCookie();
        this.applyConsentSettings();
        this.hideSettingsModal();
        this.hideConsentBanner();
    }
    
    savePreferences() {
        // Get values from toggles
        const toggles = this.cookieSettingsModal.querySelectorAll('.cookie-toggle input[type="checkbox"]:not([disabled])');
        toggles.forEach(toggle => {
            const name = toggle.getAttribute('name');
            if (name && this.cookieOptions[name] !== undefined) {
                this.cookieOptions[name] = toggle.checked;
            }
        });
        
        // Save the consent
        this.saveConsentToCookie();
        this.applyConsentSettings();
        this.hideSettingsModal();
        this.hideConsentBanner();
    }
    
    saveConsentToCookie() {
        // Save consent options to a cookie that expires in 6 months
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 6);
        
        document.cookie = `${this.cookieConsentName}=${JSON.stringify(this.cookieOptions)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    }
    
    getCookieConsent() {
        // Get the consent cookie if it exists
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(this.cookieConsentName + '=')) {
                try {
                    return JSON.parse(cookie.substring(this.cookieConsentName.length + 1));
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    }
    
    applyConsentSettings() {
        // Apply the consent settings to the website
        // This would typically involve enabling/disabling various tracking scripts
        
        // For example, if analytics is enabled, you might load Google Analytics
        if (this.cookieOptions.analytics) {
            // Code to load analytics scripts would go here
            console.log('Analytics cookies enabled');
        }
        
        // If marketing is enabled, you might load ad-related scripts
        if (this.cookieOptions.marketing) {
            // Code to load marketing scripts would go here
            console.log('Marketing cookies enabled');
        }
        
        // If preferences is enabled, you might enable personalization features
        if (this.cookieOptions.preferences) {
            // Code to enable preference-based features would go here
            console.log('Preference cookies enabled');
        }
    }
}

// Initialize the Cookie Consent Manager
const cookieManager = new CookieConsentManager();
