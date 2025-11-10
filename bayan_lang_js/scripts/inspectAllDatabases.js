/**
 * فحص جميع قواعد البيانات
 * Inspect All Databases
 */

const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_DIR = 'src/baserah/lexicon/databases';

async function inspectAllDatabases() {
  console.log('═'.repeat(80));
  console.log('🔍 فحص جميع قواعد البيانات | Inspecting All Databases');
  console.log('═'.repeat(80));
  console.log();

  // الحصول على قائمة قواعد البيانات
  const dbFiles = fs.readdirSync(DB_DIR).filter(f => f.endsWith('.db'));
  
  console.log(`📊 عدد قواعد البيانات: ${dbFiles.length}`);
  console.log();

  const SQL = await initSqlJs();
  const summary = [];

  for (const dbFile of dbFiles) {
    const dbPath = path.join(DB_DIR, dbFile);
    const stats = fs.statSync(dbPath);
    
    console.log('─'.repeat(80));
    console.log(`📁 ${dbFile}`);
    console.log(`   الحجم: ${(stats.size / 1024).toFixed(2)} KB`);
    
    try {
      const buffer = fs.readFileSync(dbPath);
      const db = new SQL.Database(buffer);
      
      // الحصول على الجداول
      const tablesResult = db.exec(
        "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"
      );
      
      if (!tablesResult.length || !tablesResult[0].values.length) {
        console.log('   ⚠️  لا توجد جداول');
        summary.push({
          file: dbFile,
          size: stats.size,
          tables: 0,
          totalRows: 0
        });
        db.close();
        continue;
      }

      const tables = tablesResult[0].values.map(row => row[0]);
      console.log(`   الجداول (${tables.length}):`);
      
      let totalRows = 0;
      const tableInfo = [];
      
      for (const table of tables) {
        const countResult = db.exec(`SELECT COUNT(*) FROM ${table};`);
        const count = countResult[0].values[0][0];
        totalRows += count;
        
        console.log(`      - ${table}: ${count.toLocaleString('ar-EG')} صف`);
        tableInfo.push({ name: table, rows: count });
        
        // عرض عينة من أول جدول فقط
        if (tables.indexOf(table) === 0) {
          const sampleResult = db.exec(`SELECT * FROM ${table} LIMIT 2;`);
          if (sampleResult.length && sampleResult[0].values.length) {
            console.log(`      عينة من ${table}:`);
            const columns = sampleResult[0].columns;
            console.log(`         الأعمدة: ${columns.join(', ')}`);
          }
        }
      }
      
      console.log(`   إجمالي الصفوف: ${totalRows.toLocaleString('ar-EG')}`);
      
      summary.push({
        file: dbFile,
        size: stats.size,
        tables: tables.length,
        totalRows: totalRows,
        tableInfo: tableInfo
      });
      
      db.close();
      
    } catch (error) {
      console.log(`   ❌ خطأ: ${error.message}`);
      summary.push({
        file: dbFile,
        size: stats.size,
        error: error.message
      });
    }
    
    console.log();
  }

  // ملخص إجمالي
  console.log('═'.repeat(80));
  console.log('📈 الملخص الإجمالي');
  console.log('═'.repeat(80));
  console.log();
  
  const totalSize = summary.reduce((sum, db) => sum + db.size, 0);
  const totalTables = summary.reduce((sum, db) => sum + (db.tables || 0), 0);
  const totalRows = summary.reduce((sum, db) => sum + (db.totalRows || 0), 0);
  
  console.log(`📁 عدد قواعد البيانات: ${dbFiles.length}`);
  console.log(`💾 الحجم الإجمالي: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 إجمالي الجداول: ${totalTables}`);
  console.log(`📝 إجمالي الصفوف: ${totalRows.toLocaleString('ar-EG')}`);
  console.log();
  
  // ترتيب حسب الحجم
  console.log('🏆 أكبر قواعد البيانات:');
  const sorted = [...summary].sort((a, b) => b.size - a.size).slice(0, 5);
  sorted.forEach((db, index) => {
    console.log(`   ${index + 1}. ${db.file}: ${(db.size / 1024).toFixed(2)} KB (${db.totalRows || 0} صف)`);
  });
  console.log();
  
  // حفظ الملخص
  const summaryPath = 'docs/ALL_DATABASES_SUMMARY.json';
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf-8');
  console.log(`✅ تم حفظ الملخص في: ${summaryPath}`);
  console.log();
  
  console.log('═'.repeat(80));
  console.log('✅ اكتمل الفحص!');
  console.log('═'.repeat(80));
}

inspectAllDatabases().catch(error => {
  console.error('❌ خطأ غير متوقع:', error);
  process.exit(1);
});

