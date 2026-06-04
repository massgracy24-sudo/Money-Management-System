# 🚖 CabGo — Premium Login Page Walkthrough

A complete step-by-step guide to implementing a dark-blue glassmorphism login page for your Cab Management System.

---

## 📁 Project File Structure (What You're Working With)

```
d:\Team_Techie_boys\Money-Management-System\
│
├── src/
│   ├── index.html                        ← Root HTML shell
│   ├── styles.css                        ← 🔵 STEP 1: Global styles & Google Font import
│   ├── main.ts                           ← App bootstrap (no changes)
│   │
│   └── app/
│       ├── app.component.ts              ← Root component (no changes)
│       ├── app.component.html            ← Just <router-outlet> (no changes)
│       ├── app.routes.ts                 ← Routes (no changes needed)
│       │
│       └── pages/
│           └── login/
│               ├── login.component.ts    ← 🔵 STEP 2: Add FormsModule + logic
│               ├── login.component.html  ← 🔵 STEP 3: Full premium HTML template
│               └── login.component.css   ← 🔵 STEP 4: All animations & glass styling
```

> **Why only 4 files?**
> Angular 19 uses **standalone components** — each component manages its own imports directly inside `@Component({ imports: [] })`. You don't need a separate `app.module.ts` anymore.

---

## 🔵 STEP 1 — Edit `src/styles.css`

**File path:** `d:\Team_Techie_boys\Money-Management-System\src\styles.css`

**Purpose:** Import the Google Font (`Inter`) globally so all components can use it, and reset browser defaults.

**Replace the entire file content with:**

```css
/* src/styles.css */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  width: 100%;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}
```

**What this does:**
- `@import` pulls the Inter font from Google Fonts (requires internet)
- `box-sizing: border-box` makes width/height calculations predictable
- `overflow: hidden` prevents scrollbars on the full-screen login page

---

## 🔵 STEP 2 — Edit `login.component.ts`

**File path:** `d:\Team_Techie_boys\Money-Management-System\src\app\pages\login\login.component.ts`

**Purpose:** Add `FormsModule` (for `ngModel` two-way binding), and add component logic for username, password, rememberMe state and the login handler.

**Replace the entire file content with:**

```typescript
// login.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // These variables are bound to the form inputs via [(ngModel)]
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;

  // Called when the Login button is clicked
  onLogin(): void {
    if (!this.username || !this.password) {
      alert('Please enter both username and password.');
      return;
    }

    this.isLoading = true;

    // Simulate an API call with a 2-second delay
    setTimeout(() => {
      this.isLoading = false;
      console.log('Login attempted:', {
        username: this.username,
        rememberMe: this.rememberMe
      });
      // TODO: Replace with your real authentication service call
    }, 2000);
  }

  // Toggle show/hide password
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
```

**Key Angular concepts used here:**
| Concept | What it does |
|---|---|
| `standalone: true` | Component works without NgModule (Angular 19 default) |
| `imports: [FormsModule]` | Enables `[(ngModel)]` for two-way data binding |
| `imports: [CommonModule]` | Enables `*ngIf`, `*ngFor` directives in the template |
| `[(ngModel)]="username"` | Syncs the input value ↔ component property automatically |

---

## 🔵 STEP 3 — Edit `login.component.html`

**File path:** `d:\Team_Techie_boys\Money-Management-System\src\app\pages\login\login.component.html`

**Purpose:** The full premium HTML template with glassmorphism card, animated background particles, cab SVG icons, logo, and all form fields.

**Replace the entire file content with:**

