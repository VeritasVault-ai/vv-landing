# Scripts Directory

This directory contains utility scripts for the project.

## Files

- `audit-config.js` - Simplified AI configuration audit script
- `audit-config.ts` - TypeScript version of the audit script (requires ts-node)
- `simple-jscpd.js` - Simplified code duplication checker

## Usage

The simplified scripts are designed to work without external dependencies:

```bash
# Run AI config audit
npm run audit-config

# Run duplication check  
npm run dup-check
```

## Note

These are simplified versions of the audit tools that work without requiring additional dependencies like `ts-node`, `chalk`, `fast-glob`, or `jscpd`. They provide basic functionality for CI/CD environments where dependency installation might be restricted.

In production environments, you may want to use the full-featured versions of these tools with proper dependencies installed.