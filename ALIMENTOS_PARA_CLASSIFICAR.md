# Lista de Alimentos para Classificação

## Formato de Resposta Esperado

Para cada alimento, você deve fornecer:
- `lifeStage`: 'PUPPY' | 'ADULT' | 'SENIOR' | 'ALL'
- `neuterStatus`: 'NEUTERED' | 'INTACT' | 'ANY'
- `isTherapeutic`: true | false
- `therapeuticIndications`: array de strings (opcional, apenas se isTherapeutic = true)
  - Exemplos: ['CKD', 'WEIGHT_LOSS', 'GI', 'URINARY', 'ALLERGY', 'HEPATIC', 'JOINT']

## Como está no código atual:
```javascript
{ 
  name: "Nome do Alimento", 
  species: ['dog'], 
  calories: 3.744, 
  unit: 'g', 
  protein: '25.0%', 
  fat: '14.0%', 
  indication: 'Descrição...' 
}
```

## Como você deve enviar (código pronto):
```javascript
{ 
  name: "Nome do Alimento", 
  species: ['dog'], 
  calories: 3.744, 
  unit: 'g', 
  protein: '25.0%', 
  fat: '14.0%', 
  indication: 'Descrição...',
  lifeStage: 'ADULT',           // ← ADICIONAR
  neuterStatus: 'ANY',          // ← ADICIONAR
  isTherapeutic: false,         // ← ADICIONAR
  therapeuticIndications: []    // ← ADICIONAR (opcional, apenas se isTherapeutic = true)
}
```

---

## LISTA DE ALIMENTOS

### Cães & Gatos (ambos)

1. **Hill's a/d Urgent Care (Úmido)**
   - Indicação: Convalescença, anorexia, pós-cirurgia, lesão.
   - lifeStage: ?
   - neuterStatus: ?
   - isTherapeutic: ?
   - therapeuticIndications: ?

2. **Premier Nutrição Clínica Recuperação (Úmido)**
   - Indicação: Suporte nutricional em recuperação, pós-cirúrgico.
   - lifeStage: ?
   - neuterStatus: ?
   - isTherapeutic: ?
   - therapeuticIndications: ?

3. **Royal Canin Recovery (Úmido)**
   - Indicação: Convalescença, anorexia, pós-cirurgia, cuidados intensivos.
   - lifeStage: ?
   - neuterStatus: ?
   - isTherapeutic: ?
   - therapeuticIndications: ?

4. **FN Vet Care Recuperação (lata)**
   - Indicação: Recuperação de cães e gatos debilitados, anorexia ou convalescença.
   - lifeStage: ?
   - neuterStatus: ?
   - isTherapeutic: ?
   - therapeuticIndications: ?

5. **Nutralife Intensiv (pó)**
   - Indicação: Recuperação, anorexia, crescimento, atletas.
   - lifeStage: ?
   - neuterStatus: ?
   - isTherapeutic: ?
   - therapeuticIndications: ?

6. **Nutralife (pasta)**
   - Indicação: Recuperação, anorexia (pasta palatável).
   - lifeStage: ?
   - neuterStatus: ?
   - isTherapeutic: ?
   - therapeuticIndications: ?

7. **Nutrapet (pasta)**
   - Indicação: Suplemento energético rápido.
   - lifeStage: ?
   - neuterStatus: ?
   - isTherapeutic: ?
   - therapeuticIndications: ?

8. **Petmilk (pó)**
   - Indicação: Substituto do leite materno para cães e gatos neonatos.
   - lifeStage: ?
   - neuterStatus: ?
   - isTherapeutic: ?
   - therapeuticIndications: ?

9. **Support First Milk (pó)**
   - Indicação: Substituto do leite materno.
   - lifeStage: ?
   - neuterStatus: ?
   - isTherapeutic: ?
   - therapeuticIndications: ?

10. **Orga Milk (pó)**
    - Indicação: Substituto do leite materno.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

