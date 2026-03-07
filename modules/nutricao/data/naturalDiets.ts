export type NaturalDietSheet = 'dog' | 'cat_normal' | 'cat_obese';

export interface NaturalDietInfoField {
  value: number | string;
  unit: string | null;
}

export interface NaturalDietCompositionItem {
  label: string;
  value: number;
}

export interface NaturalDietIngredient {
  name: string;
  quantity: number | null;
  unit: string;
  percent: number | null;
}

export interface NaturalDietPlan {
  id: string;
  sheet: NaturalDietSheet;
  title: string;
  info: Record<string, NaturalDietInfoField>;
  composition: NaturalDietCompositionItem[];
  ingredients: NaturalDietIngredient[];
}

export const NATURAL_DIET_PLANS: NaturalDietPlan[] = [
  {
    "id": "dog-caes-adultos-manutencao-com-carne",
    "sheet": "dog",
    "title": "Caes Adultos Manutencao ( com carne)",
    "info": {
      "Peso": {
        "value": 18.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 830.1909296,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.0,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 415.0954648,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 25.3
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 50.45
      },
      {
        "label": "Extrato Etereo",
        "value": 16.31
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 249.0572789,
        "unit": "g",
        "percent": 16.60381859
      },
      {
        "name": "Carne moida bov/peito frango",
        "quantity": 83.01909296,
        "unit": "g",
        "percent": 5.534606197
      },
      {
        "name": "Figado bovino",
        "quantity": 20.75477324,
        "unit": "g",
        "percent": 1.383651549
      },
      {
        "name": "Cenoura",
        "quantity": 53.96241043,
        "unit": "g",
        "percent": 2.698120521
      },
      {
        "name": "Fosfato Bicalcico",
        "quantity": 2.905668254,
        "unit": "g",
        "percent": 1.614260141
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 2.905668254,
        "unit": "g",
        "percent": 1.937112169
      },
      {
        "name": "Suplemento M e V",
        "quantity": 4.150954648,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal",
        "quantity": 0.4150954648,
        "unit": "g",
        "percent": 0.1660381859
      },
      {
        "name": "Oleo de soja",
        "quantity": 4.150954648,
        "unit": "mL",
        "percent": 0.6918257747
      }
    ]
  },
  {
    "id": "dog-caes-adultos-manutencao-com-ovo",
    "sheet": "dog",
    "title": "Caes Adultos Manutencao (com ovo)",
    "info": {
      "Peso": {
        "value": 18.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 830.1909296,
        "unit": "Kcal"
      },
      "EM": {
        "value": 1.67,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 497.1203171,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 21.23
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 55.02
      },
      {
        "label": "Extrato Etereo",
        "value": 14.38
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 263.4737681,
        "unit": "g",
        "percent": 17.56491787
      },
      {
        "name": "Ovo cozido",
        "quantity": 139.1936888,
        "unit": "g",
        "percent": 2.783873776
      },
      {
        "name": "Figado bovino",
        "quantity": 19.88481269,
        "unit": "g",
        "percent": 1.325654179
      },
      {
        "name": "Cenoura",
        "quantity": 54.68323489,
        "unit": "g",
        "percent": 2.734161744
      },
      {
        "name": "Fosfato Bicalcico",
        "quantity": 4.971203171,
        "unit": "g",
        "percent": 2.76177954
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 4.971203171,
        "unit": "g",
        "percent": 3.314135448
      },
      {
        "name": "Suplemento M e V",
        "quantity": 4.971203171,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal Light",
        "quantity": 1.491360951,
        "unit": "g",
        "percent": 0.5965443806
      },
      {
        "name": "Oleo de soja",
        "quantity": 4.971203171,
        "unit": "mL",
        "percent": 0.8285338619
      }
    ]
  },
  {
    "id": "dog-caes-em-crescimento-ou-reproducao",
    "sheet": "dog",
    "title": "Caes em Crescimento ou Reproducao",
    "info": {
      "Peso Atual": {
        "value": 20.0,
        "unit": "Kg"
      },
      "Peso Adulto": {
        "value": 17.0,
        "unit": null
      },
      "Peso (atual/adulto)": {
        "value": 1.176470588,
        "unit": null
      },
      "NEM": {
        "value": 1020.40653,
        "unit": null
      },
      "EM": {
        "value": 2.04,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 500.1992796,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 26.47
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 47.52
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 290.1155822,
        "unit": "g",
        "percent": 19.34103881
      },
      {
        "name": "Carne moida bov/peito frango",
        "quantity": 100.0398559,
        "unit": "g",
        "percent": 6.669323729
      },
      {
        "name": "Figado bovino",
        "quantity": 40.01594237,
        "unit": "g",
        "percent": 2.667729491
      },
      {
        "name": "Cenoura",
        "quantity": 40.01594237,
        "unit": "g",
        "percent": 2.000797119
      },
      {
        "name": "Fosfato Bicalcico",
        "quantity": 5.001992796,
        "unit": "g",
        "percent": 1.515755393
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 1.500597839,
        "unit": "g",
        "percent": 0.8336654661
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 5.001992796,
        "unit": "g",
        "percent": 3.334661864
      },
      {
        "name": "Suplemento M e V",
        "quantity": 5.001992796,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal Light",
        "quantity": 6.652650419,
        "unit": "g",
        "percent": 2.661060168
      },
      {
        "name": "Oleo de soja",
        "quantity": 26.61060168,
        "unit": "mL",
        "percent": 4.435100279
      }
    ]
  },
  {
    "id": "dog-caes-cardiopatas",
    "sheet": "dog",
    "title": "Caes Cardiopatas",
    "info": {
      "Peso": {
        "value": 2.4,
        "unit": "Kg"
      },
      "NEM": {
        "value": 183.1816795,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.14,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 85.59891566,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 24.57
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 48.96
      },
      {
        "label": "Extrato Etereo",
        "value": 18.46
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 51.3593494,
        "unit": "g",
        "percent": 3.423956627
      },
      {
        "name": "Carne moida bov/peito frango",
        "quantity": 17.11978313,
        "unit": "g",
        "percent": 1.141318876
      },
      {
        "name": "Figado bovino",
        "quantity": 4.279945783,
        "unit": "g",
        "percent": 0.2853297189
      },
      {
        "name": "Cenoura",
        "quantity": 8.559891566,
        "unit": "g",
        "percent": 0.4279945783
      },
      {
        "name": "Sal",
        "quantity": 0.1711978313,
        "unit": "g",
        "percent": 0.06847913253
      },
      {
        "name": "Oleo de soja",
        "quantity": 2.56796747,
        "unit": "mL",
        "percent": 0.4279945783
      }
    ]
  },
  {
    "id": "dog-caes-com-irc-15-pb-15-ee",
    "sheet": "dog",
    "title": "Caes com IRC (15% PB / 15% EE)",
    "info": {
      "Peso": {
        "value": 8.1,
        "unit": "Kg"
      },
      "NEM": {
        "value": 456.1286687,
        "unit": "Kcal"
      },
      "EM": {
        "value": 1.95,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 233.9121378,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 15.0
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 63.52
      },
      {
        "label": "Extrato Etereo",
        "value": 15.0
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 159.0602537,
        "unit": "g",
        "percent": 10.60401691
      },
      {
        "name": "Carne moida bov/peito frango",
        "quantity": 14.03472827,
        "unit": "g",
        "percent": 0.9356485511
      },
      {
        "name": "Figado bovino",
        "quantity": 11.69560689,
        "unit": "g",
        "percent": 0.7797071259
      },
      {
        "name": "Cenoura",
        "quantity": 35.08682067,
        "unit": "g",
        "percent": 1.754341033
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 0.9356485511,
        "unit": "g",
        "percent": 0.283529864
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.637384964,
        "unit": "g",
        "percent": 1.091589976
      },
      {
        "name": "Suplemento M e V",
        "quantity": 1.169560689,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal Light",
        "quantity": 0.9356485511,
        "unit": "g",
        "percent": 0.3742594205
      },
      {
        "name": "Oleo de soja",
        "quantity": 9.356485511,
        "unit": "mL",
        "percent": 1.559414252
      }
    ]
  },
  {
    "id": "dog-caes-com-irc-16-pb-18-ee",
    "sheet": "dog",
    "title": "Caes com IRC (16%PB / 18% EE)",
    "info": {
      "Peso": {
        "value": 15.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 724.0891661,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.1,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 344.8043648,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 16.0
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 59.54
      },
      {
        "label": "Extrato Etereo",
        "value": 18.0
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 224.1228371,
        "unit": "g",
        "percent": 14.94152248
      },
      {
        "name": "Carne moida bov/peito frango",
        "quantity": 24.13630554,
        "unit": "g",
        "percent": 1.609087036
      },
      {
        "name": "Figado bovino",
        "quantity": 17.24021824,
        "unit": "g",
        "percent": 1.149347883
      },
      {
        "name": "Cenoura",
        "quantity": 55.16869837,
        "unit": "g",
        "percent": 2.758434919
      },
      {
        "name": "Suplemento Food dog Baixo Fosforo",
        "quantity": 1.724021824,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal",
        "quantity": 1.379217459,
        "unit": "g",
        "percent": 0.5516869837
      },
      {
        "name": "Oleo de soja",
        "quantity": 17.24021824,
        "unit": "mL",
        "percent": 2.873369707
      }
    ]
  },
  {
    "id": "dog-caes-com-irc-14-pb-20-ee",
    "sheet": "dog",
    "title": "Caes com IRC (14% PB / 20% EE)",
    "info": {
      "Peso": {
        "value": 20.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 898.4545286,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.23,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 402.8944074,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 14.0
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 59.5
      },
      {
        "label": "Extrato Etereo",
        "value": 20.0
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 265.9103089,
        "unit": "g",
        "percent": 17.72735393
      },
      {
        "name": "Carne moida bov/peito frango",
        "quantity": 20.14472037,
        "unit": "g",
        "percent": 1.342981358
      },
      {
        "name": "Figado bovino",
        "quantity": 20.14472037,
        "unit": "g",
        "percent": 1.342981358
      },
      {
        "name": "Cenoura",
        "quantity": 64.46310519,
        "unit": "g",
        "percent": 3.223155259
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 1.61157763,
        "unit": "g",
        "percent": 0.4883568575
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 2.820260852,
        "unit": "g",
        "percent": 1.880173901
      },
      {
        "name": "Suplemento M e V",
        "quantity": 2.014472037,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal Light",
        "quantity": 1.61157763,
        "unit": "g",
        "percent": 0.6446310519
      },
      {
        "name": "Oleo de soja",
        "quantity": 24.17366445,
        "unit": "mL",
        "percent": 4.028944074
      }
    ]
  },
  {
    "id": "dog-caes-com-obesidade",
    "sheet": "dog",
    "title": "Caes com Obesidade",
    "info": {
      "Peso": {
        "value": 10.0,
        "unit": "Kg"
      },
      "Peso Meta": {
        "value": 8.5,
        "unit": "kg"
      },
      "NEM": {
        "value": 398.2485299,
        "unit": "Kcal*"
      },
      "EM": {
        "value": 1.45,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 274.6541585,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 30.75
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 53.95
      },
      {
        "label": "Extrato Etereo",
        "value": 6.41
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 109.8616634,
        "unit": "g",
        "percent": 7.324110894
      },
      {
        "name": "Musc magro bov/ peito frango",
        "quantity": 41.19812378,
        "unit": "g",
        "percent": 2.746541585
      },
      {
        "name": "Figado bovino",
        "quantity": 13.73270793,
        "unit": "g",
        "percent": 0.9155138618
      },
      {
        "name": "Cenoura",
        "quantity": 41.19812378,
        "unit": "g",
        "percent": 2.059906189
      },
      {
        "name": "Vagem",
        "quantity": 63.17045646,
        "unit": "g",
        "percent": 3.158522823
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 0.5493083171,
        "unit": "g",
        "percent": 0.1664570658
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.647924951,
        "unit": "g",
        "percent": 1.098616634
      },
      {
        "name": "Suplemento M e V",
        "quantity": 2.746541585,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal",
        "quantity": 0.2746541585,
        "unit": "g",
        "percent": 0.1098616634
      },
      {
        "name": "Oleo de soja",
        "quantity": 1.373270793,
        "unit": "mL",
        "percent": 0.2288784654
      }
    ]
  },
  {
    "id": "dog-caes-com-encefalopatia-hepatica",
    "sheet": "dog",
    "title": "Caes com Encefalopatia Hepatica",
    "info": {
      "Peso": {
        "value": 17.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 795.3536827,
        "unit": "Kcal"
      },
      "EM": {
        "value": 1.7,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 467.8551075,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 17.0
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 64.68
      },
      {
        "label": "Extrato Etereo",
        "value": 9.81
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 327.4985752,
        "unit": "g",
        "percent": 21.83323835
      },
      {
        "name": "Carne moida bov/peito frango",
        "quantity": 32.74985752,
        "unit": "g",
        "percent": 2.183323835
      },
      {
        "name": "Figado bovino",
        "quantity": 23.39275537,
        "unit": "g",
        "percent": 1.559517025
      },
      {
        "name": "Cenoura",
        "quantity": 60.82116397,
        "unit": "g",
        "percent": 3.041058199
      },
      {
        "name": "Fosfato Bicalcico",
        "quantity": 4.678551075,
        "unit": "g",
        "percent": 2.599195042
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 4.678551075,
        "unit": "g",
        "percent": 3.11903405
      },
      {
        "name": "Suplemento M e V",
        "quantity": 4.678551075,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal",
        "quantity": 1.87142043,
        "unit": "g",
        "percent": 0.748568172
      },
      {
        "name": "Oleo de soja",
        "quantity": 9.35710215,
        "unit": "mL",
        "percent": 1.559517025
      }
    ]
  },
  {
    "id": "dog-caes-diabeticos",
    "sheet": "dog",
    "title": "Caes Diabeticos",
    "info": {
      "Peso": {
        "value": 20.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 898.4545286,
        "unit": "Kcal"
      },
      "EM": {
        "value": 1.65,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 544.5178961,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 24.57
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 58.13
      },
      {
        "label": "Extrato Etereo",
        "value": 9.53
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 245.0330532,
        "unit": "g",
        "percent": 16.33553688
      },
      {
        "name": "Peito frango",
        "quantity": 54.45178961,
        "unit": "g",
        "percent": 3.630119307
      },
      {
        "name": "Figado bovino",
        "quantity": 27.2258948,
        "unit": "g",
        "percent": 1.815059654
      },
      {
        "name": "Cenoura",
        "quantity": 70.78732649,
        "unit": "g",
        "percent": 3.539366325
      },
      {
        "name": "Lentilha",
        "quantity": 54.45178961,
        "unit": "",
        "percent": 2.72258948
      },
      {
        "name": "Vagem",
        "quantity": 70.78732649,
        "unit": "",
        "percent": 3.539366325
      },
      {
        "name": "Fosfato Bicalcico",
        "quantity": 1.633553688,
        "unit": "g",
        "percent": 0.9075298268
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 3.267107377,
        "unit": "g",
        "percent": 2.178071584
      },
      {
        "name": "Suplemento M e V",
        "quantity": 5.445178961,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal",
        "quantity": 0.5445178961,
        "unit": "g",
        "percent": 0.2178071584
      },
      {
        "name": "Oleo de soja",
        "quantity": 10.89035792,
        "unit": "mL",
        "percent": 1.815059654
      }
    ]
  },
  {
    "id": "dog-caes-com-neoplasia-carne-bovina",
    "sheet": "dog",
    "title": "Caes com Neoplasia (carne bovina)",
    "info": {
      "Peso": {
        "value": 10.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 534.2242589,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.33,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 229.2807978,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 41.72
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 27.81
      },
      {
        "label": "Extrato Etereo",
        "value": 24.4
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 68.78423935,
        "unit": "g",
        "percent": 4.585615956
      },
      {
        "name": "Musculo gordo",
        "quantity": 96.29793509,
        "unit": "g",
        "percent": 6.419862339
      },
      {
        "name": "Figado bovino",
        "quantity": 18.34246383,
        "unit": "g",
        "percent": 1.222830922
      },
      {
        "name": "Cenoura",
        "quantity": 34.39211967,
        "unit": "g",
        "percent": 1.719605984
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 1.375684787,
        "unit": "g",
        "percent": 0.4168741779
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.834246383,
        "unit": "g",
        "percent": 1.222830922
      },
      {
        "name": "Suplemento M e V",
        "quantity": 1.375684787,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal",
        "quantity": 0.2292807978,
        "unit": "g",
        "percent": 0.09171231913
      },
      {
        "name": "Oleo de soja",
        "quantity": 6.878423935,
        "unit": "mL",
        "percent": 1.146403989
      }
    ]
  },
  {
    "id": "dog-caes-com-neoplasia-carne-de-frango",
    "sheet": "dog",
    "title": "Caes com Neoplasia (carne de frango)",
    "info": {
      "Peso": {
        "value": 10.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 534.2242589,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.34,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 228.3009654,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 45.0
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 27.82
      },
      {
        "label": "Extrato Etereo",
        "value": 23.12
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 73.05630891,
        "unit": "g",
        "percent": 4.870420594
      },
      {
        "name": "Carne de frango",
        "quantity": 82.18834753,
        "unit": "g",
        "percent": 5.479223169
      },
      {
        "name": "Figado bovino",
        "quantity": 18.26407723,
        "unit": "g",
        "percent": 1.217605149
      },
      {
        "name": "Cenoura",
        "quantity": 34.2451448,
        "unit": "g",
        "percent": 1.71225724
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 1.369805792,
        "unit": "g",
        "percent": 0.4150926643
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 2.283009654,
        "unit": "g",
        "percent": 1.522006436
      },
      {
        "name": "Suplemento M e V",
        "quantity": 1.369805792,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal light",
        "quantity": 0.4566019307,
        "unit": "g",
        "percent": 0.1826407723
      },
      {
        "name": "Oleo de soja",
        "quantity": 13.69805792,
        "unit": "mL",
        "percent": 2.283009654
      }
    ]
  },
  {
    "id": "dog-caes-diabeticos-e-com-irc",
    "sheet": "dog",
    "title": "Caes Diabeticos e com IRC",
    "info": {
      "Peso": {
        "value": 7.25,
        "unit": "Kg"
      },
      "NEM": {
        "value": 419.7368609,
        "unit": "Kcal"
      },
      "EM": {
        "value": 1.68,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 249.8433696,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 24.57
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 58.13
      },
      {
        "label": "Extrato Etereo",
        "value": 9.53
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 129.9185522,
        "unit": "g",
        "percent": 8.661236812
      },
      {
        "name": "Peito frango",
        "quantity": 7.495301087,
        "unit": "g",
        "percent": 0.4996867392
      },
      {
        "name": "Figado bovino",
        "quantity": 9.993734783,
        "unit": "g",
        "percent": 0.6662489855
      },
      {
        "name": "Cenoura",
        "quantity": 49.96867392,
        "unit": "g",
        "percent": 2.498433696
      },
      {
        "name": "Lentilha",
        "quantity": 24.98433696,
        "unit": "g",
        "percent": 1.249216848
      },
      {
        "name": "Vagem",
        "quantity": 19.98746957,
        "unit": "g",
        "percent": 0.9993734783
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 1.249216848,
        "unit": "g",
        "percent": 0.37855056
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 0.7495301087,
        "unit": "g",
        "percent": 0.4996867392
      },
      {
        "name": "Suplemento M e V",
        "quantity": 0.9993734783,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal light",
        "quantity": 0.4996867392,
        "unit": "g",
        "percent": 0.1998746957
      },
      {
        "name": "Oleo de soja",
        "quantity": 4.996867392,
        "unit": "mL",
        "percent": 0.8328112319
      }
    ]
  },
  {
    "id": "dog-hipersensibilidade-alimentar-1-a-fase",
    "sheet": "dog",
    "title": "Hipersensibilidade Alimentar- 1.a fase",
    "info": {
      "Peso": {
        "value": 10.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 534.2242589,
        "unit": "Kcal"
      },
      "EM": {
        "value": 0.91,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 587.0596252,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 27.55
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 42.42
      },
      {
        "label": "Extrato Etereo",
        "value": 6.66
      }
    ],
    "ingredients": [
      {
        "name": "Batata cozida ou arroz",
        "quantity": 440.2947189,
        "unit": "g",
        "percent": 29.35298126
      },
      {
        "name": "Carneiro ou carne de porco",
        "quantity": 146.7649063,
        "unit": "g",
        "percent": 9.784327087
      }
    ]
  },
  {
    "id": "dog-hipersensibilidade-alimentar-2-a-fase",
    "sheet": "dog",
    "title": "Hipersensibilidade Alimentar- 2.a fase",
    "info": {
      "Peso": {
        "value": 21.4,
        "unit": "Kg"
      },
      "NEM": {
        "value": 945.2222482,
        "unit": "Kcal"
      },
      "EM": {
        "value": 1.22,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 774.7723346,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 20.0
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 41.44
      },
      {
        "label": "Extrato Etereo",
        "value": 12.45
      }
    ],
    "ingredients": [
      {
        "name": "Batata cozida",
        "quantity": 619.8178677,
        "unit": "g",
        "percent": 41.32119118
      },
      {
        "name": "Carneiro ou coelho cozido",
        "quantity": 131.7112969,
        "unit": "g",
        "percent": 8.780753125
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 1.549544669,
        "unit": "g",
        "percent": 0.4695589907
      },
      {
        "name": "Fosfato Bicalcico",
        "quantity": 4.648634008,
        "unit": "g",
        "percent": 3.099089338
      },
      {
        "name": "Sal",
        "quantity": 0.7747723346,
        "unit": "g",
        "percent": 0.3099089338
      },
      {
        "name": "Oleo de soja",
        "quantity": 17.04499136,
        "unit": "mL",
        "percent": 2.840831893
      }
    ]
  },
  {
    "id": "dog-hipersensibilidade-alimentar-3-a-fase",
    "sheet": "dog",
    "title": "Hipersensibilidade Alimentar- 3.a fase",
    "info": {
      "Suplementacao": {
        "value": "Quantidade",
        "unit": null
      },
      "Centrum": {
        "value": "1 comp/20kg PC",
        "unit": null
      }
    },
    "composition": [],
    "ingredients": []
  },
  {
    "id": "dog-caes-com-linfagiectasia-ou-pancreatite",
    "sheet": "dog",
    "title": "Caes com Linfagiectasia ou Pancreatite",
    "info": {
      "Peso": {
        "value": 6.5,
        "unit": "Kg"
      },
      "NEM": {
        "value": 386.7306765,
        "unit": "Kcal"
      },
      "EM": {
        "value": 1.49,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 259.5507896,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 35.65
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 52.24
      },
      {
        "label": "Extrato Etereo",
        "value": 5.0
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 129.7753948,
        "unit": "g",
        "percent": 8.651692985
      },
      {
        "name": "Peito frango",
        "quantity": 77.86523687,
        "unit": "g",
        "percent": 5.191015791
      },
      {
        "name": "Cenoura",
        "quantity": 44.12363423,
        "unit": "g",
        "percent": 2.206181711
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 0.7786523687,
        "unit": "g",
        "percent": 0.2359552632
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 2.595507896,
        "unit": "g",
        "percent": 1.730338597
      },
      {
        "name": "Suplemento M e V",
        "quantity": 2.595507896,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal",
        "quantity": 2.595507896,
        "unit": "g",
        "percent": 1.038203158
      }
    ]
  },
  {
    "id": "cat-normal-gatos-adultos-manutencao",
    "sheet": "cat_normal",
    "title": "Gatos Adultos Manutencao",
    "info": {
      "Peso": {
        "value": 5.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 293.9746642,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.02,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 145.532012,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 31.87
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 44.51
      },
      {
        "label": "Extrato Etereo",
        "value": 16.87
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 80.04260658,
        "unit": "g",
        "percent": 5.336173772
      },
      {
        "name": "Musculo gordo bov/peito frango",
        "quantity": 36.38300299,
        "unit": "g",
        "percent": 2.425533533
      },
      {
        "name": "Figado bovino",
        "quantity": 14.5532012,
        "unit": "g",
        "percent": 0.9702134131
      },
      {
        "name": "Cenoura",
        "quantity": 8.731920718,
        "unit": "g",
        "percent": 0.4365960359
      },
      {
        "name": "Carbonato de calcio",
        "quantity": 0.5821280479,
        "unit": "g",
        "percent": 0.1764024387
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.45532012,
        "unit": "g",
        "percent": 0.9702134131
      },
      {
        "name": "Suplemento M e V",
        "quantity": 1.45532012,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal light",
        "quantity": 0.4365960359,
        "unit": "g",
        "percent": 0.1746384144
      },
      {
        "name": "Oleo de soja",
        "quantity": 2.910640239,
        "unit": "mL",
        "percent": 0.4851067065
      }
    ]
  },
  {
    "id": "cat-normal-gatos-cardiopatas",
    "sheet": "cat_normal",
    "title": "Gatos Cardiopatas",
    "info": {
      "Peso": {
        "value": 5.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 293.9746642,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.11,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 139.3244854,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 31.84
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 42.14
      },
      {
        "label": "Extrato Etereo",
        "value": 19.57
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 69.66224269,
        "unit": "g",
        "percent": 4.644149513
      },
      {
        "name": "Musculo gordo bov/peito frango",
        "quantity": 34.83112135,
        "unit": "g",
        "percent": 2.322074756
      },
      {
        "name": "Figado bovino",
        "quantity": 13.93244854,
        "unit": "g",
        "percent": 0.9288299026
      },
      {
        "name": "Cenoura",
        "quantity": 13.93244854,
        "unit": "g",
        "percent": 0.6966224269
      },
      {
        "name": "Carbonato de calcio",
        "quantity": 0.2786489708,
        "unit": "g",
        "percent": 0.08443908205
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.393244854,
        "unit": "g",
        "percent": 0.9288299026
      },
      {
        "name": "Suplemento M e V",
        "quantity": 1.393244854,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal Light",
        "quantity": 0.4179734562,
        "unit": "g",
        "percent": 0.1671893825
      },
      {
        "name": "Oleo de soja",
        "quantity": 4.179734562,
        "unit": "mL",
        "percent": 0.6966224269
      }
    ]
  },
  {
    "id": "cat-normal-gatos-com-irc",
    "sheet": "cat_normal",
    "title": "Gatos com IRC",
    "info": {
      "Peso": {
        "value": 5.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 293.9746642,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.04,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 144.1052275,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 25.58
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 49.87
      },
      {
        "label": "Extrato Etereo",
        "value": 17.21
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 86.46313652,
        "unit": "g",
        "percent": 5.764209101
      },
      {
        "name": "Musculo gordo bov/peito frango",
        "quantity": 28.82104551,
        "unit": "g",
        "percent": 1.921403034
      },
      {
        "name": "Figado bovino",
        "quantity": 7.205261377,
        "unit": "g",
        "percent": 0.4803507584
      },
      {
        "name": "Cenoura",
        "quantity": 14.41052275,
        "unit": "g",
        "percent": 0.7205261377
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 0.7205261377,
        "unit": "g",
        "percent": 0.2183412538
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.441052275,
        "unit": "g",
        "percent": 0.9607015169
      },
      {
        "name": "Suplemento M e V",
        "quantity": 0.5764209101,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal Light",
        "quantity": 1.441052275,
        "unit": "g",
        "percent": 0.5764209101
      },
      {
        "name": "Oleo de soja",
        "quantity": 4.323156826,
        "unit": "mL",
        "percent": 0.7205261377
      }
    ]
  },
  {
    "id": "cat-normal-gatos-com-neoplasia-carne-bovina",
    "sheet": "cat_normal",
    "title": "Gatos com Neoplasia (carne bovina)",
    "info": {
      "Peso": {
        "value": 5.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 293.9746642,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.33,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 126.1693838,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 41.72
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 27.81
      },
      {
        "label": "Extrato Etereo",
        "value": 24.4
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 37.85081513,
        "unit": "g",
        "percent": 2.523387675
      },
      {
        "name": "Musculo gordo",
        "quantity": 52.99114118,
        "unit": "g",
        "percent": 3.532742745
      },
      {
        "name": "Figado bovino",
        "quantity": 10.0935507,
        "unit": "g",
        "percent": 0.6729033801
      },
      {
        "name": "Cenoura",
        "quantity": 18.92540756,
        "unit": "g",
        "percent": 0.9462703782
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 0.7570163026,
        "unit": "g",
        "percent": 0.2293988796
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.00935507,
        "unit": "g",
        "percent": 0.6729033801
      },
      {
        "name": "Suplemento M e V",
        "quantity": 0.7570163026,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal",
        "quantity": 0.1261693838,
        "unit": "g",
        "percent": 0.0504677535
      },
      {
        "name": "Oleo de soja",
        "quantity": 3.785081513,
        "unit": "mL",
        "percent": 0.6308469188
      }
    ]
  },
  {
    "id": "cat-normal-gatos-com-neoplasia-carne-de-frango",
    "sheet": "cat_normal",
    "title": "Gatos com Neoplasia (carne de frango)",
    "info": {
      "Peso": {
        "value": 4.7,
        "unit": "Kg"
      },
      "NEM": {
        "value": 282.0366612,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.34,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 120.5284877,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 45.0
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 27.82
      },
      {
        "label": "Extrato Etereo",
        "value": 23.12
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 38.56911606,
        "unit": "g",
        "percent": 2.571274404
      },
      {
        "name": "Carne de frango",
        "quantity": 43.39025557,
        "unit": "g",
        "percent": 2.892683705
      },
      {
        "name": "Figado bovino",
        "quantity": 9.642279016,
        "unit": "g",
        "percent": 0.6428186011
      },
      {
        "name": "Cenoura",
        "quantity": 18.07927316,
        "unit": "g",
        "percent": 0.9039636578
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 0.7231709262,
        "unit": "g",
        "percent": 0.2191427049
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.205284877,
        "unit": "g",
        "percent": 0.8035232513
      },
      {
        "name": "Suplemento M e V",
        "quantity": 0.7231709262,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal light",
        "quantity": 0.2410569754,
        "unit": "g",
        "percent": 0.09642279016
      },
      {
        "name": "Oleo de soja",
        "quantity": 7.231709262,
        "unit": "mL",
        "percent": 1.205284877
      }
    ]
  },
  {
    "id": "cat-obese-gatos-adultos-obesos-manutencao",
    "sheet": "cat_obese",
    "title": "Gatos Adultos Obesos Manutencao",
    "info": {
      "Peso": {
        "value": 5.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 247.475012,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.02,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 122.5123822,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 31.87
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 44.51
      },
      {
        "label": "Extrato Etereo",
        "value": 16.87
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 67.38181021,
        "unit": "g",
        "percent": 4.49212068
      },
      {
        "name": "Musculo gordo bov/peito frango",
        "quantity": 30.62809555,
        "unit": "g",
        "percent": 2.041873037
      },
      {
        "name": "Figado bovino",
        "quantity": 12.25123822,
        "unit": "g",
        "percent": 0.8167492146
      },
      {
        "name": "Cenoura",
        "quantity": 7.350742932,
        "unit": "g",
        "percent": 0.3675371466
      },
      {
        "name": "Carbonato de calcio",
        "quantity": 0.4900495288,
        "unit": "g",
        "percent": 0.1484998572
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.225123822,
        "unit": "g",
        "percent": 0.8167492146
      },
      {
        "name": "Suplemento M e V",
        "quantity": 1.225123822,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal light",
        "quantity": 0.3675371466,
        "unit": "g",
        "percent": 0.1470148586
      },
      {
        "name": "Oleo de soja",
        "quantity": 2.450247644,
        "unit": "mL",
        "percent": 0.4083746073
      }
    ]
  },
  {
    "id": "cat-obese-gatos-obesos-cardiopatas",
    "sheet": "cat_obese",
    "title": "Gatos Obesos Cardiopatas",
    "info": {
      "Peso": {
        "value": 5.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 247.475012,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.11,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 117.2867356,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 31.84
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 42.14
      },
      {
        "label": "Extrato Etereo",
        "value": 19.57
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 58.64336778,
        "unit": "g",
        "percent": 3.909557852
      },
      {
        "name": "Musculo gordo bov/peito frango",
        "quantity": 29.32168389,
        "unit": "g",
        "percent": 1.954778926
      },
      {
        "name": "Figado bovino",
        "quantity": 11.72867356,
        "unit": "g",
        "percent": 0.7819115704
      },
      {
        "name": "Cenoura",
        "quantity": 11.72867356,
        "unit": "g",
        "percent": 0.5864336778
      },
      {
        "name": "Carbonato de calcio",
        "quantity": 0.2345734711,
        "unit": "g",
        "percent": 0.07108287004
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.172867356,
        "unit": "g",
        "percent": 0.7819115704
      },
      {
        "name": "Suplemento M e V",
        "quantity": 1.172867356,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal Light",
        "quantity": 0.3518602067,
        "unit": "g",
        "percent": 0.1407440827
      },
      {
        "name": "Oleo de soja",
        "quantity": 3.518602067,
        "unit": "mL",
        "percent": 0.5864336778
      }
    ]
  },
  {
    "id": "cat-obese-gatos-obesos-com-irc",
    "sheet": "cat_obese",
    "title": "Gatos Obesos com IRC",
    "info": {
      "Peso": {
        "value": 5.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 247.475012,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.04,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 121.3112804,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 25.58
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 49.87
      },
      {
        "label": "Extrato Etereo",
        "value": 17.21
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 72.78676825,
        "unit": "g",
        "percent": 4.852451216
      },
      {
        "name": "Musculo gordo bov/peito frango",
        "quantity": 24.26225608,
        "unit": "g",
        "percent": 1.617483739
      },
      {
        "name": "Figado bovino",
        "quantity": 6.06556402,
        "unit": "g",
        "percent": 0.4043709347
      },
      {
        "name": "Cenoura",
        "quantity": 12.13112804,
        "unit": "g",
        "percent": 0.606556402
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 0.606556402,
        "unit": "g",
        "percent": 0.1838049703
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.213112804,
        "unit": "g",
        "percent": 0.8087418694
      },
      {
        "name": "Suplemento M e V",
        "quantity": 0.4852451216,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal Light",
        "quantity": 1.213112804,
        "unit": "g",
        "percent": 0.4852451216
      },
      {
        "name": "Oleo de soja",
        "quantity": 3.639338412,
        "unit": "mL",
        "percent": 0.606556402
      }
    ]
  },
  {
    "id": "cat-obese-gatos-obesos-com-neoplasia-carne-bovina",
    "sheet": "cat_obese",
    "title": "Gatos Obesos com Neoplasia (carne bovina)",
    "info": {
      "Peso": {
        "value": 5.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 247.475012,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.33,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 106.2124515,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 41.72
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 27.81
      },
      {
        "label": "Extrato Etereo",
        "value": 24.4
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 31.86373545,
        "unit": "g",
        "percent": 2.12424903
      },
      {
        "name": "Musculo gordo",
        "quantity": 44.60922964,
        "unit": "g",
        "percent": 2.973948642
      },
      {
        "name": "Figado bovino",
        "quantity": 8.496996121,
        "unit": "g",
        "percent": 0.5664664081
      },
      {
        "name": "Cenoura",
        "quantity": 15.93186773,
        "unit": "g",
        "percent": 0.7965933864
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 0.6372747091,
        "unit": "g",
        "percent": 0.1931135482
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 0.8496996121,
        "unit": "g",
        "percent": 0.5664664081
      },
      {
        "name": "Suplemento M e V",
        "quantity": 0.6372747091,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal",
        "quantity": 0.1062124515,
        "unit": "g",
        "percent": 0.04248498061
      },
      {
        "name": "Oleo de soja",
        "quantity": 3.186373545,
        "unit": "mL",
        "percent": 0.5310622576
      }
    ]
  },
  {
    "id": "cat-obese-gatos-obesos-com-neoplasia-carne-de-frango",
    "sheet": "cat_obese",
    "title": "Gatos Obesos com Neoplasia (carne de frango)",
    "info": {
      "Peso": {
        "value": 5.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 247.475012,
        "unit": "Kcal"
      },
      "EM": {
        "value": 2.34,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 105.7585522,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 45.0
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 27.82
      },
      {
        "label": "Extrato Etereo",
        "value": 23.12
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 33.84273669,
        "unit": "g",
        "percent": 2.256182446
      },
      {
        "name": "Carne de frango",
        "quantity": 38.07307877,
        "unit": "g",
        "percent": 2.538205252
      },
      {
        "name": "Figado bovino",
        "quantity": 8.460684172,
        "unit": "g",
        "percent": 0.5640456115
      },
      {
        "name": "Cenoura",
        "quantity": 15.86378282,
        "unit": "g",
        "percent": 0.7931891411
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 0.6345513129,
        "unit": "g",
        "percent": 0.1922882766
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.057585522,
        "unit": "g",
        "percent": 0.7050570143
      },
      {
        "name": "Suplemento M e V",
        "quantity": 0.6345513129,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal light",
        "quantity": 0.2115171043,
        "unit": "g",
        "percent": 0.08460684172
      },
      {
        "name": "Oleo de soja",
        "quantity": 6.345513129,
        "unit": "mL",
        "percent": 1.057585522
      }
    ]
  },
  {
    "id": "cat-obese-gatos-para-tratamento-da-obesidade",
    "sheet": "cat_obese",
    "title": "Gatos para Tratamento da Obesidade",
    "info": {
      "Peso": {
        "value": 5.0,
        "unit": "Kg"
      },
      "NEM": {
        "value": 231.8990259,
        "unit": "Kcal*"
      },
      "EM": {
        "value": 1.45,
        "unit": "Kcal/g"
      },
      "Quantidade Total": {
        "value": 159.9303627,
        "unit": "g/dia"
      }
    },
    "composition": [
      {
        "label": "Proteina Bruta",
        "value": 46.14
      },
      {
        "label": "Extrativo Nao Nitrogenado",
        "value": 39.11
      },
      {
        "label": "Extrato Etereo",
        "value": 6.85
      }
    ],
    "ingredients": [
      {
        "name": "Arroz cozido",
        "quantity": 47.9791088,
        "unit": "g",
        "percent": 3.198607253
      },
      {
        "name": "Peito de Frango",
        "quantity": 47.9791088,
        "unit": "g",
        "percent": 3.198607253
      },
      {
        "name": "Figado bovino",
        "quantity": 15.99303627,
        "unit": "g",
        "percent": 1.066202418
      },
      {
        "name": "Cenoura",
        "quantity": 22.39025077,
        "unit": "g",
        "percent": 1.119512539
      },
      {
        "name": "Vagem",
        "quantity": 22.39025077,
        "unit": "g",
        "percent": 1.119512539
      },
      {
        "name": "Carbonato de Calcio",
        "quantity": 0.3198607253,
        "unit": "g",
        "percent": 0.09692749253
      },
      {
        "name": "Levedura de Cerveja",
        "quantity": 1.599303627,
        "unit": "g",
        "percent": 1.066202418
      },
      {
        "name": "Suplemento M e V",
        "quantity": 1.599303627,
        "unit": "g",
        "percent": null
      },
      {
        "name": "Sal",
        "quantity": 0.3198607253,
        "unit": "g",
        "percent": 0.1279442901
      }
    ]
  }
] as const;
