# 🤝 Contributing to GRANTLY

Thank you for your interest in contributing to **GRANTLY: Rethinking the Scholarship Experience**! We welcome community contributions, bug reports, feature suggestions, and verified scholarship database updates.

---

## 📜 Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and harassment-free environment for all contributors, students, and educators regardless of race, gender, background, or identity.

---

## 🛠️ Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation Steps
1. Fork and clone the repository:
   ```bash
   git clone https://github.com/Bhargavi2048/Grantly.git
   cd Grantly
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
4. Access the web application at `http://localhost:5173`.

---

## 🧪 Quality Assurance Gates

All pull requests must pass the following verification gates before merging:

### 1. Static Type Checking
```bash
npm run typecheck
```
Must pass with **0 TypeScript errors** in strict mode.

### 2. Code Linting & Style
```bash
npm run lint
```
Must pass with **0 ESLint errors and 0 warnings**.

### 3. Automated Unit Tests
```bash
npm test
```
Must execute the test runner in `tests/runAllTests.js` with **100% assertions passing**.

### 4. Production Build
```bash
npm run build
```
Must generate an optimized, chunk-split production bundle without warnings.

---

## 📂 Project Architecture Guidelines

When adding or modifying components, please adhere to the project's layered architectural boundaries:

1. **`src/types/index.ts`**: All domain models and contracts must be strictly defined here. Avoid `any` types.
2. **`src/services/`**: Business logic, mathematical calculators, and NLP engines must remain pure functions independent of React DOM lifecycle hooks.
3. **`src/hooks/`**: Custom hooks encapsulate state, side effects, and storage persistence.
4. **`src/context/`**: Global state shared across views must be coordinated via `GrantlyContext`.
5. **`src/components/`**: UI components must use semantic HTML5 elements (`<article>`, `<nav>`, `<header>`, `<main>`, `<dialog>`), explicit ARIA attributes, and visible focus rings.
6. **`src/utils/security.ts`**: All external user inputs and URLs must be passed through `sanitizeText()` or `safeUrl()`.

---

## 📝 Commit & Branch Conventions

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
  - `feat: add renewal criteria indicator to scholarship card`
  - `fix: correct loan interest calculation in aid stacking simulator`
  - `docs: update architecture C4 diagrams in ARCHITECTURE.md`
  - `test: add edge cases for GPA clamping in security suite`
  - `refactor: extract export logic into exportService`