---

### Cães

11. **Royal Canin Mini Adult**
    - Indicação: Cães pequenos (10 meses a 8 anos, 4-10 kg)
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

12. **Royal Canin Maxi Adult**
    - Indicação: Cães grandes (15 meses a 5 anos, 26-44 kg)
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

13. **Premier Pet Nutrição Clínica Obesidade Cães Pequeno Porte**
    - Indicação: Cães com obesidade, pequeno porte
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

14. **Premier Pet Ambientes Internos Cães Adultos Castrados**
    - Indicação: Cães castrados, raças pequenas
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

15. **Premier Pet Golden Fórmula Cães Adultos Frango e Arroz**
    - Indicação: Cães adultos
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

16. **Hill's Science Diet Cães Adultos Raças Pequenas e Mini Frango**
    - Indicação: Cães adultos, raças pequenas e mini
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

17. **Hill's Science Diet Cães Filhotes Raças Pequenas e Mini Frango**
    - Indicação: Filhotes, raças pequenas e mini
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

18. **Purina Pro Plan Cães Adultos Mini e Pequeno Porte Optihealth**
    - Indicação: Cães adultos, mini e pequeno porte
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

19. **Purina Pro Plan Cães Adultos Médio Porte Optihealth**
    - Indicação: Cães adultos, médio porte
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

20. **Purina Pro Plan Cães Adultos Grande e Gigante Porte Optihealth**
    - Indicação: Cães adultos, grande e gigante porte
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

21. **Purina Pro Plan Cães Filhotes Mini e Pequeno Porte Optistart**
    - Indicação: Filhotes, mini e pequeno porte
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

22. **Purina Pro Plan Cães Filhotes Grande e Gigante Porte Optistart**
    - Indicação: Filhotes, grande e gigante porte
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

23. **Biofresh Cão Adulto Light**
    - Indicação: Controle de peso para cães de raças pequenas.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

24. **Complett Peptide 1.5 (líquido)**
    - Indicação: Suporte hipercalórico para cães e (com extremo cuidado) gatos em UTI.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

25. **Equilíbrio Veterinary Hypoallergenic (Seco, Cães)**
    - Indicação: Alergias/intolerâncias alimentares com manifestações dermatológicas/digestivas.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

26. **Farmina Vet Life Gastrointestinal (Cães)**
    - Indicação: Manejo de distúrbios gastrointestinais.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

27. **Farmina Vet Life Hypoallergenic Egg & Rice (Seco, Cães)**
    - Indicação: Manutenção nutricional, redução de intolerância alimentar.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

28. **Farmina Vet Life Hypoallergenic Fish & Potato (Seco, Cães)**
    - Indicação: Redução de intolerância alimentar, suporte à função da pele, alergias alimentares.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

29. **Farmina Vet Life Obesity & Diabetic (Cães)**
    - Indicação: Manejo da obesidade e diabetes.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

30. **Farmina Vet Life Recoup (Úmido, Cães)**
    - Indicação: Recuperação nutricional.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

31. **Farmina Vet Life UltraHypo (Seco, Cães)**
    - Indicação: Alergias/intolerâncias, dieta de eliminação, dermatite atópica refratária.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

32. **FN Vet Care Hipoalergênica (Médio/Grande, Cães)**
    - Indicação: Reações adversas a alimentos (hipersensibilidade/intolerância), diarreias crônicas.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

33. **FN Vet Care Hipoalergênica (Mini/Pequeno, Cães)**
    - Indicação: Reações adversas a alimentos (hipersensibilidade/intolerância), diarreias crônicas.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

34. **Formula Natural Vet Care Gastrointestinal Cães**
    - Indicação: Suporte à saúde digestiva.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

35. **Formula Natural Vet Care Obesidade Cães**
    - Indicação: Manejo da obesidade em cães.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

36. **Formula Natural Vet Care Osteoartrite Cães**
    - Indicação: Suporte à saúde articular.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

