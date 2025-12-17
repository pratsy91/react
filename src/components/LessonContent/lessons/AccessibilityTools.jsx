import { useState } from 'react';

function AccessibilityTools() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Accessibility Tools</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">axe DevTools</h3>
        <p className="text-gray-700 mb-4">
          Use axe DevTools to find and fix accessibility issues.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
// Browser extension: axe DevTools
// npm package: @axe-core/react

// React integration
import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1000);
  });
}

// Automated testing
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should have no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Common violations
// - Missing alt text on images
// - Missing form labels
// - Insufficient color contrast
// - Missing ARIA labels
// - Keyboard navigation issues
// - Focus management problems

// axe-core API
import axe from 'axe-core';

axe.run(document, (err, results) => {
  if (err) throw err;
  console.log(results.violations);
});

// Specific rules
axe.run(document, {
  rules: {
    'color-contrast': { enabled: true },
    'image-alt': { enabled: true }
  }
}, (err, results) => {
  // Results
});

// Tags
axe.run(document, {
  tags: ['wcag2a', 'wcag2aa', 'best-practice']
}, callback);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Lighthouse</h3>
        <p className="text-gray-700 mb-4">
          Use Lighthouse to audit accessibility in Chrome DevTools.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Lighthouse in Chrome DevTools
// 1. Open DevTools (F12)
// 2. Go to Lighthouse tab
// 3. Select Accessibility
// 4. Click "Generate report"

// Lighthouse CI
// npm install -g @lhci/cli

// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.9 }]
      }
    }
  }
};

// Run Lighthouse CI
lhci autorun

// Accessibility checks
// - ARIA attributes
// - Color contrast
// - Form labels
// - Image alt text
// - Heading hierarchy
// - Keyboard navigation
// - Focus indicators

// Programmatic usage
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['accessibility']
  };
  const runnerResult = await lighthouse('http://localhost:3000', options);
  
  await chrome.kill();
  return runnerResult;
}

// Accessibility score
// 90-100: Good
// 50-89: Needs improvement
// 0-49: Poor`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Testing Accessibility</h3>
        <p className="text-gray-700 mb-4">
          Test accessibility in your React components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// @testing-library/react accessibility
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('component is accessible', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Accessibility queries
import { screen } from '@testing-library/react';

// Get by role
const button = screen.getByRole('button', { name: 'Submit' });

// Get by label
const input = screen.getByLabelText('Email');

// Get by text
const heading = screen.getByText('Welcome');

// Accessibility matchers
import '@testing-library/jest-dom';

expect(button).toBeInTheDocument();
expect(button).toBeVisible();
expect(button).toHaveFocus();
expect(input).toHaveAccessibleName('Email');
expect(input).toHaveAccessibleDescription('Enter your email');

// Keyboard navigation testing
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();
await user.tab();
await user.keyboard('{Enter}');
await user.keyboard('{Escape}');

// Screen reader testing
// Use @testing-library with screen reader simulation

// Color contrast testing
// Use tools like:
// - WebAIM Contrast Checker
// - Colour Contrast Analyser
// - Chrome DevTools

// WCAG contrast ratios
// AA: 4.5:1 for normal text, 3:1 for large text
// AAA: 7:1 for normal text, 4.5:1 for large text

// Automated contrast testing
import { getContrast } from 'polished';

const contrast = getContrast('#000', '#fff'); // 21
const meetsAA = contrast >= 4.5;

// Focus testing
test('focus management', () => {
  const { container } = render(<Modal isOpen={true} />);
  const firstFocusable = container.querySelector('button');
  expect(firstFocusable).toHaveFocus();
});

// ARIA testing
test('ARIA attributes', () => {
  render(<Button aria-label="Close" />);
  const button = screen.getByRole('button', { name: 'Close' });
  expect(button).toHaveAttribute('aria-label', 'Close');
});

// Semantic HTML testing
test('semantic structure', () => {
  const { container } = render(<Page />);
  expect(container.querySelector('main')).toBeInTheDocument();
  expect(container.querySelector('nav')).toBeInTheDocument();
});

// Accessibility checklist
// ✓ All images have alt text
// ✓ All form inputs have labels
// ✓ All interactive elements are keyboard accessible
// ✓ Focus indicators are visible
// ✓ Color contrast meets WCAG standards
// ✓ Headings are in logical order
// ✓ ARIA attributes are used correctly
// ✓ Live regions are used for dynamic content
// ✓ Skip links are provided
// ✓ Focus is managed in modals`}</pre>
        </div>
      </section>
    </div>
  );
}

export default AccessibilityTools;

