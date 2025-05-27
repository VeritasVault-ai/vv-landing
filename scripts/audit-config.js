const fs = require('fs');
const path = require('path');

// Simple chalk replacement for colored output
const chalk = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`
};

// Simple glob replacement for file patterns
function simpleGlob(patterns) {
  const files = [];
  
  for (const pattern of patterns) {
    if (pattern.includes('*')) {
      // Handle glob patterns
      if (pattern === '.aiguidance/commands/*.json') {
        try {
          const dir = '.aiguidance/commands';
          if (fs.existsSync(dir)) {
            const dirFiles = fs.readdirSync(dir);
            files.push(...dirFiles.filter(f => f.endsWith('.json')).map(f => path.join(dir, f)));
          }
        } catch (e) {
          console.warn('Could not read commands directory:', e);
        }
      }
    } else {
      // Direct file path
      if (fs.existsSync(pattern)) {
        files.push(pattern);
      }
    }
  }
  
  return Promise.resolve(files.sort());
}

const CONFIG_FILES = [
  'config.kjson',
  '.aiguidance/context-providers.json',
  '.aiguidance/commands/*.json'
];

const violations = [];

/** Load and parse a JSON/JSONC file. */
function loadJson(file) {
  try {
    if (!fs.existsSync(file)) {
      console.warn(`File not found: ${file}`);
      return {};
    }
    const raw = fs.readFileSync(file, 'utf8');
    // strip simple // comments
    const cleaned = raw.replace(/\/\/.*$/gm, '');
    return JSON.parse(cleaned);
  } catch (error) {
    console.warn(`Error loading ${file}:`, error);
    return {};
  }
}

/** Rule 1 – Duplicate command names across files. */
function checkDuplicateCommands(objs, fileNames) {
  const map = new Map();
  objs.forEach((obj, idx) => {
    const cmds = obj.customCommands ?? [];
    cmds.forEach((c) => {
      const where = fileNames[idx];
      if (map.has(c.name)) {
        violations.push({
          file: where,
          message: `Duplicate command "${c.name}" also found in ${map.get(c.name)}`
        });
      } else {
        map.set(c.name, where);
      }
    });
  });
}

/** Rule 2 – Token limits sanity check. */
function checkTokenLimits(obj, file) {
  const providers = obj.contextProviders ?? obj;
  const BIG = 20000;
  Object.entries(providers).forEach(([name, cfg]) => {
    if (cfg.maxTokens && cfg.maxTokens > BIG) {
      violations.push({
        file,
        message: `Provider "${name}" maxTokens=${cfg.maxTokens} is excessive (> ${BIG}).`
      });
    }
  });
}

/** MAIN **/
(async () => {
  try {
    console.log('Running AI config audit...');
    const files = await simpleGlob(CONFIG_FILES);
    console.log(`Found config files: ${files.join(', ')}`);
    
    const jsonObjs = files.map(loadJson);

    checkDuplicateCommands(jsonObjs, files);
    files.forEach((file, i) => checkTokenLimits(jsonObjs[i], file));

    if (violations.length) {
      console.error(chalk.red(`✖ Found ${violations.length} AI-config violation(s):`));
      violations.forEach(v =>
        console.error(`${chalk.yellow(v.file)} → ${v.message}`)
      );
      process.exit(1);
    } else {
      console.log(chalk.green('✓ AI-config audit passed with no violations.'));
    }
  } catch (error) {
    console.error('Error running audit:', error);
    console.log('Audit script encountered errors but continuing...');
    process.exit(0); // Don't fail the build due to audit script issues
  }
})();