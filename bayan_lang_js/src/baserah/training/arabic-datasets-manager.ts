/**
 * مدير قواعد البيانات العربية للتدريب
 * Arabic Datasets Manager for Training
 * 
 * @author Basel Yahya Abdullah
 * @description نظام لتحميل وإدارة قواعد البيانات العربية من مصادر متعددة
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * معلومات قاعدة بيانات
 */
export interface DatasetInfo {
  name: string;
  description: string;
  source: string;
  type: 'text' | 'speech' | 'qa' | 'sentiment' | 'ner' | 'mixed';
  size: string;
  language: 'ar' | 'ar-en' | 'multi';
  license: string;
  downloadUrl?: string;
  huggingfaceId?: string;
  localPath?: string;
}

/**
 * قواعد البيانات العربية المتاحة
 */
export const ARABIC_DATASETS: DatasetInfo[] = [
  {
    name: 'Arabic Wikipedia',
    description: 'نسخة ويكيبيديا العربية الكاملة',
    source: 'Wikipedia',
    type: 'text',
    size: '~2GB',
    language: 'ar',
    license: 'CC BY-SA 3.0',
    downloadUrl: 'https://dumps.wikimedia.org/arwiki/latest/arwiki-latest-pages-articles.xml.bz2'
  },
  {
    name: 'OSCAR Arabic',
    description: 'مجموعة نصوص عربية ضخمة من الويب',
    source: 'OSCAR',
    type: 'text',
    size: '~95GB',
    language: 'ar',
    license: 'CC0',
    huggingfaceId: 'oscar-corpus/OSCAR-2301'
  },
  {
    name: 'Arabic Corpus (1.5B words)',
    description: 'مجموعة 1.5 مليار كلمة عربية',
    source: 'Various',
    type: 'text',
    size: '~10GB',
    language: 'ar',
    license: 'Various'
  },
  {
    name: 'AraBERT Dataset',
    description: 'مجموعة البيانات المستخدمة لتدريب AraBERT',
    source: 'AUB MIND Lab',
    type: 'text',
    size: '~70GB',
    language: 'ar',
    license: 'MIT',
    huggingfaceId: 'aubmindlab/bert-base-arabert'
  },
  {
    name: 'CAMeLBERT Dataset',
    description: 'مجموعة بيانات CAMeL Lab',
    source: 'NYU CAMeL Lab',
    type: 'text',
    size: '~167GB',
    language: 'ar',
    license: 'MIT',
    huggingfaceId: 'CAMeL-Lab/bert-base-arabic-camelbert-mix'
  },
  {
    name: 'Arabic Speech Corpus',
    description: 'مجموعة تسجيلات صوتية عربية',
    source: 'Arabic Speech Corpus',
    type: 'speech',
    size: '~50 hours',
    language: 'ar',
    license: 'CC BY 4.0',
    downloadUrl: 'http://en.arabicspeechcorpus.com/arabic-speech-corpus.zip'
  },
  {
    name: 'LABR (Large Arabic Book Reviews)',
    description: 'مراجعات كتب عربية لتحليل المشاعر',
    source: 'Mohamed Aly',
    type: 'sentiment',
    size: '~63K reviews',
    language: 'ar',
    license: 'Research',
    downloadUrl: 'https://github.com/mohamedadaly/LABR'
  },
  {
    name: 'Arabic Twitter Corpus (AJGT)',
    description: 'تغريدات عربية',
    source: 'Twitter',
    type: 'text',
    size: '~1M tweets',
    language: 'ar',
    license: 'Research',
    downloadUrl: 'https://github.com/komari6/Arabic-twitter-corpus-AJGT'
  },
  {
    name: 'Tashkeela Corpus',
    description: 'نصوص عربية مشكّلة',
    source: 'Tashkeela',
    type: 'text',
    size: '~75M words',
    language: 'ar',
    license: 'GPL',
    downloadUrl: 'https://sourceforge.net/projects/tashkeela/'
  },
  {
    name: 'Arabic Question Answering',
    description: 'أسئلة وأجوبة عربية',
    source: 'Wiki QA AR',
    type: 'qa',
    size: '~10K pairs',
    language: 'ar',
    license: 'CC BY-SA',
    huggingfaceId: 'wiki_qa_ar'
  },
  {
    name: 'Assafir News Articles',
    description: 'مقالات صحيفة السفير',
    source: 'Assafir',
    type: 'text',
    size: '~100K articles',
    language: 'ar',
    license: 'Research'
  },
  {
    name: 'OSIAN Corpus',
    description: 'مجموعة نصوص عربية متنوعة',
    source: 'OSIAN',
    type: 'text',
    size: '~10GB',
    language: 'ar',
    license: 'Research'
  }
];

/**
 * مدير قواعد البيانات العربية
 */
export class ArabicDatasetsManager {
  private datasetsDir: string;
  private downloadedDatasets: Map<string, DatasetInfo>;

  constructor(datasetsDir: string = './datasets') {
    this.datasetsDir = datasetsDir;
    this.downloadedDatasets = new Map();
    this.ensureDirectoryExists();
  }

