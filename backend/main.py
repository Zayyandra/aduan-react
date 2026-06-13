"""
Backend FastAPI — Klasifikasi Aduan Layanan Publik
Model didownload otomatis dari Hugging Face Model Hub saat startup.
"""
import re
import os
import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import BertTokenizer, BertForSequenceClassification
from huggingface_hub import snapshot_download

# ============================================================
# 1. Download + Load model dari HF Hub (sekali saat startup)
# ============================================================

# Ganti dengan username/nama-repo model kamu di HF
HF_MODEL_REPO = os.getenv("HF_MODEL_REPO", "Zayyandra/indobert-aduan-klasifikasi")
MODEL_DIR = "/tmp/indobert-aduan"

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print(f"Downloading model dari {HF_MODEL_REPO} ...")
snapshot_download(repo_id=HF_MODEL_REPO, local_dir=MODEL_DIR)
print("Download selesai. Loading model...")

tokenizer = BertTokenizer.from_pretrained(MODEL_DIR)
model = BertForSequenceClassification.from_pretrained(MODEL_DIR).to(device)
model.eval()
id2label = model.config.id2label
print("Model siap. Label:", id2label)

# ============================================================
# 2. Preprocessing — sama persis dengan text_light saat training
# ============================================================
def text_light(t):
    t = str(t).lower()
    t = re.sub(r'\brt\b', ' ', t)
    t = re.sub(r'http\S+|www\.\S+', ' ', t)
    t = re.sub(r'@\w+', ' ', t)
    t = re.sub(r'#\w+', ' ', t)
    t = re.sub(r'&\w+;', ' ', t)
    t = re.sub(r'[^\w\s]', ' ', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t

# ============================================================
# 3. Deteksi sentimen berbasis leksikon
# ============================================================
NEG_WORDS = {
    'rusak','buruk','parah','lambat','telat','mahal','susah','sulit',
    'kotor','mampet','tersumbat','penuh','sesak','pungli','bocor','ambruk',
    'jorok','kumuh','ditolak','mengecewakan','kecewa','menumpuk','berserakan',
    'padam','mati','tidak','belum','jarang','keluhan','mengeluh','protes',
    'macet','banjir','liar','sembarangan','dipersulit','berbelit','lama',
    'buruk','telantar','overload','ribet','bau','kotor','jorok',
}

POS_WORDS = {
    'bagus','baik','cepat','ramah','nyaman','bersih','memuaskan','membantu',
    'lengkap','mudah','tepat','lancar','tertib','rapi','terawat','maju',
    'berkualitas','sigap','tanggap','gratis','rajin','puas','terbantu',
    'mantap','keren','apresiasi','terima','diperbaiki','meningkat',
}

def deteksi_sentimen(t: str) -> dict:
    words = re.findall(r'[a-z]+', t.lower())
    pos = [w for w in words if w in POS_WORDS]
    neg = [w for w in words if w in NEG_WORDS]
    skor_pos = len(pos)
    skor_neg = len(neg)
    if skor_pos > skor_neg:
        label = 'positif'
    elif skor_neg > skor_pos:
        label = 'negatif'
    else:
        label = 'netral'
    return {
        'label': label,
        'skor_positif': skor_pos,
        'skor_negatif': skor_neg,
        'kata_positif': pos,
        'kata_negatif': neg,
    }

# ============================================================
# 4. Setup FastAPI
# ============================================================
app = FastAPI(title="Klasifikasi Aduan Layanan Publik")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class AduanInput(BaseModel):
    teks: str

@app.get("/")
def root():
    return {"status": "ok", "pesan": "API klasifikasi aduan aktif"}

@app.post("/predict")
def predict(data: AduanInput):
    teks_bersih = text_light(data.teks)
    if not teks_bersih:
        return {"error": "Teks kosong setelah dibersihkan"}

    enc = tokenizer(
        teks_bersih, truncation=True, padding="max_length",
        max_length=128, return_tensors="pt"
    )
    enc = {k: v.to(device) for k, v in enc.items()}

    with torch.no_grad():
        logits = model(**enc).logits
        probs = torch.softmax(logits, dim=1)[0]

    idx = int(probs.argmax())
    semua = {id2label[i]: round(float(probs[i]), 4) for i in range(len(probs))}
    sentimen = deteksi_sentimen(teks_bersih)

    return {
        "kategori": id2label[idx],
        "confidence": round(float(probs[idx]), 4),
        "semua_skor": semua,
        "sentimen": sentimen['label'],
        "sentimen_detail": {
            "skor_positif": sentimen['skor_positif'],
            "skor_negatif": sentimen['skor_negatif'],
            "kata_positif": sentimen['kata_positif'],
            "kata_negatif": sentimen['kata_negatif'],
        }
    }