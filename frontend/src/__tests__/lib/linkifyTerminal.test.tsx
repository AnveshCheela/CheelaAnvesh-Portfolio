// @vitest-environment jsdom

import '../setup/dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderLine } from '@/lib/linkifyTerminal';

/**
 * renderLine makes URLs/emails in terminal output clickable while preserving
 * whitespace alignment, and must never linkify box-drawing ASCII art.
 */

describe('renderLine', () => {
  it('linkifies an email as a mailto: anchor', () => {
    render(<div>{renderLine('  mail  anvesh.cheela@example.com', true)}</div>);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'mailto:anvesh.cheela@example.com');
  });

  it('linkifies a bare known host as an https anchor', () => {
    render(<div>{renderLine('  code  github.com/AnveshCheela', true)}</div>);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com/AnveshCheela');
  });

  it('never linkifies box-drawing ASCII art', () => {
    render(<div>{renderLine('╔═══════════════════════╗', true)}</div>);
    expect(screen.queryByRole('link')).toBeNull();
  });
});
