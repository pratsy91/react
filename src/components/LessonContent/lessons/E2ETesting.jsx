import { useState } from 'react';

function E2ETesting() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">E2E Testing</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding End-to-End (E2E) Testing</h3>
        <p className="text-blue-800 mb-2">
          End-to-End (E2E) testing involves testing your application from the user's perspective. E2E tests simulate real user 
          interactions with your application in a real browser environment, testing the entire flow from start to finish. This 
          type of testing catches integration issues that unit and integration tests might miss.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>User Perspective:</strong> Tests from the user's point of view</li>
            <li><strong>Real Browser:</strong> Runs in actual browser environments</li>
            <li><strong>Full Stack:</strong> Tests entire application stack</li>
            <li><strong>Integration Testing:</strong> Tests how components work together</li>
            <li><strong>Critical Paths:</strong> Focus on important user flows</li>
            <li><strong>Slower Execution:</strong> Takes longer than unit tests</li>
          </ul>
          <p className="mt-2"><strong>Popular E2E Tools:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Playwright:</strong> Modern, fast, supports multiple browsers</li>
            <li><strong>Cypress:</strong> Developer-friendly, great DX, time-travel debugging</li>
            <li><strong>Selenium:</strong> Mature, widely used, supports many languages</li>
            <li><strong>Puppeteer:</strong> Chrome/Chromium automation</li>
          </ul>
          <p className="mt-2"><strong>When to Use E2E Testing:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Testing critical user flows (login, checkout, etc.)</li>
            <li>Verifying integration between frontend and backend</li>
            <li>Testing cross-browser compatibility</li>
            <li>Regression testing before releases</li>
            <li>Testing user journeys end-to-end</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Playwright</h3>
        <p className="text-gray-700 mb-4">
          Playwright is a modern end-to-end testing framework for web applications.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install -D @playwright/test
npx playwright install

// Basic test
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});

// Interacting with elements
test('user can login', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL(/dashboard/);
});

// Waiting for elements
test('waits for element', async ({ page }) => {
  await page.goto('https://example.com');
  await page.waitForSelector('.loaded');
  await expect(page.locator('.loaded')).toBeVisible();
});

// Multiple pages
test('multiple pages', async ({ context }) => {
  const page1 = await context.newPage();
  const page2 = await context.newPage();
  
  await page1.goto('https://example.com');
  await page2.goto('https://example.com');
});

// Screenshots and videos
test('takes screenshot', async ({ page }) => {
  await page.goto('https://example.com');
  await page.screenshot({ path: 'screenshot.png' });
});

// API testing
test('API request', async ({ request }) => {
  const response = await request.get('https://api.example.com/users');
  expect(response.ok()).toBeTruthy();
  expect(response.json()).toHaveProperty('data');
});

// Fixtures
import { test as base } from '@playwright/test';

const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('https://example.com/login');
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await use(page);
  }
});

test('authenticated test', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('https://example.com/dashboard');
  // Test authenticated features
});

// Playwright config
// playwright.config.js
module.exports = {
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Cypress</h3>
        <p className="text-gray-700 mb-4">
          Cypress is a JavaScript end-to-end testing framework.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install -D cypress

// Basic test
describe('Homepage', () => {
  it('loads successfully', () => {
    cy.visit('https://example.com');
    cy.contains('Welcome');
  });
});

// Interacting with elements
describe('Login', () => {
  it('user can login', () => {
    cy.visit('https://example.com/login');
    
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
  });
});

// Commands
cy.get('.selector'); // Find element
cy.contains('text'); // Find by text
cy.click(); // Click
cy.type('text'); // Type
cy.clear(); // Clear input
cy.select('option'); // Select option
cy.check(); // Check checkbox
cy.uncheck(); // Uncheck checkbox
cy.trigger('event'); // Trigger event

// Assertions
cy.get('.element').should('be.visible');
cy.get('.element').should('contain', 'text');
cy.get('.element').should('have.class', 'active');
cy.get('.element').should('have.attr', 'href', '/link');
cy.url().should('include', '/path');
cy.title().should('eq', 'Page Title');

// Waiting
cy.wait(1000); // Wait milliseconds
cy.wait('@apiCall'); // Wait for API call
cy.get('.element', { timeout: 10000 }); // Custom timeout

// Custom commands
// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Usage
cy.login('user@example.com', 'password123');

// Fixtures
cy.fixture('users.json').then((users) => {
  cy.get('input[name="email"]').type(users[0].email);
});

// Intercept API calls
cy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers');
cy.visit('/users');
cy.wait('@getUsers');

// Cypress config
// cypress.config.js
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // Setup
    }
  }
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Component Testing</h3>
        <p className="text-gray-700 mb-4">
          Test React components in isolation with E2E tools.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Playwright Component Testing
