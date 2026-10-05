# GeoPave India — Simulation Model Documentation

**Educational Visualizer & Conceptual Mechanistic Engine**  
Adhering to Indian Standards: **IRC:37-2018**, **IRC:SP:59-2018**, and **MoRTH Section 700**.

---

## 1. Overview
GeoPave India uses a deterministic layered elastic continuum model combining **Odemark's Method of Equivalent Thickness (MET)** with Boussinesq stress distribution and IRC:37 empirical transfer functions.

> **Disclaimer:** This simulator is strictly for educational visualization, viva voce preparation, and physical model demonstration. It is NOT for stamped structural road design without professional geotechnical engineering review.

---

## 2. Pavement Structure & Elastic Moduli
Standard highway flexible pavement layers (from top to bottom):
1. **BC (Bituminous Concrete):** 40–80 mm ($E_1 \approx 3000\text{ MPa}$, $\nu = 0.35$)
2. **DBM (Dense Bituminous Macadam):** 75–150 mm ($E_2 \approx 2500\text{ MPa}$, $\nu = 0.35$)
3. **WMM (Wet Mix Macadam Base):** 150–300 mm ($E_3 \approx 250\text{–}350\text{ MPa}$, $\nu = 0.35$)
4. **GSB (Granular Sub-Base):** 150–300 mm ($E_4 \approx 150\text{–}200\text{ MPa}$, $\nu = 0.40$)
5. **Subgrade Soil:** Foundation ($E_{sg} = M_R$, $\nu = 0.40$)

### 2.1 Subgrade Resilient Modulus ($M_R$)
Per IRC:37-2018 Section 5.2:
- When $\text{CBR} \le 5\%$:
  $$M_R = 10.0 \times \text{CBR}\text{ (MPa)}$$
- When $\text{CBR} > 5\%$:
  $$M_R = 17.6 \times \text{CBR}^{0.64}\text{ (MPa)}$$

---

## 3. Odemark Method of Equivalent Thickness (MET)
The multi-layered system with varying moduli ($E_i$) is transformed into an equivalent uniform semi-infinite half-space with subgrade properties ($E_{sg}$):

$$h_e = f \sum_{i=1}^{n} h_i \left( \frac{E_i (1 - \nu_{sg}^2)}{E_{sg} (1 - \nu_i^2)} \right)^{1/3}$$

Where $f \approx 0.9$ is Odemark's interface correction factor.

---

## 4. Mechanistic Strain Calculations
1. **Vertical Compressive Strain at Subgrade Top ($\epsilon_v$):**
   Governs pavement rutting life.
   $$\epsilon_v = \frac{(1 + \nu_{sg})}{E_{sg}} \cdot \sigma_z$$

2. **Allowable Rutting Repetitions ($N_R$ in MSA):**
   Calculated via IRC:37-2018 rutting performance criteria (80% reliability):
   $$N_R = 1.41 \times 10^{-8} \times \left(\frac{1}{\epsilon_v}\right)^{4.5337}$$

---

## 5. Geosynthetic Reinforcement Mechanics (IRC:SP:59-2018)

### 5.1 Geogrid Confinement & Base Course Reduction (BCR)
- **Mechanism:** Interlocking of aggregate stones within apertures prevents lateral particle displacement.
- **Traffic Benefit Ratio (TBR):**
  $$\text{TBR} = 1.0 + 1.25 \times \left(\frac{\text{Confinement Efficiency}}{100}\right) \times \left(\frac{10}{\text{CBR}}\right)^{0.45}$$
- **Base Course Reduction (BCR):**
  $$\text{BCR} = 15\% \text{ to } 33\% \text{ allowable WMM thickness reduction}$$

### 5.2 Geotextile Separation & Filtration
- **Mechanism:** Polypropylene needle-punched non-woven continuous filament fabric placed at subgrade interface.
- Prevents clay particle pumping into GSB under cyclical dynamic pore pressures while maintaining unhindered vertical permeability ($k \approx 2.5 \times 10^{-3}\text{ m/s}$).

---

## 6. Physical Model Scaling
- Acrylic demonstration chamber: $50\text{ cm L} \times 25\text{ cm W} \times 45\text{ cm H}$
- Two exact laboratory scales:
  - **1:10 Scale:** 1 cm in model = 100 mm in field
  - **1:5 Scale:** 1 cm in model = 50 mm in field