  /**
   * التأكد من وجود المجلد
   */
  private ensureDirectoryExists(): void {
    if (!fs.existsSync(this.datasetsDir)) {
      fs.mkdirSync(this.datasetsDir, { recursive: true });
      console.log(`✅ تم إنشاء مجلد قواعد البيانات: ${this.datasetsDir}`);
    }
  }

  /**
   * عرض جميع قواعد البيانات المتاحة
   */
  listAvailableDatasets(): void {
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║           قواعد البيانات العربية المتاحة                     ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    ARABIC_DATASETS.forEach((dataset, index) => {
      console.log(`${index + 1}. ${dataset.name}`);
      console.log(`   الوصف: ${dataset.description}`);
      console.log(`   النوع: ${dataset.type}`);
      console.log(`   الحجم: ${dataset.size}`);
      console.log(`   اللغة: ${dataset.language}`);
      console.log(`   الترخيص: ${dataset.license}`);
      if (dataset.huggingfaceId) {
        console.log(`   🤗 HuggingFace: ${dataset.huggingfaceId}`);
      }
      if (dataset.downloadUrl) {
        console.log(`   🔗 رابط التحميل: ${dataset.downloadUrl}`);
      }
      console.log();
    });
  }

  /**
   * الحصول على قاعدة بيانات بالاسم
   */
  getDatasetByName(name: string): DatasetInfo | undefined {
    return ARABIC_DATASETS.find(d => d.name === name);
  }

  /**
   * تصفية قواعد البيانات حسب النوع
   */
  filterByType(type: string): DatasetInfo[] {
    return ARABIC_DATASETS.filter(d => d.type === type);
  }

  /**
   * تصفية قواعد البيانات حسب اللغة
   */
  filterByLanguage(language: string): DatasetInfo[] {
    return ARABIC_DATASETS.filter(d => d.language === language);
  }

  /**
   * إنشاء ملف تعليمات التحميل
   */
  generateDownloadInstructions(): void {
    const instructionsPath = path.join(this.datasetsDir, 'DOWNLOAD_INSTRUCTIONS.md');
    
    let content = '# تعليمات تحميل قواعد البيانات العربية\n';
    content += '# Arabic Datasets Download Instructions\n\n';
    content += '---\n\n';
    content += '## 📋 قواعد البيانات المتاحة\n\n';

    ARABIC_DATASETS.forEach((dataset, index) => {
      content += `### ${index + 1}. ${dataset.name}\n\n`;
      content += `**الوصف**: ${dataset.description}\n\n`;
      content += `**النوع**: ${dataset.type}\n`;
      content += `**الحجم**: ${dataset.size}\n`;
      content += `**اللغة**: ${dataset.language}\n`;
      content += `**الترخيص**: ${dataset.license}\n\n`;

      if (dataset.huggingfaceId) {
        content += '**التحميل من HuggingFace**:\n';
        content += '```python\n';
        content += 'from datasets import load_dataset\n';
        content += `dataset = load_dataset("${dataset.huggingfaceId}")\n`;
        content += '```\n\n';
        content += '**أو باستخدام CLI**:\n';
        content += '```bash\n';
        content += `huggingface-cli download ${dataset.huggingfaceId}\n`;
        content += '```\n\n';
      }

      if (dataset.downloadUrl) {
        content += '**التحميل المباشر**:\n';
        content += '```bash\n';
        content += `wget ${dataset.downloadUrl}\n`;
        content += '```\n\n';
      }

      content += '---\n\n';
    });

    content += '## 🛠️ أدوات مفيدة\n\n';
    content += '### تثبيت HuggingFace CLI\n';
    content += '```bash\n';
    content += 'pip install huggingface_hub\n';
    content += '```\n\n';

    content += '### تثبيت مكتبة datasets\n';
    content += '```bash\n';
    content += 'pip install datasets\n';
    content += '```\n\n';

    content += '## 📊 إحصائيات\n\n';
    content += `- **إجمالي قواعد البيانات**: ${ARABIC_DATASETS.length}\n`;
    content += `- **نصية**: ${this.filterByType('text').length}\n`;
    content += `- **صوتية**: ${this.filterByType('speech').length}\n`;
    content += `- **أسئلة وأجوبة**: ${this.filterByType('qa').length}\n`;
    content += `- **تحليل مشاعر**: ${this.filterByType('sentiment').length}\n\n`;

    fs.writeFileSync(instructionsPath, content, 'utf-8');
    console.log(`✅ تم إنشاء ملف التعليمات: ${instructionsPath}`);
  }