37. **Formula Natural Vet Care Renal Cães**
    - Indicação: Suporte à função renal.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

38. **Fresubin Original (líquido)**
    - Indicação: Suporte nutricional por sonda em cães (quando dietas vet não disponíveis).
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

39. **Hill's d/d Pato & Arroz (Seco, Cães)**
    - Indicação: Sensibilidades alimentares, dermatites pruriginosas, gastroenterite crônica, DII.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

40. **Hill's i/d (Seco, Cães)**
    - Indicação: Manejo de distúrbios gastrointestinais.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

41. **Hill's i/d (Úmido, Cães)**
    - Indicação: Distúrbios gastrointestinais.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

42. **Hill's i/d Low Fat (Seco, Cães)**
    - Indicação: Manejo de distúrbios gastrointestinais sensíveis à gordura.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

43. **Hill's j/d (Úmido, Cães)**
    - Indicação: Suporte ao metabolismo das articulações (osteoartrite).
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

44. **Hill's j/d Joint Care (Seco, Cães)**
    - Indicação: Suporte à saúde articular.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

45. **Hill's k/d (Seco, Cães)**
    - Indicação: Suporte à função renal crônica.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

46. **Hill's l/d Hepatic Care (Seco, Cães)**
    - Indicação: Suporte à função hepática.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

47. **Hill's Science Diet Cães Adultos Raças Grandes Frango**
    - Indicação: Cães adultos, raças grandes
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

48. **Hill's u/d (Úmido, Cães)**
    - Indicação: Dissolução de urólitos de urato e cistina.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

49. **Hill's u/d Urinary Care (Seco, Cães)**
    - Indicação: Prevenção de cálculos de urato e cistina.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

50. **Hill's z/d Food Sensitive (Seco, Cães)**
    - Indicação: Manejo de sensibilidades alimentares com proteína hidrolisada.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

51. **Premier Gourmet Cães Carne (Sachê)**
    - Indicação: Complemento alimentar, hidratação.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

52. **Premier Gourmet Cães Salmão (Sachê)**
    - Indicação: Complemento alimentar, hidratação.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

53. **Premier Nutrição Clínica Hipoalergênico (Cães)**
    - Indicação: Manejo de sensibilidades alimentares.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

54. **Premier Nutrição Clínica Obesidade (Cães)**
    - Indicação: Manejo da obesidade canina.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

55. **Pro Plan HA Hydrolyzed (Seco, Cães)**
    - Indicação: Testes de eliminação, gastroenterite/dermatite alérgica, DII, pancreatite.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

56. **Pro Plan HA Vegetarian (Seco, Cães)**
    - Indicação: Opção vegetariana para dieta de eliminação, DII, dermatite alérgica.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

57. **Purina Pro Plan Reduced Calorie Cães Adultos**
    - Indicação: Cães adultos com sobrepeso
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

58. **Royal Canin Anallergenic (Seco, Cães)**
    - Indicação: Alergias alimentares severas (dermatológicas/gastrointestinais), DII, Dermatite Atópica Canina associada à AFR, testes de eliminação.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

59. **Royal Canin GI High Energy (Seco, Cães)**
    - Indicação: Distúrbios gastrointestinais, baixo peso.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

60. **Royal Canin GI Low Fat (Úmido, Cães)**
    - Indicação: Condições que requerem restrição de gordura (pancreatite).
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

61. **Royal Canin Hypoallergenic (Cães)**
    - Indicação: Manejo de reações adversas a alimentos.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

62. **Royal Canin Medium Adult**
    - Indicação: Cães médios (acima de 12 meses, 11-25 kg)
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

63. **Royal Canin Mini Puppy**
    - Indicação: Filhotes de cães pequenos (2-10 meses, até 10 kg)
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

64. **Royal Canin Renal Support A (Seco, Cães)**
    - Indicação: Suporte à função renal crônica.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

