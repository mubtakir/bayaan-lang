#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
سكريبت تحميل قواعد البيانات العربية
Arabic Datasets Download Script
"""

from datasets import load_dataset
import os

def download_dataset(dataset_id, save_path):
    """تحميل قاعدة بيانات من HuggingFace"""
    print(f"📥 جاري تحميل: {dataset_id}")
    try:
        dataset = load_dataset(dataset_id)
        dataset.save_to_disk(save_path)
        print(f"✅ تم التحميل بنجاح: {save_path}")
        return True
    except Exception as e:
        print(f"❌ خطأ في التحميل: {e}")
        return False

def main():
    """الدالة الرئيسية"""
    datasets_to_download = [
        ("oscar-corpus/OSCAR-2301", "OSCAR_Arabic"),
        ("aubmindlab/bert-base-arabert", "AraBERT_Dataset"),
        ("CAMeL-Lab/bert-base-arabic-camelbert-mix", "CAMeLBERT_Dataset"),
        ("wiki_qa_ar", "Arabic_Question_Answering"),
    ]

    for dataset_id, name in datasets_to_download:
        save_path = os.path.join("./", name)
        download_dataset(dataset_id, save_path)

if __name__ == "__main__":
    main()