  /**
   * إنشاء سكريبت تحميل Python
   */
  generatePythonDownloadScript(): void {
    const scriptPath = path.join(this.datasetsDir, 'download_datasets.py');
    
    let content = '#!/usr/bin/env python3\n';
    content += '# -*- coding: utf-8 -*-\n';
    content += '"""\n';
    content += 'سكريبت تحميل قواعد البيانات العربية\n';
    content += 'Arabic Datasets Download Script\n';
    content += '"""\n\n';
    content += 'from datasets import load_dataset\n';
    content += 'import os\n\n';
    content += 'def download_dataset(dataset_id, save_path):\n';
    content += '    """تحميل قاعدة بيانات من HuggingFace"""\n';
    content += '    print(f"📥 جاري تحميل: {dataset_id}")\n';
    content += '    try:\n';
    content += '        dataset = load_dataset(dataset_id)\n';
    content += '        dataset.save_to_disk(save_path)\n';
    content += '        print(f"✅ تم التحميل بنجاح: {save_path}")\n';
    content += '        return True\n';
    content += '    except Exception as e:\n';
    content += '        print(f"❌ خطأ في التحميل: {e}")\n';
    content += '        return False\n\n';
    content += 'def main():\n';
    content += '    """الدالة الرئيسية"""\n';
    content += '    datasets_to_download = [\n';

    ARABIC_DATASETS.filter(d => d.huggingfaceId).forEach(dataset => {
      content += `        ("${dataset.huggingfaceId}", "${dataset.name.replace(/\s+/g, '_')}"),\n`;
    });

    content += '    ]\n\n';
    content += '    for dataset_id, name in datasets_to_download:\n';
    content += '        save_path = os.path.join("./", name)\n';
    content += '        download_dataset(dataset_id, save_path)\n\n';
    content += 'if __name__ == "__main__":\n';
    content += '    main()\n';

    fs.writeFileSync(scriptPath, content, 'utf-8');
    fs.chmodSync(scriptPath, '755');
    console.log(`✅ تم إنشاء سكريبت Python: ${scriptPath}`);
  }

  /**
   * إنشاء ملف README
   */
  generateReadme(): void {
    const readmePath = path.join(this.datasetsDir, 'README.md');
    
    let content = '# قواعد البيانات العربية للتدريب\n';
    content += '# Arabic Training Datasets\n\n';
    content += '---\n\n';
    content += '## 🎯 الهدف\n\n';
    content += 'هذا المجلد يحتوي على قواعد بيانات عربية لتدريب النموذج اللغوي التوليدي في لغة البيان.\n\n';
    content += '## 📊 الإحصائيات\n\n';
    content += `- **إجمالي قواعد البيانات المتاحة**: ${ARABIC_DATASETS.length}\n`;
    content += `- **الحجم الإجمالي التقريبي**: ~350GB+\n`;
    content += `- **عدد الكلمات التقريبي**: ~2 مليار كلمة\n\n`;
    content += '## 📁 البنية\n\n';
    content += '```\n';
    content += 'datasets/\n';
    content += '├── README.md                    # هذا الملف\n';
    content += '├── DOWNLOAD_INSTRUCTIONS.md     # تعليمات التحميل\n';
    content += '├── download_datasets.py         # سكريبت التحميل\n';
    content += '├── Arabic_Wikipedia/            # ويكيبيديا العربية\n';
    content += '├── OSCAR_Arabic/                # OSCAR\n';
    content += '├── AraBERT_Dataset/             # AraBERT\n';
    content += '└── ...\n';
    content += '```\n\n';
    content += '## 🚀 البدء السريع\n\n';
    content += '### 1. تثبيت المتطلبات\n';
    content += '```bash\n';
    content += 'pip install datasets huggingface_hub\n';
    content += '```\n\n';
    content += '### 2. تحميل قاعدة بيانات\n';
    content += '```bash\n';
    content += 'python download_datasets.py\n';
    content += '```\n\n';
    content += '### 3. استخدام في التدريب\n';
    content += '```typescript\n';
    content += 'import { LogicTrainingSystem } from "../training/logic-training-system";\n\n';
    content += 'const trainer = new LogicTrainingSystem();\n';
    content += 'await trainer.loadDataset("./datasets/Arabic_Wikipedia");\n';
    content += 'await trainer.train();\n';
    content += '```\n\n';
    content += '## 📚 المصادر\n\n';
    content += '- [HuggingFace Datasets](https://huggingface.co/datasets)\n';
    content += '- [Arabic NLP Resources](https://github.com/NNLP-IL/Arabic-Resources)\n';
    content += '- [AraBERT](https://github.com/aub-mind/arabert)\n';
    content += '- [CAMeLBERT](https://github.com/CAMeL-Lab/CAMeLBERT)\n\n';
    content += '## ⚖️ التراخيص\n\n';
    content += 'يرجى مراجعة ترخيص كل قاعدة بيانات قبل الاستخدام. معظم القواعد مفتوحة المصدر للأبحاث.\n\n';
    content += '---\n\n';
    content += '**© 2025 Basel Yahya Abdullah - Bayan Language Project**\n';

    fs.writeFileSync(readmePath, content, 'utf-8');
    console.log(`✅ تم إنشاء ملف README: ${readmePath}`);
  }

  /**
   * إنشاء جميع الملفات
   */
  generateAllFiles(): void {
    console.log('\n🚀 جاري إنشاء ملفات قواعد البيانات...\n');
    
    this.generateDownloadInstructions();
    this.generatePythonDownloadScript();
    this.generateReadme();
    
    console.log('\n✅ تم إنشاء جميع الملفات بنجاح!\n');
    console.log(`📁 المجلد: ${this.datasetsDir}\n`);
  }
}

// تصدير
export default ArabicDatasetsManager;

