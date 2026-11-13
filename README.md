# Gearup Question Vault

Role: Act as senior full-stack developer and UI designer.

Goal: Build PaperVault - Previous Year Question Library for Mechanical Engineering students.

Context: Students waste time searching PYQs in PDFs and WhatsApp. They need one place to filter questions, mark practised, and pin weak topics to revise next. User is Mechanical student.

Design - ANTI-GRAVITY THEME: Dark space background #0F172A with floating glass cards, glowing orange #FF6B35 and green #22C55E accents, cards float with soft shadow and levitating animation, floating background emojis. Modern, premium, mobile-friendly. Title: PaperVault

Constraints: Browser-first only. NO external API, NO login, NO database, NO Supabase, NO .env, NO secret keys. NO AI hallucination: Use ONLY the fixed 50 questions below, hardcoded, do NOT invent new questions, answers, or YouTube links. Fictional sample data only.

Requirements:
1. Header: Logo PaperVault + Progress X / 50 Practised - Y% + XP + Streak
2. Layout: 2-column desktop. Left 70% = Question Library, scrolls normally. Right 30% = Revise Next panel, STICKY, top 20px, height 80vh, own scrollbar, always visible while left scrolls. On mobile, Revise Next on top collapsible, then questions below.
3. Filters: Subject (All, Thermodynamics, Fluid Mechanics, Machine Design, Manufacturing, Strength of Materials, Heat Transfer), Semester (All, Sem 3, Sem 4, Sem 5), Year (All, 2022, 2023, 2024), Tag (All, Most Repeated, Conceptual, Drawing), + Search bar
4. Question List: Show EXACTLY 50 cards. Each card: Q Number, Title, Subject with emoji, Semester, Year, Marks, Difficulty, Tag badge, Book Reference, Buttons [Mark as Practised] [Pin to Revise Next] + link Answer guide
5. Mark as Practised: Click turns card green, shows Practised, Progress + XP +10 increases. Click again to unmark. If practised, hide Pin button.
6. Revise Next Queue - MINUTE 40 TWIST - Weak-Topic Review: Banner MINUTE 40 TWIST - Weak-Topic Review. Section Revise Next - 0/5. Only unanswered/difficult questions can be pinned. Max 5, if full show Queue is full - max 5. Each pinned item: Title, Subject, Difficulty, buttons [Mark as Practised & Clear] [Remove X]. Bottom button [Clear All After Practice] marks all pinned as practised and empties queue.
7. State Sync: A question can NEVER be Pinned + Practised at same time. Marking practised auto-removes from Revise Next.
8. Empty State: If no filter result, show No questions found - do NOT create new questions.
9. Footer: Sample fictional data for demo practice only - No AI-generated content

