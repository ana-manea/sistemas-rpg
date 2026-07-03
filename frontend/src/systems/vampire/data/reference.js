export const clans = ['Banu Haqim','Brujah','Gangrel','Hecata','Lasombra','Malkaviano','Ministério','Nosferatu','Ravnos','Salubri','Toreador','Tremere','Tzimisce','Ventrue','Caitiff','Sangue-Fraco'];
export const predators = ['Gato dos Becos','Ensacador','Sanguessuga','Apegado','Consensualista','Fazendeiro','Osíris','João Pestana','Rainha da Cena','Sereia'];
export const disciplines = ['Animalismo','Auspícios','Celeridade','Dominação','Fortitude','Feitiçaria de Sangue','Metamorfose','Oblívio','Ofuscação','Potência','Presença'];
export const attributes = ['força','destreza','vigor','carisma','manipulação','autocontrole','inteligência','raciocínio','determinação'];
export const skills = ['armas brancas','armas de fogo','atletismo','briga','condução','furtividade','ladroagem','ofícios','sobrevivência','empatia com animais','etiqueta','intimidação','liderança','manha','performance','persuasão','sagacidade','subterfúgio','ciência','erudição','finanças','investigação','medicina','ocultismo','percepção','política','tecnologia'];

export const clanDisciplines = {
  'Banu Haqim': ['Feitiçaria de Sangue', 'Celeridade', 'Ofuscação'],
  Brujah: ['Celeridade', 'Potência', 'Presença'],
  Gangrel: ['Animalismo', 'Fortitude', 'Metamorfose'],
  Hecata: ['Auspícios', 'Fortitude', 'Oblívio'],
  Lasombra: ['Dominação', 'Potência', 'Oblívio'],
  Malkaviano: ['Auspícios', 'Dominação', 'Ofuscação'],
  Ministério: ['Ofuscação', 'Presença', 'Metamorfose'],
  Nosferatu: ['Animalismo', 'Ofuscação', 'Potência'],
  Ravnos: ['Animalismo', 'Ofuscação', 'Presença'],
  Salubri: ['Auspícios', 'Dominação', 'Fortitude'],
  Toreador: ['Auspícios', 'Celeridade', 'Presença'],
  Tremere: ['Auspícios', 'Dominação', 'Feitiçaria de Sangue'],
  Tzimisce: ['Animalismo', 'Dominação', 'Metamorfose'],
  Ventrue: ['Dominação', 'Fortitude', 'Presença'],
  Caitiff: [],
  'Sangue-Fraco': []
};

export const predatorDefaults = {
  'Gato dos Becos': { skills: { briga: 1, intimidação: 1 }, disciplines: ['Potência', 'Celeridade'], note: 'Predador: costuma favorecer caça violenta nas ruas.' },
  Ensacador: { skills: { ladroagem: 1, furtividade: 1 }, disciplines: ['Ofuscação'], note: 'Predador: sangue obtido de bolsas, hospitais ou fontes indiretas.' },
  Sanguessuga: { skills: { briga: 1, furtividade: 1 }, disciplines: ['Celeridade', 'Potência'], note: 'Predador: caça outros vampiros ou fontes vampíricas.' },
  Apegado: { skills: { persuasão: 1, subterfúgio: 1 }, disciplines: ['Dominação', 'Presença'], note: 'Predador: mantém uma fonte recorrente e emocionalmente próxima.' },
  Consensualista: { skills: { persuasão: 1, medicina: 1 }, disciplines: ['Auspícios', 'Fortitude'], note: 'Predador: busca consentimento ou acordos para se alimentar.' },
  Fazendeiro: { skills: { medicina: 1, sobrevivência: 1 }, disciplines: ['Animalismo', 'Fortitude'], note: 'Predador: evita humanos e recorre a animais ou alternativas.' },
  Osíris: { skills: { performance: 1, ocultismo: 1 }, disciplines: ['Presença', 'Feitiçaria de Sangue'], note: 'Predador: usa seguidores, culto ou fama para conseguir sangue.' },
  'João Pestana': { skills: { medicina: 1, furtividade: 1 }, disciplines: ['Auspícios', 'Ofuscação'], note: 'Predador: alimenta-se de vítimas adormecidas ou vulneráveis.' },
  'Rainha da Cena': { skills: { etiqueta: 1, performance: 1 }, disciplines: ['Dominação', 'Presença'], note: 'Predador: caça em eventos, cenas sociais e círculos de influência.' },
  Sereia: { skills: { persuasão: 1, subterfúgio: 1 }, disciplines: ['Fortitude', 'Presença'], note: 'Predador: sedução e intimidade fazem parte da caça.' }
};