65. **Royal Canin Renal Support F (Cães)**
    - Indicação: Suporte à função renal.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

66. **Royal Canin Satiety Support (Cães)**
    - Indicação: Controle de peso e saciedade.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

67. **Specific CDD-HY Food Allergen Management (Seco, Cães)**
    - Indicação: Intolerâncias/alergias alimentares, má absorção intestinal, IPE, dieta de exclusão.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

68. **Support AIG Cães (pó)**
    - Indicação: Anorexia, convalescença, pós-operatório.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

69. **Virbac HPM Hypoallergy A2 (Seco, Cães)**
    - Indicação: Alergias/intolerâncias, distúrbios digestivos/cutâneos, dieta de eliminação.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

---

### Gatos

70. **Royal Canin Indoor Adult**
    - Indicação: Gatos adultos de ambiente interno (1-7 anos)
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

71. **Royal Canin Kitten**
    - Indicação: Filhotes (4 meses a 1 ano)
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

72. **Royal Canin Sterilised 37**
    - Indicação: Gatos castrados (1-7 anos)
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

73. **Premier Pet Gato Adulto Light**
    - Indicação: Gatos adultos com sobrepeso
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

74. **Premier Pet Gatos Castrados 6 meses a 6 anos – Salmão**
    - Indicação: Gatos castrados (6 meses a 6 anos)
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

75. **Premier Pet Golden Gatos Adultos Castrados Frango e Carne**
    - Indicação: Gatos castrados
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

76. **Premier Pet Golden Gatos Adultos Frango**
    - Indicação: Gatos adultos
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

77. **Hill's Science Diet Gatos Adulto Optimal Care Frango**
    - Indicação: Gatos adultos
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

78. **Hill's Science Diet Gatos Filhotes Healthy Development Frango**
    - Indicação: Filhotes
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

79. **Whiskas Gatos Adulto Carne Seca**
    - Indicação: Gatos adultos
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

80. **Whiskas Gatos Adulto Peixe Seca**
    - Indicação: Gatos adultos
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

81. **Purina Pro Plan Gatos Adulto Optiprebio Frango (Úmida)**
    - Indicação: Gatos adultos (úmida)
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

82. **Biofresh Gatos Castrados**
    - Indicação: Manutenção de peso para gatos castrados.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

83. **Biofresh Gatos Filhotes**
    - Indicação: Crescimento e desenvolvimento saudável de filhotes.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

84. **Fancy Feast Latas (Classic Patê)**
    - Indicação: Alimento completo e balanceado, alta palatabilidade.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

85. **Farmina N&D Prime (Frango e Romã)**
    - Indicação: Nutrição geral de alta qualidade.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

86. **Farmina Vet Life Gastrointestinal (Úmido, Gatos)**
    - Indicação: Manejo de distúrbios gastrointestinais.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

87. **Farmina Vet Life Obesity (Úmido, Gatos)**
    - Indicação: Perda de peso.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

88. **Finotrato Cat Stix (média)**
    - Indicação: Complemento alimentar, alta palatabilidade.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

89. **Formula Natural Vet Care Renal Gatos**
    - Indicação: Suporte à função renal.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

90. **GranPlus Choice Gatos Adultos (Frango e Carne)**
    - Indicação: Equilíbrio nutricional, saúde urinária e intestinal.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

91. **Guabi Natural Adulto Frango (Seco, Gatos)**
    - Indicação: Nutrição geral de alta qualidade, saúde intestinal e urinária.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

92. **Guabi Natural Sachê Carne (Úmido, Gatos)**
    - Indicação: Hidratação, palatabilidade, complemento alimentar.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

93. **Hill's i/d (Seco, Gatos)**
    - Indicação: Distúrbios gastrointestinais, má digestão.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

94. **Hill's j/d (Seco, Gatos)**
    - Indicação: Suporte ao metabolismo das articulações (osteoartrite).
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

95. **Hill's k/d (Seco, Gatos)**
    - Indicação: Suporte à função renal crônica.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

