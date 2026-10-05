# Simulation Engine Version History — GeoPave India

## v2.1.0 (2026-10-06)
**Scope:** Mechanistic-Empirical Strain Calculation & Physical Model Scale Linking
**Changes:**
- Integrated Odemark Method of Equivalent Thickness ($h_e = \sum h_i \cdot [E_i(1-\nu_{sg}^2) / (E_{sg}(1-\nu_i^2))]^{1/3}$)
- Direct CBR-to-Resilient Modulus ($M_R$) linking per IRC:37-2018:
  - $M_R = 10.0 \times \text{CBR}$ (for $\text{CBR} \le 5\%$)
  - $M_R = 17.6 \times \text{CBR}^{0.64}$ (for $\text{CBR} > 5\%$)
- Added vertical compressive strain at subgrade top ($\epsilon_v$) and horizontal tensile strain at bottom of DBM ($\epsilon_t$)
- Rutting allowable life equation per IRC:37-2018:
  $$N_R = 1.41 \times 10^{-8} \times (1 / \epsilon_v)^{4.5337}$$
- Traffic Benefit Ratio (TBR) formulation based on IRC:SP:59-2018:
  $$\text{TBR} = 1.0 + 1.25 \times (\text{confinementEfficiency} / 100) \times (10 / \text{CBR})^{0.45}$$
- Added Base Course Reduction (BCR) calculating WMM thickness reduction (mm and %)
- Material volume savings ($m^3/\text{lane-km}$), cost savings (₹ Lakhs/km), and carbon footprint reduction ($t\text{CO}_2/\text{km}$)
- Added real-time sync with 1:10 and 1:5 physical demonstration model scaled depths

**Standard References:**
- IRC:37-2018: "Guidelines for the Design of Flexible Pavements" (Clauses 5.2, 5.3, Eq 5.1-5.3)
- IRC:SP:59-2018: "Guidelines for Use of Geosynthetics in Road Pavements and Associated Works" (Clauses 4.1, 4.4, Annex B)
- MoRTH Section 700: "Geosynthetics and Reinforced Earth" (Clauses 701, 702, 703)

---

## v2.0.0 (2026-09-15)
**Scope:** Layered Elastic Propagation & Confinement Mechanics
**Changes:**
- Multi-layer Boussinesq stress dispersion with layer-specific angle dilation ($\theta_i$)
- Aggregate interlocking modeling for biaxial and triaxial geogrids
- Separation & anti-pumping boundary factor for geotextiles

---

## v1.0.0 (2026-08-01)
**Scope:** Initial Educational Prototype
**Changes:**
- Conceptual uniform 2:1 stress dispersion angle ($26.6^\circ$)
- Relative load distribution indices