export const dndRaces = ['Humano','Anão','Elfo','Halfling','Draconato','Gnomo','Meio-Elfo','Meio-Orc','Tiefling'];
export const dndClasses = ['Bárbaro','Bardo','Bruxo','Clérigo','Druida','Feiticeiro','Guerreiro','Ladino','Mago','Monge','Paladino','Patrulheiro'];

export const dndRaceDefaults = {
  Humano: { attributes: { força: 1, destreza: 1, constituição: 1, inteligência: 1, sabedoria: 1, carisma: 1 }, speed: '9m', features: 'Aumento amplo nos valores de habilidade; versatilidade humana.' },
  Anão: { attributes: { constituição: 2 }, speed: '7,5m', features: 'Visão no escuro, resistência anã, treinamento com armas anãs.' },
  Elfo: { attributes: { destreza: 2 }, speed: '9m', features: 'Visão no escuro, sentidos aguçados, ancestralidade feérica e transe.' },
  Halfling: { attributes: { destreza: 2 }, speed: '7,5m', features: 'Sortudo, bravura e agilidade halfling.' },
  Draconato: { attributes: { força: 2, carisma: 1 }, speed: '9m', features: 'Ancestral dracônico, arma de sopro e resistência a dano.' },
  Gnomo: { attributes: { inteligência: 2 }, speed: '7,5m', features: 'Visão no escuro e astúcia gnômica.' },
  'Meio-Elfo': { attributes: { carisma: 2 }, speed: '9m', features: 'Visão no escuro, ancestralidade feérica e versatilidade em perícias.' },
  'Meio-Orc': { attributes: { força: 2, constituição: 1 }, speed: '9m', features: 'Visão no escuro, resistência implacável e ataques selvagens.' },
  Tiefling: { attributes: { inteligência: 1, carisma: 2 }, speed: '9m', features: 'Visão no escuro, resistência infernal e legado infernal.' }
};

export const dndClassDefaults = {
  Bárbaro: { hitDie: 'd12', attributes: { força: 2, constituição: 1 }, features: 'Fúria, defesa sem armadura e foco em Força e Constituição.' },
  Bardo: { hitDie: 'd8', attributes: { carisma: 2, destreza: 1 }, features: 'Inspiração de bardo, conjuração e perícias variadas.' },
  Bruxo: { hitDie: 'd8', attributes: { carisma: 2, constituição: 1 }, features: 'Patrono sobrenatural, magia de pacto e invocações.' },
  Clérigo: { hitDie: 'd8', attributes: { sabedoria: 2, constituição: 1 }, features: 'Conjuração divina e domínio divino.' },
  Druida: { hitDie: 'd8', attributes: { sabedoria: 2, constituição: 1 }, features: 'Conjuração druídica e vínculo com a natureza.' },
  Feiticeiro: { hitDie: 'd6', attributes: { carisma: 2, constituição: 1 }, features: 'Origem de feitiçaria e magia inata.' },
  Guerreiro: { hitDie: 'd10', attributes: { força: 2, constituição: 1 }, features: 'Estilo de luta, retomar fôlego e treinamento marcial.' },
  Ladino: { hitDie: 'd8', attributes: { destreza: 2, inteligência: 1 }, features: 'Especialização, ataque furtivo e perícias.' },
  Mago: { hitDie: 'd6', attributes: { inteligência: 2, destreza: 1 }, features: 'Livro de magias, conjuração arcana e tradição arcana.' },
  Monge: { hitDie: 'd8', attributes: { destreza: 2, sabedoria: 1 }, features: 'Defesa sem armadura, artes marciais e uso de chi.' },
  Paladino: { hitDie: 'd10', attributes: { força: 2, carisma: 1 }, features: 'Sentido divino, cura pelas mãos e juramento sagrado.' },
  Patrulheiro: { hitDie: 'd10', attributes: { destreza: 2, sabedoria: 1 }, features: 'Exploração, inimigo favorito e magia de patrulheiro.' }
};