```html
<!-- login.component.html -->

<div class="login-wrapper">

  <!-- ✨ Animated floating background orbs -->
  <div class="bg-orb orb-1"></div>
  <div class="bg-orb orb-2"></div>
  <div class="bg-orb orb-3"></div>

  <!-- 🚖 Floating animated cab icons -->
  <div class="floating-cab cab-1">🚖</div>
  <div class="floating-cab cab-2">🚕</div>
  <div class="floating-cab cab-3">🚗</div>
  <div class="floating-cab cab-4">🚖</div>

  <!-- 🪟 Glassmorphism Login Card -->
  <div class="login-card">

    <!-- ═══ LEFT PANEL — Branding Side ═══ -->
    <div class="login-left">

      <!-- Road animation strip at bottom -->
      <div class="road-strip">
        <div class="road-line"></div>
        <div class="road-line"></div>
        <div class="road-line"></div>
      </div>

      <!-- Company Logo & Name -->
      <div class="brand-section">
        <div class="logo-circle">
          <span class="logo-icon">🚖</span>
        </div>
        <h1 class="company-name">CabGo</h1>
        <p class="company-tagline">Premium Cab Management System</p>
      </div>

      <!-- Feature highlights -->
      <div class="features-list">
        <div class="feature-item">
          <span class="feature-icon">📍</span>
          <span>Real-time GPS Tracking</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">👤</span>
          <span>Driver & Fleet Management</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">📊</span>
          <span>Ride Analytics & Reports</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">💳</span>
          <span>Seamless Payment Gateway</span>
        </div>
      </div>

      <!-- Decorative animated cab on road -->
      <div class="animated-cab">🚖💨</div>

    </div>

    <!-- ═══ RIGHT PANEL — Login Form ═══ -->
    <div class="login-right">

      <!-- Top greeting -->
      <div class="welcome-section">
        <h2 class="welcome-title">Welcome Back</h2>
        <p class="welcome-sub">Sign in to your CabGo dashboard</p>
      </div>

      <!-- Login Form -->
      <form class="login-form" (ngSubmit)="onLogin()">

        <!-- Username Field -->
        <div class="form-group">
          <label class="form-label" for="username">Username</label>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input
              id="username"
              class="form-input"
              type="text"
              placeholder="Enter your username"
              [(ngModel)]="username"
              name="username"
              autocomplete="username"
            />
          </div>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
              id="password"
              class="form-input"
              [type]="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              [(ngModel)]="password"
              name="password"
              autocomplete="current-password"
            />
            <!-- Toggle show/hide password -->
            <button
              type="button"
              class="eye-toggle"
              (click)="togglePassword()"
              [title]="showPassword ? 'Hide password' : 'Show password'"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <!-- Remember Me + Forgot Password row -->
        <div class="form-options">
          <label class="remember-label">
            <input
              type="checkbox"
              class="remember-checkbox"
              [(ngModel)]="rememberMe"
              name="rememberMe"
            />
            <span class="checkmark"></span>
            <span class="remember-text">Remember me</span>
          </label>
          <a href="#" class="forgot-link">Forgot Password?</a>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="login-btn"
          [class.loading]="isLoading"
          [disabled]="isLoading"
        >
          <span *ngIf="!isLoading" class="btn-content">
            <span>Login</span>
            <span class="btn-arrow">→</span>
          </span>
          <span *ngIf="isLoading" class="btn-spinner">
            <span class="spinner"></span>
            <span>Signing in...</span>
          </span>
        </button>

      </form>

      <!-- Footer note -->
      <p class="powered-by">🔐 Secured & Powered by <strong>CabGo Systems</strong></p>

    </div>

  </div>
</div>
```

**Key Angular template concepts used here:**
| Syntax | Meaning |
|---|---|
| `[(ngModel)]="username"` | Two-way binding: input ↔ component variable |
| `(ngSubmit)="onLogin()"` | Calls `onLogin()` when form is submitted |
| `(click)="togglePassword()"` | Event binding: calls method on click |
| `[type]="showPassword ? 'text' : 'password'"` | Property binding: dynamically sets HTML attribute |
| `[class.loading]="isLoading"` | Conditionally adds CSS class |
| `[disabled]="isLoading"` | Disables button when loading |
| `*ngIf="!isLoading"` | Shows/hides element based on condition |

---

## 🔵 STEP 4 — Edit `login.component.css`

**File path:** `d:\Team_Techie_boys\Money-Management-System\src\app\pages\login\login.component.css`

**Purpose:** All the magic — dark blue glassmorphism, animations, glows, floating cabs, road strip, responsive layout.

**Replace the entire file content with:**

