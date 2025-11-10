#!/usr/bin/env node

/**
 * واجهة سطر الأوامر للغة البيان
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { Lexer } from '../lexer/index.js';
import { Parser } from '../parser/index.js';
import { Compiler } from '../compiler/index.js';
import * as readline from 'readline';

const program = new Command();

program
  .name('البيان')
  .description('لغة البيان - لغة برمجة عربية هجينة')
  .version('1.0.0');

/**
 * أمر التشغيل
 */
program
  .command('تشغيل <ملف>')
  .alias('run')
  .description('تشغيل ملف بلغة البيان')
  .option('-d, --debug', 'تفعيل وضع التصحيح')
  .action(async (ملف: string, options: { debug?: boolean }) => {
    try {
      const spinner = ora('جاري قراءة الملف...').start();

      // قراءة الملف
      const مسار_كامل = path.resolve(ملف);
      if (!fs.existsSync(مسار_كامل)) {
        spinner.fail(chalk.red(`الملف غير موجود: ${ملف}`));
        process.exit(1);
      }

      const كود = fs.readFileSync(مسار_كامل, 'utf-8');
      spinner.text = 'جاري التحليل المعجمي...';

      // التحليل المعجمي
      const lexer = new Lexer(كود);
      const tokens = lexer.tokenize();

      if (options.debug) {
        console.log(chalk.blue('\n=== الرموز (Tokens) ==='));
        console.log(tokens.slice(0, 20)); // عرض أول 20 رمز
      }

      spinner.text = 'جاري التحليل النحوي...';

      // التحليل النحوي
      const parser = new Parser(tokens);
      const ast = parser.parse();

      if (options.debug) {
        console.log(chalk.blue('\n=== الشجرة التجريدية (AST) ==='));
        console.log(JSON.stringify(ast, null, 2).substring(0, 500) + '...');
      }

      spinner.text = 'جاري الترجمة إلى JavaScript...';

      // الترجمة
      const compiler = new Compiler({
        target: 'es2020',
        module: 'esm',
        includeRuntime: true,
      });

      const jsCode = compiler.compile(ast);

      if (options.debug) {
        console.log(chalk.blue('\n=== كود JavaScript ==='));
        console.log(jsCode.substring(0, 500) + '...');
      }

      spinner.text = 'جاري التنفيذ...';

      // حفظ الكود المترجم في ملف مؤقت
      const tempFile = path.join(
        path.dirname(مسار_كامل),
        `.${path.basename(ملف, '.بيان')}.temp.js`
      );

      fs.writeFileSync(tempFile, jsCode);

      spinner.succeed(chalk.green('تم التشغيل بنجاح!'));
      console.log(chalk.yellow('\n=== النتيجة ===\n'));

      // تنفيذ الكود
      try {
        await import(tempFile);
      } catch (error: any) {
        console.error(chalk.red('خطأ في التنفيذ:'), error.message);
        if (options.debug) {
          console.error(error.stack);
        }
      } finally {
        // حذف الملف المؤقت
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      }
    } catch (error: any) {
      console.error(chalk.red('خطأ:'), error.message);
      if (options.debug) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

/**
 * أمر الترجمة
 */
program
  .command('ترجم <ملف>')
  .alias('compile')
  .description('ترجمة ملف بلغة البيان إلى JavaScript')
  .option('-o, --output <ملف>', 'ملف الإخراج')
  .option('-t, --target <هدف>', 'إصدار JavaScript المستهدف (es5, es2015, es2020, esnext)', 'es2020')
  .option('-m, --module <نوع>', 'نظام الوحدات (commonjs, esm)', 'esm')
  .option('--no-runtime', 'عدم تضمين مكتبة التشغيل')
  .action((ملف: string, options: any) => {
    try {
      const spinner = ora('جاري قراءة الملف...').start();

      // قراءة الملف
      const مسار_كامل = path.resolve(ملف);
      if (!fs.existsSync(مسار_كامل)) {
        spinner.fail(chalk.red(`الملف غير موجود: ${ملف}`));
        process.exit(1);
      }

      const كود = fs.readFileSync(مسار_كامل, 'utf-8');
      spinner.text = 'جاري التحليل...';

      // التحليل
      const lexer = new Lexer(كود);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens);
      const ast = parser.parse();

      spinner.text = 'جاري الترجمة...';

      // الترجمة
      const compiler = new Compiler({
        target: options.target,
        module: options.module,
        includeRuntime: options.runtime,
      });

      const jsCode = compiler.compile(ast);

      // تحديد ملف الإخراج
      const ملف_إخراج = options.output || ملف.replace(/\.(بيان|bn)$/, '.js');
      const مسار_إخراج = path.resolve(ملف_إخراج);

      // حفظ الملف
      fs.writeFileSync(مسار_إخراج, jsCode);

      spinner.succeed(chalk.green(`تمت الترجمة بنجاح إلى: ${ملف_إخراج}`));
    } catch (error: any) {
      console.error(chalk.red('خطأ:'), error.message);
      process.exit(1);
    }
  });

/**
 * أمر الوضع التفاعلي (REPL)
 */
program
  .command('تفاعلي')
  .alias('repl')
  .description('تشغيل الوضع التفاعلي')
  .action(() => {
    console.log(chalk.cyan('='.repeat(50)));
    console.log(chalk.cyan.bold('  لغة البيان - الوضع التفاعلي'));
    console.log(chalk.cyan('='.repeat(50)));
    console.log(chalk.gray('اكتب الكود واضغط Enter للتنفيذ'));
    console.log(chalk.gray('اكتب "خروج" أو اضغط Ctrl+C للخروج\n'));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.green('البيان> '),
    });

    let multilineCode = '';
    let inMultilineMode = false;

    rl.prompt();

    rl.on('line', async (line: string) => {
      const trimmed = line.trim();

      // التحقق من أمر الخروج
      if (trimmed === 'خروج' || trimmed === 'exit') {
        console.log(chalk.yellow('وداعاً!'));
        process.exit(0);
      }

      // التحقق من أمر المساعدة
      if (trimmed === 'مساعدة' || trimmed === 'help') {
        console.log(chalk.cyan('\nالأوامر المتاحة:'));
        console.log(chalk.gray('  خروج / exit    - الخروج من الوضع التفاعلي'));
        console.log(chalk.gray('  مساعدة / help  - عرض هذه المساعدة'));
        console.log(chalk.gray('  مسح / clear    - مسح الشاشة\n'));
        rl.prompt();
        return;
      }

      // مسح الشاشة
      if (trimmed === 'مسح' || trimmed === 'clear') {
        console.clear();
        rl.prompt();
        return;
      }

      // التحقق من الوضع متعدد الأسطر
      if (trimmed.endsWith('{') || trimmed.endsWith('(') || trimmed.endsWith('[')) {
        inMultilineMode = true;
        multilineCode += line + '\n';
        rl.setPrompt(chalk.yellow('...   '));
        rl.prompt();
        return;
      }

      if (inMultilineMode) {
        multilineCode += line + '\n';
        
        if (trimmed.endsWith('}') || trimmed.endsWith(')') || trimmed.endsWith(']')) {
          inMultilineMode = false;
          line = multilineCode;
          multilineCode = '';
          rl.setPrompt(chalk.green('البيان> '));
        } else {
          rl.prompt();
          return;
        }
      }

      if (trimmed === '') {
        rl.prompt();
        return;
      }

      try {
        // التحليل والترجمة
        const lexer = new Lexer(line);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const compiler = new Compiler({
          target: 'es2020',
          module: 'esm',
          includeRuntime: true,
        });
        const jsCode = compiler.compile(ast);

        // التنفيذ
        const result = eval(jsCode);
        
        if (result !== undefined) {
          console.log(chalk.blue('←'), result);
        }
      } catch (error: any) {
        console.error(chalk.red('خطأ:'), error.message);
      }

      rl.prompt();
    });

    rl.on('close', () => {
      console.log(chalk.yellow('\nوداعاً!'));
      process.exit(0);
    });
  });

/**
 * أمر التحقق من الصحة
 */
program
  .command('تحقق <ملف>')
  .alias('check')
  .description('التحقق من صحة ملف بلغة البيان دون تنفيذه')
  .action((ملف: string) => {
    try {
      const spinner = ora('جاري التحقق...').start();

      // قراءة الملف
      const مسار_كامل = path.resolve(ملف);
      if (!fs.existsSync(مسار_كامل)) {
        spinner.fail(chalk.red(`الملف غير موجود: ${ملف}`));
        process.exit(1);
      }

      const كود = fs.readFileSync(مسار_كامل, 'utf-8');

      // التحليل
      const lexer = new Lexer(كود);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens);
      parser.parse();

      spinner.succeed(chalk.green('الملف صحيح! ✓'));
    } catch (error: any) {
      console.error(chalk.red('خطأ في الملف:'), error.message);
      process.exit(1);
    }
  });

// تحليل الأوامر
program.parse(process.argv);

// عرض المساعدة إذا لم يتم تمرير أي أمر
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