Fixed Data - Use ONLY these 50:
1. Explain Iron-Carbon Diagram - Manufacturing - Sem 3 - 2022 - 10M - Hard - Drawing - Book: R.S. Khurmi - Chapter: Iron-Carbon
2. Explain Jigs and Fixtures - Manufacturing - Sem 3 - 2024 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Jigs & Fixtures
3. Explain Belt Drives - Types and Slip - Machine Design - Sem 5 - 2024 - 5M - Easy - Most Repeated - Book: S.S. Rattan - Chapter: Belt Drives
4. Explain Chain Drives vs Gear Drives - Machine Design - Sem 5 - 2023 - 5M - Easy - Conceptual - Book: S.S. Rattan - Chapter: Chain & Gear
5. Explain Hydrostatic and Hydrodynamic Lubrication - Fluid Mechanics - Sem 4 - 2023 - 5M - Easy - Conceptual - Book: R.K. Bansal - Chapter: Lubrication
6. Explain Manometers - U-Tube and Differential - Fluid Mechanics - Sem 4 - 2022 - 5M - Easy - Drawing - Book: R.K. Bansal - Chapter: Manometers
7. Explain Steady vs Unsteady Flow - Fluid Mechanics - Sem 4 - 2024 - 5M - Easy - Conceptual - Book: R.K. Bansal - Chapter: Kinematics of Flow
8. Explain Zeroth Law of Thermodynamics - Thermodynamics - Sem 4 - 2022 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Thermodynamics
9. Explain Entropy and Second Law - Thermodynamics - Sem 4 - 2024 - 10M - Hard - Most Repeated - Book: R.S. Khurmi - Chapter: Entropy
10. Explain Heat Transfer in Boilers - Heat Transfer - Sem 5 - 2024 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Boilers
11. Explain Critical Thickness of Insulation - Heat Transfer - Sem 5 - 2022 - 10M - Hard - Drawing - Book: R.S. Khurmi - Chapter: Insulation
12. Explain Bending Stress Formula - Strength of Materials - Sem 3 - 2023 - 10M - Medium - Drawing - Book: R.S. Khurmi - Chapter: Bending Stress
13. Explain Shear Stress in Beams - Strength of Materials - Sem 3 - 2024 - 10M - Medium - Drawing - Book: R.S. Khurmi - Chapter: Shear Stress
14. Explain Strain Energy and Resilience - Strength of Materials - Sem 3 - 2022 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Strain Energy
15. Explain Pressure Vessels - Strength of Materials - Sem 3 - 2024 - 10M - Medium - Drawing - Book: R.S. Khurmi - Chapter: Pressure Vessels
16. Explain Welding Defects and Inspection - Manufacturing - Sem 3 - 2023 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Welding
17. Explain Broaching Machine - Manufacturing - Sem 3 - 2022 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Broaching
18. Explain Screw Threads - Types - Machine Design - Sem 5 - 2022 - 5M - Easy - Drawing - Book: S.S. Rattan - Chapter: Screw Threads
19. Explain Governors - Watt vs Porter - Machine Design - Sem 5 - 2024 - 10M - Medium - Drawing - Book: S.S. Rattan - Chapter: Governors
20. Explain Flywheel - Function and Design - Machine Design - Sem 5 - 2023 - 10M - Medium - Drawing - Book: S.S. Rattan - Chapter: Flywheel
21. Explain Otto Cycle with P-V diagram - Thermodynamics - Sem 4 - 2022 - 10M - Medium - Drawing - Book: R.S. Khurmi - Chapter: Otto Cycle
22. Explain Diesel Cycle vs Dual Cycle - Thermodynamics - Sem 4 - 2024 - 10M - Medium - Conceptual - Book: R.S. Khurmi - Chapter: Diesel Cycle
23. Explain Psychrometrics and Air Conditioning - Thermodynamics - Sem 4 - 2023 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Psychrometrics
24. Explain Venturimeter working and formula - Fluid Mechanics - Sem 4 - 2023 - 10M - Medium - Drawing - Book: R.K. Bansal - Chapter: Venturimeter
25. Explain Boundary Layer Theory - Fluid Mechanics - Sem 4 - 2024 - 10M - Hard - Most Repeated - Book: R.K. Bansal - Chapter: Boundary Layer
26. Explain Centrifugal Pump working - Fluid Mechanics - Sem 4 - 2022 - 10M - Medium - Drawing - Book: R.K. Bansal - Chapter: Pumps
27. Explain Francis Turbine vs Kaplan Turbine - Fluid Mechanics - Sem 4 - 2023 - 5M - Easy - Conceptual - Book: R.K. Bansal - Chapter: Turbines
28. Explain Bearing Types - Ball, Roller, Journal - Machine Design - Sem 5 - 2024 - 5M - Easy - Conceptual - Book: S.S. Rattan - Chapter: Bearings
29. Explain Clutch vs Brake - Types and Working - Machine Design - Sem 5 - 2023 - 10M - Medium - Drawing - Book: S.S. Rattan - Chapter: Clutch & Brake
30. Explain Springs - Helical vs Leaf Spring - Machine Design - Sem 5 - 2022 - 10M - Medium - Drawing - Book: S.S. Rattan - Chapter: Springs
31. Explain Drilling and Reaming operations - Manufacturing - Sem 3 - 2022 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Drilling
32. Explain Milling Machine - Up vs Down Milling - Manufacturing - Sem 3 - 2024 - 10M - Medium - Drawing - Book: R.S. Khurmi - Chapter: Milling
33. Explain Forging Process - Hot vs Cold - Manufacturing - Sem 3 - 2023 - 10M - Medium - Most Repeated - Book: R.S. Khurmi - Chapter: Forging
34. Explain Extrusion Process - Manufacturing - Sem 3 - 2024 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Extrusion
35. Explain Deflection of Beams - Double Integration - Strength of Materials - Sem 3 - 2024 - 10M - Hard - Most Repeated - Book: R.S. Khurmi - Chapter: Deflection
36. Explain Principal Stresses and Mohr's Circle - Strength of Materials - Sem 3 - 2023 - 10M - Hard - Drawing - Book: R.S. Khurmi - Chapter: Mohr's Circle
37. Explain Columns and Struts - Euler's Formula - Strength of Materials - Sem 3 - 2022 - 10M - Medium - Most Repeated - Book: R.S. Khurmi - Chapter: Columns
38. Explain Thin vs Thick Cylinders - Strength of Materials - Sem 3 - 2024 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Cylinders
39. Explain Fourier's Law of Conduction - Heat Transfer - Sem 5 - 2022 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Conduction
40. Explain Fins - Types and Efficiency - Heat Transfer - Sem 5 - 2023 - 10M - Medium - Drawing - Book: R.S. Khurmi - Chapter: Fins
41. Explain Radiation - Stefan Boltzmann Law - Heat Transfer - Sem 5 - 2024 - 10M - Medium - Most Repeated - Book: R.S. Khurmi - Chapter: Radiation
42. Explain Boiling and Condensation - Heat Transfer - Sem 5 - 2022 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Boiling
43. Explain Refrigeration Cycle - Vapour Compression - Thermodynamics - Sem 4 - 2024 - 10M - Medium - Drawing - Book: R.S. Khurmi - Chapter: Refrigeration
44. Explain Compressors - Reciprocating vs Rotary - Thermodynamics - Sem 4 - 2022 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Compressors
45. Explain Hydraulic Machines - Ram and Accumulator - Fluid Mechanics - Sem 4 - 2024 - 5M - Easy - Conceptual - Book: R.K. Bansal - Chapter: Hydraulic Machines
46. Explain Keys, Couplings and Joints - Machine Design - Sem 5 - 2024 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Keys and Couplings
47. Explain Grinding Process and Grinding Wheel - Manufacturing - Sem 3 - 2022 - 5M - Easy - Drawing - Book: R.S. Khurmi - Chapter: Grinding
48. Explain Powder Metallurgy Steps - Manufacturing - Sem 3 - 2023 - 10M - Medium - Most Repeated - Book: R.S. Khurmi - Chapter: Powder Metallurgy
49. Explain Thermal Stresses in Bars - Strength of Materials - Sem 3 - 2023 - 5M - Easy - Conceptual - Book: R.S. Khurmi - Chapter: Thermal Stresses
50. Explain LMTD Method for Heat Exchanger - Heat Transfer - Sem 5 - 2023 - 10M - Hard - Most Repeated - Book: R.S. Khurmi - Chapter: LMTD

Output: Fully working app with all above.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://gearup-question-vault.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ac9e87da-f013-47f2-ad1f-d1c87d269329).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
