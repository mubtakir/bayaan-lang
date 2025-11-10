# تعليمات تحميل قواعد البيانات العربية
# Arabic Datasets Download Instructions

---

## 📋 قواعد البيانات المتاحة

### 1. Arabic Wikipedia

**الوصف**: نسخة ويكيبيديا العربية الكاملة

**النوع**: text
**الحجم**: ~2GB
**اللغة**: ar
**الترخيص**: CC BY-SA 3.0

**التحميل المباشر**:
```bash
wget https://dumps.wikimedia.org/arwiki/latest/arwiki-latest-pages-articles.xml.bz2
```

---

### 2. OSCAR Arabic

**الوصف**: مجموعة نصوص عربية ضخمة من الويب

**النوع**: text
**الحجم**: ~95GB
**اللغة**: ar
**الترخيص**: CC0

**التحميل من HuggingFace**:
```python
from datasets import load_dataset
dataset = load_dataset("oscar-corpus/OSCAR-2301")
```

**أو باستخدام CLI**:
```bash
huggingface-cli download oscar-corpus/OSCAR-2301
```

---

### 3. Arabic Corpus (1.5B words)

**الوصف**: مجموعة 1.5 مليار كلمة عربية

**النوع**: text
**الحجم**: ~10GB
**اللغة**: ar
**الترخيص**: Various

---

### 4. AraBERT Dataset

**الوصف**: مجموعة البيانات المستخدمة لتدريب AraBERT

**النوع**: text
**الحجم**: ~70GB
**اللغة**: ar
**الترخيص**: MIT

**التحميل من HuggingFace**:
```python
from datasets import load_dataset
dataset = load_dataset("aubmindlab/bert-base-arabert")
```

**أو باستخدام CLI**:
```bash
huggingface-cli download aubmindlab/bert-base-arabert
```

---

### 5. CAMeLBERT Dataset

**الوصف**: مجموعة بيانات CAMeL Lab

**النوع**: text
**الحجم**: ~167GB
**اللغة**: ar
**الترخيص**: MIT

**التحميل من HuggingFace**:
```python
from datasets import load_dataset
dataset = load_dataset("CAMeL-Lab/bert-base-arabic-camelbert-mix")
```

**أو باستخدام CLI**:
```bash
huggingface-cli download CAMeL-Lab/bert-base-arabic-camelbert-mix
```

---

### 6. Arabic Speech Corpus

**الوصف**: مجموعة تسجيلات صوتية عربية

**النوع**: speech
**الحجم**: ~50 hours
**اللغة**: ar
**الترخيص**: CC BY 4.0

**التحميل المباشر**:
```bash
wget http://en.arabicspeechcorpus.com/arabic-speech-corpus.zip
```

---

### 7. LABR (Large Arabic Book Reviews)

**الوصف**: مراجعات كتب عربية لتحليل المشاعر

**النوع**: sentiment
**الحجم**: ~63K reviews
**اللغة**: ar
**الترخيص**: Research

**التحميل المباشر**:
```bash
wget https://github.com/mohamedadaly/LABR
```

---

### 8. Arabic Twitter Corpus (AJGT)

**الوصف**: تغريدات عربية

**النوع**: text
**الحجم**: ~1M tweets
**اللغة**: ar
**الترخيص**: Research

**التحميل المباشر**:
```bash
wget https://github.com/komari6/Arabic-twitter-corpus-AJGT
```

---

### 9. Tashkeela Corpus

**الوصف**: نصوص عربية مشكّلة

**النوع**: text
**الحجم**: ~75M words
**اللغة**: ar
**الترخيص**: GPL

**التحميل المباشر**:
```bash
wget https://sourceforge.net/projects/tashkeela/
```

---

### 10. Arabic Question Answering

**الوصف**: أسئلة وأجوبة عربية

**النوع**: qa
**الحجم**: ~10K pairs
**اللغة**: ar
**الترخيص**: CC BY-SA

**التحميل من HuggingFace**:
```python
from datasets import load_dataset
dataset = load_dataset("wiki_qa_ar")
```

**أو باستخدام CLI**:
```bash
huggingface-cli download wiki_qa_ar
```

---

### 11. Assafir News Articles

**الوصف**: مقالات صحيفة السفير

**النوع**: text
**الحجم**: ~100K articles
**اللغة**: ar
**الترخيص**: Research

---

### 12. OSIAN Corpus

**الوصف**: مجموعة نصوص عربية متنوعة

**النوع**: text
**الحجم**: ~10GB
**اللغة**: ar
**الترخيص**: Research

---

## 🛠️ أدوات مفيدة

### تثبيت HuggingFace CLI
```bash
pip install huggingface_hub
```

### تثبيت مكتبة datasets
```bash
pip install datasets
```

## 📊 إحصائيات

- **إجمالي قواعد البيانات**: 12
- **نصية**: 9
- **صوتية**: 1
- **أسئلة وأجوبة**: 1
- **تحليل مشاعر**: 1