```css
/* ============================================
   login.component.css
   Premium Dark-Blue Glassmorphism Login Page
   ============================================ */

/* ── Root wrapper: full screen dark blue bg ── */
.login-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #020818 0%, #0a1628 30%, #0d1f3c 60%, #071428 100%);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* ── Animated background orbs (ambient glow) ── */
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
  animation: orbFloat 8s ease-in-out infinite alternate;
}

.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #1a4fd6, #0a2a7a);
  top: -150px; left: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #00c6ff, #0072ff);
  bottom: -100px; right: -80px;
  animation-delay: 3s;
}

.orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, #1565c0, #0d47a1);
  top: 40%; left: 40%;
  animation-delay: 1.5s;
}

@keyframes orbFloat {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 40px) scale(1.15); }
}

/* ── Floating cab emojis in background ── */
.floating-cab {
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.12;
  animation: cabFloat 12s ease-in-out infinite;
  pointer-events: none;
  filter: drop-shadow(0 0 8px rgba(0, 198, 255, 0.4));
}

.cab-1 { top: 10%; left: 5%;  animation-delay: 0s;   animation-duration: 10s; }
.cab-2 { top: 70%; left: 8%;  animation-delay: 3s;   animation-duration: 13s; }
.cab-3 { top: 15%; right: 6%; animation-delay: 1.5s; animation-duration: 11s; }
.cab-4 { top: 75%; right: 5%; animation-delay: 4s;   animation-duration: 14s; }

@keyframes cabFloat {
  0%   { transform: translateY(0px)   rotate(0deg);   }
  25%  { transform: translateY(-20px) rotate(3deg);   }
  50%  { transform: translateY(-10px) rotate(-2deg);  }
  75%  { transform: translateY(-25px) rotate(2deg);   }
  100% { transform: translateY(0px)   rotate(0deg);   }
}

/* ── Main glass card ── */
.login-card {
  display: flex;
  width: 900px;
  max-width: 95vw;
  min-height: 560px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 40px 80px rgba(0, 0, 0, 0.6),
    0 0 60px rgba(26, 79, 214, 0.2);
  animation: cardEntrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  position: relative;
  z-index: 10;
}

@keyframes cardEntrance {
  0%   { opacity: 0; transform: translateY(60px) scale(0.92); }
  100% { opacity: 1; transform: translateY(0)    scale(1);    }
}

/* ════════════════════════════
   LEFT PANEL — Branding Side
   ════════════════════════════ */
.login-left {
  flex: 1.1;
  background: linear-gradient(160deg, #0d2060 0%, #0a1a4a 40%, #071428 100%);
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
}

/* Road animation at bottom of left panel */
.road-strip {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 6px;
  background: #1a3a7a;
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 0 20px;
  overflow: hidden;
}

.road-line {
  height: 2px;
  width: 60px;
  background: rgba(255, 220, 50, 0.7);
  animation: roadMove 1.5s linear infinite;
  flex-shrink: 0;
}

.road-line:nth-child(2) { animation-delay: 0.5s; }
.road-line:nth-child(3) { animation-delay: 1s;   }

@keyframes roadMove {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-120px); }
}

/* Brand section */
.brand-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.logo-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a4fd6, #00c6ff);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow:
    0 0 30px rgba(0, 198, 255, 0.4),
    0 0 60px rgba(26, 79, 214, 0.3);
  animation: logoPulse 3s ease-in-out infinite;
}

@keyframes logoPulse {
  0%, 100% { box-shadow: 0 0 30px rgba(0,198,255,0.4), 0 0 60px rgba(26,79,214,0.3); }
  50%       { box-shadow: 0 0 50px rgba(0,198,255,0.7), 0 0 90px rgba(26,79,214,0.5); }
}

.logo-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
}

.company-name {
  font-size: 2.4rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 2px;
  text-shadow: 0 0 20px rgba(0, 198, 255, 0.5);
  margin-bottom: 6px;
}

.company-tagline {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-align: center;
}

/* Features list */
.features-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.88rem;
  font-weight: 400;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(0, 198, 255, 0.3);
  transform: translateX(4px);
  color: #ffffff;
}

.feature-icon {
  font-size: 1.1rem;
}

/* Animated cab on road */
.animated-cab {
  position: absolute;
  bottom: 8px;
  left: -80px;
  font-size: 1.8rem;
  animation: driveAcross 6s linear infinite;
  filter: drop-shadow(0 0 6px rgba(0, 198, 255, 0.6));
}

@keyframes driveAcross {
  0%   { left: -80px;  opacity: 1; }
  90%  { opacity: 1; }
  100% { left: 110%;   opacity: 0; }
}

/* ════════════════════════════
   RIGHT PANEL — Login Form
   ════════════════════════════ */
.login-right {
  flex: 1;
  background: rgba(10, 22, 50, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 50px 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
}

/* Welcome section */
.welcome-section {
  margin-bottom: 32px;
}

.welcome-title {
  font-size: 1.9rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
}

.welcome-sub {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 400;
}

/* Form layout */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Input wrapper with icon */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  font-size: 1rem;
  pointer-events: none;
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: 13px 46px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #ffffff;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.88rem;
}

.form-input:focus {
  border-color: rgba(0, 198, 255, 0.5);
  background: rgba(255, 255, 255, 0.08);
  box-shadow:
    0 0 0 3px rgba(0, 198, 255, 0.12),
    0 0 20px rgba(0, 198, 255, 0.1);
}

/* Eye toggle button */
.eye-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.eye-toggle:hover {
  opacity: 1;
}

/* Remember me + Forgot password row */
.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -4px;
}

.remember-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.remember-checkbox {
  width: 16px;
  height: 16px;
  accent-color: #00c6ff;
  cursor: pointer;
  border-radius: 4px;
}

.remember-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

.forgot-link {
  font-size: 0.82rem;
  color: #00c6ff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #ffffff;
  text-decoration: underline;
}

/* Login button */
.login-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #1a4fd6 0%, #00a8e8 50%, #00c6ff 100%);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 24px rgba(26, 79, 214, 0.4);
  margin-top: 4px;
  position: relative;
  overflow: hidden;
}

/* Shimmer effect on button */
.login-btn::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  transition: left 0.5s ease;
}

.login-btn:hover::before {
  left: 100%;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(26, 79, 214, 0.55);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  cursor: not-allowed;
  opacity: 0.75;
}

.login-btn.loading {
  background: linear-gradient(135deg, #0d2060, #1a4fd6);
}

/* Button inner content */
.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-arrow {
  font-size: 1.1rem;
  transition: transform 0.2s;
}

.login-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

/* CSS spinner */
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Powered by footer */
.powered-by {
  margin-top: 20px;
  text-align: center;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.25);
}

.powered-by strong {
  color: rgba(0, 198, 255, 0.6);
}

/* ════════════════════════════
   RESPONSIVE — Mobile Layout
   ════════════════════════════ */
@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
    max-width: 94vw;
    min-height: unset;
  }

  .login-left {
    padding: 30px 24px;
    flex: unset;
  }

  .features-list {
    display: none; /* Hide feature list on mobile to save space */
  }

  .login-right {
    padding: 32px 24px;
  }

  .company-name {
    font-size: 1.8rem;
  }

  .animated-cab {
    display: none;
  }
}
```