96. **Hill's k/d (Úmido, Gatos)**
    - Indicação: Suporte à função renal crônica.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

97. **Hills Metabolic (Gatos)**
    - Indicação: Perda e manutenção de peso.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

98. **Hiperkcal Nutricuper Cat (pó)**
    - Indicação: Suplemento hipercalórico para ganho de peso.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

99. **Inaba Churu (média)**
    - Indicação: Hidratação, agrado, administração de medicamentos.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

100. **Optimum Sachê (Salmão/Frango)**
    - Indicação: Nutrição completa, absorção de nutrientes, controle de peso.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

101. **Premier Gourmet Gatos Castrados (Sachê)**
    - Indicação: Complemento alimentar, hidratação, saciedade.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

102. **Premier Nutrição Clínica Renal (Seco, Gatos)**
    - Indicação: Auxílio no tratamento da doença renal crônica.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

103. **Premier Nutrição Clínica Urinário (Seco, Gatos)**
    - Indicação: Auxílio na dissolução de cálculos de estruvita.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

104. **Purina Pro Plan Gatos Castrados Optirenal Salmão**
    - Indicação: Gatos castrados
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

105. **Purina Pro Plan Gatos Filhotes Optistart Frango**
    - Indicação: Filhotes
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

106. **Quatree Life Gatos Castrados (Salmão)**
    - Indicação: Manutenção de peso para gatos castrados.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

107. **Quatree Supreme Gatos Castrados**
    - Indicação: Manutenção de peso para gatos castrados.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

108. **Royal Canin Hypoallergenic (Gatos)**
    - Indicação: Manejo de reações adversas a alimentos.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

109. **Royal Canin Renal (Seca, Gatos)**
    - Indicação: Suporte à função renal crônica.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

110. **Royal Canin Renal (Úmida, Gatos)**
    - Indicação: Suporte à função renal crônica.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

111. **Royal Canin Satiety Support (Gatos)**
    - Indicação: Controle de peso e saciedade.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

112. **Royal Canin Sterilised Loaf (Úmido, Gatos)**
    - Indicação: Manutenção do peso ideal e saúde urinária de gatos castrados.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

113. **Royal Canin Urinary SO (Gatos)**
    - Indicação: Saúde urinária, dissolução de estruvita.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

114. **Whiskas Sachê Carne ao Molho (Úmida)**
    - Indicação: Gatos adultos (úmida)
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

115. **Support AIG Gatos (pó)**
    - Indicação: Anorexia, convalescença, pós-operatório.
    - lifeStage: ?
    - neuterStatus: ?
    - isTherapeutic: ?
    - therapeuticIndications: ?

---

## INSTRUÇÕES PARA PREENCHER

Para cada alimento, copie e cole o formato abaixo, preenchendo os campos:

```javascript
{
  name: "Nome do Alimento",
  species: ['dog'], // ou ['cat'] ou ['dog', 'cat']
  calories: 3.744,
  unit: 'g',
  protein: '25.0%',
  fat: '14.0%',
  indication: 'Descrição...',
  lifeStage: 'ADULT',           // 'PUPPY' | 'ADULT' | 'SENIOR' | 'ALL'
  neuterStatus: 'ANY',          // 'NEUTERED' | 'INTACT' | 'ANY'
  isTherapeutic: false,         // true | false
  therapeuticIndications: []     // [] ou ['CKD', 'WEIGHT_LOSS', 'GI', etc.]
}
```

**Exemplo completo preenchido:**

```javascript
{
  name: "Hill's k/d (Seco, Cães)",
  species: ['dog'],
  calories: 4.021,
  unit: 'g',
  protein: '13.9%',
  fat: '20.5%',
  indication: 'Suporte à função renal crônica.',
  lifeStage: 'ADULT',
  neuterStatus: 'ANY',
  isTherapeutic: true,
  therapeuticIndications: ['CKD']
}
```
