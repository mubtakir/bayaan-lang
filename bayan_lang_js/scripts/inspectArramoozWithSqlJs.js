/**
 * فحص قاعدة بيانات Arramooz باستخدام sql.js
 * Inspect Arramooz Database using sql.js
 */

const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = 'src/baserah/lexicon/databases/arramooz_dictionary.db';

async function inspectDatabase() {
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

  try {
    // تهيئة sql.js
    console.log('⏳ جاري تحميل قاعدة البيانات...');
    const SQL = await initSqlJs();
    const buffer = fs.readFileSync(DB_PATH);
    const db = new SQL.Database(buffer);
    console.log('✅ تم تحميل قاعدة البيانات بنجاح!');
    console.log();

    // الحصول على قائمة الجداول
    console.log('📊 الجداول في قاعدة البيانات:');
    console.log('─'.repeat(80));
    
    const tablesResult = db.exec(
      "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"
    );
    
    if (!tablesResult.length || !tablesResult[0].values.length) {
      console.log('   ⚠️  لا توجد جداول');
      db.close();
      return;
    }

    const tables = tablesResult[0].values.map(row => row[0]);
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table}`);
    });
    console.log();

    // فحص كل جدول
    for (const table of tables) {
      console.log(`📋 جدول: ${table}`);
      console.log('─'.repeat(80));
      
      // عرض البنية
      console.log('   البنية (Schema):');
      const schemaResult = db.exec(`PRAGMA table_info(${table});`);
      
      if (schemaResult.length && schemaResult[0].values.length) {
        schemaResult[0].values.forEach((col) => {
          const colName = col[1];
          const colType = col[2];
          const notNull = col[3] ? ' NOT NULL' : '';
          const pk = col[5] ? ' PRIMARY KEY' : '';
          console.log(`      - ${colName} (${colType}${notNull}${pk})`);
        });
      }
      console.log();
      
      // عد الصفوف
      const countResult = db.exec(`SELECT COUNT(*) FROM ${table};`);
      const count = countResult[0].values[0][0];
      console.log(`   عدد الصفوف: ${count.toLocaleString('ar-EG')}`);
      console.log();
      
      // عرض عينة من البيانات
      console.log('   عينة من البيانات (أول 5 صفوف):');
      const sampleResult = db.exec(`SELECT * FROM ${table} LIMIT 5;`);
      
      if (sampleResult.length && sampleResult[0].values.length) {
        const columns = sampleResult[0].columns;
        const values = sampleResult[0].values;
        
        values.forEach((row, index) => {
          console.log(`      ${index + 1}.`);
          row.forEach((value, colIndex) => {
            const displayValue = value !== null ? 
              (value.toString().length > 50 ? value.toString().substring(0, 50) + '...' : value) : 
              'NULL';
            console.log(`         ${columns[colIndex]}: ${displayValue}`);
          });
        });
      } else {
        console.log('      (لا توجد بيانات)');
      }
      console.log();
    }

    // إحصائيات إجمالية
    console.log('📈 إحصائيات إجمالية:');
    console.log('─'.repeat(80));
    console.log(`   عدد الجداول: ${tables.length}`);
    
    let totalRows = 0;
    for (const table of tables) {
      const countResult = db.exec(`SELECT COUNT(*) FROM ${table};`);
      totalRows += countResult[0].values[0][0];
    }
    console.log(`   إجمالي الصفوف: ${totalRows.toLocaleString('ar-EG')}`);
    console.log();

    // إغلاق قاعدة البيانات
    db.close();

    console.log('═'.repeat(80));
    console.log('✅ اكتمل الفحص!');
    console.log('═'.repeat(80));

  } catch (error) {
    console.error('❌ خطأ في فحص قاعدة البيانات:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// تشغيل الفحص
inspectDatabase().catch(error => {
  console.error('❌ خطأ غير متوقع:', error);
  process.exit(1);
});