---

## 📐 Visual Structure Explained

```
┌─────────────────────────────────────────────────────────────┐
│  login-wrapper (dark blue gradient fullscreen)              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   login-card                          │  │
│  │  ┌────────────────────┬──────────────────────────┐   │  │
│  │  │    login-left      │      login-right          │   │  │
│  │  │                    │                           │   │  │
│  │  │  [Logo Circle 🚖]  │  Welcome Back             │   │  │
│  │  │   CabGo            │                           │   │  │
│  │  │   Premium Cab...   │  [👤 username input]      │   │  │
│  │  │                    │  [🔒 password input]      │   │  │
│  │  │  📍 GPS Tracking   │  [☑ Remember] [Forgot?]  │   │  │
│  │  │  👤 Driver Mgmt    │  [    Login Button →  ]  │   │  │
│  │  │  📊 Analytics      │                           │   │  │
│  │  │  💳 Payments       │  🔐 Powered by CabGo     │   │  │
│  │  │                    │                           │   │  │
│  │  │  🚖💨 ─────────── │                           │   │  │
│  │  └────────────────────┴──────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Implementation Checklist

- [ ] **STEP 1** — Replace `src/styles.css` with the global font import + reset
- [ ] **STEP 2** — Replace `login.component.ts` with the FormsModule + logic
- [ ] **STEP 3** — Replace `login.component.html` with the full premium template
- [ ] **STEP 4** — Replace `login.component.css` with all animations & glass styles
- [ ] **Verify** — Run `npm start` and open `http://localhost:4200`

---

## 🚀 Quick Run Command

After completing all 4 steps, open your terminal in the project root and run:

```bash
npm start
```

Then visit: **http://localhost:4200**

---

## 🎨 Design Tokens Used

| Token | Value | Purpose |
|---|---|---|
| Background | `#020818 → #0d1f3c` | Deep dark navy gradient |
| Primary Blue | `#1a4fd6` | Buttons, glow accents |
| Accent Cyan | `#00c6ff` | Highlights, links, logo ring |
| Glass BG | `rgba(10,22,50,0.85)` | Right panel glass effect |
| Border | `rgba(255,255,255,0.1)` | Subtle input borders |
| Font | `Inter` | Premium sans-serif |

> [!TIP]
> You can rename "CabGo" to your actual company name in both the HTML and CSS files without breaking anything.

> [!NOTE]
> The `*ngIf` directives in the HTML require `CommonModule` to be imported in `login.component.ts` — which is already included in the STEP 2 code above.

> [!IMPORTANT]
> This project uses **Angular 19 with SSR (Server-Side Rendering)**. The `FormsModule` import must be inside the component's own `imports: []` array (not in any module file) because it uses the modern **standalone component** pattern.
