import chalk from 'chalk';
import glob from 'fast-glob';
import fs from 'fs';
import { exit } from 'process';

const CONFIG_FILES = [
  'config.kjson',
  '.aiguidance/context-providers.json',
  '.aiguidance/commands/*.json'
];

type Violation = { file: string; message: string };

const violations: Violation[] = [];

/** Load and parse a JSON/JSONC file. */
function loadJson(file: string): any {
  const raw = fs.readFileSync(file, 'utf8');
  // strip simple // comments
  const cleaned = raw.replace(/\/\/.*$/gm, '');
  return JSON.parse(cleaned);
}

/** Rule 1 – Duplicate command names across files. */
function checkDuplicateCommands(objs: Record<string, any>[], fileNames: string[]) {
  const map = new Map<string, string>();
  objs.forEach((obj, idx) => {
    const cmds = obj.customCommands ?? [];
    cmds.forEach((c: any) => {
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
function checkTokenLimits(obj: any, file: string) {
  const providers = obj.contextProviders ?? obj;
  const BIG = 20000;
  Object.entries(providers).forEach(([name, cfg]: [string, any]) => {
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
  const files = (await glob(CONFIG_FILES)).sort();
  const jsonObjs = files.map(loadJson);

  checkDuplicateCommands(jsonObjs, files);
  files.forEach((file, i) => checkTokenLimits(jsonObjs[i], file));

  if (violations.length) {
    console.error(chalk.red(`✖ Found ${violations.length} AI-config violation(s):`));
    violations.forEach(v =>
      console.error(`${chalk.yellow(v.file)} → ${v.message}`)
    );
    exit(1);
  } else {
    console.log(chalk.green('✓ AI-config audit passed with no violations.'));
  }
})();