import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from './Button';

test('button clicks', async ({ mount }) => {
  const component = await mount(<Button onClick={() => console.log('clicked')}>Click me</Button>);
  await component.click();
  // Assertions
});

// Cypress Component Testing
import { mount } from 'cypress/react18';
import { Button } from './Button';

describe('Button', () => {
  it('renders', () => {
    mount(<Button>Click me</Button>);
    cy.contains('Click me').should('be.visible');
  });
  
  it('handles click', () => {
    const onClick = cy.stub();
    mount(<Button onClick={onClick}>Click me</Button>);
    cy.contains('Click me').click();
    cy.wrap(onClick).should('have.been.called');
  });
});

// Testing Library with Playwright
import { test, expect } from '@playwright/experimental-ct-react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

test('login form', async ({ mount }) => {
  await mount(<LoginForm />);
  
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'Submit' });
  
  await userEvent.type(emailInput, 'user@example.com');
  await userEvent.type(passwordInput, 'password123');
  await userEvent.click(submitButton);
  
  await expect(screen.getByText('Welcome')).toBeVisible();
});

// Component testing setup
// playwright-ct.config.js
import { defineConfig } from '@playwright/experimental-ct-react';

export default defineConfig({
  testDir: './src',
  use: {
    ctPort: 3100
  }
});

// Cypress component testing setup
// cypress.config.js
module.exports = {
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    }
  }
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Comparison: Playwright vs Cypress</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Feature</th>
                <th className="text-left p-2">Playwright</th>
                <th className="text-left p-2">Cypress</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Browser support</td>
                <td className="p-2">Chromium, Firefox, WebKit</td>
                <td className="p-2">Chrome, Firefox, Edge, Electron</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Speed</td>
                <td className="p-2">Faster (parallel execution)</td>
                <td className="p-2">Slower (sequential)</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">API testing</td>
                <td className="p-2">✓ Built-in</td>
                <td className="p-2">Requires cy.request</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Multiple tabs</td>
                <td className="p-2">✓ Native support</td>
                <td className="p-2">Limited</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Time travel</td>
                <td className="p-2">❌</td>
                <td className="p-2">✓ Cypress UI</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Component testing</td>
                <td className="p-2">✓ Experimental</td>
                <td className="p-2">✓ Stable</td>
              </tr>
              <tr>
                <td className="p-2">Learning curve</td>
                <td className="p-2">Moderate</td>
                <td className="p-2">Easier</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Practices</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-4">
            <li><strong>Test user flows:</strong> Focus on what users actually do</li>
            <li><strong>Use data-testid:</strong> Prefer stable selectors over CSS classes</li>
            <li><strong>Wait explicitly:</strong> Don't use fixed timeouts, wait for elements</li>
            <li><strong>Isolate tests:</strong> Each test should be independent</li>
            <li><strong>Clean up:</strong> Reset state between tests</li>
            <li><strong>Use fixtures:</strong> Share test data across tests</li>
            <li><strong>Mock external APIs:</strong> Don't rely on real APIs in tests</li>
            <li><strong>Run in CI/CD:</strong> Automate E2E tests in your pipeline</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default E2ETesting;

