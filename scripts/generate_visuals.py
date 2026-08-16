"""
================================================================================
BPS ECONOMIC SENTIMENT DYNAMICS - STATIC VISUALIZATIONS GENERATOR
================================================================================

Description:
    Script Python ini mereplikasi dan menghasilkan 9 grafik visualisasi statis 
    berkualitas tinggi (Format PNG @ 180 DPI) berdasarkan dataset otentik BPS 
    ('BPS_ITB_ITK_Master_Data.xlsx').

Output Visualizations:
    1. 01_line_chart_itb_itk.png      - Dinamika Sentimen Bisnis dan Konsumen Indonesia
    2. 02_annual_average.png          - Perubahan Sentimen Ekonomi dari Tahun ke Tahun
    3. 03_sentiment_gap.png           - Divergensi Sentimen Bisnis dan Konsumen
    4. 04_quadrant_itb_itk.png        - Peta Kondisi Sentimen Bisnis dan Konsumen
    5. 05_heatmap_itb.png             - Peta Intensitas Sentimen Bisnis (ITB)
    6. 06_heatmap_itk.png             - Peta Intensitas Sentimen Konsumen (ITK)
    7. 07_distribution_kde.png        - Distribusi Sentimen Bisnis dan Konsumen (KDE)
    8. 08_boxplot_quarterly.png       - Variasi Sentimen Berdasarkan Kuartal
    9. 09_statistical_overview.png    - Gambaran Umum Statistik Sentimen Ekonomi Indonesia

Author: Ikhsan Kamal (Data Analyst / BI Developer)
Project: Business and Consumer Sentiment Dynamics (BPS Indonesia)
================================================================================
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
from matplotlib.lines import Line2D

# Setup Project Relative Paths
BASE_DIR = Path(__file__).resolve().parent.parent
EXCEL_INPUT = BASE_DIR / "BPS_ITB_ITK_Master_Data.xlsx"
JSON_INPUT = BASE_DIR / "src" / "data" / "master_sentiment_data.json"
OUT = BASE_DIR / "output" / "Indonesia_Economic_Sentiment_Visuals"
OUT.mkdir(parents=True, exist_ok=True)

def run_visual_generator():
    # Pipeline Continuity: Prefer clean validated JSON from validate_data.py, fallback to Excel
    if JSON_INPUT.exists():
        print(f"[PIPELINE] Membaca data hasil validasi dari: {JSON_INPUT.name}")
        df = pd.read_json(JSON_INPUT).sort_values(["Tahun", "Kuartal_Num"]).reset_index(drop=True)
    elif EXCEL_INPUT.exists():
        print(f"[PIPELINE] Membaca data dari Excel mentah: {EXCEL_INPUT.name}")
        df = pd.read_excel(EXCEL_INPUT, sheet_name="Master_Data").sort_values(["Tahun", "Kuartal_Num"]).reset_index(drop=True)
    else:
        print(f"[ERROR] File dataset input tidak ditemukan di {JSON_INPUT} maupun {EXCEL_INPUT}!")
        return

    # Statistics Calculation
    n = len(df)
    mean_itb, mean_itk = df.ITB.mean(), df.ITK.mean()
    median_itb, median_itk = df.ITB.median(), df.ITK.median()
    std_itb, std_itk = df.ITB.std(), df.ITK.std()
    corr = df.ITB.corr(df.ITK)
    mean_gap = df.Gap_ITB_ITK.mean()
    itk_higher = int((df.ITK > df.ITB).sum())
    itb_higher = int((df.ITB > df.ITK).sum())
    counts = df.Quadrant.value_counts()
    bo = int(counts.get("Broad Optimism", 0))
    bl = int(counts.get("Business-led", 0))
    cl = int(counts.get("Consumer-led", 0))
    bp = int(counts.get("Broad Pessimism", 0))
    min_gap = df.loc[df.Gap_ITB_ITK.idxmin()]
    max_gap = df.loc[df.Gap_ITB_ITK.idxmax()]

    annual = df.groupby("Tahun")[["ITB", "ITK"]].mean().reset_index()
    quarterly = df.groupby("Kuartal_Num")[["ITB", "ITK"]].mean()
    qnames = ["Q1", "Q2", "Q3", "Q4"]

    def finish(fig, name, narrative, insight):
        fig.text(.02, .075, "Narasi: " + narrative, fontsize=9.5, wrap=True)
        fig.text(.02, .035, insight, fontsize=10, fontweight="bold", wrap=True)
        fig.subplots_adjust(bottom=.24)
        path = OUT / name
        fig.savefig(path, dpi=180, bbox_inches="tight")
        plt.close(fig)
        print(f"[SUCCESS] Berhasil dibuat: {path.name}")

    # 1. Line Chart ITB vs ITK
    fig, ax = plt.subplots(figsize=(14, 7))
    ax.plot(df.Periode, df.ITB, marker="o", ms=3, label="ITB", color="#0095DA", lw=2)
    ax.plot(df.Periode, df.ITK, marker="o", ms=3, label="ITK", color="#57B736", lw=2)
    ax.axhline(100, ls="--", lw=1, color="gray", label="Level Netral = 100")
    ax.set_title("Dinamika Sentimen Bisnis dan Konsumen Indonesia", fontsize=17, fontweight="bold")
    ax.text(0, 1.02, "Pergerakan ITB dan ITK secara kuartalan, 2000 Q2–2020 Q1", transform=ax.transAxes)
    ax.set_ylabel("Indeks")
    ax.set_xlabel("Periode")
    ax.set_xticks(range(0, n, 4))
    ax.set_xticklabels(df.Periode.iloc[::4], rotation=45, ha="right")
    ax.grid(axis="y", alpha=.25)
    ax.legend()
    finish(fig, "01_line_chart_itb_itk.png",
        f"Rata-rata ITB {mean_itb:.2f}, ITK {mean_itk:.2f}. Korelasi {corr:.3f} menunjukkan hubungan positif namun moderat.",
        f"KEY INSIGHT: ITK lebih tinggi rata-rata, tetapi keduanya tidak selalu bergerak searah (r={corr:.3f}).")

    # 2. Annual Average Bar Chart
    fig, ax = plt.subplots(figsize=(14, 7))
    x = np.arange(len(annual))
    w = .38
    ax.bar(x - w / 2, annual.ITB, w, label="ITB", color="#0095DA")
    ax.bar(x + w / 2, annual.ITK, w, label="ITK", color="#57B736")
    ax.axhline(100, ls="--", lw=1, color="gray", label="Level Netral = 100")
    ax.set_title("Perubahan Sentimen Ekonomi dari Tahun ke Tahun", fontsize=17, fontweight="bold")
    ax.text(0, 1.02, "Rata-rata tahunan ITB dan ITK berdasarkan observasi kuartalan", transform=ax.transAxes)
    ax.set_xticks(x)
    ax.set_xticklabels(annual.Tahun, rotation=45)
    ax.set_ylabel("Rata-rata Indeks")
    ax.grid(axis="y", alpha=.25)
    ax.legend()
    best_itb = annual.loc[annual.ITB.idxmax()]
    best_itk = annual.loc[annual.ITK.idxmax()]
    worst_itb = annual.loc[annual.ITB.idxmin()]
    worst_itk = annual.loc[annual.ITK.idxmin()]
    finish(fig, "02_annual_average.png",
        f"ITB tertinggi {int(best_itb.Tahun)} ({best_itb.ITB:.2f}); ITK tertinggi {int(best_itk.Tahun)} ({best_itk.ITK:.2f}). ITB terendah {int(worst_itb.Tahun)} ({worst_itb.ITB:.2f}); ITK terendah {int(worst_itk.Tahun)} ({worst_itk.ITK:.2f}).",
        f"KEY INSIGHT: {int(worst_itk.Tahun)} menjadi titik terlemah ITK dengan rata-rata {worst_itk.ITK:.2f}.")

    # 3. Sentiment Gap Bar Chart
    fig, ax = plt.subplots(figsize=(14, 7))
    bars = ax.bar(np.arange(n), df.Gap_ITB_ITK, color=["#57B736" if g >= 0 else "#dc2626" for g in df.Gap_ITB_ITK])
    ax.axhline(0, lw=1, color="gray")
    ax.set_title("Divergensi Sentimen Bisnis dan Konsumen", fontsize=17, fontweight="bold")
    ax.text(0, 1.02, "Selisih ITB − ITK pada setiap kuartal", transform=ax.transAxes)
    ax.set_xticks(np.arange(0, n, 4))
    ax.set_xticklabels(df.Periode.iloc[::4], rotation=45, ha="right")
    ax.set_ylabel("ITB − ITK")
    ax.grid(axis="y", alpha=.25)
    finish(fig, "03_sentiment_gap.png",
        f"ITK lebih tinggi pada {itk_higher}/{n} kuartal ({itk_higher/n*100:.1f}%), ITB lebih tinggi pada {itb_higher}/{n}. Rata-rata gap {mean_gap:.2f}. Ekstrem: {min_gap.Periode} {min_gap.Gap_ITB_ITK:.2f}; {max_gap.Periode} +{max_gap.Gap_ITB_ITK:.2f}.",
        f"KEY INSIGHT: ITK > ITB pada {itk_higher/n*100:.0f}% observasi.")

    # 4. Quadrant Scatter Plot
    fig, ax = plt.subplots(figsize=(9, 8))
    colors = ["#57B736" if q == "Broad Optimism" else "#0095DA" if q == "Business-led" else "#E77400" if q == "Consumer-led" else "#dc2626" for q in df.Quadrant]
    ax.scatter(df.ITB, df.ITK, s=55, alpha=.75, c=colors)
    ax.axvline(100, ls="--", lw=1, color="gray")
    ax.axhline(100, ls="--", lw=1, color="gray")
    ax.set_title("Peta Kondisi Sentimen Bisnis dan Konsumen", fontsize=17, fontweight="bold")
    ax.text(0, 1.02, "Klasifikasi kuartal berdasarkan posisi ITB dan ITK terhadap level netral 100", transform=ax.transAxes)
    ax.set_xlabel("ITB")
    ax.set_ylabel("ITK")
    ax.grid(alpha=.2)
    finish(fig, "04_quadrant_itb_itk.png",
        f"{bo}/{n} kuartal ({bo/n*100:.2f}%) Broad Optimism; {bl} Business-led; {cl} Consumer-led; {bp} Broad Pessimism.",
        f"KEY INSIGHT: Broad Optimism mendominasi {bo/n*100:.2f}% observasi.")

    # 5 & 6. Heatmaps ITB & ITK
    for indicator, num, title, subtitle, filename, stdv in [
        ("ITB", 5, "Peta Intensitas Sentimen Bisnis", "Distribusi ITB berdasarkan tahun dan kuartal dengan level 100 sebagai benchmark netral", "05_heatmap_itb.png", std_itb),
        ("ITK", 6, "Peta Intensitas Sentimen Konsumen", "Distribusi ITK berdasarkan tahun dan kuartal dengan level 100 sebagai benchmark netral", "06_heatmap_itk.png", std_itk)
    ]:
        piv = df.pivot(index="Tahun", columns="Kuartal_Num", values=indicator)
        fig, ax = plt.subplots(figsize=(9, 9))
        cmap = "Blues" if indicator == "ITB" else "Greens"
        im = ax.imshow(piv.values, aspect="auto", cmap=cmap)
        ax.set_title(title, fontsize=17, fontweight="bold", pad=28)
        ax.text(0, 1.02, subtitle, transform=ax.transAxes)
        ax.set_xticks(range(4))
        ax.set_xticklabels(qnames)
        ax.set_yticks(range(len(piv)))
        ax.set_yticklabels(piv.index)
        ax.set_xlabel("Kuartal")
        ax.set_ylabel("Tahun")
        fig.colorbar(im, ax=ax, label=indicator)
        mn = df.loc[df[indicator].idxmin()]
        mx = df.loc[df[indicator].idxmax()]
        finish(fig, filename, f"{indicator} memiliki standar deviasi {stdv:.2f}. Nilai minimum {mn.Periode} ({mn[indicator]:.2f}); maksimum {mx.Periode} ({mx[indicator]:.2f}).",
               f"KEY INSIGHT: {indicator} memiliki volatilitas {'lebih tinggi' if indicator=='ITK' else 'lebih rendah'} daripada indikator pembanding.")

    # 7. KDE Density Chart
    def kde_func(v, g):
        v = np.asarray(v, float)
        h = 1.06 * v.std(ddof=1) * len(v)**(-1/5)
        z = (g[:, None] - v[None, :]) / h
        return np.exp(-.5 * z * z).sum(axis=1) / (len(v) * h * np.sqrt(2 * np.pi))

    grid = np.linspace(min(df.ITB.min(), df.ITK.min()) - 3, max(df.ITB.max(), df.ITK.max()) + 3, 500)
    fig, ax = plt.subplots(figsize=(11, 7))
    ax.plot(grid, kde_func(df.ITB, grid), lw=2, label="ITB", color="#0095DA")
    ax.plot(grid, kde_func(df.ITK, grid), lw=2, label="ITK", color="#57B736")
    ax.axvline(100, ls=":", lw=1.2, color="gray", label="Level Netral = 100")
    ax.axvline(mean_itb, ls="--", lw=1, color="#0095DA", label=f"Mean ITB = {mean_itb:.2f}")
    ax.axvline(mean_itk, ls="--", lw=1, color="#57B736", label=f"Mean ITK = {mean_itk:.2f}")
    ax.set_title("Distribusi Sentimen Bisnis dan Konsumen", fontsize=17, fontweight="bold")
    ax.text(0, 1.02, "Perbandingan pusat distribusi dan tingkat penyebaran ITB dan ITK", transform=ax.transAxes)
    ax.set_xlabel("Nilai Indeks")
    ax.set_ylabel("Density")
    ax.grid(axis="y", alpha=.25)
    ax.legend()
    finish(fig, "07_distribution_kde.png", f"ITK mean {mean_itk:.2f}, median {median_itk:.2f}, SD {std_itk:.2f}; ITB mean {mean_itb:.2f}, median {median_itb:.2f}, SD {std_itb:.2f}.",
        "KEY INSIGHT: ITK lebih tinggi sekaligus lebih volatil; ITB lebih rendah namun lebih stabil.")

    # 8. Boxplot Quarterly Chart
    fig, ax = plt.subplots(figsize=(12, 7))
    pos1 = [1, 4, 7, 10]
    pos2 = [2, 5, 8, 11]
    bp1 = ax.boxplot([df[df.Kuartal == q].ITB for q in qnames], positions=pos1, widths=.65, patch_artist=True)
    bp2 = ax.boxplot([df[df.Kuartal == q].ITK for q in qnames], positions=pos2, widths=.65, patch_artist=True)
    
    for box in bp1['boxes']:
        box.set(facecolor="#0095DA", alpha=0.7, color="#007ab3")
    for box in bp2['boxes']:
        box.set(facecolor="#57B736", alpha=0.7, color="#439626")

    ax.axhline(100, ls="--", lw=1, color="gray", label="Level Netral = 100")
    ax.set_title("Variasi Sentimen Berdasarkan Kuartal", fontsize=17, fontweight="bold")
    ax.text(0, 1.02, "Distribusi ITB dan ITK pada Q1 hingga Q4 sepanjang periode pengamatan", transform=ax.transAxes)
    ax.set_xticks([1.5, 4.5, 7.5, 10.5])
    ax.set_xticklabels(qnames)
    ax.set_xlabel("Kuartal")
    ax.set_ylabel("Indeks")
    ax.grid(axis="y", alpha=.25)
    ax.legend(handles=[
        Line2D([0], [0], color="#0095DA", lw=2, label="ITB"),
        Line2D([0], [0], color="#57B736", lw=2, label="ITK"),
        Line2D([0], [0], ls="--", lw=1, color="gray", label="Level Netral = 100")
    ])
    qmeans = quarterly.copy()
    qmeans.index = qnames
    finish(fig, "08_boxplot_quarterly.png", f"Q2 memiliki mean ITB {qmeans.loc['Q2','ITB']:.2f} dan ITK {qmeans.loc['Q2','ITK']:.2f}; Q1 terendah dengan ITB {qmeans.loc['Q1','ITB']:.2f} dan ITK {qmeans.loc['Q1','ITK']:.2f}.",
        "KEY INSIGHT: Q2 cenderung tertinggi, Q1 cenderung terendah; ini indikasi pola kuartalan, bukan bukti seasonality kausal.")

    # 9. Statistical Overview Table
    fig, ax = plt.subplots(figsize=(11, 6))
    ax.axis("off")
    ax.set_title("Gambaran Umum Statistik Sentimen Ekonomi Indonesia", fontsize=17, fontweight="bold", pad=25)
    ax.text(0, 1.00, "Ringkasan statistik ITB dan ITK selama 2000 Q2–2020 Q1", transform=ax.transAxes)
    stats = pd.DataFrame({
        "ITB": [mean_itb, median_itb, std_itb, df.ITB.min(), df.ITB.max()],
        "ITK": [mean_itk, median_itk, std_itk, df.ITK.min(), df.ITK.max()]
    }, index=["Mean", "Median", "Std Dev", "Minimum", "Maximum"])
    
    t = ax.table(cellText=np.round(stats.values, 2), rowLabels=stats.index, colLabels=stats.columns, loc="center", cellLoc="center")
    t.auto_set_font_size(False)
    t.set_fontsize(11)
    t.scale(1, 1.7)
    finish(fig, "09_statistical_overview.png", f"ITK mean {mean_itk:.2f} lebih tinggi daripada ITB {mean_itb:.2f}, tetapi SD ITK {std_itk:.2f} juga lebih tinggi. {bo/n*100:.2f}% observasi Broad Optimism; korelasi ITB-ITK {corr:.3f}.",
        "KEY INSIGHT: Sentimen secara umum positif, tetapi konsumen lebih volatil dan tidak selalu bergerak searah dengan bisnis.")

    print("\n" + "=" * 60)
    print("[SUCCESS] SELESAI: 9 Gambar Visualisasi Statis Berhasil Di-generate")
    print("Folder Output:", OUT)
    print("=" * 60)

if __name__ == '__main__':
    run_visual_generator()
