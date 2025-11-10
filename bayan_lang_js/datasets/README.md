# قواعد البيانات العربية للتدريب
# Arabic Training Datasets

---

## 🎯 الهدف

هذا المجلد يحتوي على قواعد بيانات عربية لتدريب النموذج اللغوي التوليدي في لغة البيان.

## 📊 الإحصائيات

- **إجمالي قواعد البيانات المتاحة**: 12
- **الحجم الإجمالي التقريبي**: ~350GB+
- **عدد الكلمات التقريبي**: ~2 مليار كلمة

## 📁 البنية

```
datasets/
├── README.md                    # هذا الملف
├── DOWNLOAD_INSTRUCTIONS.md     # تعليمات التحميل
├── download_datasets.py         # سكريبت التحميل
├── Arabic_Wikipedia/            # ويكيبيديا العربية
├── OSCAR_Arabic/                # OSCAR
├── AraBERT_Dataset/             # AraBERT
└── ...
```

## 🚀 البدء السريع

### 1. تثبيت المتطلبات
```bash
pip install datasets huggingface_hub
```

### 2. تحميل قاعدة بيانات
```bash
python download_datasets.py
```

### 3. استخدام في التدريب
```typescript
import { LogicTrainingSystem } from "../training/logic-training-system";

const trainer = new LogicTrainingSystem();
await trainer.loadDataset("./datasets/Arabic_Wikipedia");
await trainer.train();
```

## 📚 المصادر

- [HuggingFace Datasets](https://huggingface.co/datasets)
- [Arabic NLP Resources](https://github.com/NNLP-IL/Arabic-Resources)
- [AraBERT](https://github.com/aub-mind/arabert)
- [CAMeLBERT](https://github.com/CAMeL-Lab/CAMeLBERT)

## ⚖️ التراخيص

يرجى مراجعة ترخيص كل قاعدة بيانات قبل الاستخدام. معظم القواعد مفتوحة المصدر للأبحاث.

---

**© 2025 Basel Yahya Abdullah - Bayan Language Project**
