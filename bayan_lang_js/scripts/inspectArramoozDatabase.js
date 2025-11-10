/**
 * فحص قاعدة بيانات Arramooz
 * Inspect Arramooz Database
 * 
 * هذا السكريبت يفحص بنية قاعدة بيانات Arramooz ويعرض معلومات عنها
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DB_PATH = 'src/baserah/lexicon/databases/arramooz_dictionary.db';

console.log('═'.repeat(80));
console.log('🔍 فحص قاعدة بيانات Arramooz | Inspecting Arramooz Database');
console.log('═'.repeat(80));
console.log();

// التحقق من وجود الملف
if (!fs.existsSync(DB_PATH)) {
  console.error('❌ قاعدة البيانات غير موجودة:', DB_PATH);
  process.exit(1);
}

// عرض معلومات الملف
const stats = fs.statSync(DB_PATH);
console.log('📁 معلومات الملف:');
console.log(`   المسار: ${DB_PATH}`);
console.log(`   الحجم: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`   تاريخ التعديل: ${stats.mtime.toLocaleString('ar-EG')}`);
console.log();

// التحقق من توفر sqlite3
try {
  execSync('which sqlite3', { stdio: 'ignore' });
} catch (error) {
  console.log('⚠️  sqlite3 غير مثبت. جاري التثبيت...');
  console.log('   يرجى تشغيل: sudo apt install sqlite3');
  console.log();
  console.log('📊 معلومات أساسية فقط متوفرة حالياً.');
  process.exit(0);
}

console.log('✅ sqlite3 متوفر!');
console.log();

// فحص الجداول
console.log('📊 الجداول في قاعدة البيانات:');
console.log('─'.repeat(80));

try {
  const tables = execSync(
    `sqlite3 "${DB_PATH}" "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"`,
    { encoding: 'utf-8' }
  ).trim().split('\n');
  
  if (tables.length === 0 || tables[0] === '') {
    console.log('   ⚠️  لا توجد جداول');
  } else {
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table}`);
    });
  }
  console.log();
  
  // فحص كل جدول
  tables.forEach((table) => {
    if (!table) return;
    
    console.log(`📋 جدول: ${table}`);
    console.log('─'.repeat(80));
    
    // عرض البنية
    console.log('   البنية (Schema):');
    const schema = execSync(
      `sqlite3 "${DB_PATH}" "PRAGMA table_info(${table});"`,
      { encoding: 'utf-8' }
    ).trim();
    
    if (schema) {
      const columns = schema.split('\n');
      columns.forEach((col) => {
        const parts = col.split('|');
        if (parts.length >= 3) {
          console.log(`      - ${parts[1]} (${parts[2]})`);
        }
      });
    }
    
    // عد الصفوف
    const count = execSync(
      `sqlite3 "${DB_PATH}" "SELECT COUNT(*) FROM ${table};"`,
      { encoding: 'utf-8' }
    ).trim();
    console.log(`   عدد الصفوف: ${count}`);
    
    // عرض عينة من البيانات
    console.log('   عينة من البيانات (أول 3 صفوف):');
    const sample = execSync(
      `sqlite3 "${DB_PATH}" "SELECT * FROM ${table} LIMIT 3;"`,
      { encoding: 'utf-8' }
    ).trim();
    
    if (sample) {
      const rows = sample.split('\n');
      rows.forEach((row, index) => {
        console.log(`      ${index + 1}. ${row}`);
      });
    } else {
      console.log('      (لا توجد بيانات)');
    }
    
    console.log();
  });
  
} catch (error) {
  console.error('❌ خطأ في فحص قاعدة البيانات:', error.message);
  process.exit(1);
}

console.log('═'.repeat(80));
console.log('✅ اكتمل الفحص!');
console.log('═'.repeat(80));

